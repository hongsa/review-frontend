import React, {PropTypes} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles/GrayButton';

const GrayButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.successBtn}
      onPress={onPress}
    >
      <Text style={styles.successBtnText}>{children}</Text>
    </TouchableOpacity>
  )
};

GrayButton.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default GrayButton

