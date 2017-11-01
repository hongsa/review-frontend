import React, {PropTypes} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './styles/FilterItem';

const FilterItem = ({children, nowState, targetState, onClickTargetItem}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={nowState === targetState ? styles.selectedBox : styles.selectBox}
        onPress={() => onClickTargetItem(targetState)}
      >
        <Text style={nowState === targetState ? styles.selectedText : styles.selectText}>{children}</Text>
      </TouchableOpacity>
    </View>
  )
};

FilterItem.propTypes = {
  children: PropTypes.string.isRequired,
  nowState: PropTypes.string.isRequired,
  targetState: PropTypes.string.isRequired,
  onClickTargetItem: PropTypes.func.isRequired
};

export default FilterItem