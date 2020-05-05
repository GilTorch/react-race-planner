import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, TextInput, StyleSheet, StatusBar, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import SRLogo from '../assets/images/scriptorerum-logo.png';
import Text from '../components/CustomText';
import GoogleColorfulIcon from '../components/GoogleColorfulIcon';
import * as Facebook from '../utils/facebook';
import { signup } from '../redux/actions/actionCreators';
import { useDidUpdateEffect } from '../hooks/useDidUpdateEffect';

const validationSchema = yup.object().shape({
  facebookAccountId: yup.number().default(0),
  username: yup.string().required('Enter your username'),
  firstName: yup.string().required('Enter your first name'),
  lastName: yup.string().required('Enter your last name'),
  email: yup
    .string()
    .email()
    .required('Enter your email'),
  password: yup.string().when('facebookAccountId', {
    is: 0,
    then: yup
      .string()
      .min(8, 'Your password should be at least 8 characters')
      .required('Enter your password')
  }),
  confirmPassword: yup.string().when('facebookAccountId', {
    is: 0,
    then: yup
      .string()
      .required('Confirm password')
      .oneOf([yup.ref('password'), null], 'Passwords are not the same')
  })
});

const SignupScreen = ({ navigation }) => {
  const loading = useSelector(state => state.user.loadingSignup);
  const dispatch = useDispatch();
  const code = useSelector(state => state.user.code);
  const currentUser = useSelector(state => state.user.currentUser);
  const [isSigningUpWithFacebook, setIsSigningUpFacebook] = useState(false);

  const { handleSubmit, errors, control, setValue, register } = useForm({
    validationSchema
  });

  useEffect(() => {
    register('facebookAccountId');
  }, []);

  useDidUpdateEffect(() => {
    if (currentUser && currentUser.isActive) {
      navigation.navigate('Home');
    }

    if (currentUser && !currentUser.isActive) {
      navigation.navigate('OTPVerification');
    }
  }, [currentUser]);

  useEffect(() => {
    if (code === 'InactiveAccount') {
      navigation.navigate('OTPVerification');
    }
  }, [code]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true);
    }, [])
  );

  const submit = data => {
    dispatch(signup(data));
  };

  const setValueIfFieldExists = (label, value) => {
    if (label) {
      setValue(`${label}`, value);
    }
  };

  const fbSignup = async () => {
    const { id, email, first_name, last_name } = await Facebook.logIn();
    if (id) {
      setValue('facebookAccountId', id);
      setValueIfFieldExists('email', email);
      setValueIfFieldExists('firstName', first_name);
      setValueIfFieldExists('lastName', last_name);
      setIsSigningUpFacebook(true);
    } else {
      Alert.alert(
        'There was an error while trying to access your Facebook account. Try again later.'
      );
    }
  };

  let submitText = (
    <Text type="medium" style={styles.submitButtonText}>
      Sign Up
    </Text>
  );

  if (loading) {
    submitText = <ActivityIndicator animated color="#fff" />;
  }

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
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
            <View
              style={{
                ...styles.inputContainer,
                backgroundColor: loading ? '#CFD4E6' : '#F8FAFC',
                borderBottomColor: errors.username ? 'red' : '#DFE3E9'
              }}>
              <Controller
                as={TextInput}
                control={control}
                name="username"
                onChange={args => args[0].nativeEvent.text}
                defaultValue=""
                style={styles.input}
                testID="signup-username"
                editable={!loading}
              />
            </View>
            {errors.username && (
              <Text style={{ marginTop: 10, color: 'red' }}>{errors.username.message}</Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                First Name
              </Text>
            </View>
            <View
              style={{
                ...styles.inputContainer,
                backgroundColor: loading ? '#CFD4E6' : '#F8FAFC',
                borderBottomColor: errors.firstName ? 'red' : '#DFE3E9'
              }}>
              <Controller
                as={TextInput}
                control={control}
                name="firstName"
                onChange={args => args[0].nativeEvent.text}
                defaultValue=""
                style={styles.input}
                testID="signup-firstName"
                editable={!loading}
              />
            </View>
            {errors.firstName && (
              <Text style={{ marginTop: 10, color: 'red' }}>{errors.firstName.message}</Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Last Name
              </Text>
            </View>
            <View
              style={{
                ...styles.inputContainer,
                backgroundColor: loading ? '#CFD4E6' : '#F8FAFC',
                borderBottomColor: errors.lastName ? 'red' : '#DFE3E9'
              }}>
              <Controller
                as={TextInput}
                control={control}
                name="lastName"
                onChange={args => args[0].nativeEvent.text}
                defaultValue=""
                style={styles.input}
                testID="signup-lastName"
                editable={!loading}
              />
            </View>
            {errors.lastName && (
              <Text style={{ marginTop: 10, color: 'red' }}>{errors.lastName.message}</Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Email
              </Text>
            </View>
            <View
              style={{
                ...styles.inputContainer,
                backgroundColor: loading ? '#CFD4E6' : '#F8FAFC',
                borderBottomColor: errors.email ? 'red' : '#DFE3E9'
              }}>
              <Controller
                as={TextInput}
                control={control}
                name="email"
                onChange={args => args[0].nativeEvent.text}
                defaultValue=""
                style={styles.input}
                testID="signup-email"
                editable={!loading}
              />
            </View>
            {errors.email && (
              <Text style={{ marginTop: 10, color: 'red' }}>{errors.email.message}</Text>
            )}
          </View>
          {!isSigningUpWithFacebook && (
            <>
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
                    testID="signup-password"
                    editable={!loading}
                    secureTextEntry
                  />
                </View>
                {errors.password && (
                  <Text style={{ marginTop: 10, color: 'red' }}>{errors.password.message}</Text>
                )}
              </View>
              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Text testID="password-confirmation" type="medium" style={styles.label}>
                    Confirm Password
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.inputContainer,
                    backgroundColor: loading ? '#CFD4E6' : '#F8FAFC',
                    borderBottomColor: errors.confirmPassword ? 'red' : '#DFE3E9'
                  }}>
                  <Controller
                    as={TextInput}
                    control={control}
                    name="confirmPassword"
                    onChange={args => args[0].nativeEvent.text}
                    defaultValue=""
                    style={styles.input}
                    testID="signup-confirmPassword"
                    editable={!loading}
                    secureTextEntry
                  />
                </View>
                {errors.confirmPassword && (
                  <Text style={{ marginTop: 10, color: 'red' }}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>
            </>
          )}
          <TouchableOpacity
            onPress={handleSubmit(submit)}
            testID="sign-up-button"
            style={styles.submitButton}>
            {submitText}
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
              onPress={() => fbSignup()}
              testID="facebook-icon-btn"
              style={{
                backgroundColor: '#1382D5',
                ...styles.socialMediaButton
              }}>
              <Entypo name="facebook-with-circle" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
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
