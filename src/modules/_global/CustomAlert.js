import {Alert} from 'react-native';

const CustomAlert = (title) => {
  return Alert.alert(
    '',
    title,
    [
      {text: '닫기'},
    ],
    {cancelable: true}
  );
};
export default CustomAlert