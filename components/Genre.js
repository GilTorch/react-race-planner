import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Text from './CustomText';

const Genre = ({ genre }) => (
  <View style={genreStyle.container}>
    <View style={{ ...genreStyle.iconContainer, backgroundColor: genre.color }}>
      {genre.icon(32)}
    </View>
    <Text type="medium" style={genreStyle.iconLabel}>
      {genre.name}
    </Text>
  </View>
);

export default Genre;
Genre.propTypes = {
  genre: PropTypes.object.isRequired
};

const genreStyle = {
  container: { justifyContent: 'center', alignItems: 'center', marginRight: 20 },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  iconLabel: {
    color: '#5A7582',
    fontSize: 14
  }
};
