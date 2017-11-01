import React, {PropTypes} from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import BadgeBig from './BadgeBig'
import styles from './styles/BadgeInfo';


const BadgeInfo = ({selectedBadge, title, description}) => {
  return (
    <TouchableOpacity>
      <View style={styles.upperContainer}>
        <BadgeBig selectedBadge={selectedBadge} />
        <View style={styles.infoContainer}>
          <Text style={styles.badgeName}>{title}</Text>
          <Text style={styles.infoText}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

BadgeInfo.propTypes = {
  selectedBadge: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BadgeInfo;
