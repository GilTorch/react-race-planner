import React, { useState } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Surface, Searchbar, ActivityIndicator } from 'react-native-paper';
import { View, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect, useSelector } from 'react-redux';

import Text from '../CustomText';

const SearchAndFilter = ({ navigation, onSearch, previousScreen }) => {
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const loadingStories = useSelector(state => state[previousScreen].loadingStories);

  return (
    <>
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
              onChangeText={text => onSearch(text)}
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
            {loadingStories && <ActivityIndicator />}

            <TouchableOpacity
              testID="filter-button"
              style={{ borderRadius: 5, padding: 5 }}
              onPress={() => {
                navigation.navigate('FilterScreen', { previousScreen });
              }}>
              <Surface
                style={{
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
              style={{ borderRadius: 5, padding: 5, flex: 1 }}
              onPress={() => setSearchBarVisible(true)}>
              <Surface
                style={{
                  borderRadius: 5,
                  elevation: 2,
                  flex: 1,
                  paddingHorizontal: 9,
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

      {/* TODO: Display the filter badges correctly */}
      {/* <View style={{ marginBottom: 20 }}>
        <FilterBadges labels={['In Progress']} />
        <FilterBadges labels={['Mystery', 'Action', 'Romance']} />
        <FilterBadges labels={['Authors: 3 - 100']} />
      </View> */}
    </>
  );
};

SearchAndFilter.propTypes = {
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

SearchAndFilter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  previousScreen: PropTypes.string.isRequired
};

export default connect()(SearchAndFilter);
