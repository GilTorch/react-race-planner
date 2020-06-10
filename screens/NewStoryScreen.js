import React from 'react';
import { Surface, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View, StyleSheet, StatusBar, SafeAreaView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { Dropdown } from 'react-native-material-dropdown';

import Text from '../components/CustomText';

const NewStoryScreen = ({ navigation, route }) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(false);
      StatusBar.setBarStyle('dark-content');

      navigation.setOptions({
        headerShown: false
      });
    }, [])
  );

  const data = [{ value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }];

  const privacyData = [
    { value: 'username' },
    { value: 'username_and_full_name' },
    { value: 'anonymous' }
  ];

  return (
    <View style={styles.container}>
      <Surface
        style={{
          elevation: 3
        }}>
        <LinearGradient colors={['#03a2a2', '#23c2c2']} locations={[0.5, 1]}>
          <SafeAreaView
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginVertical: 12, marginLeft: 10 }}>
              <Text style={{ fontSize: 16, color: 'white' }}>Cancel</Text>
            </TouchableOpacity>

            <Text type="bold" style={{ color: 'white', fontSize: 18 }}>
              Start new story
            </Text>

            <View>
              <Text style={{ fontSize: 16, color: 'white', marginRight: 10 }}>Start</Text>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Surface>
      <ScrollView contentContainerStyle={{ marginHorizontal: 20 }}>
        <Surface
          style={{
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 20,
            padding: 15,
            paddingBottom: 40,
            flexDirection: 'column'
          }}>
          <Text style={{ fontSize: 18, color: '#03a2a2' }}>Title</Text>
          <TextInput testID="edit-username" underlineColor="#C8C7CC" style={styles.input} />
        </Surface>
        <Surface
          style={{
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 20,
            padding: 15,
            paddingBottom: 40,
            flexDirection: 'column'
          }}>
          <Text style={{ fontSize: 18, color: '#03a2a2' }}>Genre</Text>
          <TextInput
            testID="edit-username"
            underlineColor="#C8C7CC"
            value={route.params.genre}
            disabled
            style={styles.input}
          />
        </Surface>
        <Surface
          style={{
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 20,
            padding: 15,
            paddingBottom: 40,
            flexDirection: 'column'
          }}>
          <Text style={{ fontSize: 18, color: '#03a2a2' }}>Minimun amount of authors</Text>
          <Dropdown value={2} data={data} />
        </Surface>
        <Surface
          style={{
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 20,
            padding: 15,
            paddingBottom: 40,
            flexDirection: 'column'
          }}>
          <Text style={{ fontSize: 18, color: '#03a2a2' }}>Time for writting:</Text>
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 16 }}>Intro</Text>
              <TextInput keyboardType="numeric" style={styles.input} />
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Ending</Text>
              <TextInput keyboardType="numeric" style={styles.input} />
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Round</Text>
              <TextInput keyboardType="numeric" style={styles.input} />
            </View>
          </View>
        </Surface>
        <Surface
          style={{
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 20,
            padding: 15,
            paddingBottom: 40,
            flexDirection: 'column'
          }}>
          <Text style={{ fontSize: 18, color: '#03a2a2' }}>Time for voting:</Text>
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
            <View>
              <Text style={{ fontSize: 16 }}>Intro</Text>
              <TextInput keyboardType="numeric" style={styles.input} />
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Ending</Text>
              <TextInput keyboardType="numeric" style={styles.input} />
            </View>
          </View>
        </Surface>
        <Surface
          style={{
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 20,
            marginBottom: 40,
            padding: 15,
            paddingBottom: 40,
            flexDirection: 'column'
          }}>
          <Text style={{ fontSize: 18, color: '#03a2a2' }}>Privacy Preference</Text>
          <Dropdown value="username" data={privacyData} />
        </Surface>
      </ScrollView>
    </View>
  );
};

NewStoryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight * 1.1 : 0
  },
  input: {
    height: 40,
    fontSize: 18,
    minWidth: 70,
    backgroundColor: 'white',
    borderColor: '#000',
    borderBottomWidth: 0.5
  }
});

export default NewStoryScreen;
