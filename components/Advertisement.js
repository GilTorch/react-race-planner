import React from 'react';
import { Text, Dimensions } from 'react-native';
import { Surface } from 'react-native-paper';
import PropTypes from 'prop-types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Advertisement = ({ containerStyle, titleStyle }) => (
  <Surface style={containerStyle}>
    <Text type="bold" style={titleStyle}>
      344 X 71
    </Text>
    <Text type="bold" style={titleStyle}>
      Advertisement Here
    </Text>
  </Surface>
);

const styles = {
  advertisement: {
    height: SCREEN_HEIGHT * 0.4,
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  advertisementTitle: {
    color: '#5A7582',
    fontSize: 25
  }
};

Advertisement.propTypes = {
  containerStyle: PropTypes.object,
  titleStyle: PropTypes.object
};

Advertisement.defaultProps = {
  containerStyle: styles.advertisement,
  titleStyle: styles.advertisementTitle
};

export default Advertisement;
