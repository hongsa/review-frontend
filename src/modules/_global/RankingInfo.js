import React, {PropTypes} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles/RankingInfo';
import Badge from './Badge'

const RankingInfo = ({selectedBadge, nickname, gender, age, ranking, onClickUserPage}) => {
  if (ranking === -1) {
    ranking = '-'
  }
  let genderColor = '';
  if (gender === '남성') {
    gender = 'gender-male';
    genderColor = 'blue'
  } else {
    gender = 'gender-female';
    genderColor = 'red'
  }
  const nowYear = new Date().getFullYear();
  return (
    <TouchableOpacity onPress={onClickUserPage}>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={styles.imageContainer}>
            <Text style={styles.rankingText}>{ranking}위</Text>
            <Badge selectedBadge={selectedBadge} />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.description}>{nickname}&nbsp;
              ({nowYear - age + 1}세&nbsp;/&nbsp;
              <Icon
                style={{color: genderColor}}
                name={gender}
                size={15}
              />)
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
};

RankingInfo.propTypes = {
  selectedBadge: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  ranking: PropTypes.number.isRequired,
  onClickUserPage: PropTypes.func.isRequired
};

export default RankingInfo;
