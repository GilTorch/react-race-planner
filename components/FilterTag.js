import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Text from './CustomText';

const FilterTag = ({ label, selected, onSelect }) => {
  const backgroundStyle = selected
    ? { backgroundColor: '#03A2A2' }
    : { backgroundColor: '#C8CCCD' };

  const textStyle = selected ? { color: '#fff' } : { color: '#5A7582' };

  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={{ ...tagStyle.container, ...backgroundStyle }}>
        <Text type="bold" style={{ ...tagStyle.text, ...textStyle }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

FilterTag.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

const tagStyle = StyleSheet.create({
  container: {
    marginRight: 10,
    marginBottom: 15,
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#03A2A2',
    // height: 33,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 14
  }
});

export default FilterTag;
