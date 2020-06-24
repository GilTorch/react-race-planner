import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, StatusBar, SafeAreaView, Platform } from 'react-native';
import { AntDesign, FontAwesome, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import { Surface, Searchbar, Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import Menu from 'react-native-material-menu';

import Text from '../components/CustomText';
import { stories, genres } from '../utils/data';
import { Story } from '../components/stories';
import FilterBadges from '../components/FilterBadges';

const Writing = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(false);
      StatusBar.setBarStyle('dark-content');

      navigation.setOptions({
        headerShown: false
      });
    }, [])
  );

  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(genres[0]);

  let menu = null;
  const setMenuRef = ref => {
    menu = ref;
  };

  const showMenu = async genreIndex => {
    setCurrentGenre(genres[genreIndex]);
    menu.show();
  };

  return (
    <View style={styles.container}>
      <Surface style={{ paddingBottom: 20, elevation: 2, zIndex: 10 }}>
        <SafeAreaView
          style={{
            marginBottom: 10,
            marginLeft: 23,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <SimpleLineIcons color="#ED8A18" name="layers" size={25} />
          <Text style={{ ...styles.headline, fontSize: 16, marginLeft: 15 }} type="medium">
            Start a New Story
          </Text>
        </SafeAreaView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 23 }}>
          {genres.map((genre, index) => (
            <TouchableOpacity onPress={() => showMenu(index)} key={index.toString()}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
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
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Surface>

      <Menu style={{ width: '100%', marginLeft: 10 }} ref={setMenuRef}>
        <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10
            }}>
            <Text type="bold" style={{ color: '#5A7582', fontSize: 24 }}>
              {currentGenre.name}
            </Text>
          </View>
          <Text style={{ textAlign: 'center' }}>{currentGenre.description}</Text>
          <View
            style={{
              flexDirection: 'row',
              width: '65%',
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              marginTop: 15,
              marginBottom: 20
            }}>
            <Surface style={{ marginRight: 10, ...styles.btnSurface }}>
              <Button
                icon={({ size }) => <FontAwesome5 size={size} color="#fff" name="pen-fancy" />}
                uppercase={false}
                onPress={() => {
                  menu.hide();
                  navigation.navigate('NewStoryScreen', { genre: currentGenre.name });
                }}
                style={{ backgroundColor: '#03A2A2' }}>
                <Text type="bold" style={{ color: '#FFF' }}>
                  Go
                </Text>
              </Button>
            </Surface>
            <Surface style={styles.btnSurface}>
              <Button
                onPress={() => menu.hide()}
                uppercase={false}
                style={{ backgroundColor: '#f44336' }}>
                <Text type="bold" style={{ color: '#fff' }}>
                  Cancel
                </Text>
              </Button>
            </Surface>
          </View>
        </View>
      </Menu>

      <ScrollView>
        {searchBarVisible && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 15,
              marginTop: 15
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
          <>
            <View
              style={{
                marginLeft: 20,
                marginRight: 15,
                marginBottom: 5,
                marginTop: 15,
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
                    navigation.navigate('FilterScreen', { previousScreen: 'writing' });
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

            <View style={{ marginBottom: 20 }}>
              <FilterBadges labels={['In Progress']} />
              <FilterBadges labels={['Mystery', 'Action', 'Romance']} />
              <FilterBadges labels={['Authors: 3 - 100']} />
            </View>
          </>
        )}

        <Story story={stories[3]} index={0} length={1} navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight * 1.2 : 0
  },

  headline: { color: '#5A7582' },

  btnSurface: {
    elevation: 4,
    marginVertical: 10,
    borderRadius: 5
  },

  genreIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  }
});

Writing.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Writing;
