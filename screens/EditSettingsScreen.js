import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Switch,
  Keyboard,
  Platform
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Surface, Divider, TextInput, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollView } from 'react-native-gesture-handler';
import axios from '../services/axiosService';
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
  const inputs = {};

  const [userData, setUserData] = useState(value);
  const [privacy, setPrivacy] = useState(null);
  const [disableCheck, setDisableCheck] = React.useState(true);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [secure, setSecure] = React.useState(true);
  const [padding, setPadding] = React.useState(0);
  // const [username, setUsername] = React.useState(value);
  // const [firstName, setFirstName] = React.useState(value);
  // const [lastName, setLastName] = React.useState(value);
  // const [email, setEmail] = React.useState(value);
  // const [phone1, setPhone1] = React.useState(value?.phone1);
  // const [phone2, setPhone2] = React.useState(value?.phone2);
  // const [address1, setAddress1] = React.useState(value?.address1);
  // const [address2, setAddress2] = React.useState(value?.address2);
  // const [city, setCity] = React.useState(value?.city);
  // const [country, setCountry] = React.useState(value?.country);
  // const [gender, setGender] = React.useState(value);
  // const [privacy, setPrivacy] = React.useState(value);

  const scroll = React.useRef();
  const address2Ref = React.useRef();
  const cityRef = React.useRef();
  const countryRef = React.useRef();

  const focusNextField = name => inputs[name].focus();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const selectGender = gender => {
    setDisableCheck(false);
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

  const user = useSelector(state => state.auth.currentUser);

  const updateData = () => {
    axios
      .put(`/users/${user._id}`, userData)
      .then(res => console.log(res))
      .catch(err => console.log(err, userData));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      <Surface
        style={{
          elevation: 3
        }}>
        <LinearGradient
          colors={['#03a2a2', '#23c2c2']}
          locations={[0.5, 1]}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: Constants.statusBarHeight,
            paddingTop: Constants.statusBarHeight * 2
          }}>
          <IconButton onPress={() => navigation.goBack()} icon="arrow-left" color="white" />
          <Text type="bold" style={{ color: 'white', fontSize: 18 }}>
            Settings
          </Text>
          <IconButton onPress={updateData} disabled={disableCheck} icon="check" color="white" />
        </LinearGradient>
      </Surface>

      {key === 'username' && (
        <>
          <View style={styles.labelInput}>
            <Text style={styles.inputTitle}>Usermame</Text>
          </View>
          <TextInput
            placeholder="username"
            underlineColor="#C8C7CC"
            // value={username}
            value={userData.username}
            onChangeText={val => {
              // setUsername(val);
              setUserData({ username: val });
              setDisableCheck(!val);
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
            placeholder="first-name"
            underlineColor="#C8C7CC"
            value={userData.firstName}
            onChangeText={val => {
              // setFirstName(val);
              setUserData({ firstName: val });
              setDisableCheck(!val);
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
            placeholder="last-name"
            underlineColor="#C8C7CC"
            value={userData.lastName}
            onChangeText={val => {
              // setLastName(val);
              setUserData({ lastName: val });
              setDisableCheck(!val);
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
            placeholder="email"
            underlineColor="#C8C7CC"
            value={userData.email}
            onChangeText={val => {
              // setEmail(val);
              setUserData({ email: val });
              setDisableCheck(!val);
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
            placeholder="phone 1"
            underlineColor="transparent"
            onSubmitEditing={() => focusNextField('phone2')}
            blurOnSubmit={false}
            returnKeyType="next"
            value={userData.phone1}
            onChangeText={val => {
              // setPhone1(val);
              setUserData({ phone1: val });
              setDisableCheck(!val);
            }}
            style={{ ...styles.input, borderBottomWidth: 0 }}
          />
          <Divider style={{ marginLeft: 20 }} />
          <TextInput
            placeholder="phone 2"
            underlineColor="#C8C7CC"
            returnKeyType="done"
            ref={input => {
              inputs.phone2 = input;
            }}
            value={userData.phone2}
            onChangeText={val => {
              // setPhone2(val);
              setUserData({ phone2: val });
              setDisableCheck(!val);
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
            underlineColor="transparent"
            value={userData.addressLine1}
            onChangeText={val => {
              // setAddress1(val);
              setUserData({ addressLine1: val });
              setDisableCheck(!val);
            }}
            returnKeyType="next"
            onSubmitEditing={() => address2Ref.current.focus()}
            placeholder="address 1"
            style={{ ...styles.input, borderBottomWidth: 0 }}
          />
          <Divider style={{ marginLeft: 20 }} />
          <TextInput
            underlineColor="transparent"
            value={userData.addressLine2}
            onChangeText={val => {
              // setAddress2(val);
              setUserData({ addressLine2: val });
              setDisableCheck(!val);
            }}
            ref={address2Ref}
            returnKeyType="next"
            onSubmitEditing={() => cityRef.current.focus()}
            placeholder="address 2"
            style={{ ...styles.input, borderTopWidth: 0, borderBottomWidth: 0 }}
          />
          <Divider style={{ marginLeft: 20 }} />
          <TextInput
            underlineColor="transparent"
            value={userData.city}
            onChangeText={val => {
              // setCity(val);
              setUserData({ city: val });
              setDisableCheck(!val);
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
            underlineColor="#C8C7CC"
            value={userData.country}
            onChangeText={val => {
              // setCountry(val);
              setUserData({ country: val });
              setDisableCheck(!val);
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
            <TouchableOpacity onPress={() => selectGender('Female')} style={styles.checkBox}>
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
                setDisableCheck(false);
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
                setDisableCheck(false);
                setUserData({ preferences: 2 });
                setPrivacy('username_and_full_name');
              }}
              style={styles.checkBox}>
              <Text style={{ fontSize: 18 }}>Username & Full Name</Text>
              {privacy === 'username_and_full_name' && (
                <FontAwesome name="check" size={18} color="#03A2A2" />
              )}
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => {
                setDisableCheck(false);
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
