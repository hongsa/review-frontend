import {
  StyleSheet,
  Platform
} from 'react-native';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 65 : 55;

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    marginTop: APPBAR_HEIGHT,
    marginBottom: 55
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: .5,
    borderColor: '#b7b7b7',
  },
  leftContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    borderRightWidth: .5,
    borderColor: '#b7b7b7',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  filterName: {
    color: 'black',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
});

export default styles;
