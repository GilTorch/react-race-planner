import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Text from './CustomText';

const FilterHeaderRight = ({ onReset }) => (
  <TouchableOpacity onPress={() => onReset()} style={{ marginRight: 20 }}>
    <Text style={{ color: '#03A2A2', fontSize: 18 }}>Reset</Text>
  </TouchableOpacity>
);

export default FilterHeaderRight;

FilterHeaderRight.propTypes = {
  onReset: PropTypes.func.isRequired
};
