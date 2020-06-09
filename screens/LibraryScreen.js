import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome, SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
import { Surface, Searchbar, Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import Menu from 'react-native-material-menu';
import Text from '../components/CustomText';
import { stories, genres } from '../utils/data';
import ViewAllGenresModal from '../components/modals/ViewAllGenresModal';
import Story from '../components/stories/Story';

const LibraryScreen = ({ navigation }) => {
  navigation.setOptions({
    headerShown: false
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  let menu = null;

  const [currentGenre, setCurrentGenre] = useState(genres[0]);

  const setMenuRef = ref => {
    menu = ref;
  };

  const showMenu = async genreIndex => {
    setCurrentGenre(genres[genreIndex]);
    // setMenuPosition({ top: 125, left: 35 + genreIndex * 50 });
    menu.show();
  };

  const completedStories = stories.filter(story => story.status === 'Completed');

  return (
    <View style={styles.container}>
      <ViewAllGenresModal dismiss={() => setModalVisible(false)} visible={modalVisible} />
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
            paddingBottom: 44,
            paddingTop: 44 * 2
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
            <Text style={{ textAlign: 'center' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
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
                  navigation.navigate('FilterScreen', { previousScreen: 'library' });
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
