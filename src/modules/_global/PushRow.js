import React, {PropTypes} from 'react';
import {
  View,
  Text,
  Switch
} from 'react-native';
import styles from './styles/PushRow';

const PushRow = ({children, handleSwitch, pushValue}) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{children}</Text>
      </View>
      <View style={styles.switchContainer}>
        <Switch
          style={styles.switch}
          onValueChange={handleSwitch}
          value={pushValue}
        />
      </View>
    </View>
  )
};

PushRow.propTypes = {
  children: PropTypes.string.isRequired,
  handleSwitch: PropTypes.func.isRequired,
  pushValue: PropTypes.bool.isRequired
};

export default PushRow