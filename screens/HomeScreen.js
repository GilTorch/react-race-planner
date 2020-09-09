import React, { useState } from 'react';
import { SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
import { Surface, Button } from 'react-native-paper';
import { ScrollView, View, StyleSheet, StatusBar, SafeAreaView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import Menu from 'react-native-material-menu';
import debounce from 'debounce-async';
import { connect, useSelector } from 'react-redux';
import Toast from 'react-native-root-toast';

import Text from '../components/CustomText';
import { genresData } from '../utils/data';
import ViewAllGenresModal from '../components/modals/ViewAllGenresModal';
import Story from '../components/stories/Story';
import { getStoriesAction } from '../redux/actions/getStoriesAction';
import SearchAndFilter from '../components/stories/SearchAndFilter';

const HomeScreen = ({ navigation, getStories }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(genresData[0]);
  const updatingStories = useSelector((state) => state.home.updating);
  const filters = useSelector((state) => state.home.filters);
  const stories = useSelector((state) => state.home.stories);
  const status = filters.status.tags.filter((tag) => tag.selected).map((tag) => tag.slug);
  const genres = filters.genres.tags.filter((tag) => tag.selected).map((tag) => tag.slug);

  let menu = null;
  const setMenuRef = (ref) => {
    menu = ref;
  };

  const showMenu = async (genreIndex) => {
    setCurrentGenre(genresData[genreIndex]);
    menu.show();
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(false);
      StatusBar.setBarStyle('dark-content');

      navigation.setOptions({
        headerShown: false,
      });
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchStories = async () => {
        try {
          await getStories({
            status,
            genres,
            authorsRange: filters.authorsRange,
            screen: 'home',
          });
        } catch (e) {
          Toast.show(e?.message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        }
      };

      fetchStories();
    }, [filters]),
  );

  const getInProgressStories = async (sq, leading) => {
    const debounced = debounce(
      async () => {
        try {
          await getStories({
            sq,
            status,
            genres,
            authorsRange: filters.authorsRange,
            screen: 'home',
          });
        } catch (e) {
          Toast.show(e?.message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        }
      },
      2000,
      { leading },
    );

    await debounced();
  };

  return (
    <View style={styles.container}>
      <ViewAllGenresModal dismiss={() => setModalVisible(false)} visible={modalVisible} />

      <Surface style={{ paddingBottom: 20, elevation: 2, zIndex: 10, backgroundColor: '#fff' }}>
        <SafeAreaView
          style={{
            marginBottom: 10,
            marginLeft: 23,
            flexDirection: 'row',
            alignItems: 'center',
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
          {genresData.map((genre, index) => (
            <TouchableOpacity onPress={() => showMenu(index)} key={index.toString()}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 24,
                }}>
                <View
                  style={{
                    ...styles.genreIconContainer,
                    backgroundColor: genre.color,
                  }}>
                  {genre.icon(62)}
                </View>
                <Text
                  type="earth-orbiter"
                  style={{
                    color: '#5A7582',
                    fontSize: 14,
                    marginTop: 10,
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
              marginBottom: 10,
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
              marginBottom: 20,
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
        <SearchAndFilter
          previousScreen="home"
          navigation={navigation}
          onSearch={getInProgressStories}
        />

        {!stories && (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                type="bold"
                style={{ fontSize: 24, color: '#999', textAlign: 'center', paddingHorizontal: 10 }}>
                There are no stories with those filters yet
              </Text>
              {/*  We disable this button for now */}
              {/* <Surface style={{ marginRight: 10, ...styles.btnSurface }}>
                <Button
                  icon={({ size }) => <FontAwesome5 size={size} color="#fff" name="pen-fancy" />}
                  uppercase={false}
                  onPress={() => ''}
                  style={{ backgroundColor: '#03A2A2' }}>
                  <Text type="bold" style={{ color: '#FFF' }}>
                    Create one using those filters
                  </Text>
                </Button>
              </Surface> */}
            </View>
          </>
        )}

        {stories && (
          <>
            {/* TODO: Display the filter badges correctly */}
            {/* <View style={{ marginBottom: 20 }}>
              <FilterBadges labels={['In Progress']} />
              <FilterBadges labels={['Mystery', 'Action', 'Romance']} />
              <FilterBadges labels={['Authors: 3 - 100']} />
            </View> */}

            <View testID="story">
              {stories?.map((story, index) => (
                <View key={Math.random()}>
                  <Story
                    updating={updatingStories}
                    story={story}
                    index={index}
                    length={stories.length}
                    navigation={navigation}
                    reducerName="home"
                  />
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight * 1.2 : 0,
  },
  btnSurface: {
    elevation: 4,
    marginVertical: 10,
    borderRadius: 5,
  },
  headline: { color: '#5A7582' },
  genreIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});

HomeScreen.propTypes = {
  getStories: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getStories: getStoriesAction,
};

export default connect(null, mapDispatchToProps)(HomeScreen);
