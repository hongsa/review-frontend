import {
  StyleSheet,
  Platform
} from 'react-native';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 65 : 55;
const TABBAR_HEIGHT = Platform.OS === 'ios' ? 110 : 105;

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    marginTop: APPBAR_HEIGHT,
    marginBottom: TABBAR_HEIGHT
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
  writeBtn: {
    backgroundColor: '#fe4b60',
    borderColor: '#fe4b60',
    borderWidth: 1,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  readMoreBtn: {
    // textAlign: 'right',
    paddingLeft: 13,
    color: '#365899'
  },
  rankingContainer: {
    flexDirection: 'column',
    padding: 5,
    marginBottom: 5
  },
  rankingUpperContainer: {
    flexDirection: 'row',
    padding: 5,
    marginBottom: 5
  },
  rankingTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rankingText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  rankingMoreContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rankingMoreText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#fe4b60',
  },
  rankingItemContainer: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'white',
    justifyContent: 'space-around'
  },
  reviewTextContainer: {
    flexDirection: 'column',
    padding: 10,
  }
});

export default styles;
