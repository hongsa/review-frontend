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
    padding: 10,
    marginTop: 5,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 5
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 3
  },
  bottomContainer: {
    flexDirection: 'column',
  },
  coreText: {
    flexDirection: 'row',
    // textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 25,
    marginBottom: 5,
    padding: 13,
    color: 'black'
  },
  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

export default styles;
