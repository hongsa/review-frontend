import React, {PropTypes} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './styles/SettingRow';

const SettingRow = ({children, onClickSettingEvent}) => {
  return (
    <TouchableOpacity onPress={onClickSettingEvent}>
      <View style={styles.rowContainer}>
        <Text style={styles.titleText}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
};

SettingRow.propTypes = {
  children: PropTypes.string.isRequired,
  onClickSettingEvent: PropTypes.func.isRequired,
};

export default SettingRow