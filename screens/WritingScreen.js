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
// import axios from '../services/axiosService';
import Text from '../components/CustomText';
import { genresData } from '../utils/data';
import ViewAllGenresModal from '../components/modals/ViewAllGenresModal';
import Story from '../components/stories/Story';
import { getStoriesAction } from '../redux/actions/getStoriesAction';
import SearchAndFilter from '../components/stories/SearchAndFilter';

const WritingScreen = ({ navigation, getStories }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(genresData[0]);
  const updatingStories = useSelector(state => state.writing.updating);
  const filters = useSelector(state => state.writing.filters);
  const stories = useSelector(state => state.writing.stories);
  const status = filters.status.tags.filter(tag => tag.selected).map(tag => tag.slug);
  const genres = filters.genres.tags.filter(tag => tag.selected).map(tag => tag.slug);

  let menu = null;
  const setMenuRef = ref => {
    menu = ref;
  };

  const showMenu = async genreIndex => {
    setCurrentGenre(genresData[genreIndex]);
    menu.show();
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(false);
      StatusBar.setBarStyle('dark-content');

      navigation.setOptions({
        headerShown: false
      });
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchStories = async () => {
        try {
          await getStories({
            status,
            genres,
            authorsRange: filters.authorsRange,
            screen: 'writing'
          });
        } catch (e) {
          Toast.show(e?.message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM
          });
        }
      };

      fetchStories();
    }, [filters])
  );

  const getUserStories = async (sq, leading) => {
    const debounced = debounce(
      async () => {
        try {
          await getStories({
            sq,
            status,
            genres,
            authorsRange: filters.authorsRange,
            screen: 'writing'
          });
        } catch (e) {
          Toast.show(e?.message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM
          });
        }
      },
      2000,
      { leading }
    );

    await debounced();
  };

  return (
    <View style={styles.container}>
      <ViewAllGenresModal dismiss={() => setModalVisible(false)} visible={modalVisible} />

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
          {genresData.map((genre, index) => (
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

      {!stories && (
        <>
          <SearchAndFilter
            previousScreen="writing"
            navigation={navigation}
            onSearch={getUserStories}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text
              type="bold"
              style={{ fontSize: 24, color: '#999', textAlign: 'center', paddingHorizontal: 10 }}>
              You haven't participated in stories with those filters yet
            </Text>
            <Surface style={{ marginRight: 10, ...styles.btnSurface }}>
              <Button
                icon={({ size }) => <FontAwesome5 size={size} color="#fff" name="pen-fancy" />}
                uppercase={false}
                onPress={() => ''}
                style={{ backgroundColor: '#03A2A2' }}>
                <Text type="bold" style={{ color: '#FFF' }}>
                  Create one using those filters
                </Text>
              </Button>
            </Surface>
          </View>
        </>
      )}

      {stories && (
        <ScrollView>
          <SearchAndFilter
            previousScreen="writing"
            navigation={navigation}
            onSearch={getUserStories}
          />
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
              <Text style={{ textAlign: 'center' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop
              </Text>
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
                    onPress={() => ''}
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
                />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

WritingScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight * 1.1 : 0
  },
  btnSurface: {
    elevation: 4,
    marginVertical: 10,
    borderRadius: 5
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

WritingScreen.propTypes = {
  getStories: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  getStories: getStoriesAction
};

export default connect(null, mapDispatchToProps)(WritingScreen);
