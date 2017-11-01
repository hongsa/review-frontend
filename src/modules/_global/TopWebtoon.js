import React, {PropTypes} from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import styles from './styles/TopWebtoon';
import * as api from '../../constants/api';

const TopWebtoon = ({title, author, thumbnail, platform}) => {

  let webtoonImgUrl = (`${api.IMG_URL}/${platform}/${thumbnail}`);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.thumbnailImage}
          source={{uri: webtoonImgUrl}}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.reviewCardTitle}>
          {(title.length > 9) ? title.substring(0, 9) + '..' : title}
        </Text>
        <Text style={styles.reviewCardAuthor}>
          {(author.length > 9) ? author.substring(0, 9) + '..' : author}
        </Text>
      </View>
    </View>
  )
};

TopWebtoon.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
};

export default TopWebtoon;
