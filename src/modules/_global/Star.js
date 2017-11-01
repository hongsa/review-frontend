import React, {PropTypes} from 'react';
import {View, Image} from 'react-native';
import styles from './styles/Star';
import star from '../../../images/star_org.png'

const Star = ({rating}) => {
  let items = [];
  for (let i = 1; i <= rating; i++) {
    items.push(<Image source={star} key={i} />);
  }
  return <View style={styles.container}>{items}</View>
};

Star.propTypes = {
  rating: PropTypes.number.isRequired,
};
export default Star