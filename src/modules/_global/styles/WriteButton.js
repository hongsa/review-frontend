import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  writeBtn: {
    backgroundColor: '#f93854',
    borderColor: '#f93854',
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
  }
});

export default styles;
