import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import PropTypes from 'prop-types';

import Text from '../CustomText';
import { SCREEN_HEIGHT } from '../../utils/dimensions';

const SmallAdvertisement = ({ style }) => (
  <Surface style={{ ...styles.container, style }}>
    <Text type="bold" style={styles.title}>
      344 X 71
    </Text>
    <Text type="bold" style={styles.title}>
      Advertisement Here
    </Text>
  </Surface>
);

SmallAdvertisement.propTypes = {
  style: PropTypes.object
};

SmallAdvertisement.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.1,
    backgroundColor: '#fff',
    elevation: 2,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#5A7582',
    fontSize: 20
  }
});

export default SmallAdvertisement;
