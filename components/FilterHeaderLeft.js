import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import NavigationService from '../utils/NavigationService';

const FilterHeaderLeft = () => (
  <TouchableOpacity onPress={() => NavigationService.navigate.goBack()} style={{ marginLeft: 20 }}>
    <AntDesign style={{ fontSize: 20 }} color="#03A2A2" name="arrowleft" />
  </TouchableOpacity>
);

export default FilterHeaderLeft;
