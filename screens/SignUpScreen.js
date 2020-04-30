import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Modal,
  Platform
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import * as Google from 'expo-google-app-auth';

import SRLogo from '../assets/images/scriptorerum-logo.png';
import Text from '../components/CustomText';
import GoogleColorfulIcon from '../components/GoogleColorfulIcon';
import { signupSchema } from '../utils/validators';

const SignupScreen = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true);
    }, [])
  );

  const [form, setState] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [socialMediaName, setSocialMediaName] = React.useState('');

  React.useEffect(() => {
    if (form.socialAccount) {
      signup();
    }
  }, [form.socialAccount]);

  const formatFormErrors = e => {
    const [inputName, msg] = e.split(':');
    setErrors(prev => ({ ...prev, [inputName]: msg }));
  };

  const signup = () => {
    setErrors({});

    signupSchema
      .validate(form, { abortEarly: false })
      .then(value => {
        setLoading(false);
        // dispatch(signUpUser(value));
      })
      .catch(err => {
        err.errors.map(formatFormErrors);
        setLoading(false);
      });
  };

  async function signInWithGoogleAsync() {
    setLoading(true);

    try {
      const result = await Google.logInAsync({
        androidClientId: '706451172353-809kg5r2ha357574ii7iupnbf8nv8qvo.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        setState({
          username: '',
          firstName: result.user.givenName,
          lastName: result.user.familyName,
          email: result.user.email,
          socialAccount: true,
          googleAcountId: result.user.id
        });
        setSocialMediaName('Google');
      }

      setLoading(false);
      return null;
    } catch (e) {
      setLoading(false);
      return { error: true };
    }
  }

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
      <Modal transparent visible={loading}>
        <View style={styles.spiner}>
          <ActivityIndicator size={Platform.isAndroid ? 60 : 'large'} color="#f8f8f8" />
        </View>
      </Modal>
      <View style={styles.container}>
        <Image testID="logo" source={SRLogo} resizeMode="contain" style={styles.logo} />
        <View testID="create-account-text" style={styles.headlineContainer}>
          <Text type="medium" style={styles.headline}>
            Create an Account
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Username
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                testID="user-name"
                value={form.username}
                style={[styles.input, errors.username && styles.errorInput]}
              />
            </View>
            {errors.username && (
              <Text style={{ fontSize: 11, color: 'red' }}>{errors.username}</Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                First Name
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                testID="first-name"
                value={form.firstName}
                style={[styles.input, errors.firstName && styles.errorInput]}
              />
            </View>
            {errors.firstName && (
              <Text style={{ fontSize: 11, color: 'red' }}>{errors.firstName}</Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Last Name
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                testID="last-name"
                value={form.lastName}
                style={[styles.input, errors.lastName && styles.errorInput]}
              />
            </View>
            {errors.lastName && (
              <Text style={{ fontSize: 11, color: 'red' }}>{errors.lastName}</Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Email
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                testID="email-address"
                value={form.email}
                style={[styles.input, errors.email && styles.errorInput]}
              />
            </View>
            {errors.email && <Text style={{ fontSize: 11, color: 'red' }}>{errors.email}</Text>}
          </View>
          {!form.socialAccount && (
            <>
              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Text type="medium" style={styles.label}>
                    Password
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <TextInput testID="password" style={styles.input} />
                </View>
              </View>
              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Text testID="password-confirmation" type="medium" style={styles.label}>
                    Confirm Password
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <TextInput testID="password-confirmation" style={styles.input} />
                </View>
              </View>
            </>
          )}
          <TouchableOpacity style={styles.submitButton}>
            {form.socialAccount && (
              <Text type="medium" style={styles.submitButtonText}>
                Continue signup with {socialMediaName}
              </Text>
            )}
            {!form.socialAccount && (
              <Text type="medium" style={styles.submitButtonText}>
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
          <View style={styles.loginWithSocialMediaTextContainer}>
            <Text type="medium" style={{ color: '#7F8FA4', fontWeight: 'bold' }}>
              Or login via social networks
            </Text>
          </View>
          <View style={styles.socialMediaButtonsContainer}>
            <TouchableOpacity
              testID="twitter-icon-btn"
              style={{
                backgroundColor: '#3ABDFF',
                ...styles.socialMediaButton
              }}>
              <Entypo name="twitter-with-circle" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              testID="facebook-icon-btn"
              style={{
                backgroundColor: '#1382D5',
                ...styles.socialMediaButton
              }}>
              <Entypo name="facebook-with-circle" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={signInWithGoogleAsync}
              testID="google-icon-btn"
              style={{
                backgroundColor: '#e6e6e6',
                ...styles.socialMediaButton
              }}>
              <GoogleColorfulIcon />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row' }}>
            <Text style={{ color: '#7F8FA4' }}>Already a member? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.goToLoginPageButton}>
              <View testID="go-to-loggin-page">
                <Text style={styles.goToLoginPageButtonText}>Log in</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

SignupScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  spiner: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 70
  },
  logoContainer: {
    width: '70%',
    height: 149,
    marginTop: 50,
    overflow: 'hidden'
  },
  logo: {
    width: '70%',
    height: 149,
    resizeMode: 'stretch'
  },
  headlineContainer: {},
  headline: {
    color: '#38434A',
    fontSize: 24
  },
  inputContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 4.87,
    borderColor: '#DFE3E9',
    borderWidth: 1
  },
  labelContainer: {
    marginBottom: 10
  },
  label: {
    color: '#7F8FA4',
    fontSize: 11
  },
  input: {
    paddingLeft: 8,
    flex: 1,
    height: 35.43
  },
  form: {
    width: '75%'
  },
  formGroup: {
    marginTop: 10
  },
  submitButton: {
    marginTop: 30,
    borderRadius: 4.87,
    backgroundColor: '#23C2C2',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35.43
  },
  submitButtonText: {
    color: 'white'
  },
  loginWithSocialMediaTextContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  socialMediaButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  socialMediaButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  goToLoginPageButton: {},
  goToLoginPageButtonText: {
    color: '#23C2C2'
  }
});

export default SignupScreen;
