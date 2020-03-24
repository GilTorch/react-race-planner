import React from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';
// import PropTypes from 'prop-types';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Text from '../components/CustomText';
import MysteryIcon from '../components/svg/icons/MysteryIcon';

const genres = [
  {
    name: 'Mystery',
    icon: <MysteryIcon width={28} height={28} />,
    color: '#43A047'
  },
  {
    name: 'Action',
    icon: <MaterialCommunityIcons size={32} color="white" name="run" />,
    color: '#13BCBC'
  },
  {
    name: 'Thriller',
    icon: <MaterialCommunityIcons size={32} color="white" name="skull" />,
    color: '#29B6F6'
  },
  {
    name: 'Sci-Fi',
    icon: <MaterialCommunityIcons size={32} color="white" name="alien" />,
    color: '#5E35B1'
  },
  { name: 'Romance', icon: <AntDesign size={32} color="white" name="heart" />, color: '#FCF42A' },
  { name: 'Essay', icon: <AntDesign size={32} color="white" name="book" />, color: '#ED8A18' },
  {
    name: 'Bedtime Stories',
    icon: <Ionicons size={32} color="white" name="ios-bed" />,
    color: '#faf'
  }
];

const Genre = ({ genre }) => (
  <View style={genreStyle.container}>
    <View style={{ ...genreStyle.iconContainer, backgroundColor: genre.color }}>{genre.icon}</View>
    <Text type="medium" style={genreStyle.iconLabel}>
      {genre.name}
    </Text>
  </View>
);

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

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
        <Text>Hello</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 15 }}>
          {genres.map(genre => (
            <Genre genre={genre} />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({

// });

export default HomeScreen;
