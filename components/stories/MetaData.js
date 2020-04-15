import React from 'react';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';

import Text from '../CustomText';

const MetaData = ({ label, value }) => {
  const metaData = (
    <View>
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

  return metaData;
};

MetaData.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default MetaData;
