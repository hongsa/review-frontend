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
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  infoText: {
    fontSize: 12,
    padding: 1
  },
  thumbnailImage: {
    width: 125,
    height: 101
  },
  bottomContainer: {
    flexDirection: 'column',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  description: {
    flexDirection: 'row',
    // fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 25,
    padding: 10,
    color: 'black'
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  btnGroup: {
    flexDirection: 'column',
    flex: 1,
    margin: 5,
    padding: 5,
    // justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#fe4b60'
  },
  btnText: {
    margin: 5,
    color: 'black',
    fontSize: 13
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
});

export default styles;
