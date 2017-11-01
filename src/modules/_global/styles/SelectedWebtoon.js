import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    margin: 5
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    marginTop: 5,
  },
  leftContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
  },
  infoContainer: {
    flexDirection: 'column',
    padding: 5,
    marginLeft: 5
  },
  rightContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 5,
  },
  thumbnailImage: {
    width: 70,
    height: 57
  },
  reviewCardTitle: {
    color: '#f93854',
    fontWeight: 'bold'
  },
  reviewCardAuthor: {
    color: 'black',
    fontWeight: 'bold'
  }
});

export default styles;
