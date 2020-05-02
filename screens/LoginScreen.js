import React from 'react';
import { View, ScrollView, Image, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import Toast from '../components/Toast';
import Text from '../components/CustomText';
import SRLogo from '../assets/images/scriptorerum-logo.png';
import GoogleColorfulIcon from '../components/GoogleColorfulIcon';
import { login } from '../redux/actions/actionCreators';

const validationSchema = yup.object().shape({
  usernameOrEmail: yup.string().required('Enter your username or your email'),
  password: yup
    .string()
    .min(8)
    .required('Enter your password')
});

const LoginScreen = ({ navigation }) => {
  const { handleSubmit, errors, control } = useForm({
    validationSchema
  });

  const dispatch = useDispatch();
  const code = useSelector(state => state.user.code);
  const loading = useSelector(state => state.user.loadingLogin);
  const message = useSelector(state => state.user.message);
  const currentUser = useSelector(state => state.user.currentUser);

  if (currentUser && currentUser.isActive) {
    navigation.push('Home');
  }
  if (code === 'InactiveAccount') {
    navigation.push('OTPVerification');
  }
  const submit = data => {
    dispatch(login(data));
  };

  let submitText = (
    <Text type="medium" style={styles.submitButtonText}>
      Log in
    </Text>
  );

  if (loading) {
    submitText = <ActivityIndicator animated color="#fff" />;
  }

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Image testID="logo" source={SRLogo} style={styles.logo} />
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
            <View
              style={{
                ...styles.inputContainer,
                backgroundColor: loading ? '#CFD4E6' : '#F8FAFC',
                borderBottomColor: errors.usernameOrEmail ? 'red' : '#DFE3E9'
              }}>
              <Controller
                as={TextInput}
                control={control}
                name="usernameOrEmail"
                onChange={args => args[0].nativeEvent.text}
                rules={{ required: true }}
                defaultValue=""
                style={styles.input}
                testID="login-user-name"
                editable={!loading}
              />
            </View>
            {errors.usernameOrEmail && (
              <Text style={{ marginTop: 10, color: 'red' }}>{errors.usernameOrEmail.message}</Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Password
              </Text>
            </View>
            <View
              style={{
                ...styles.inputContainer,
                backgroundColor: loading ? '#CFD4E6' : '#F8FAFC',
                borderBottomColor: errors.password ? 'red' : '#DFE3E9'
              }}>
              <Controller
                as={TextInput}
                control={control}
                name="password"
                onChange={args => args[0].nativeEvent.text}
                defaultValue=""
                style={styles.input}
                testID="login-password"
                editable={!loading}
                secureTextEntry
              />
            </View>
            {errors.password && (
              <Text style={{ marginTop: 10, color: 'red' }}>{errors.password.message}</Text>
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
            disabled={loading}
            testID="login-button"
            style={styles.submitButton}
            onPress={handleSubmit(submit)}>
            {submitText}
          </TouchableOpacity>
          <View style={styles.loginWithSocialMediaTextContainer}>
            <Text type="medium" style={{ color: '#7F8FA4' }}>
              Or login via social networks
            </Text>
          </View>
          <View style={styles.socialMediaButtonsContainer}>
            <TouchableOpacity
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
              testID="google-icon-button"
              style={{
                backgroundColor: '#e6e6e6',
                ...styles.socialMediaButton
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
      <Toast message={message} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 70
  },
  logoContainer: {
    backgroundColor: 'red',
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
    // marginTop: 30,
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

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default LoginScreen;
