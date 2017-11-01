import React, {PropTypes} from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import styles from './styles/SearchResultWebtoon';
import WebtoonTitle from './WebtoonTitle'
import * as api from '../../constants/api';
import UpdateDayFilter from './UpdateDayFilter';
import PlatformFilter from './PlatformFilter';

const SearchResultWebtoon = ({title, author, tags, thumbnail, platform, updateDay}) => {

  let updateDayKor = UpdateDayFilter(updateDay);
  let platformKor = PlatformFilter(platform);
  let webtoonImgUrl = (`${api.IMG_URL}/${platform}/${thumbnail}`);

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
        </View>
        <View style={styles.updateDayContainer}>
          <Text style={styles.updateDayText}>{updateDayKor}</Text>
        </View>
      </View>
    </View>
  )
};

SearchResultWebtoon.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  updateDay: PropTypes.number.isRequired,
};

export default SearchResultWebtoon;
