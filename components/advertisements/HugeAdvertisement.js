import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import PropTypes from 'prop-types';

import Text from '../CustomText';
import { SCREEN_HEIGHT } from '../../utils/dimensions';

const HugeAdvertisement = ({ style }) => (
  <Surface style={{ ...styles.container, style }}>
    <Text type="bold" style={styles.title}>
      344 X 344
    </Text>
    <Text type="bold" style={styles.title}>
      Advertisement Here
    </Text>
  </Surface>
);

HugeAdvertisement.propTypes = {
  style: PropTypes.object
};

HugeAdvertisement.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.4,
    backgroundColor: '#fff',
    elevation: 2,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  title: {
    color: '#5A7582',
    fontSize: 25
  }
});

export default HugeAdvertisement;
