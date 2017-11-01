import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash'
import {Actions} from 'react-native-router-flux'
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';

import * as webtoonRankingsActions from './webtoonRankings.actions';
import styles from './styles/WebtoonRankings';
import ProgressBar from '../_global/ProgressBar';
import WebtoonRankingResult from '../_global/WebtoonRankingResult'
import ReviewWriteAlert from '../_global/ReviewWriteAlert';
import PlatformFilter from '../_global/PlatformFilter';

class WebtoonRankings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLoading: true,

      // 더보기에서 눌러진 선택한 플랫폼
      selectedPlatform: this.props.selectedPlatform,

      // 이전에 필터에서 선택된 것이 있으면 선택 필터를 사용하고, 아닌 경우에 네이버와 다음만 선호태그를 사용하고 다른 플랫폼은 전체 사용
      selectedTags: this.props.webtoonRankings.filters.selectedTags ||
      (this.props.selectedPlatform === 'naver' || this.props.selectedPlatform === 'daum') ? this.props.user.info.preferredTags : ['all'],
      page: 1,
      rankingsLoading: false,
      rankingsLast: false,
      tracker: new GoogleAnalyticsTracker('UA-107295973-1')
    };

    this.handleLoadMore = _.debounce(this.handleLoadMore, 600);
    this.state.tracker.trackScreenView('Webtoon Rankings');
  }

  componentDidMount() {
    this.fetchWebtoonRanking().then(() => {
      this.setState({initLoading: false})
    })
  }

  componentWillReceiveProps(nextProps) {

    // 필터가 바뀌면 바뀐 필터에 맞게 새롭게 data fetch
    if (this.isFilterChange(nextProps)) {
      this.setState({
        selectedTags: nextProps.webtoonRankings.filters.selectedTags,
        selectedPlatform: nextProps.webtoonRankings.filters.selectedPlatform,
        page: 1,
        initLoading: true,
        reviewLoading: false,
        refreshing: false,
        reviewLast: false
      }, () => {
        this.fetchWebtoonRanking().then(() => {
          this.setState({initLoading: false});
        })
      })
    }

    // 인피니트 스크롤 마지막 시
    if (nextProps.webtoonRankings.rankingsLast) {
      this.setState({
        rankingsLoading: false,
        rankingsLast: nextProps.webtoonRankings.rankingsLast || false
      });
    }

    // 인피니트 스크롤 에러 시 해당 page 다시 호출
    if (nextProps.webtoonRankings.fetchDataError) {
      this.setState({
        page: nextProps.webtoonRankings.page,
      });
      this.state.tracker.trackEvent('searchFetch', 'response:fail', {label: '검색 fetch error'});
    }
  }

  onClickReviewDetailPage = (webtoonId) => {
    if (this.props.user.info.reviewCount > 0) {
      this.state.tracker.trackEvent('reviewDetailBtn', 'click', {label: '리뷰상세 페이지 이동 클릭'});
      Actions.reviewsDetail({webtoonId: webtoonId});
    } else {
      this.state.tracker.trackEvent('reviewDetailBtn', 'click', {label: '권한 없음'});
      ReviewWriteAlert(webtoonId);
    }
  };

  onClickFilterModal = () => {
    this.state.tracker.trackEvent('webtoonRankingFilterBtn', 'click', {label: '웹툰 랭킹 필터 클릭'});
    Actions.webtoonRankingsFilter({
      selectedPlatform: this.state.selectedPlatform,
      selectedTags: this.state.selectedTags
    });
  };

  isFilterChange(nextProps) {
    return ((nextProps.webtoonRankings.filters.selectedPlatform
    && nextProps.webtoonRankings.filters.selectedPlatform !== this.state.selectedPlatform) ||
    (nextProps.webtoonRankings.filters.selectedTags
    && _.isEqual(nextProps.webtoonRankings.filters.selectedTags, this.state.selectedTags) === false))
  }

  async fetchWebtoonRanking() {
    const {selectedPlatform, page} = this.state;
    let selectedTags = '';
    this.state.selectedTags.map((item, idx) => {
      selectedTags += item + (idx !== this.state.selectedTags.length - 1 ? ',' : '')
    });
    return await this.props.actions.fetchWebtoonRanking(selectedPlatform, selectedTags, page);
  }

  keyExtractor = (item) => item.id;

  handleLoadMore = () => {
    if (!this.state.rankingsLast && this.state.selectedPlatform.length >= 1) {
      this.setState({
        rankingsLoading: true,
        page: this.state.page + 1
      }, () => {
        this.fetchWebtoonRanking().then(() => {
          this.setState({rankingsLoading: false});
        })
      })
    } else {
      this.setState({rankingsLoading: false});
    }
  };

  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this.onClickReviewDetailPage(item.id)}>
      <WebtoonRankingResult
        title={item.title}
        author={item.author}
        tags={item.tags}
        thumbnail={item.thumbnail}
        platform={item.platform}
        updateDay={item.update_day}
        ranking={item.ranking}
      />
    </TouchableOpacity>
  );

  renderFooter = () => {
    if (!this.state.rankingsLoading || this.state.rankingsLast) {
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
            >{PlatformFilter(this.state.selectedPlatform)}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.props.webtoonRankings.rankings}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
          extraData={this.state}
        />
      </View>
    );
  }
}

WebtoonRankings.propTypes = {
  actions: PropTypes.object.isRequired,
  webtoonRankings: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  selectedPlatform: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    webtoonRankings: state.webtoonRankings,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(webtoonRankingsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WebtoonRankings);
