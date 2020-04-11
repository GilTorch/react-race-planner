import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Surface, Searchbar } from 'react-native-paper';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../components/CustomText';
import { stories, genres } from '../utils/data';
import ViewAllCategoriesModal from '../components/ViewAllCategoriesModal';
import Genre from '../components/Genre';
import Story from '../components/Story';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  navigation.setOptions({
    headerShown: false
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setHidden(false);
    }, [])
  );

  return (
    <View style={styles.container}>
      <ViewAllCategoriesModal dismiss={() => setModalVisible(false)} visible={modalVisible} />
      <Surface
        style={{
          elevation: 5
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
            ScriptoRerum
          </Text>
        </LinearGradient>
      </Surface>

      <ScrollView>
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
          {genres.map((genre, key) => (
            <Genre key={key.toString()} genre={genre} />
          ))}
        </ScrollView>

        <View style={{ paddingLeft: 23 }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text type="medium" style={{ fontSize: 12, marginTop: 10, color: '#03A2A2' }}>
              View all categories
            </Text>
          </TouchableOpacity>
        </View>

        {searchBarVisible ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 10
            }}>
            <View style={{ flex: 8 }}>
              <Searchbar style={{ height: 40, paddingTop: 3 }} iconColor="#03A2A2" />
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
        ) : (
            <View>
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: 20,
                  marginBottom: 25,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <Text type="medium" style={{ ...styles.headline, fontSize: 18 }}>
                  All Stories
              </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'stretch'
                  }}>
                  <Surface style={{ borderRadius: 5, elevation: 5, padding: 4, marginRight: 10 }}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => {
                        navigation.push('FilterScreen');
                      }}>
                      <AntDesign color="#5A7582" size={18} name="filter" />
                      <Text type="bold" style={{ fontSize: 12, color: '#5A7582' }}>
                        FILTER
                    </Text>
                    </TouchableOpacity>
                  </Surface>
                  <Surface style={{ borderRadius: 5, elevation: 5, padding: 5 }}>
                    <TouchableOpacity onPress={() => setSearchBarVisible(true)}>
                      <FontAwesome size={14} color="#5A7582" name="search" />
                    </TouchableOpacity>
                  </Surface>
                </View>
              </View>
            </View>
          )}
        <View>
          {stories.map((story, index) => (
            <Story
              genres={genres}
              key={index.toString()}
              index={index}
              navigation={navigation}
              story={story}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  },
  headline: { color: '#5A7582' },
  advertisement: {
    height: SCREEN_HEIGHT * 0.4,
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  smallAdvertisement: {
    height: SCREEN_HEIGHT * 0.1,
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  smallAdvertisementTitle: {
    color: '#5A7582',
    fontSize: 20
  },
  advertisementTitle: {
    color: '#5A7582',
    fontSize: 25
  }
});

export default HomeScreen;
