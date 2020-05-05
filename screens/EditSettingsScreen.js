import React from 'react';
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
  const inputs = {};

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
  const [secure, setSecure] = React.useState(true);

  const scroll = React.useRef();
  const address2Ref = React.useRef();
  const cityRef = React.useRef();
  const countryRef = React.useRef();

  const focusNextField = name => inputs[name].focus();
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
            value={username}
            onChangeText={val => {
              setUsername(val);
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
            testID="edit-firstname"
            placeholder="first-name"
            underlineColor="#C8C7CC"
            value={firstName}
            onChangeText={val => {
              setFirstName(val);
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
            testID="edit-lastname"
            placeholder="last-name"
            underlineColor="#C8C7CC"
            value={lastName}
            onChangeText={val => {
              setLastName(val);
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
            testID="edit-email"
            placeholder="email"
            underlineColor="#C8C7CC"
            value={email}
            onChangeText={val => {
              setEmail(val);
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
            testID="edit-phone1"
            placeholder="phone 1"
            underlineColor="transparent"
            onSubmitEditing={() => focusNextField('phone2')}
            blurOnSubmit={false}
            returnKeyType="next"
            value={phone1}
            onChangeText={val => {
              setPhone1(val);
              setDisableCheck(!val);
            }}
            style={{ ...styles.input, borderBottomWidth: 0 }}
          />
          <Divider style={{ marginLeft: 20 }} />
          <TextInput
            testID="edit-phone2"
            placeholder="phone 2"
            underlineColor="#C8C7CC"
            returnKeyType="done"
            ref={input => {
              inputs.phone2 = input;
            }}
            value={phone2}
            onChangeText={val => {
              setPhone2(val);
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
            testID="edit-address1"
            underlineColor="transparent"
            value={address1}
            onChangeText={val => {
              setAddress1(val);
              setDisableCheck(!val);
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
            value={address2}
            onChangeText={val => {
              setAddress2(val);
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
            testID="edit-city"
            underlineColor="transparent"
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
            style={{ ...styles.input, borderTopWidth: 0, borderBottomWidth: 0 }}
          />
          <Divider style={{ marginLeft: 20 }} />
          <TextInput
            testID="edit-country"
            underlineColor="#C8C7CC"
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
            <TouchableOpacity onPress={() => selectMale()} style={styles.checkBox}>
              <Text style={{ fontSize: 18 }}>Male</Text>
              {gender === 'Male' && <FontAwesome name="check" size={18} color="#03A2A2" />}
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              testID="edit-gender"
              onPress={() => selectFemale()}
              style={styles.checkBox}>
              <Text style={{ fontSize: 18 }}>Female</Text>
              {gender === 'Female' && <FontAwesome name="check" size={18} color="#03A2A2" />}
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
            <Divider />
            <TouchableOpacity onPress={() => setPrivacy('anonymous')} style={styles.checkBox}>
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
