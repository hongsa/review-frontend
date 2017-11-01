import React, {PropTypes} from 'react';
import {
  TouchableOpacity,
  Text
} from 'react-native';
import styles from './styles/WriteButton';


const WriteButton = ({onClickWritePage}) => {
  return (
    <TouchableOpacity
      style={styles.writeBtn}
      onPress={onClickWritePage}
    >
      <Text style={{fontSize: 30, color: 'white'}}>+</Text>
    </TouchableOpacity>
  )
};

WriteButton.propTypes = {
  onClickWritePage: PropTypes.func.isRequired,
};

export default WriteButton;
