import React, {PropTypes} from 'react';
import {
  Image,
} from 'react-native';
import styles from './styles/Badge';
import Level0 from '../../../images/level0.png'
import Level1 from '../../../images/level1.png'
import Level2 from '../../../images/level2.png'
import Level3 from '../../../images/level3.png'
import Level4 from '../../../images/level4.png'
import Level5 from '../../../images/level5.png'


const Badge = ({selectedBadge}) => {
  let badge = '';
  if (selectedBadge === 'level1') {
    badge = Level1
  } else if (selectedBadge === 'level2') {
    badge = Level2
  } else if (selectedBadge === 'level3') {
    badge = Level3
  } else if (selectedBadge === 'level4') {
    badge = Level4
  } else if (selectedBadge === 'level5') {
    badge = Level5
  } else {
    badge = Level0
  }
  return (
    <Image
      style={styles.levelImage}
      source={badge}
    />
  )
};

Badge.propTypes = {
  selectedBadge: PropTypes.string.isRequired,
};

export default Badge;
