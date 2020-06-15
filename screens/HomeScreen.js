import React, { useState, useEffect } from 'react';
import { AntDesign, FontAwesome, SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
import { Surface, Searchbar, Button, ActivityIndicator } from 'react-native-paper';
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
import { getActiveStoriesAction } from '../redux/actions/HomeActions';

const HomeScreen = ({ navigation, route, getActiveStories }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(genresData[0]);
  const loadingStories = useSelector(state => state.home.loadingStories);
  const updatingStories = useSelector(state => state.home.updating);
  const filters = useSelector(state => state.home.filters);
  const stories = useSelector(state => state.home.stories);

  useEffect(() => {
    // We get the base data for this screen
    // We set the 'leading' too true because it's a single request
    getStories('completed', null, null, true);
  }, []);

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

  const inprogressStories = stories?.filter(story => story.status === 'completed');

  const getStories = async (status, genres, sq, leading) => {
    const debounced = debounce(
      async () => {
        try {
          await getActiveStories({
            sq,
            status,
            genres,
            authorsRange: filters.authorsRange
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

  const onSearch = text => {
    const status = filters.status.tags.filter(tag => tag.selected).map(tag => tag.label);
    const genres = filters.genres.tags.filter(tag => tag.selected).map(tag => tag.label);
    getStories(status, genres, text);
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

      <ScrollView contentContainerStyle={{ flex: 1 }}>
        {!stories && (
          <View
            style={{
              flex: 1,
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text type="bold" style={{ fontSize: 24, color: '#999' }}>
              There are no stories yet
            </Text>
            <Surface style={{ marginRight: 10, ...styles.btnSurface }}>
              <Button
                icon={({ size }) => <FontAwesome5 size={size} color="#fff" name="pen-fancy" />}
                uppercase={false}
                onPress={() => ''}
                style={{ backgroundColor: '#03A2A2' }}>
                <Text type="bold" style={{ color: '#FFF' }}>
                  Create Your Own
                </Text>
              </Button>
            </Surface>
          </View>
        )}
        {stories && (
          <>
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
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
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
                      icon={({ size }) => (
                        <FontAwesome5 size={size} color="#fff" name="pen-fancy" />
                      )}
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
                  <Searchbar
                    onChangeText={onSearch}
                    style={{ height: 40, paddingTop: 3, elevation: 2 }}
                    iconColor="#03A2A2"
                  />
                </View>
                {loadingStories && (
                  <View style={{ marginLeft: 10 }}>
                    <ActivityIndicator color="#03A2A2" />
                  </View>
                )}
                {!loadingStories && (
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
                )}
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
                    testID="filter-button"
                    style={{ borderRadius: 5, padding: 5, flex: 1 }}
                    onPress={() => {
                      navigation.navigate('FilterScreen', { previousScreen: 'home' });
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

            <View testID="story">
              {stories.map((story, index) => (
                <View>
                  <Story
                    updating={updatingStories}
                    key={Math.random()}
                    story={story}
                    index={index}
                    length={stories.length}
                    navigation={navigation}
                  />
                </View>
              ))}
            </View>

            {inprogressStories.map((story, index) => (
              <Story
                route={route}
                genres={genresData}
                key={Math.random()}
                story={story}
                index={index}
                length={inprogressStories.length}
                navigation={navigation}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
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

HomeScreen.propTypes = {
  getActiveStories: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  getActiveStories: getActiveStoriesAction
};

export default connect(null, mapDispatchToProps)(HomeScreen);
