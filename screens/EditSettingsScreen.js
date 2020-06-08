/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Switch,
  Keyboard,
  Platform,
  SafeAreaView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { Surface, Divider, TextInput, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

import { ScrollView } from 'react-native-gesture-handler';
import Text from '../components/CustomText';
import { SCREEN_HEIGHT } from '../utils/dimensions';
import PageSpinner from '../components/PageSpinner';

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
  const inputs = {};

  const loading = useSelector(state => state.auth.loading);

  const [userData, setUserData] = useState(value);
  const [privacy, setPrivacy] = useState(value.preferences);
  const [disableCheck, setDisableCheck] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [secure, setSecure] = useState(true);
  const [padding, setPadding] = useState(0);

  const scroll = useRef();
  const address2Ref = useRef();
  const cityRef = useRef();
  const countryRef = useRef();

  const focusNextField = name => inputs[name].focus();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const selectGender = gender => {
    setDisableCheck(value.gender === gender);
    setUserData({ gender });
  };

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
          elevation: 3
        }}>
        <LinearGradient colors={['#03a2a2', '#23c2c2']} locations={[0.5, 1]}>
          <SafeAreaView
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <IconButton
              testID="back-arrow"
              onPress={() => navigation.goBack()}
              icon="arrow-left"
              color="white"
            />
            <Text type="bold" style={{ color: 'white', fontSize: 18 }}>
              Settings
            </Text>
            <IconButton
              testID="icon-check"
              onPress={() => ''}
              disabled={disableCheck}
              icon="check"
              color="white"
            />
          </SafeAreaView>
        </LinearGradient>
      </Surface>

      {key === 'username' && (
        <>
          <View style={styles.labelInput}>
            <Text style={styles.inputTitle}>Usermame</Text>
          </View>
          <TextInput
            testID="edit-username"
            placeholder="username"
            underlineColor="#C8C7CC"
            value={userData.username}
            disabled={loading}
            onChangeText={val => {
              setUserData({ username: val });
              setDisableCheck(value.username === val);
            }}
            style={styles.input}
          />
        </>
      )}
      {key === 'firstname' && (
        <>
          <View style={styles.labelInput}>
            <Text style={styles.inputTitle}>First Name</Text>
          </View>
          <TextInput
            testID="edit-firstname"
            placeholder="first-name"
            underlineColor="#C8C7CC"
            value={userData.firstName}
            disabled={loading}
            onChangeText={val => {
              setUserData({ firstName: val });
              setDisableCheck(value.firstName === val);
            }}
            style={styles.input}
          />
        </>
      )}
      {key === 'lastname' && (
        <>
          <View style={styles.labelInput}>
            <Text style={styles.inputTitle}>Last Name</Text>
          </View>
          <TextInput
            testID="edit-lastname"
            placeholder="last-name"
            underlineColor="#C8C7CC"
            value={userData.lastName}
            disabled={loading}
            onChangeText={val => {
              setUserData({ lastName: val });
              setDisableCheck(value.lastName === val);
            }}
            style={styles.input}
          />
        </>
      )}
      {key === 'email' && (
        <>
          <View style={styles.labelInput}>
            <Text style={styles.inputTitle}>Email</Text>
          </View>
          <TextInput
            testID="edit-email"
            placeholder="email"
            underlineColor="#C8C7CC"
            keyboardType="email-address"
            value={userData.email}
            disabled={loading}
            onChangeText={val => {
              // setEmail(val);
              setUserData({ email: val });
              setDisableCheck(value.email === val);
            }}
            style={styles.input}
          />
        </>
      )}
      {key === 'phones' && (
        <>
          <View style={styles.labelInput}>
            <Text style={styles.inputTitle}>Phones</Text>
          </View>
          <TextInput
            testID="edit-phone1"
            placeholder="phone 1"
            underlineColor="transparent"
            keyboardType="phone-pad"
            onSubmitEditing={() => focusNextField('phone2')}
            blurOnSubmit={false}
            returnKeyType="next"
            value={userData.phone1}
            disabled={loading}
            onChangeText={val => {
              setUserData({ ...userData, phone1: val });
              setDisableCheck(value.phone1 === val);
            }}
            style={{ ...styles.input, borderBottomWidth: 0 }}
          />
          <Divider style={{ marginLeft: 20 }} />
          <TextInput
            testID="edit-phone2"
            placeholder="phone 2"
            keyboardType="phone-pad"
            underlineColor="#C8C7CC"
            returnKeyType="done"
            ref={input => {
              inputs.phone2 = input;
            }}
            value={userData.phone2}
            disabled={loading}
            onChangeText={val => {
              setUserData({ ...userData, phone2: val });
              setDisableCheck(value.phone2 === val);
            }}
            style={{ ...styles.input, borderTopWidth: 0 }}
          />
        </>
      )}
      {key === 'address' && (
        <ScrollView
          ref={scroll}
          style={{ paddingTop: 30 }}
          contentContainerStyle={{ paddingBottom: padding }}
          alwaysBounceVertical={false}>
          <View style={{ marginBottom: 20, marginLeft: 20 }}>
            <Text style={styles.inputTitle}>Address</Text>
          </View>
          <TextInput
            testID="edit-address1"
            underlineColor="transparent"
            value={userData.addressLine1}
            disabled={loading}
            onChangeText={val => {
              setUserData({ ...userData, addressLine1: val });
              setDisableCheck(value.addressLine1 === val);
            }}
            returnKeyType="next"
            onSubmitEditing={() => address2Ref.current.focus()}
            placeholder="address 1"
            style={{ ...styles.input, borderBottomWidth: 0 }}
          />
          <Divider style={{ marginLeft: 20 }} />
          <TextInput
            testID="edit-address2"
            underlineColor="transparent"
            value={userData.addressLine2}
            disabled={loading}
            onChangeText={val => {
              setUserData({ ...userData, addressLine2: val });
              setDisableCheck(value.addressLine2 === val);
            }}
            ref={address2Ref}
            returnKeyType="next"
            onSubmitEditing={() => cityRef.current.focus()}
            placeholder="address 2"
            style={{ ...styles.input, borderTopWidth: 0, borderBottomWidth: 0 }}
          />
          <Divider style={{ marginLeft: 20 }} />
          <TextInput
            testID="edit-city"
            underlineColor="transparent"
            value={userData.city}
            disabled={loading}
            onChangeText={val => {
              setUserData({ ...userData, city: val });
              setDisableCheck(value.city === val);
            }}
            ref={cityRef}
            returnKeyType="next"
            onSubmitEditing={() => countryRef.current.focus()}
            onFocus={() => {
              scroll.current.scrollToEnd();
            }}
            placeholder="city"
            style={{ ...styles.input, borderTopWidth: 0, borderBottomWidth: 0 }}
          />
          <Divider style={{ marginLeft: 20 }} />
          <TextInput
            testID="edit-country"
            underlineColor="#C8C7CC"
            value={userData.country}
            disabled={loading}
            onChangeText={val => {
              setUserData({ ...userData, country: val });
              setDisableCheck(value.country === val);
            }}
            ref={countryRef}
            returnKeyType="done"
            onFocus={() => {
              scroll.current.scrollToEnd();
            }}
            placeholder="country"
            style={{ ...styles.input, borderTopWidth: 0 }}
          />
        </ScrollView>
      )}
      {key === 'gender' && (
        <>
          <View style={styles.labelInput}>
            <Text style={styles.inputTitle}>Gender</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              paddingLeft: 20,
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5
            }}>
            <TouchableOpacity onPress={() => selectGender('Male')} style={styles.checkBox}>
              <Text style={{ fontSize: 18 }}>Male</Text>
              {userData.gender === 'Male' && <FontAwesome name="check" size={18} color="#03A2A2" />}
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              testID="edit-gender"
              onPress={() => selectGender('Female')}
              style={styles.checkBox}>
              <Text style={{ fontSize: 18 }}>Female</Text>
              {userData.gender === 'Female' && (
                <FontAwesome name="check" size={18} color="#03A2A2" />
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
      {key === 'password' && (
        <ScrollView ref={scroll}>
          <View style={styles.labelInput}>
            <Text style={styles.inputTitle}>Current Password</Text>
          </View>
          <TextInput
            testID="current-password"
            underlineColor="#C8C7CC"
            placeholder="required"
            secureTextEntry={secure}
            onSubmitEditing={() => focusNextField('password')}
            blurOnSubmit={false}
            returnKeyType="next"
            style={styles.input}
          />
          <View style={{ ...styles.labelInput, paddingTop: 20 }}>
            <Text style={styles.inputTitle}>New Password</Text>
          </View>
          <TextInput
            testID="new-password"
            underlineColor="#C8C7CC"
            onFocus={() => Platform.OS === 'ios' && scroll.current.scrollTo({ y: 80 })}
            placeholder="required"
            secureTextEntry={secure}
            onSubmitEditing={() => focusNextField('password2')}
            blurOnSubmit={false}
            returnKeyType="next"
            ref={input => {
              inputs.password = input;
            }}
            style={styles.input}
          />
          <View style={{ ...styles.labelInput, paddingTop: 20 }}>
            <Text style={styles.inputTitle}>Confirm New Password</Text>
          </View>

          <TextInput
            testID="confirm-new-password"
            underlineColor="#C8C7CC"
            onFocus={() => Platform.OS === 'ios' && scroll.current.scrollToEnd()}
            placeholder="required"
            secureTextEntry={secure}
            onSubmitEditing={() => ''}
            returnKeyType="done"
            ref={input => {
              inputs.password2 = input;
            }}
            style={styles.input}
          />
          <View
            style={{
              marginTop: 20,
              marginBottom: padding,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 20
            }}>
            <Text style={styles.inputTitle}>Show Passwords</Text>
            <Switch
              testID="show-password"
              onChange={() => setSecure(!secure)}
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
          <View style={styles.labelInput}>
            <Text style={styles.inputTitle}>Default Privacy</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              paddingLeft: 20,
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5
            }}>
            <TouchableOpacity
              onPress={() => {
                // setDisableCheck(false);
                setUserData({ preferences: 1 });
                setPrivacy('username');
              }}
              style={styles.checkBox}>
              <Text style={{ fontSize: 18 }}>Username</Text>
              {privacy === 'username' && <FontAwesome name="check" size={18} color="#03A2A2" />}
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => {
                // setDisableCheck(false);
                setUserData({ preferences: 2 });
                setPrivacy('username_and_full_name');
              }}
              testID="username-and-fullname"
              style={styles.checkBox}>
              <Text style={{ fontSize: 18 }}>Username & Full Name</Text>
              {privacy === 'username_and_full_name' && (
                <FontAwesome name="check" size={18} color="#03A2A2" />
              )}
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => {
                // setDisableCheck(false);
                setUserData({ preferences: 3 });
                setPrivacy('anonymous');
              }}
              style={styles.checkBox}>
              <Text style={{ fontSize: 18 }}>Anonymous</Text>
              {privacy === 'anonymous' && <FontAwesome name="check" size={18} color="#03A2A2" />}
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 20,
              paddingHorizontal: 20,
              justifyContent: 'center'
            }}>
            <Text style={{ color: '#898989' }}>
              This determines what people will see as your name (for rounds and comments) at the end
              of the story. You'll still be asked to confirm it at the end of each story
            </Text>
          </View>
        </>
      )}
      <PageSpinner visible={loading} />
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
    marginRight: 20
  },
  labelInput: {
    marginBottom: 20,
    marginLeft: 20,
    paddingTop: 30
  },
  inputTitle: {
    fontSize: 18,
    color: '#898989'
  },
  input: {
    height: 45,
    fontSize: 18,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderColor: '#C8C7CC',
    borderTopWidth: 0.5
  }
});

export default EditSettingsScreen;
