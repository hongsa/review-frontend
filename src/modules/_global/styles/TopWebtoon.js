import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  thumbnailImage: {
    width: 90,
    height: 73,
  },
  reviewCardTitle: {
    color: '#f93854',
    fontSize: 12,
    fontWeight: 'bold'
  },
  reviewCardBar: {
    color: '#b0b0b0'
  },
  reviewCardAuthor: {
    color: 'black',
    fontSize: 11
    // fontWeight: 'bold'
  }
});

export default styles;
