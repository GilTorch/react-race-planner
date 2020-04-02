import React from 'react';
import { ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Surface } from 'react-native-paper';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../components/CustomText';
import { stories } from '../utils/data';
import Story from '../components/stories/Story';

const BadgesFilter = ({ labels, style }) => {
  const badges = labels.map(label => (
    <View
      key={Math.random()}
      style={{
        backgroundColor: '#03A2A2',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 2,
        marginRight: 5
      }}>
      <Text
        type="bold"
        style={{
          fontSize: 11,
          color: '#FFF',
          marginRight: 5,
          paddingVertical: 3
        }}>
        {label}
      </Text>
      <TouchableOpacity>
        <Text type="bold" style={{ fontSize: 12, color: '#FFF', paddingVertical: 3 }}>
          x
        </Text>
      </TouchableOpacity>
    </View>
  ));
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 5,
        ...style,
        flexWrap: 'wrap'
      }}>
      {badges}
    </View>
  );
};
BadgesFilter.propTypes = {
  labels: PropTypes.array.isRequired,
  style: PropTypes.object
};

BadgesFilter.defaultProps = {
  style: {}
};

const Writing = ({ navigation }) => {
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
            My Stories
          </Text>
        </LinearGradient>
      </Surface>
      <ScrollView>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            marginBottom: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Text type="medium" style={{ ...styles.headline, fontSize: 20 }}>
            Filtered Stories
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch'
            }}>
            <Surface style={{ borderRadius: 5, elevation: 5, padding: 4, marginRight: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('FilterScreen')}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign color="#5A7582" size={18} name="filter" />
                <Text type="bold" style={{ fontSize: 12, color: '#5A7582' }}>
                  FILTER
                </Text>
              </TouchableOpacity>
            </Surface>
            <Surface style={{ borderRadius: 5, elevation: 5, padding: 5 }}>
              <TouchableOpacity>
                <FontAwesome size={14} color="#5A7582" name="search" />
              </TouchableOpacity>
            </Surface>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <BadgesFilter labels={['In Progress']} />
          <BadgesFilter labels={['Mystery', 'Action', 'Romance']} />
          <BadgesFilter labels={['Authors: 3 - 100']} />
        </View>

        <Story story={stories[3]} index={0} length={1} navigation={navigation} />
      </ScrollView>
    </View>
  );
};

Writing.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  },
  headline: { color: '#5A7582' }
});

export default Writing;
