import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const StoryGenre = ({ name, genres }) => {
  const currentGenre = genres.filter(genre => genre.name === name)[0];
  return (
    <View style={storyGenreStyle.container}>
      <View style={{ ...storyGenreStyle.iconContainer, backgroundColor: currentGenre.color }}>
        {currentGenre.icon(12)}
      </View>
      <Text style={{ color: '#5A7582', fontSize: 12 }}>{currentGenre.name}</Text>
    </View>
  );
};

export default StoryGenre;

StoryGenre.propTypes = {
  name: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired
};

const storyGenreStyle = {
  container: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: {
    width: 22,
    height: 22,
    borderRadius: 40,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
