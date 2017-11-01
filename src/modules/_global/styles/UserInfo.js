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
    padding: 5,
    marginTop: 5,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  infoContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 12,
    padding: 1
  },
  thumbnailImage: {
    width: 60,
    height: 60
  },
  bottomContainer: {
    flexDirection: 'column',
  },
  description: {
    flexDirection: 'row',
    // fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 25,
    padding: 10
  },
  btnGroup: {
    margin: 5,
    padding: 5,
    alignItems: 'center',
  },
  numberCount: {
    color: 'black'
  },
  btnText: {
    margin: 5,
    color: 'black',
    fontSize: 13
  },
  changePreferredTagsText: {
    padding: 5,
    fontSize: 12,
    color: '#fe4b60',
    textAlign: 'right',
  }
});

export default styles;
