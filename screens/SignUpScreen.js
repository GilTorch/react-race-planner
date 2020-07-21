import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useSelector, connect } from 'react-redux';
import * as Google from 'expo-google-app-auth';
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from 'react-native-dotenv';

import SRLogo from '../assets/images/scriptorerum-logo.png';
import Text from '../components/CustomText';
import GoogleColorfulIcon from '../components/GoogleColorfulIcon';
import * as Facebook from '../services/facebook';
import * as Twitter from '../services/twitter';
import { signupAction } from '../redux/actions/AuthActions';
import { signupSchema } from '../utils/validators';
import PageSpinner from '../components/PageSpinner';

const defaultValues = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  password2: '',
  socialAccount: false,
  googleAccountId: '',
  twitterAccountId: '',
  facebookAccountId: '',
  socialPlatformName: '',
};

const SignupScreen = ({ navigation, signup }) => {
  const authState = useSelector((state) => state.auth);
  const [socialSignUp, setSocialSignup] = React.useState(false);
  const { register, handleSubmit, errors, setValue, watch, reset } = useForm({
    // const { register, handleSubmit, errors, setValue, watch } = useForm({
    validationSchema: signupSchema,
    validateCriteriaMode: 'all',
  });
  const socialAccount = watch('socialAccount', false);
  const socialPlatformName = watch('socialPlatformName', false);
  const inputs = {};
  const focusNextField = (name) => inputs[name].focus();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true);

      navigation.setOptions({
        headerShown: false,
      });
    }, []),
  );

  // Since this is the first screen in the auth stack, we check if there's
  // no saved user data. If there is and the user account hasn't been activated
  // yet, we send them to the OTP verification screen, if there is and it's a password reset
  // we send them to the password reset verification one
  React.useEffect(() => {
    if (authState.currentUser?.isActive === false) {
      navigation.navigate('OTPVerification');
    } else if (authState.currentUser?.isPasswordReset) {
      navigation.navigate('ResetPasswordTwo');
    }
  }, [authState.currentUser]);

  React.useEffect(() => {
    register('username');
    register('firstName');
    register('lastName');
    register('email');
    register('password');
    register('password2');
    register('socialAccount');
    register('googleAccountId');
    register('twitterAccountId');
    register('facebookAccountId');
    register('socialPlatformName');
  }, [register]);

  const submit = async (data) => {
    try {
      await signup(data);

      // If it gets here, it means the user account is saved successfully
      // and they need to verify their account
      navigation.navigate('OTPVerification');
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    }
  };

  async function googleLogin() {
    setSocialSignup(true);

    try {
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        setValue(
          [
            { username: `${result.user.givenName}_${result.user.familyName}`.toLowerCase() },
            { firstName: result.user.givenName },
            { lastName: result.user.familyName },
            { email: result.user.email },
            { socialAccount: true },
            { googleAccountId: result.user.id },
            { socialPlatformName: 'Google' },
          ],
          true,
        );
      }

      setSocialSignup(false);
    } catch (e) {
      setSocialSignup(false);
    }
  }

  const twitterLogin = async () => {
    setSocialSignup(true);

    const { twitterAccountId, username, lastName, firstName, email } = await Twitter.authSession(
      false,
    );

    if (twitterAccountId) {
      setValue(
        [
          { twitterAccountId },
          { username },
          { lastName },
          { firstName },
          { email },
          { socialAccount: true },
          { socialPlatformName: 'Twitter' },
        ],
        true,
      );
    }

    setSocialSignup(false);
  };

  const fbSignup = async () => {
    const { id, email, first_name, last_name } = await Facebook.logIn();
    if (id) {
      setValue(
        [
          { username: `${first_name}_${last_name}`.toLowerCase() },
          { firstName: first_name },
          { lastName: last_name },
          { email },
          { socialAccount: true },
          { facebookAccountId: id },
          { socialPlatformName: 'Facebook' },
        ],
        true,
      );
    } else {
      Alert.alert('There was an error while trying to access your Facebook account.');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'}>
      <ScrollView style={{ backgroundColor: 'white' }}>
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
                  autoCapitalize="none"
                  testID="user-name"
                  onChangeText={(text) => setValue('username', text)}
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
                  onChangeText={(text) => setValue('firstName', text)}
                  value={watch('firstName')}
                  onSubmitEditing={() => focusNextField('lastName')}
                  blurOnSubmit={false}
                  ref={(input) => {
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
                  onChangeText={(text) => setValue('lastName', text)}
                  value={watch('lastName')}
                  onSubmitEditing={() => focusNextField('email')}
                  blurOnSubmit={false}
                  ref={(input) => {
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
                  onChangeText={(text) => setValue('email', text)}
                  value={watch('email')}
                  onSubmitEditing={
                    socialAccount ? handleSubmit(submit) : () => focusNextField('password')
                  }
                  blurOnSubmit={false}
                  ref={(input) => {
                    inputs.email = input;
                  }}
                  keyboardType="email-address"
                  returnKeyType={socialAccount ? 'send' : 'next'}
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
                      onChangeText={(text) => setValue('password', text)}
                      value={watch('password')}
                      onSubmitEditing={() => focusNextField('password2')}
                      blurOnSubmit={false}
                      ref={(input) => {
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
                      onChangeText={(text) => setValue('password2', text)}
                      value={watch('password2')}
                      onSubmitEditing={handleSubmit(submit)}
                      blurOnSubmit={false}
                      ref={(input) => {
                        inputs.password2 = input;
                      }}
                      secureTextEntry
                      returnKeyType="send"
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
              onPress={handleSubmit(submit)}
              style={styles.submitButton}>
              {socialAccount && (
                <Text type="medium" style={styles.submitButtonText}>
                  Continue signup with {socialPlatformName}
                </Text>
              )}
              {!socialAccount && (
                <Text type="medium" style={styles.submitButtonText}>
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>

            <View
              style={[
                styles.loginWithSocialMediaTextContainer,
                { marginTop: socialAccount ? 15 : 20 },
              ]}>
              {socialAccount && (
                <TouchableOpacity
                  style={{ marginBottom: 20 }}
                  onPress={() => {
                    reset(defaultValues);
                  }}>
                  <Text type="medium" style={{ color: 'red', fontWeight: 'bold' }}>
                    Cancel signing up with {socialPlatformName}
                  </Text>
                </TouchableOpacity>
              )}

              {socialAccount && (
                <Text type="medium" style={{ color: '#7F8FA4', fontWeight: 'bold' }}>
                  Or login via a different social network
                </Text>
              )}
              {!socialAccount && (
                <Text type="medium" style={{ color: '#7F8FA4', fontWeight: 'bold' }}>
                  Or login via social networks
                </Text>
              )}
            </View>
            <View
              style={[
                styles.socialMediaButtonsContainer,
                { justifyContent: socialAccount ? 'space-around' : 'space-between' },
              ]}>
              {socialPlatformName !== 'Twitter' && (
                <TouchableOpacity
                  onPress={twitterLogin}
                  testID="twitter-icon-button"
                  style={{
                    backgroundColor: '#3ABDFF',
                    ...styles.socialMediaButton,
                  }}>
                  <Entypo name="twitter-with-circle" size={24} color="#fff" />
                </TouchableOpacity>
              )}
              {socialPlatformName !== 'Facebook' && (
                <TouchableOpacity
                  onPress={fbSignup}
                  testID="facebook-icon-button"
                  style={{
                    backgroundColor: '#1382D5',
                    ...styles.socialMediaButton,
                  }}>
                  <Entypo name="facebook-with-circle" size={24} color="#fff" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={googleLogin}
                testID="google-icon-btn"
                style={{
                  backgroundColor: '#e6e6e6',
                  ...styles.socialMediaButton,
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
      <PageSpinner visible={authState.loading || socialSignUp} />
      {/* <PageSpinner visible={authState.loading} /> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  spiner: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 70,
  },
  logoContainer: {
    width: '70%',
    height: 149,
    marginTop: 50,
    overflow: 'hidden',
  },
  logo: {
    width: '70%',
    height: 149,
    resizeMode: 'stretch',
  },
  headlineContainer: {},
  headline: {
    color: '#38434A',
    fontSize: 24,
  },
  inputContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 4.87,
    borderColor: '#DFE3E9',
    borderWidth: 1,
  },
  labelContainer: {
    marginBottom: 10,
  },
  label: {
    color: '#7F8FA4',
    fontSize: 11,
  },
  input: {
    paddingLeft: 8,
    flex: 1,
    height: 35.43,
  },
  errorInput: {
    borderColor: 'red',
    borderBottomWidth: 1,
  },
  form: {
    width: '75%',
  },
  formGroup: {
    marginTop: 10,
  },
  submitButton: {
    marginTop: 30,
    borderRadius: 4.87,
    backgroundColor: '#23C2C2',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35.43,
  },
  submitButtonText: {
    color: 'white',
  },
  loginWithSocialMediaTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialMediaButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
  },
  socialMediaButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goToLoginPageButton: {},
  goToLoginPageButtonText: {
    color: '#23C2C2',
  },
});

SignupScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signup: signupAction,
};

export default connect(null, mapDispatchToProps)(SignupScreen);
