import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    margin: 5
  },
  badgeName: {
    color: '#f93854',
    fontWeight: 'bold'
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    margin: 5
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
  },
  infoText: {
    fontSize: 13,
    padding: 1
  }
});

export default styles;
