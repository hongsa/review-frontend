import React, {PropTypes} from 'react';
import {
  Text
} from 'react-native';
import styles from './styles/WebtoonTitle';

const WebtoonTitle = ({title, author}) => (
  <Text>
    <Text style={styles.reviewCardTitle}>{title}</Text>
    <Text style={styles.reviewCardBar}> | </Text>
    <Text style={styles.reviewCardAuthor}>{author}</Text>
  </Text>
);

WebtoonTitle.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default WebtoonTitle;
