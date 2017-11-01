import React, {PropTypes} from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles/Nickname';

const nowYear = new Date().getFullYear();
const Nickname = ({nickname, gender, age}) => {
  let genderColor = '';
  if (gender === '남성') {
    gender = 'gender-male';
    genderColor = 'blue'
  } else {
    gender = 'gender-female';
    genderColor = 'red'
  }
  return (
    <Text style={styles.nickname}>{nickname}&nbsp;
      ({nowYear - age + 1}세&nbsp;/&nbsp;
      <Icon
        style={{color: genderColor}}
        name={gender}
        size={15}
      />)
    </Text>
  )
};

Nickname.propTypes = {
  nickname: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

export default Nickname