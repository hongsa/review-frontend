import React, {PropTypes, Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from 'react-native-router-flux'
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';

import * as webtoonRankingsActions from './webtoonRankings.actions';
import {fetchTag} from '../signup/signup.actions';
import styles from './styles/WebtoonRankingsFilter';
import SuccessButton from '../_global/SuccessButton'
import CustomAlert from '../_global/CustomAlert';
import PlatformFilter from '../_global/PlatformFilter';

class WebtoonRankingFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platforms: [{id: 1, name: 'naver'}, {id: 2, name: 'daum'}, {id: 3, name: 'kakao'},
        {id: 4, name: 'lezhin'}, {id: 5, name: 'toptoon'}, {id: 6, name: 'tomics'},
        {id: 7, name: 'battle'}, {id: 8, name: 'comica'}, {id: 9, name: 'comico'}],

      // 이전에 선택한 플랫폼이 있으면 그대로 적용되고, 없으면 이전 페이지에서 넘어온 플랫폼 값을 사용
      selectedPlatform: this.props.webtoonRankings.filters.selectedPlatform || this.props.selectedPlatform,

      // 이전에 선택한 태그가 있으면 그대로 적용되고, 없으면 이전 페이지에서 넘어온 태그를 사용
      selectedTags: this.props.webtoonRankings.filters.selectedTags || this.props.selectedTags,
    };

    let tracker = new GoogleAnalyticsTracker('UA-107295973-1');
    tracker.trackScreenView('Webtoon Ranking Filter');
  }

  componentDidMount() {
    this.fetchTag().then(() => {
      this.setState({initLoading: false});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.webtoonRankings.filterError) {
      alert('필터를 제대로 선택해주세요.')
    }
    if (nextProps.webtoonRankings.filterSelect) {
      Actions.pop();
    }
  }

  onClickPlatform = (selected) => {
    this.setState({
      selectedPlatform: selected
    })
  };

  onClickTag = (selected) => {
    if (selected === 'all') {
      if (this.state.selectedTags.includes('all')) {
        this.setState({
          selectedTags: []
        })
      } else {
        this.setState({
          selectedTags: ['all']
        })
      }
    } else {
      if (this.state.selectedTags.includes(selected)) {
        this.setState({
          selectedTags: this.state.selectedTags.filter((val) => val !== selected && val !== 'all')
        })
      } else {
        this.setState({
          selectedTags: [...this.state.selectedTags.filter((val) => val !== 'all'), selected]
        });
      }
    }
  };

  onClickSelectedFilter = () => {
    const selectedFilter = {
      tags: this.props.webtoonRankings.filters.tags,
      selectedPlatform: this.state.selectedPlatform,
      selectedTags: (this.state.selectedPlatform === 'naver' || this.state.selectedPlatform === 'daum')
        ? this.state.selectedTags : ['all']
    };
    if (this.state.selectedTags.length === 0) {
      CustomAlert('장르를 선택해주세요!')
    } else if (this.state.selectedPlatform.length === 0) {
      CustomAlert('플랫폼을 선택해주세요!')
    } else {
      this.props.actions.selectWebtoonRankingFilter(selectedFilter)
    }
  };

  onClickFilterReset = () => {
    this.setState({
      selectedPlatform: 'naver',
      selectedTags: ['all']
    });
  };

  async fetchTag() {
    return await this.props.onFetchTag();
  }

  renderPlatforms = () => {
    const platforms = this.state.platforms.map(each => {
      return (
        <View
          key={each.id}
          style={styles.itemContainer}
        >
          <TouchableOpacity
            onPress={() => this.onClickPlatform(each.name)}
            style={this.state.selectedPlatform.includes(each.name)
              ? styles.selectedBox : styles.selectBox}
          >
            <Text
              style={this.state.selectedPlatform.includes(each.name)
                ? styles.selectedText : styles.selectText}
            >{PlatformFilter(each.name)}</Text>
          </TouchableOpacity>
        </View>
      )
    });
    return platforms
  };

  renderTags = () => {
    if (this.state.selectedPlatform === 'naver' || this.state.selectedPlatform === 'daum') {
      const tags = this.props.webtoonRankings.filters.tags.map(each => {
        if((this.state.selectedPlatform === 'naver' && (each.tag === '로맨스/연애' || each.tag === '학원' || each.tag === '미스터리')) ||
          (this.state.selectedPlatform === 'daum' && (each.tag === '에피소드'))) {
          return false
        } else {
          return (
            <View
              key={each.id}
              style={styles.itemContainer}
            >
              <TouchableOpacity
                onPress={() => this.onClickTag(each.tag)}
                style={this.state.selectedTags.includes(each.tag)
                  ? styles.selectedBox : styles.selectBox}
              >
                <Text
                  style={this.state.selectedTags.includes(each.tag)
                    ? styles.selectedText : styles.selectText}
                >{each.tag}</Text>
              </TouchableOpacity>
            </View>
          )
        }
      });
      return tags
    } else {
      return false
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <View style={styles.filterTitleContainer}>
            <TouchableOpacity
              style={{flex: 1, padding: 5}}
              onPress={() => {
                Actions.pop()
              }}
            >
              <Text style={{fontSize: 20, color: 'black'}}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, padding: 10}}
              onPress={this.onClickFilterReset}
            >
              <Text style={{fontSize: 15, textAlign: 'right'}}>초기화</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divideLine} />

          <View style={styles.filterTitleContainer}>
            <View style={styles.tagInfoContainer}>
              <Text style={styles.filterTitle}>플랫폼</Text>
            </View>
          </View>
          <View style={styles.tagContainer}>
            {this.renderPlatforms()}
          </View>

          <View style={styles.filterTitleContainer}>
            <View style={styles.tagInfoContainer}>
              <Text style={styles.filterTitle}>장르</Text>
            </View>
          </View>
          <View style={styles.tagContainer}>
            {(this.state.selectedPlatform === 'naver' || this.state.selectedPlatform === 'daum') ?
              <View
                style={styles.itemContainer}
              >
                <TouchableOpacity
                  onPress={() => this.onClickTag('all')}
                  style={this.state.selectedTags.includes('all') ? styles.selectedBox : styles.selectBox}
                >
                  <Text
                    style={this.state.selectedTags.includes('all')
                      ? styles.selectedText : styles.selectText}
                  >전체</Text>
                </TouchableOpacity>
              </View> : null}
            {this.renderTags()}
          </View>
        </ScrollView>
        <SuccessButton onPress={this.onClickSelectedFilter}>필터 적용</SuccessButton>
      </View>
    );
  }
}

WebtoonRankingFilter.propTypes = {
  actions: PropTypes.object.isRequired,
  onFetchTag: PropTypes.func.isRequired,
  webtoonRankings: PropTypes.object.isRequired,
  selectedPlatform: PropTypes.string.isRequired,
  selectedTags: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    webtoonRankings: state.webtoonRankings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(webtoonRankingsActions, dispatch),
    onFetchTag: () => { dispatch(fetchTag()) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WebtoonRankingFilter);
