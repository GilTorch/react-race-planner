import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import Text from './CustomText';

const FilterBadges = ({ labels, style }) => {
  const badges = labels.map(label => (
    <View
      key={Math.random()}
      style={{
        backgroundColor: '#03A2A2',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 2,
        marginRight: 5
      }}>
      <Text
        type="bold"
        style={{
          fontSize: 11,
          color: '#FFF',
          marginRight: 5,
          paddingVertical: 3
        }}>
        {label}
      </Text>
      <TouchableOpacity>
        <Text type="bold" style={{ fontSize: 12, color: '#FFF', paddingVertical: 3 }}>
          x
        </Text>
      </TouchableOpacity>
    </View>
  ));
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 5,
        ...style,
        flexWrap: 'wrap'
      }}>
      {badges}
    </View>
  );
};
FilterBadges.propTypes = {
  labels: PropTypes.array.isRequired,
  style: PropTypes.object
};

FilterBadges.defaultProps = {
  style: {}
};

export default FilterBadges;
