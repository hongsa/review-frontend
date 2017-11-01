import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    margin: 5
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginTop: 5,
  },
  imageContainer: {
    flex: 2,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  infoText: {
    fontSize: 12,
    padding: 1
  },
  updateDayContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  updateDayText: {
    fontSize: 12,
    padding: 1,
    color: 'black',
    fontWeight: 'bold'
  },
  thumbnailImage: {
    width: 100,
    height: 81
  },
  rankingText: {
    padding: 5,
    fontSize: 10,
    textAlign: 'center',
    height: 25,
    width: 25,
    backgroundColor: '#f93854',
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0

  }
});

export default styles;
