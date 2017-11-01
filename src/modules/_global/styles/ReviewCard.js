import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginBottom: 10,
    margin: 5
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginTop: 5,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',

  },
  infoContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  tags: {
    fontSize: 12,
    padding: 1
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  thumbnailImage: {
    width: 100,
    height: 81
  },
  bottomContainer: {
    flexDirection: 'column',
    // padding: 10,
  },
  coreText: {
    flexDirection: 'row',
    // textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 25,
    marginBottom: 3,
    padding: 13,
    color: 'black'
  },
  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

export default styles;
