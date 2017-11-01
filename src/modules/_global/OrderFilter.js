import React, {PropTypes} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './styles/OrderFilter';

const OrderFilter = ({onClickChangeOrder, order}) => {
  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={styles.filterBox}
        onPress={() => onClickChangeOrder('created')}
      >
        <Text
          style={{fontSize: 13, color: order === 'created' ? '#fe4b60' : '#959da5'}}
        >{'시간순'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterBox}
        onPress={() => onClickChangeOrder('like')}
      >
        <Text
          style={{fontSize: 13, color: order === 'like' ? '#fe4b60' : '#959da5'}}
        >{'좋아요순'}</Text>
      </TouchableOpacity>
    </View>
  )
};

OrderFilter.propTypes = {
  order: PropTypes.string.isRequired,
  onClickChangeOrder: PropTypes.func.isRequired,
};

export default OrderFilter;
