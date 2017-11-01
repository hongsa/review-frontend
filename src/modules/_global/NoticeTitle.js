import React, {PropTypes} from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles/NoticeTitle';

const NoticeTitle = ({title, created}) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.dateText}>{created}</Text>
    </View>
  )
};

NoticeTitle.propTypes = {
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
};
export default NoticeTitle