import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar, Switch, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Surface, Divider, TextInput, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import { ScrollView } from 'react-native-gesture-handler';
import Text from '../components/CustomText';
import { SCREEN_HEIGHT } from '../utils/dimensions';

const EditSettingsScreen = ({ navigation, route }) => {
  navigation.setOptions({
    headerShown: false
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );
  const { key, value } = route.params;

  const [isEnabled, setIsEnabled] = React.useState(false);
  const [username, setUsername] = React.useState(value);
  const [firstName, setFirstName] = React.useState(value);
  const [lastName, setLastName] = React.useState(value);
  const [email, setEmail] = React.useState(value);
  const [phone1, setPhone1] = React.useState(value?.phone1);
  const [phone2, setPhone2] = React.useState(value?.phone2);
  const [address1, setAddress1] = React.useState(value?.address1);
  const [address2, setAddress2] = React.useState(value?.address2);
  const [city, setCity] = React.useState(value?.city);
  const [country, setCountry] = React.useState(value?.country);
  const [disableCheck, setDisableCheck] = React.useState(true);
  const [padding, setPadding] = React.useState(0);
  const [gender, setGender] = React.useState(value);
  const [privacy, setPrivacy] = React.useState(value);

  const scroll = React.useRef();
  const address2Ref = React.useRef();
  const cityRef = React.useRef();
  const countryRef = React.useRef();

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const selectMale = () => setGender('Male');
  const selectFemale = () => setGender('Female');

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setPadding(SCREEN_HEIGHT * 0.5));
    Keyboard.addListener('keyboardDidHide', () => setPadding(0));

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      <Surface
        style={{
          elevation: 5
        }}>
        <LinearGradient
          colors={['#03a2a2', '#23c2c2']}
          locations={[0.5, 1]}
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: Constants.statusBarHeight * 2
          }}>
          <Text type="bold" style={{ color: 'white', fontSize: 18 }}>
            Settings
          </Text>
          <View
            style={{
              height: Constants.statusBarHeight,
              width: '95%',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <IconButton onPress={() => navigation.goBack()} icon="arrow-left" color="white" />
            <IconButton onPress={() => ''} disabled={disableCheck} icon="check" color="white" />
          </View>
        </LinearGradient>
      </Surface>

      {key === 'username' && (
        <>
          <View style={{ marginBottom: 10, marginLeft: 10, paddingTop: 30 }}>
            <Text style={{ fontSize: 18, color: '#898989' }}>Usermame</Text>
          </View>
          <TextInput
            placeholder="username"
            value={username}
            onChangeText={val => {
              setUsername(val);
              setDisableCheck(!val);
            }}
            style={{ height: 45, backgroundColor: 'white' }}
          />
        </>
      )}
      {key === 'firstname' && (
        <>
          <View style={{ marginBottom: 10, marginLeft: 10, paddingTop: 30 }}>
            <Text style={{ fontSize: 18, color: '#898989' }}>First Name</Text>
          </View>
          <TextInput
            placeholder="first-name"
            value={firstName}
            onChangeText={val => {
              setFirstName(val);
              setDisableCheck(!val);
            }}
            style={{ height: 45, backgroundColor: 'white' }}
          />
        </>
      )}
      {key === 'lastname' && (
        <>
          <View style={{ marginBottom: 10, marginLeft: 10, paddingTop: 30 }}>
            <Text style={{ fontSize: 18, color: '#898989' }}>Last Name</Text>
          </View>
          <TextInput
            placeholder="last-name"
            value={lastName}
            onChangeText={val => {
              setLastName(val);
              setDisableCheck(!val);
            }}
            style={{ height: 45, backgroundColor: 'white' }}
          />
        </>
      )}
      {key === 'email' && (
        <>
          <View style={{ marginBottom: 10, marginLeft: 10, paddingTop: 30 }}>
            <Text style={{ fontSize: 18, color: '#898989' }}>Email</Text>
          </View>
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={val => {
              setEmail(val);
              setDisableCheck(!val);
            }}
            style={{ height: 45, backgroundColor: 'white' }}
          />
        </>
      )}
      {key === 'phones' && (
        <>
          <View style={{ marginBottom: 10, marginLeft: 10, paddingTop: 30 }}>
            <Text style={{ fontSize: 18, color: '#898989' }}>Phones</Text>
          </View>
          <TextInput
            placeholder="phone 1"
            value={phone1}
            onChangeText={val => {
              setPhone1(val);
              setDisableCheck(!val);
            }}
            style={{ height: 45, backgroundColor: 'white' }}
          />
          <TextInput
            placeholder="phone 2"
            value={phone2}
            onChangeText={val => {
              setPhone2(val);
              setDisableCheck(!val);
            }}
            style={{ height: 45, backgroundColor: 'white' }}
          />
        </>
      )}
      {key === 'address' && (
        <ScrollView
          ref={scroll}
          style={{ paddingTop: 30 }}
          contentContainerStyle={{ paddingBottom: padding }}
          alwaysBounceVertical={false}>
          <View style={{ marginBottom: 10, marginLeft: 10 }}>
            <Text style={{ fontSize: 18, color: '#898989' }}>Address</Text>
          </View>
          <TextInput
            value={address1}
            onChangeText={val => {
              setAddress1(val);
              setDisableCheck(!val);
            }}
            returnKeyType="next"
            onSubmitEditing={() => address2Ref.current.focus()}
            placeholder="address 1"
            style={{ height: 45, backgroundColor: 'white' }}
          />
          <TextInput
            value={address2}
            onChangeText={val => {
              setAddress2(val);
              setDisableCheck(!val);
            }}
            ref={address2Ref}
            returnKeyType="next"
            onSubmitEditing={() => cityRef.current.focus()}
            placeholder="address 2"
            style={{ height: 45, backgroundColor: 'white' }}
          />
          <TextInput
            value={city}
            onChangeText={val => {
              setCity(val);
              setDisableCheck(!val);
            }}
            ref={cityRef}
            returnKeyType="next"
            onSubmitEditing={() => countryRef.current.focus()}
            onFocus={() => {
              scroll.current.scrollToEnd();
            }}
            placeholder="city"
            style={{ height: 45, backgroundColor: 'white' }}
          />
          <TextInput
            value={country}
            onChangeText={val => {
              setCountry(val);
              setDisableCheck(!val);
            }}
            ref={countryRef}
            returnKeyType="done"
            onFocus={() => {
              scroll.current.scrollToEnd();
            }}
            placeholder="country"
            style={{ height: 45, backgroundColor: 'white' }}
          />
        </ScrollView>
      )}
      {key === 'gender' && (
        <>
          <View style={{ marginBottom: 10, marginLeft: 10, paddingTop: 30 }}>
            <Text style={{ fontSize: 18, color: '#898989' }}>Gender</Text>
          </View>
          <View style={{ backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => selectMale()} style={styles.checkBox}>
              <Text style={{ fontSize: 18 }}>Male</Text>
              {gender === 'Male' && <FontAwesome name="check" size={18} color="#03A2A2" />}
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity onPress={() => selectFemale()} style={styles.checkBox}>
              <Text style={{ fontSize: 18 }}>Female</Text>
              {gender === 'Female' && <FontAwesome name="check" size={18} color="#03A2A2" />}
            </TouchableOpacity>
          </View>
        </>
      )}
      {key === 'password' && (
        <ScrollView
          ref={scroll}
          style={{ paddingTop: 30 }}
          contentContainerStyle={{ paddingBottom: padding }}
          alwaysBounceVertical={false}>
          <View style={{ marginBottom: 10, marginLeft: 10 }}>
            <Text style={{ fontSize: 18, color: '#898989' }}>Current Password</Text>
          </View>
          <TextInput placeholder="required" style={{ height: 45, backgroundColor: 'white' }} />
          <View style={{ marginVertical: 10, marginLeft: 10 }}>
            <Text style={{ fontSize: 18, color: '#898989' }}>New Password</Text>
          </View>
          <TextInput
            onFocus={() => {
              scroll.current.scrollToEnd();
            }}
            placeholder="required"
            style={{ height: 45, backgroundColor: 'white' }}
          />
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 10
            }}>
            <Text style={{ fontSize: 18, color: '#898989' }}>Show Password</Text>
            <Switch
              trackColor={{ false: '#898989', true: '#03A2A2' }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#898989"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </ScrollView>
      )}
      {key === 'privacy' && (
        <>
          <View style={{ marginBottom: 10, marginLeft: 10, paddingTop: 30 }}>
            <Text style={{ fontSize: 18, color: '#898989' }}>Default Privacy</Text>
          </View>
          <View style={{ backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => setPrivacy('username')} style={styles.checkBox}>
              <Text style={{ fontSize: 18 }}>Username</Text>
              {privacy === 'username' && <FontAwesome name="check" size={18} color="#03A2A2" />}
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => setPrivacy('username_and_full_name')}
              style={styles.checkBox}>
              <Text style={{ fontSize: 18 }}>Username & Full Name</Text>
              {privacy === 'username_and_full_name' && (
                <FontAwesome name="check" size={18} color="#03A2A2" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPrivacy('anonymous')} style={styles.checkBox}>
              <Text style={{ fontSize: 18 }}>Anonymous</Text>
              {privacy === 'anonymous' && <FontAwesome name="check" size={18} color="#03A2A2" />}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

EditSettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  checkBox: {
    height: 45,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10
  }
});

export default EditSettingsScreen;
