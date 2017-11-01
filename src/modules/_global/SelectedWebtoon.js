import React, {PropTypes} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './styles/SelectedWebtoon';
import * as api from '../../constants/api';

const SelectedWebtoon = ({title, author, thumbnail, platform, onClickSearchWebtoon}) => {
  let webtoonImgUrl = (`${api.IMG_URL}/${platform}/${thumbnail}`);

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.leftContainer}>
          <Image
            style={styles.thumbnailImage}
            source={{uri: webtoonImgUrl}}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.reviewCardTitle}>{title}</Text>
            <Text style={styles.reviewCardAuthor}>{author}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onClickSearchWebtoon}>
          <View style={styles.rightContainer}>
            <Text style={styles.reviewCardAuthor}>변경</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
};

SelectedWebtoon.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  onClickSearchWebtoon: PropTypes.func.isRequired,
};

export default SelectedWebtoon;
