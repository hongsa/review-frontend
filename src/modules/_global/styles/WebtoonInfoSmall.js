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
    padding: 3,
    color: 'black',
    fontWeight: 'bold'
  },
  thumbnailImage: {
    width: 100,
    height: 81
  },
});

export default styles;
