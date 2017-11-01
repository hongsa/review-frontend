import {
  StyleSheet,
  Platform
} from 'react-native';


const APPBAR_HEIGHT = Platform.OS === 'ios' ? 15 : 0;

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    marginTop: APPBAR_HEIGHT,
  },
  filterTitleContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    padding: 7
  },
  divideLine: {
    borderBottomColor: '#b0b0b0',
    borderBottomWidth: 0.7,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 7
  },
  itemContainer: {
    margin: 3
  },
  filterTitle: {
    fontWeight: 'bold',
    fontSize: 15
  },
  selectBox: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#b0b0b0'
  },
  selectedBox: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#fe4b60'
  },
  selectedText: {
    fontSize: 12,
    color: '#fe4b60'
  },
  selectText: {
    fontSize: 12,
    color: '#b0b0b0'
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: 8
  },
  tag: {
    fontSize: 12,
    margin: 3,
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#fe4b60'
  },
  tagInfoContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start'
  },
  preferredTagsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end'
  },
  selectedLengthText: {
    fontSize: 12,
    color: '#fe4b60'
  },
  preferredTagsText: {
    fontSize: 13,
    color: 'black',
    textAlign: 'right'
  }
});

export default styles;
