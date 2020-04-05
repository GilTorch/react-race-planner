import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const CategoryGenre = ({ genre }) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 5
      }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: genre.color,
            width: 47,
            height: 47,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {genre.icon(25)}
        </View>
      </View>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Text type="bold" style={{ color: '#03A2A2', fontSize: 15 }}>
          {genre.name}
        </Text>
      </View>
    </View>
  );
};

export default CategoryGenre;

CategoryGenre.propTypes = {
  genre: PropTypes.object.isRequired
};
