import React from 'react';
import { Animated } from 'react-native';
import { Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';
import Text from './CustomText';

const StorySingleMeta = ({ label, value, containerStyle }) => (
  <Animated.View style={{ alignSelf: 'flex-start', marginLeft: 15, ...containerStyle }}>
    <Paragraph>
      <Text type="bold" style={{ color: 'white' }}>
        {label}:{'  '}
      </Text>
      <Text type="regular" style={{ color: 'white' }}>
        {value}
      </Text>
    </Paragraph>
  </Animated.View>
);

export default StorySingleMeta;

StorySingleMeta.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  containerStyle: PropTypes.object
};

StorySingleMeta.defaultProps = {
  containerStyle: {}
};
