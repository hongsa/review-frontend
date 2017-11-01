import React, {PropTypes} from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import styles from './styles/WebtoonRankingResult';
import WebtoonTitle from './WebtoonTitle'
import * as api from '../../constants/api';
import UpdateDayFilter from './UpdateDayFilter';

const WebtoonRankingResult = ({title, author, tags, thumbnail, platform, updateDay, ranking}) => {

  let updateDayKor = UpdateDayFilter(updateDay);
  let webtoonImgUrl = (`${api.IMG_URL}/${platform}/${thumbnail}`);

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.thumbnailImage}
            source={{uri: webtoonImgUrl}}
          >
            <Text style={styles.rankingText}>{ranking}</Text>
          </Image>
        </View>
        <View style={styles.infoContainer}>
          <WebtoonTitle
            title={title}
            author={author}
          />
          <Text style={styles.infoText}>{tags}</Text>
        </View>
        <View style={styles.updateDayContainer}>
          <Text style={styles.updateDayText}>{updateDayKor}</Text>
        </View>
      </View>
    </View>
  )
};

WebtoonRankingResult.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  updateDay: PropTypes.number.isRequired,
  ranking: PropTypes.number.isRequired
};

export default WebtoonRankingResult;
