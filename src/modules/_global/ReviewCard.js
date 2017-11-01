import React, {PropTypes} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import StarRating from 'react-native-star-rating';
import styles from './styles/ReviewCard';
import Like from './Like'
import WebtoonTitle from './WebtoonTitle'
import Nickname from './Nickname'
import * as api from '../../constants/api';


const ReviewCard = ({
                      id, webtoonId, title, author, tags, thumbnail, rating, coreOneLine, likeCount,
                      nickname, gender, age, platform, onClickReviewDetailPage, onClickLike,
                      myPage, renderReviewSettings, readMoreBtn, onClickReadMore
                    }) => {

  const renderSettings = (reviewId, webtoonId, title, author, thumbnail) => {
    if (myPage) {
      const data = {
        id: webtoonId,
        title: title,
        author: author,
        thumbnail: thumbnail,
        platform: platform
      };
      return renderReviewSettings(data, reviewId)
    } else {
      return null
    }
  };
  let webtoonImgUrl = (`${api.IMG_URL}/${platform}/${thumbnail}`);

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={onClickReviewDetailPage}>
            <Image
              style={styles.thumbnailImage}
              source={{uri: webtoonImgUrl}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <TouchableOpacity onPress={onClickReviewDetailPage}>
            <WebtoonTitle
              title={title}
              author={author}
            />
            <Text style={styles.tags}>{tags}</Text>

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
                starSize={20}
                buttonStyle={{padding: 2}}
                acceptHalfStars
              />
            </View>
          </TouchableOpacity>
        </View>
        {renderSettings(id, webtoonId, title, author, thumbnail)}
      </View>

      <View style={styles.bottomContainer}>
        <Text
          style={styles.coreText}
          onPress={onClickReviewDetailPage}
        >
          { (readMoreBtn) ?
            (((coreOneLine).substring(0, 100))) :
            coreOneLine }
        </Text>
        {readMoreBtn ? onClickReadMore() : null}
        <View style={styles.likeContainer}>
          <Nickname
            age={age}
            gender={gender}
            nickname={nickname}
          />
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

ReviewCard.defaultProps = {
  renderReviewSettings: function () {
    // do sth
  },
  myPage: false
};

ReviewCard.propTypes = {
  id: PropTypes.number.isRequired,
  webtoonId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  coreOneLine: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  platform: PropTypes.string.isRequired,
  onClickReviewDetailPage: PropTypes.func.isRequired,
  onClickLike: PropTypes.func.isRequired,
  myPage: PropTypes.bool.isRequired,
  renderReviewSettings: PropTypes.func.isRequired,
  readMoreBtn: PropTypes.bool.isRequired,
  onClickReadMore: PropTypes.func.isRequired,
};

export default ReviewCard;
