import React, {PropTypes} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import styles from './styles/WebtoonInfo';
import WebtoonTitle from './WebtoonTitle'
import * as api from '../../constants/api';
import UpdateDayFilter from './UpdateDayFilter';
import PlatformFilter from './PlatformFilter';

const WebtoonInfo = ({
                       description, title, author, tags, detailImg, platform, avgRating,
                       alreadyBookmarkCreated, alreadyReviewCreated, countRating, updateDay,
                       onClickWritePage, onClickWebtoonWebView, onClickPostBookmark
                     }) => {

  let reviewColor = alreadyReviewCreated ? '#f93854' : '#959da5';
  let bookmarkColor = alreadyBookmarkCreated ? '#f93854' : '#959da5';
  let updateDayKor = UpdateDayFilter(updateDay);
  let platformKor = PlatformFilter(platform);
  let webtoonImgUrl = (`${api.IMG_URL}/${platform}/${detailImg}`);

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.thumbnailImage}
            source={{uri: webtoonImgUrl}}
          />
        </View>
        <View style={styles.infoContainer}>
          <WebtoonTitle
            title={title}
            author={author}
          />
          <Text style={styles.infoText}>{tags}</Text>
          <Text style={styles.infoText}>{platformKor}</Text>
          <Text style={styles.infoText}>평균 {avgRating}점 ({countRating}명)</Text>
          <View style={styles.starContainer}>
            <StarRating
              disabled
              emptyStar={'star-o'}
              fullStar={'star'}
              halfStar={'star-half-full'}
              maxStars={5}
              rating={avgRating}
              starColor={'orange'}
              emptyStarColor={'orange'}
              starSize={15}
              buttonStyle={{padding: 2}}
              acceptHalfStars
            />
          </View>
        </View>
        <View style={styles.updateDayContainer}>
          <Text style={styles.updateDayText}>{updateDayKor}</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.btnGroup}
          onPress={onClickWritePage}
        >
          <Icon name="pencil" size={15} style={{color: reviewColor}} />
          <Text style={styles.btnText}>리뷰작성</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnGroup}
          onPress={onClickWebtoonWebView}
        >
          <Icon name="external-link" size={15} color="#959da5" />
          <Text style={styles.btnText}>작품감상</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnGroup}
          onPress={onClickPostBookmark}
        >
          <Icon name="bookmark" size={15} style={{color: bookmarkColor}} />
          <Text style={styles.btnText}>즐겨찾기</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
};

WebtoonInfo.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  detailImg: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  avgRating: PropTypes.number.isRequired,
  alreadyBookmarkCreated: PropTypes.bool.isRequired,
  alreadyReviewCreated: PropTypes.bool.isRequired,
  countRating: PropTypes.number.isRequired,
  updateDay: PropTypes.number.isRequired,
  onClickWritePage: PropTypes.func.isRequired,
  onClickWebtoonWebView: PropTypes.func.isRequired,
  onClickPostBookmark: PropTypes.func.isRequired,
};

export default WebtoonInfo;
