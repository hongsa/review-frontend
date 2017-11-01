import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginBottom: 5,
    margin: 5
  },
  upperContainer: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
  },
  imageContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoText: {
    fontSize: 12,
    padding: 1
  },
  description: {
    flexDirection: 'row',
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
  btnText: {
    margin: 5,
    color: 'black',
    fontSize: 13
  },
  rankingText: {
    padding: 10,
    color: '#f93854',
    fontWeight: 'bold'
  }
});

export default styles;
