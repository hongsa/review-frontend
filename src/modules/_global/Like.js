import React, {PropTypes} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import styles from './styles/Like';

const Like = ({likeCount, onClickLike}) => {
  return (
    <TouchableOpacity onPress={onClickLike}>
      <View style={styles.container}>
        <Icon
          style={{color: 'black'}}
          name={'like'}
          size={15}
        />
        <Text style={styles.likeText}>{likeCount}</Text>
      </View>
    </TouchableOpacity>
  )
};

Like.propTypes = {
  likeCount: PropTypes.number.isRequired,
  onClickLike: PropTypes.func.isRequired,
};

export default Like