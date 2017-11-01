import React, {PropTypes} from 'react';
import {Badge} from 'react-native-elements';
import styles from './styles/LevelBadge';


const LevelBadge = ({selectedBadge}) => {
  let level = selectedBadge.replace('level', '');
  return (
    <Badge
      containerStyle={styles.container}
      value={level}
      textStyle={styles.text}
    />
  )
};

LevelBadge.propTypes = {
  selectedBadge: PropTypes.string.isRequired,
};

export default LevelBadge