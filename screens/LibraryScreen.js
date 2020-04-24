import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Surface, Searchbar } from 'react-native-paper';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../components/CustomText';
import { stories, genres } from '../utils/data';
import Story from '../components/stories/Story';

const LibraryScreen = ({ navigation }) => {
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  navigation.setOptions({
    headerShown: false
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  const completedStories = stories.filter(story => story.status === 'Completed');

  return (
    <View style={styles.container}>
      <Surface
        style={{
          elevation: 3,
          zIndex: 1
        }}>
        <LinearGradient
          colors={['#03a2a2', '#23c2c2']}
          locations={[0.2, 1]}
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            paddingBottom: Constants.statusBarHeight,
            paddingTop: Constants.statusBarHeight * 2
          }}>
          <Text type="bold" style={{ color: 'white', fontSize: 18 }}>
            Library
          </Text>
        </LinearGradient>
      </Surface>

      <ScrollView>
        <Surface style={{ paddingBottom: 20, elevation: 2 }}>
          <View
            style={{
              marginTop: 20,
              marginBottom: 10,
              flexDirection: 'row',
              paddingLeft: 23,
              alignItems: 'center'
            }}>
            <SimpleLineIcons color="#ED8A18" name="layers" size={25} />
            <TouchableOpacity style={{ marginLeft: 15 }}>
              <Text style={{ ...styles.headline, fontSize: 16 }} type="medium">
                Start a New Story
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 23 }}>
            {genres.map(genre => (
              <View
                key={Math.random()}
                style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                <View style={{ ...styles.genreIconContainer, backgroundColor: genre.color }}>
                  {genre.icon(32)}
                </View>
                <Text
                  type="medium"
                  style={{
                    color: '#5A7582',
                    fontSize: 14
                  }}>
                  {genre.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </Surface>

        {searchBarVisible && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 15
            }}>
            <View style={{ flex: 8 }}>
              <Searchbar style={{ height: 40, paddingTop: 3, elevation: 2 }} iconColor="#03A2A2" />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <TouchableOpacity onPress={() => setSearchBarVisible(false)}>
                <AntDesign size={20} name="closecircleo" color="#03A2A2" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!searchBarVisible && (
          <View
            style={{
              marginLeft: 20,
              marginRight: 15,
              marginTop: 20,
              marginBottom: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <Text type="medium" style={{ ...styles.headline, fontSize: 18 }}>
              All Stories
            </Text>
            <View
              style={{
                flexDirection: 'row'
              }}>
              <TouchableOpacity
                style={{ borderRadius: 5, padding: 5, flex: 1 }}
                onPress={() => {
                  navigation.push('FilterScreen');
                }}>
                <Surface
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 5,
                    elevation: 2,
                    padding: 5
                  }}>
                  <AntDesign color="#5A7582" size={18} name="filter" />
                  <Text type="bold" style={{ fontSize: 12, color: '#5A7582' }}>
                    FILTER
                  </Text>
                </Surface>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ borderRadius: 5, flex: 1, padding: 5 }}
                onPress={() => setSearchBarVisible(true)}>
                <Surface
                  style={{
                    borderRadius: 5,
                    elevation: 2,
                    paddingHorizontal: 9,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 5
                  }}>
                  <FontAwesome size={14} color="#5A7582" name="search" />
                </Surface>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {completedStories.map((story, index) => (
          <Story
            key={Math.random()}
            story={story}
            index={index}
            length={completedStories.length}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};

LibraryScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  },
  headline: { color: '#5A7582' },
  genreIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  }
});

export default LibraryScreen;
