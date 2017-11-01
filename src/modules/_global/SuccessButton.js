import React, {PropTypes} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles/SuccessButton';

const SuccessButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.successBtn}
      onPress={onPress}
    >
      <Text style={styles.successBtnText}>{children}</Text>
    </TouchableOpacity>
  )
};

SuccessButton.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default SuccessButton

