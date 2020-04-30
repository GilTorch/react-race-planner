import React, { useEffect } from 'react';
import { View, ScrollView, Image, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-styled-toast';
import Text from '../components/CustomText';
import SRLogo from '../assets/images/scriptorerum-logo.png';
import GoogleColorfulIcon from '../components/GoogleColorfulIcon';
import { login } from '../redux/actions/actionCreators';

const validationSchema = yup.object().shape({
  usernameOrEmail: yup.string().required('Enter your username or your email'),
  password: yup.string().required('Enter your password')
});

const LoginScreen = ({ navigation }) => {
  const { register, handleSubmit, errors, setValue } = useForm({
    validationSchema
  });

  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loadingLogin);
  const message = useSelector(state => state.user.message);
  const toast = useToast();

  useEffect(() => {
    register('usernameOrEmail');
    register('password');
    console.log(toast.toast({ message }));
  }, [register]);

  const submit = data => {
    dispatch(login(data));
  };

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
      <Text>{message}</Text>
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
                borderBottomColor: errors.usernameOrEmail ? 'red' : '#DFE3E9'
              }}>
              <TextInput
                editable={!loading}
                onChangeText={text => setValue('usernameOrEmail', text)}
                testID="login-user-name"
                style={styles.input}
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
                borderBottomColor: errors.password ? 'red' : '#DFE3E9'
              }}>
              <TextInput
                editable={!loading}
                secureTextEntry
                onChangeText={text => setValue('password', text)}
                testID="login-password"
                style={styles.input}
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
            <Text type="medium" style={styles.submitButtonText}>
              {loading ? 'Logging in...' : 'Log in'}
            </Text>
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
