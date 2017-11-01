import React, {PropTypes, Component} from 'react';
import {
  View,
  FlatList
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'
import {bindActionCreators} from 'redux';
import _ from 'lodash'
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';

import * as reviewDetailActions from './reviewDetail.actions';
import {postReviewLike} from '../reviews/reviews.actions'
import styles from './styles/ReviewDetail';
import ProgressBar from '../_global/ProgressBar';
import CustomAlert from '../_global/CustomAlert';
import WebtoonInfo from '../_global/WebtoonInfo';
import OrderFilter from '../_global/OrderFilter'
import DetailReviewCard from '../_global/DetailReviewCard'

class ReviewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'created',
      userId: this.props.user.info.id,
      webtoonId: this.props.webtoonId,
      initLoading: true,
      page: 1,
      reviewLoading: false,
      reviewLast: false,
      tracker: new GoogleAnalyticsTracker('UA-107295973-1')
    };

    this.handleLoadMore = _.debounce(this.handleLoadMore, 800);
    this.state.tracker.trackScreenView('Review Detail');
  }

  componentDidMount() {
    this.fetchWebtoonInfo().then(() => {
      this.fetchReviewDetail().then(() => {
        this.setState({initLoading: false});
      })
    });
  }

  componentWillReceiveProps(nextProps) {

    // 인피니트 스크롤 마지막 시
    if (nextProps.reviewDetail.reviewLast) {
      this.setState({
        reviewLoading: false,
        reviewLast: nextProps.reviewDetail.reviewLast || false
      });
    }

    // 인피니트 스크롤 에러 시 해당 page 다시 호출
    if (nextProps.reviewDetail.fetchDataError) {
      this.setState({
        page: nextProps.reviewDetail.page,
      });
      this.state.tracker.trackEvent('reviewDetailFetch', 'response:fail', {label: '리뷰상세 fetch error'});
    }
  }

  onClickLike = (reviewId) => {
    this.state.tracker.trackEvent('reviewLikeBtn', 'click', {label: '좋아요 클릭'});
    const data = {
      reviewId: reviewId,
      userId: this.state.userId
    };
    this.props.onPostReviewLike(data);
  };

  onClickWritePage = () => {
    this.state.tracker.trackEvent('writeBtn', 'click', {label: '글쓰기 페이지 이동 클릭'});
    if (this.props.reviewDetail.webtoonInfo.already_review_created) {
      CustomAlert('이미 리뷰를 작성했습니다.');
    } else {
      Actions.writes({
        webtoonInfo: this.props.reviewDetail.webtoonInfo
      });
    }
  };

  onClickWebtoonWebView = (targetUrl) => {
    this.state.tracker.trackEvent('webtoonWebviewBtn', 'click', {label: targetUrl});
    Actions.webtoonWebView({targetUrl: targetUrl});
  };

  onClickPostBookmark = () => {
    this.state.tracker.trackEvent('bookmarkBtn', 'click', {label: '북마크 클릭'});
    const data = {
      'userId': this.state.userId,
      'webtoonId': this.state.webtoonId
    };
    this.props.actions.postBookmark(data)
  };

  onClickUserPage = (userId) => {
    this.state.tracker.trackEvent('userPageBtn', 'click', {label: '유저페이지 클릭'});
    Actions.userPages({'userId': userId});
  };

  onClickChangeOrder = (order) => {
    this.state.tracker.trackEvent('reviewOrderBtn', 'click', {label: '리뷰정렬 변경 클릭'});
    this.setState({
      order: order,
      page: 1,
      reviewLoading: true,
      reviewLast: false,
    }, () => {
      this.fetchReviewDetail().then(() => {
        this.setState({reviewLoading: false});
      })
    })
  };

  async fetchWebtoonInfo() {
    const {webtoonId, userId} = this.state;
    return await this.props.actions.fetchWebtoonInfo(webtoonId, userId)
  }

  async fetchReviewDetail() {
    const {webtoonId, order, page} = this.state;
    return await this.props.actions.fetchReviewDetail(webtoonId, order, page);
  }

  keyExtractor = (item) => item.id;

  handleLoadMore = () => {
    if (!this.state.reviewLast) {
      this.setState({
        reviewLoading: true,
        page: this.state.page + 1
      }, () => {
        this.fetchReviewDetail().then(() => {
          this.setState({reviewLoading: false});
        })
      })
    } else {
      this.setState({reviewLoading: false});
    }
  };

  renderItem = ({item}) => (
    <DetailReviewCard
      rating={item.rating}
      coreOneLine={item.core_one_line}
      likeCount={item.like_count}
      nickname={item.nickname}
      gender={item.gender}
      age={item.age}
      selectedBadge={item.badge}
      onClickLike={() => this.onClickLike(item.id)}
      onClickUserPage={() => this.onClickUserPage(item.user_id)}
    />
  );

  renderHeader = () => {
    return (
      <View>
        <WebtoonInfo
          description={this.props.reviewDetail.webtoonInfo.description}
          title={this.props.reviewDetail.webtoonInfo.title}
          author={this.props.reviewDetail.webtoonInfo.author}
          tags={this.props.reviewDetail.webtoonInfo.tags}
          detailImg={this.props.reviewDetail.webtoonInfo.detail_img}
          platform={this.props.reviewDetail.webtoonInfo.platform}
          avgRating={this.props.reviewDetail.webtoonInfo.avg_rating}
          countRating={this.props.reviewDetail.webtoonInfo.count_rating}
          updateDay={this.props.reviewDetail.webtoonInfo.update_day}
          alreadyBookmarkCreated={this.props.reviewDetail.webtoonInfo.already_bookmark_created}
          alreadyReviewCreated={this.props.reviewDetail.webtoonInfo.already_review_created}
          onClickWritePage={this.onClickWritePage}
          onClickWebtoonWebView={() => this.onClickWebtoonWebView(this.props.reviewDetail.webtoonInfo.target_url)}
          onClickPostBookmark={this.onClickPostBookmark}
        />
        <OrderFilter
          order={this.state.order}
          onClickChangeOrder={this.onClickChangeOrder}
        />
      </View>
    )
  };

  renderFooter = () => {
    if (!this.state.reviewLoading || this.state.reviewLast) {
      return null;
    } else {
      return (
        <View><ProgressBar /></View>
      );
    }
  };

  render() {
    return (
      this.state.initLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
      <View style={styles.container}>
        <FlatList
          data={this.props.reviewDetail.reviews}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
          extraData={this.props.reviewDetail.webtoonInfo}
        />
      </View>
    );
  }
}

ReviewDetail.propTypes = {
  actions: PropTypes.object.isRequired,
  onPostReviewLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  webtoonId: PropTypes.number.isRequired,
  reviewDetail: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    reviewDetail: state.reviewDetail,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(reviewDetailActions, dispatch),
    onPostReviewLike: (data) => {
      dispatch(postReviewLike(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetail);
