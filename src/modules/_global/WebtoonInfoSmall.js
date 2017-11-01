import React, {PropTypes} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './styles/WebtoonInfoSmall';
import WebtoonTitle from './WebtoonTitle'
import * as api from '../../constants/api';
import UpdateDayFilter from './UpdateDayFilter';
import PlatformFilter from './PlatformFilter';

const WebtoonInfoSmall = ({title, author, tags, thumbnail, platform, updateDay, removeComponentRender, onClickReviewDetailPage}) => {

  let updateDayKor = UpdateDayFilter(updateDay);
  let platformKor = PlatformFilter(platform);
  let webtoonImgUrl = (`${api.IMG_URL}/${platform}/${thumbnail}`);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClickReviewDetailPage}>
        <View style={styles.upperContainer}>
          <View style={styles.imageContainer}>
            {removeComponentRender()}
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
          </View>
          <View style={styles.updateDayContainer}>
            <Text style={styles.updateDayText}>{updateDayKor}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
};

WebtoonInfoSmall.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  updateDay: PropTypes.number.isRequired,
  removeComponentRender: PropTypes.func.isRequired,
  onClickReviewDetailPage: PropTypes.func.isRequired,
};

export default WebtoonInfoSmall;
