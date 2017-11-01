import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'
import {bindActionCreators} from 'redux';
import _ from 'lodash'
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';

import * as reviewsActions from './reviews.actions';
import styles from './styles/Reviews';
import ProgressBar from '../_global/ProgressBar';
import ReviewCard from '../_global/ReviewCard';
import WriteButton from '../_global/WriteButton'
import ReviewWriteAlert from '../_global/ReviewWriteAlert';
import TopWebtoon from '../_global/TopWebtoon';
import PlatformFilter from '../_global/PlatformFilter';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user.info.id,
      order: 'created',
      gender: 'all',
      age: 'all',
      page: 1,
      rating: 'all',

      // 이전에 필터에서 선택된 것이 있으면 선택 필터를 사용하고, 아닌 경우에 내 선호 태그를 사용함
      selectedTags: this.props.reviews.filters.selectedTags || this.props.user.info.preferredTags,
      initLoading: true,
      reviewLoading: false,
      refreshing: false,
      reviewLast: false,
      tracker: new GoogleAnalyticsTracker('UA-107295973-1')
    };

    this.handleLoadMore = _.debounce(this.handleLoadMore, 800);
    this.state.tracker.trackScreenView('Reviews');
  }

  componentDidMount() {
    this.fetchTopWebtoon().then(() => {
      this.fetchReviewMain().then(() => {
        this.setState({initLoading: false});
      })
    });
  }

  componentWillReceiveProps(nextProps) {

    // 필터가 바뀌면 바뀐 필터에 맞게 새롭게 data fetch
    if (this.isFilterChange(nextProps)) {

      this.setState({
        order: nextProps.reviews.filters.order,
        gender: nextProps.reviews.filters.gender,
        age: nextProps.reviews.filters.age,
        selectedTags: nextProps.reviews.filters.selectedTags,
        rating: nextProps.reviews.filters.rating,
        page: 1,
        initLoading: true,
        reviewLoading: false,
        refreshing: false,
        reviewLast: false
      }, () => {
        this.fetchReviewMain().then(() => {
          this.setState({initLoading: false});
        })
      })
    }

    // 인피니트 스크롤 마지막 시
    if (nextProps.reviews.reviewLast) {
      this.setState({
        reviewLoading: false,
        refreshing: false,
        reviewLast: nextProps.reviews.reviewLast || false
      });
    }

    // 인피니트 스크롤 에러 시 해당 page 다시 호출
    if (nextProps.reviews.fetchDataError) {
      this.setState({
        page: nextProps.reviews.page,
      });
      this.state.tracker.trackEvent('reviewFetch', 'response:fail', {label: '리뷰 fetch error'});
    }
  }

  onClickFilterModal = () => {
    this.state.tracker.trackEvent('reviewFilterBtn', 'click', {label: '리뷰 필터 클릭'});
    Actions.reviewsFilter()
  };

  onClickReviewDetailPage = (webtoonId) =>  {
    if (this.props.user.info.reviewCount > 0) {
      this.state.tracker.trackEvent('reviewDetailBtn', 'click', {label: '리뷰상세 페이지 이동 클릭'});
      Actions.reviewsDetail({webtoonId: webtoonId});
    } else {
      this.state.tracker.trackEvent('reviewDetailBtn', 'click', {label: '권한 없음'});
      ReviewWriteAlert(webtoonId);
    }
  };

  onClickWritePage = () => {
    this.state.tracker.trackEvent('writeBtn', 'click', {label: '글쓰기 페이지 이동 클릭'});
    Actions.writes()
  };

  onClickWebtoonRankingsPage = (platform) => {
    Actions.webtoonRankings({selectedPlatform: platform});
  };

  onClickLike = (reviewId) => {
    this.state.tracker.trackEvent('reviewLikeBtn', 'click', {label: '좋아요 클릭'});
    const data = {
      reviewId: reviewId,
      userId: this.state.userId
    };
    this.props.actions.postReviewLike(data)
  };

  onClickReadMore = (reviewId) => {
    return (
      <Text
        style={styles.readMoreBtn}
        onPress={() => this.props.actions.readMore(reviewId)}
      >
        &nbsp;...더보기
      </Text>
    )
  };

  isFilterChange(nextProps) {
    return (nextProps.reviews.filters.order !== this.state.order
    || nextProps.reviews.filters.gender !== this.state.gender
    || nextProps.reviews.filters.age !== this.state.age
    || nextProps.reviews.filters.rating !== this.state.rating
    || (nextProps.reviews.filters.selectedTags &&
    _.isEqual(nextProps.reviews.filters.selectedTags, this.state.selectedTags) === false))
  }

  async fetchReviewMain() {
    const {order, gender, age, rating, page} = this.state;
    let selectedTags = '';
    this.state.selectedTags.map((item, idx) => {
      selectedTags += item + (idx !== this.state.selectedTags.length - 1 ? ',' : '')
    });
    return await this.props.actions.fetchReviewMain(order, gender, age, selectedTags, rating, page);
  }

  async fetchTopWebtoon() {
    let selectedTags = '';
    this.props.user.info.preferredTags.map((item, idx) => {
      selectedTags += item + (idx !== this.props.user.info.preferredTags.length - 1 ? ',' : '')
    });
    return await this.props.actions.fetchTopWebtoon(selectedTags);
  }

  keyExtractor = (item) => item.id;

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
      reviewLast: false,
      initLoading: true
    }, () => {
      this.fetchTopWebtoon().then(() => {
        this.fetchReviewMain().then(() => {
          this.setState({
            refreshing: false,
            initLoading: false
          });
        })
      });
    })
  };

  handleLoadMore = () => {
    if (!this.state.reviewLast) {
      this.setState({
        reviewLoading: true,
        page: this.state.page + 1
      }, () => {
        this.fetchReviewMain().then(() => {
          this.setState({reviewLoading: false});
        })
      })
    } else {
      this.setState({reviewLoading: false});
    }
  };

  renderItem = ({item}) => (
    <ReviewCard
      id={item.id}
      webtoonId={item.webtoon_id}
      title={item.title}
      author={item.author}
      tags={item.tags}
      thumbnail={item.thumbnail}
      rating={item.rating}
      coreOneLine={item.core_one_line}
      likeCount={item.like_count}
      nickname={item.nickname}
      gender={item.gender}
      age={item.age}
      platform={item.platform}
      readMoreBtn={item.read_more_btn}
      onClickReviewDetailPage={() => this.onClickReviewDetailPage(item.webtoon_id)}
      onClickLike={() => this.onClickLike(item.id)}
      onClickReadMore={() => this.onClickReadMore(item.id)}
    />
  );

  renderHeader = () => {
    const firstPlatform = this.props.reviews.topWebtoons[0].platform;
    const secondPlatform = this.props.reviews.topWebtoons[4].platform;
    return (
      <View>
        <View style={styles.rankingContainer}>
          <View style={styles.rankingUpperContainer}>
            <View style={styles.rankingTextContainer}>
              <TouchableOpacity
                onPress={() => this.onClickWebtoonRankingsPage(firstPlatform)}
              >
                <Text style={styles.rankingText}>
                  {PlatformFilter(firstPlatform)} 내 취향 Top3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rankingMoreContainer}>
              <TouchableOpacity
                onPress={() => this.onClickWebtoonRankingsPage(firstPlatform)}
              >
                <Text style={styles.rankingMoreText}>더보기</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rankingItemContainer}>
            {this.renderTopWebtoon(1)}
          </View>
          <View style={styles.rankingUpperContainer}>
            <View style={styles.rankingTextContainer}>
              <TouchableOpacity
                onPress={() => this.onClickWebtoonRankingsPage(secondPlatform)}
              >
                <Text style={styles.rankingText}>
                  {PlatformFilter(secondPlatform)} 역대 Top3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rankingMoreContainer}>
              <TouchableOpacity
                onPress={() => this.onClickWebtoonRankingsPage(secondPlatform)}
              >
                <Text style={styles.rankingMoreText}>더보기</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rankingItemContainer}>
            {this.renderTopWebtoon(2)}
          </View>
        </View>
        <View style={styles.reviewTextContainer}>
          <Text style={styles.rankingText}>내 취향 리뷰</Text>
        </View>
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

  renderTopWebtoon = (type) => {
    let min, max = 0;
    if (type === 1) {
      min = 0;
      max = 3;
    } else {
      min = 3;
      max = 6;
    }
    const topWebtoon = this.props.reviews.topWebtoons.map((each, idx) => {
      if (idx >= min && idx < max) {
        return (
          <TouchableOpacity
            key={each.id}
            onPress={() => this.onClickReviewDetailPage(each.id)}
          >
            <TopWebtoon
              title={each.title}
              author={each.author}
              thumbnail={each.thumbnail}
              platform={each.platform}
            />
          </TouchableOpacity>
        )
      }
    });
    return topWebtoon
  };

  render() {
    return (
      this.state.initLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.leftContainer}
            onPress={this.onClickFilterModal}
          >
            <Text style={styles.filterName}>필터</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightContainer}
            onPress={this.onClickFilterModal}
          >
            <Text
              style={styles.filterName}
            >{this.state.order === 'created' ? '시간순' : '좋아요순'}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.props.reviews.reviews}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          extraData={this.state}
        />
        <WriteButton onClickWritePage={this.onClickWritePage} />
      </View>
    );
  }
}

Reviews.propTypes = {
  actions: PropTypes.object.isRequired,
  reviews: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    reviews: state.reviews,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(reviewsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
