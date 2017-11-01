import React, {PropTypes} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles/UserInfo';
import BadgeBig from './BadgeBig'

const UserInfo = ({
                    selectedBadge, nickname, gender, age, ranking, reviewCount, receiveLikeCount,
                    onClickSelectBadgePage, onClickChangePreferredPage, myPage
                  }) => {
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
  const changePreferredTags = () => {
    if (myPage) {
      return (
        <TouchableOpacity onPress={onClickChangePreferredPage}>
          <Text style={styles.changePreferredTagsText}>선호장르 변경</Text>
        </TouchableOpacity>
      )
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={onClickSelectBadgePage}>
            <BadgeBig selectedBadge={selectedBadge} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View
            style={styles.btnGroup}
          >
            <Text style={styles.numberCount}>{ranking}</Text>
            <Text style={styles.btnText}>랭킹</Text>
          </View>
          <View
            style={styles.btnGroup}
          >
            <Text style={styles.numberCount}>{reviewCount}</Text>
            <Text style={styles.btnText}>작성리뷰</Text>
          </View>
          <View
            style={styles.btnGroup}
          >
            <Text style={styles.numberCount}>{receiveLikeCount}</Text>
            <Text style={styles.btnText}>받은좋아요</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.description}>{nickname}&nbsp;
          ({nowYear - age + 1}세&nbsp;/&nbsp;
          <Icon
            style={{color: genderColor}}
            name={gender}
            size={15}
          />)
        </Text>
        {changePreferredTags()}
      </View>
    </View>
  )
};

UserInfo.defaultProps = {
  myPage: false
};

UserInfo.propTypes = {
  selectedBadge: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  ranking: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  receiveLikeCount: PropTypes.number.isRequired,
  onClickSelectBadgePage: PropTypes.func.isRequired,
  onClickChangePreferredPage: PropTypes.func.isRequired,
  myPage: PropTypes.bool.isRequired,
};

export default UserInfo;
