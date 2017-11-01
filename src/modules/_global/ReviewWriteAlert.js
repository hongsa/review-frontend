import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux'

const ReviewWirtesAlert = (webtoonId) => {
  return (
    Alert.alert(
      '',
      '리뷰 1개만 작성하시면 편하게 보실 수 있습니다. 부탁드려요!',
      [
        {text: '다음에 하기', onPress: () => Actions.reviewsDetail({webtoonId: webtoonId})},
        {text: '작성하기', onPress: () => Actions.writes()}
      ],
      {cancelable: true}
    )
  )
};

export default ReviewWirtesAlert