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

import styles from './styles/ReviewFilter';
import * as reviewsActions from './reviews.actions';
import {fetchTag} from '../signup/signup.actions';
import SuccessButton from '../_global/SuccessButton'
import FilterItem from '../_global/FilterItem';
import CustomAlert from '../_global/CustomAlert';

class ReviewFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.reviews.filters.order,
      gender: this.props.reviews.filters.gender,
      age: this.props.reviews.filters.age,

      // 이전에 필터에서 선택된 것이 있으면 선택 필터를 사용하고, 아닌 경우에 내 선호 태그를 사용함
      selectedTags: this.props.reviews.filters.selectedTags || this.props.user.info.preferredTags,
      rating: this.props.reviews.filters.rating
    };

    let tracker = new GoogleAnalyticsTracker('UA-107295973-1');
    tracker.trackScreenView('Review Filter');
  }

  componentDidMount() {
    this.fetchTag().then(() => {
      this.setState({initLoading: false});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reviews.filterError) {
      alert('필터를 제대로 선택해주세요.')
    }
    if (nextProps.reviews.filterSelect) {
      Actions.pop();
    }
  }

  onClickOrder = (selected) => {
    this.setState({
      order: selected
    })
  };

  onClickGender = (selected) => {
    this.setState({
      gender: selected
    })
  };

  onClickAge = (selected) => {
    this.setState({
      age: selected
    })
  };

  onClickRating = (selected) => {
    this.setState({
      rating: selected
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
      order: this.state.order,
      gender: this.state.gender,
      age: this.state.age,
      tags: this.props.reviews.filters.tags,
      selectedTags: this.state.selectedTags,
      rating: this.state.rating
    };
    if (this.state.selectedTags.length === 0) {
      CustomAlert('장르를 선택해주세요!')
    } else {
      this.props.actions.selectReviewFilter(selectedFilter)
    }
  };

  onClickFilterReset = () => {
    this.setState({
      order: 'created',
      gender: 'all',
      age: 'all',
      selectedTags: ['all'],
      rating: 'all'
    });
  };

  onClickPreferredTags = () => {
    this.setState({
      selectedTags: this.props.user.info.preferredTags
    })
  };

  async fetchTag() {
    return await this.props.onFetchTag();
  }

  renderTags = () => {
    const renderTags = this.props.reviews.filters.tags.map(each => {
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
    });
    return renderTags
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
            <Text style={styles.filterTitle}>정렬</Text>
          </View>
          <View style={styles.filterContainer}>
            <FilterItem
              nowState={this.state.order}
              targetState="created"
              onClickTargetItem={this.onClickOrder}
            >
              시간순
            </FilterItem>
            <FilterItem
              nowState={this.state.order}
              targetState="like"
              onClickTargetItem={this.onClickOrder}
            >
              좋아요순
            </FilterItem>
          </View>

          <View style={styles.filterTitleContainer}>
            <View style={styles.tagInfoContainer}>
              <Text style={styles.filterTitle}>장르&nbsp;&nbsp;
                <Text style={styles.selectedLengthText}>
                  {this.state.selectedTags.includes('all') ? '전체' : this.state.selectedTags.length + '개'}
                  선택
                </Text>
              </Text>
            </View>
            <View style={styles.preferredTagsContainer}>
              <TouchableOpacity onPress={this.onClickPreferredTags}>
                <Text style={styles.preferredTagsText}>
                  내취향 적용
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.tagContainer}>
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
            </View>
            {this.renderTags()}
          </View>

          <View style={styles.filterTitleContainer}>
            <Text style={styles.filterTitle}>평점</Text>
          </View>
          <View style={styles.filterContainer}>
            <FilterItem
              nowState={this.state.rating}
              targetState="all"
              onClickTargetItem={this.onClickRating}
            >
              전체
            </FilterItem>
            <FilterItem
              nowState={this.state.rating}
              targetState="5"
              onClickTargetItem={this.onClickRating}
            >
              5점
            </FilterItem>
            <FilterItem
              nowState={this.state.rating}
              targetState="4"
              onClickTargetItem={this.onClickRating}
            >
              4점 이상
            </FilterItem>
            <FilterItem
              nowState={this.state.rating}
              targetState="3"
              onClickTargetItem={this.onClickRating}
            >
              3점 이상
            </FilterItem>
            <FilterItem
              nowState={this.state.rating}
              targetState="2"
              onClickTargetItem={this.onClickRating}
            >
              2점 이상
            </FilterItem>
          </View>

          <View style={styles.filterTitleContainer}>
            <Text style={styles.filterTitle}>작성자 정보</Text>
          </View>
          <View style={styles.filterContainer}>
            <FilterItem
              nowState={this.state.gender}
              targetState="all"
              onClickTargetItem={this.onClickGender}
            >
              전체
            </FilterItem>
            <FilterItem
              nowState={this.state.gender}
              targetState="woman"
              onClickTargetItem={this.onClickGender}
            >
              여자
            </FilterItem>
            <FilterItem
              nowState={this.state.gender}
              targetState="man"
              onClickTargetItem={this.onClickGender}
            >
              남자
            </FilterItem>
          </View>

          <View style={styles.filterContainer}>
            <FilterItem
              nowState={this.state.age}
              targetState="all"
              onClickTargetItem={this.onClickAge}
            >
              전체
            </FilterItem>
            <FilterItem
              nowState={this.state.age}
              targetState="10"
              onClickTargetItem={this.onClickAge}
            >
              10대
            </FilterItem>
            <FilterItem
              nowState={this.state.age}
              targetState="20"
              onClickTargetItem={this.onClickAge}
            >
              20대
            </FilterItem>
            <FilterItem
              nowState={this.state.age}
              targetState="30"
              onClickTargetItem={this.onClickAge}
            >
              30대
            </FilterItem>
            <FilterItem
              nowState={this.state.age}
              targetState="40"
              onClickTargetItem={this.onClickAge}
            >
              40대이상
            </FilterItem>
          </View>
        </ScrollView>
        <SuccessButton onPress={this.onClickSelectedFilter}>필터 적용</SuccessButton>
      </View>
    );
  }
}

ReviewFilter.propTypes = {
  actions: PropTypes.object.isRequired,
  onFetchTag: PropTypes.func.isRequired,
  reviews: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    reviews: state.reviews,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(reviewsActions, dispatch),
    onFetchTag: () => {
      dispatch(fetchTag())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewFilter);
