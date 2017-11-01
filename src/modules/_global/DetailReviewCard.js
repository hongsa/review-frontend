import React, {PropTypes} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import StarRating from 'react-native-star-rating';
import styles from './styles/DetailReviewCard';
import Badge from './Badge'
import Like from './Like'
import Nickname from './Nickname'

const DetailReviewCard = ({rating, coreOneLine, likeCount, nickname, gender, age, selectedBadge, onClickLike, onClickUserPage}) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <TouchableOpacity onPress={onClickUserPage}>
          <Badge selectedBadge={selectedBadge} />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Nickname
            age={age}
            gender={gender}
            nickname={nickname}
          />
          <View style={styles.starContainer}>
            <StarRating
              disabled
              emptyStar={'star-o'}
              fullStar={'star'}
              halfStar={'star-half-full'}
              maxStars={5}
              rating={rating}
              starColor={'orange'}
              emptyStarColor={'orange'}
              starSize={15}
              buttonStyle={{padding: 1}}
              acceptHalfStars
            />
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.coreText}>
          {coreOneLine}
        </Text>
        <View style={styles.likeContainer}>
          <Like
            age={age}
            gender={gender}
            nickname={nickname}
            likeCount={likeCount}
            onClickLike={onClickLike}
          />
        </View>
      </View>
    </View>
  )
};

DetailReviewCard.propTypes = {
  rating: PropTypes.number.isRequired,
  coreOneLine: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  selectedBadge: PropTypes.string.isRequired,
  onClickLike: PropTypes.func.isRequired,
  onClickUserPage: PropTypes.func.isRequired
};

export default DetailReviewCard;
