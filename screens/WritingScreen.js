import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Surface, Searchbar } from 'react-native-paper';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../components/CustomText';
import { stories } from '../utils/data';
import { Story } from '../components/stories';
import FilterBadges from '../components/FilterBadges';

const Writing = ({ navigation }) => {
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  navigation.setOptions({
    headerShown: false
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

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
            My Stories
          </Text>
        </LinearGradient>
      </Surface>
      <ScrollView>
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
          <>
            <View
              style={{
                marginLeft: 20,
                marginRight: 15,
                marginTop: 20,
                marginBottom: 5,
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
                    navigation.push('FilterScreen', { previousScreen: 'writing' });
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
    backgroundColor: '#EEE'
  },
  headline: { color: '#5A7582' }
});

Writing.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Writing;
