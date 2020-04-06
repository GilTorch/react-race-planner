import React from 'react';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';
import Text from './CustomText';

const StorySingleMeta = ({ label, value }) => (
  <View style={{ alignSelf: 'flex-start', marginLeft: 15 }}>
    <Paragraph>
      <Text type="bold" style={{ color: 'white' }}>
        {label}:{'  '}
      </Text>
      <Text type="regular" style={{ color: 'white' }}>
        {value}
      </Text>
    </Paragraph>
  </View>
);
StorySingleMeta.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default StorySingleMeta;
