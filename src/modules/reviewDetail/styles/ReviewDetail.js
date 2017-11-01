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
    marginTop: APPBAR_HEIGHT
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 5,
  },
  filterBox: {
    padding: 5,
  }
});

export default styles;
