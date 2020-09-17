import React from 'react';
import { View, ScrollView, Image, TextInput, StyleSheet, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useSelector, connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import { useFocusEffect } from '@react-navigation/native';
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from 'react-native-dotenv';

import * as Google from 'expo-google-app-auth';
import { loginSchema } from '../utils/validators';
import Text from '../components/CustomText';
import SRLogo from '../assets/images/scriptorerum-logo.png';
import GoogleColorfulIcon from '../components/GoogleColorfulIcon';
import * as Facebook from '../services/facebook';
import * as Twitter from '../services/twitter';
import { loginAction } from '../redux/actions/AuthActions';
import PageSpinner from '../components/PageSpinner';

const LoginScreen = ({ navigation, login }) => {
  const authState = useSelector((state) => state.auth);

  const { errors, handleSubmit, register, watch, setValue } = useForm({
    validationSchema: loginSchema,
    validateCriteriaMode: 'all',
  });

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

  React.useEffect(() => {
    register('usernameOrEmail');
    register('password');
  }, [register]);

  const submit = async (data) => {
    try {
      await login(data);
    } catch (e) {
      let toastMessage = e?.message || 'Something unexpected happened';

      if (e?.code === 'UnauthorizedUser' && !data.socialAccountId) {
        toastMessage = 'This username/email and password combination is incorrect';
      }
      if (e?.code === 'UnauthorizedUser' && data.socialAccountId) {
        toastMessage = "You don't have any account associated to that social network";
      }

      Toast.show(toastMessage, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });

      if (authState.currentUser?.isActive === false) {
        navigation.navigate('OTPVerification');
      }
    }
  };

  const facebookLogin = async () => {
    const facebookData = await Facebook.logIn();
    const facebookAccountId = facebookData.id;
    if (facebookAccountId) {
      const data = {
        socialAccountId: facebookAccountId,
        socialAccountFieldName: 'facebookAccountId',
      };
      submit(data);
    } else {
      Toast.show('There was an error while trying to access your Facebook account.', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    }
  };

  const twitterLogin = async () => {
    const { twitterAccountId } = await Twitter.authSession(true);
    if (twitterAccountId) {
      const data = {
        socialAccountId: twitterAccountId,
        socialAccountFieldName: 'twitterAccountId',
      };
      submit(data);
    }
  };

  async function googleLogin() {
    try {
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        scopes: ['profile'],
      });

      if (result.type === 'success') {
        const data = {
          socialAccountId: result.user.id,
          socialAccountFieldName: 'googleAccountId',
        };
        submit(data);
      }
    } catch (e) {
      Toast.show('There was an error while trying to access your Google account.', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image testID="logo" source={SRLogo} style={styles.logo} />
        </View>
        <View style={styles.headlineContainer}>
          <Text testID="login-text" type="medium" style={styles.headline}>
            Login
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Username or Email
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref={(input) => {
                  inputs.usernameOrEmail = input;
                }}
                autoCapitalize="none"
                testID="login-user-name"
                onChangeText={(text) => setValue('usernameOrEmail', text)}
                value={watch('usernameOrEmail')}
                onSubmitEditing={() => focusNextField('password')}
                blurOnSubmit={false}
                returnKeyType="next"
                style={[styles.input, errors.usernameOrEmail && styles.errorInput]}
              />
            </View>
            {errors.usernameOrEmail && (
              <Text style={{ fontSize: 11, marginTop: 3, color: 'red' }}>
                {errors.usernameOrEmail.message}
              </Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Password
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref={(input) => {
                  inputs.password = input;
                }}
                testID="login-password"
                onChangeText={(text) => setValue('password', text)}
                value={watch('password')}
                onSubmitEditing={handleSubmit(submit)}
                blurOnSubmit={false}
                returnKeyType="send"
                secureTextEntry
                style={[styles.input, errors.password && styles.errorInput]}
              />
            </View>
            {errors.password && (
              <Text style={{ fontSize: 11, marginTop: 3, color: 'red' }}>
                {errors.password.message}
              </Text>
            )}
          </View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPassword')}
              testID="forgot-password-link">
              <Text type="medium" style={styles.goToLoginPageButtonText}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={authState.loading}
            testID="login-button"
            style={styles.submitButton}
            onPress={handleSubmit(submit)}>
            <Text type="medium" style={styles.submitButtonText}>
              Log in
            </Text>
          </TouchableOpacity>

          <View style={styles.loginWithSocialMediaTextContainer}>
            <Text type="medium" style={{ color: '#7F8FA4' }}>
              Or login via social networks
            </Text>
          </View>
          <View style={styles.socialMediaButtonsContainer}>
            <TouchableOpacity
              onPress={twitterLogin}
              testID="twitter-icon-button"
              style={{
                backgroundColor: '#3ABDFF',
                ...styles.socialMediaButton,
              }}>
              <Entypo name="twitter-with-circle" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => facebookLogin()}
              testID="facebook-icon-button"
              style={{
                backgroundColor: '#1382D5',
                ...styles.socialMediaButton,
              }}>
              <Entypo name="facebook-with-circle" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={googleLogin}
              testID="google-icon-button"
              style={{
                backgroundColor: '#e6e6e6',
                ...styles.socialMediaButton,
              }}>
              <GoogleColorfulIcon />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row' }}>
            <Text style={{ color: '#7F8FA4' }}>Don't have an account yet? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupScreen')}
              style={styles.goToLoginPageButton}>
              <View testID="go-back-to-signup-page">
                <Text type="medium" style={styles.goToLoginPageButtonText}>
                  Sign up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <PageSpinner visible={authState.loading} />
    </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 70,
  },
  logoContainer: {
    width: '70%',
    height: 149,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: '70%',
    height: '70%',
  },
  headlineContainer: {},
  headline: {
    color: '#38434A',
    fontSize: 24,
  },
  inputContainer: {
    borderRadius: 4.87,
    borderColor: '#DFE3E9',
    backgroundColor: '#F8FAFC',
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
  form: {
    width: '75%',
  },
  formGroup: {
    marginTop: 10,
  },
  submitButton: {
    // marginTop: 30,
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
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialMediaButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  errorInput: {
    borderColor: 'red',
    borderBottomWidth: 1,
  },
});

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  login: loginAction,
};

export default connect(null, mapDispatchToProps)(LoginScreen);
