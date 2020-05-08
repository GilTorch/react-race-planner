import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import Toast from 'react-native-root-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Google from 'expo-google-app-auth';

import { signUpUser, clearRequestError } from '../redux/actions/AuthActions';
import SRLogo from '../assets/images/scriptorerum-logo.png';
import Text from '../components/CustomText';
import GoogleColorfulIcon from '../components/GoogleColorfulIcon';
import { signupSchema } from '../utils/validators';
import PageSpinner from '../components/PageSpinner';
import * as Twitter from '../services/twitter';

const SignupScreen = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true);
    }, [])
  );

  let scrollRef = React.useRef();
  const [socialMediaName, setSocialMediaName] = React.useState('');
  const [socialSignUp, setSocialSignup] = React.useState(false);

  const loading = useSelector(state => state.auth.loading);
  const requestError = useSelector(state => state.auth.requestError);
  const user = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, setValue, watch } = useForm({
    validationSchema: signupSchema,
    validateCriteriaMode: 'all'
  });
  const socialAccount = watch('socialAccount', false);

  React.useEffect(() => {
    if (user) {
      // TODO: navigate to OTP screen
      // navigation.navigate('Home');
    }
    if (socialAccount) {
      handleSubmit(signup)();
    }
  }, [socialAccount, user]);

  React.useEffect(() => {
    register('username');
    register('firstName');
    register('lastName');
    register('email');
    register('password');
    register('password2');
    register('socialAccount');
    register('googleAccountId');
  }, [register]);

  const inputs = {};
  const focusNextField = name => inputs[name].focus();

  const signup = data => {
    dispatch(signUpUser(data));
  };

  async function signInWithGoogleAsync() {
    setSocialSignup(true);
    scrollRef.scrollTo({ y: 100, animated: true });

    try {
      const result = await Google.logInAsync({
        androidClientId: '980543837281-7uu46lgibdqstt24j80p3795pvcd7clq.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        setValue([
          { username: '' },
          { firstName: result.user.givenName },
          { lastName: result.user.familyName },
          { email: result.user.email },
          { socialAccount: true },
          { googleAccountId: result.user.id }
        ]);
        setSocialMediaName('Google');
      }
      setSocialSignup(false);
      return null;
    } catch (e) {
      setSocialSignup(false);
      return { error: true };
    }
  }

  const signupWithTwitter = async () => {
    setSocialSignup(true);
    scrollRef.scrollTo({ y: 100, animated: true });
    const { twitterAccountId, username, lastName, firstName, email } = await Twitter.authSession(
      false
    );
    if (twitterAccountId) {
      setValue([
        { twitterAccountId },
        { username },
        { lastName },
        { firstName },
        { email },
        { socialAccount: true }
      ]);
      setSocialMediaName('Twitter');
    }
    setSocialSignup(false);
  };

  if (requestError) {
    Toast.show(requestError.message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM
    });
    dispatch(clearRequestError());
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'}>
      <ScrollView
        ref={scroll => {
          scrollRef = scroll;
        }}
        contentContainerStyle={{ backgroundColor: 'white' }}>
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
                  onChangeText={text => setValue('username', text)}
                  value={watch('username')}
                  onSubmitEditing={() => focusNextField('firstName')}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  style={[styles.input, errors.username && styles.errorInput]}
                />
              </View>
              {errors.username && (
                <Text style={{ fontSize: 11, marginTop: 3, color: 'red' }}>
                  {errors.username.message}
                </Text>
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
                  onChangeText={text => setValue('firstName', text)}
                  value={watch('firstName')}
                  onSubmitEditing={() => focusNextField('lastName')}
                  blurOnSubmit={false}
                  ref={input => {
                    inputs.firstName = input;
                  }}
                  returnKeyType="next"
                  style={[styles.input, errors.firstName && styles.errorInput]}
                />
              </View>
              {errors.firstName && (
                <Text style={{ fontSize: 11, marginTop: 3, color: 'red' }}>
                  {errors.firstName.message}
                </Text>
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
                  onChangeText={text => setValue('lastName', text)}
                  value={watch('lastName')}
                  onSubmitEditing={() => focusNextField('email')}
                  blurOnSubmit={false}
                  ref={input => {
                    inputs.lastName = input;
                  }}
                  returnKeyType="next"
                  style={[styles.input, errors.lastName && styles.errorInput]}
                />
              </View>
              {errors.lastName && (
                <Text style={{ fontSize: 11, marginTop: 3, color: 'red' }}>
                  {errors.lastName.message}
                </Text>
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
                  autoCapitalize="none"
                  onChangeText={text => setValue('email', text)}
                  value={watch('email')}
                  onSubmitEditing={() => focusNextField('password')}
                  blurOnSubmit={false}
                  ref={input => {
                    inputs.email = input;
                  }}
                  keyboardType="email-address"
                  returnKeyType="next"
                  style={[styles.input, errors.email && styles.errorInput]}
                />
              </View>
              {errors.email && (
                <Text style={{ fontSize: 11, marginTop: 3, color: 'red' }}>
                  {errors.email.message}
                </Text>
              )}
            </View>
            {!socialAccount && (
              <>
                <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                    <Text type="medium" style={styles.label}>
                      Password
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      testID="password"
                      onChangeText={text => setValue('password', text)}
                      value={watch('password')}
                      onSubmitEditing={() => focusNextField('password2')}
                      blurOnSubmit={false}
                      ref={input => {
                        inputs.password = input;
                      }}
                      secureTextEntry
                      returnKeyType="next"
                      style={[styles.input, errors.password && styles.errorInput]}
                    />
                  </View>
                  {errors.password && (
                    <Text style={{ fontSize: 11, marginTop: 3, color: 'red' }}>
                      {errors.password.message}
                    </Text>
                  )}
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                    <Text type="medium" style={styles.label}>
                      Confirm Password
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      testID="password-confirmation"
                      onChangeText={text => setValue('password2', text)}
                      value={watch('password2')}
                      onSubmitEditing={handleSubmit(signup)}
                      ref={input => {
                        inputs.password2 = input;
                      }}
                      secureTextEntry
                      returnKeyType="done"
                      style={[styles.input, errors.password2 && styles.errorInput]}
                    />
                  </View>
                  {errors.password2 && (
                    <Text style={{ fontSize: 11, marginTop: 3, color: 'red' }}>
                      {errors.password2.message}
                    </Text>
                  )}
                </View>
              </>
            )}
            <TouchableOpacity
              testID="sign-up-button"
              onPress={handleSubmit(signup)}
              style={styles.submitButton}>
              {socialAccount && (
                <Text type="medium" style={styles.submitButtonText}>
                  Continue signup with {socialMediaName}
                </Text>
              )}
              {!socialAccount && (
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
                onPress={signupWithTwitter}
                testID="twitter-icon-button"
                style={{
                  backgroundColor: '#3ABDFF',
                  ...styles.socialMediaButton
                }}>
                <Entypo name="twitter-with-circle" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                testID="facebook-icon-button"
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
      <PageSpinner visible={loading} />
      <PageSpinner visible={socialSignUp} />
    </KeyboardAvoidingView>
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
  errorInput: {
    borderColor: 'red',
    borderBottomWidth: 1
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
