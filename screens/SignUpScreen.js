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
  ToastAndroid
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { signUpUser, clearRequestError } from '../redux/actions/AuthActions';
import SRLogo from '../assets/images/scriptorerum-logo.png';
import Text from '../components/CustomText';
import GoogleColorfulIcon from '../components/GoogleColorfulIcon';
import { signupSchema } from '../utils/validators';
import PageSpinner from '../components/PageSpinner';

const SignupScreen = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true);
    }, [])
  );

  const inputs = {};
  let scrollRef = React.useRef();
  const [form, setState] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const loading = useSelector(state => state.auth.loading);
  const requestError = useSelector(state => state.auth.requestError);
  const user = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user) {
      navigation.navigate('Home');
    }
  });

  const focusNextField = name => inputs[name].focus();

  const formatFormErrors = e => {
    const [inputName, msg] = e.split(':');
    setErrors(prev => ({ ...prev, [inputName]: msg }));
  };

  const signup = () => {
    scrollRef.scrollTo({ y: 230, animated: true });
    setErrors({});

    signupSchema
      .validate(form, { abortEarly: false })
      .then(value => {
        dispatch(signUpUser(value));
      })
      .catch(err => {
        err.errors.map(formatFormErrors);
      });
  };

  if (requestError) {
    ToastAndroid.show(requestError.message, ToastAndroid.LONG);
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
          <Image source={SRLogo} resizeMode="contain" style={styles.logo} />
          <View style={styles.headlineContainer}>
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
                  onChangeText={text => setState({ ...form, username: text })}
                  value={form.username}
                  onSubmitEditing={() => focusNextField('firstName')}
                  blurOnSubmit={false}
                  returnKeyType="next"
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
                  onChangeText={text => setState({ ...form, firstName: text })}
                  value={form.firstName}
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
                  onChangeText={text => setState({ ...form, lastName: text })}
                  value={form.lastName}
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
                  onChangeText={text => setState({ ...form, email: text })}
                  value={form.email}
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
              {errors.email && <Text style={{ fontSize: 11, color: 'red' }}>{errors.email}</Text>}
            </View>
            <View style={styles.formGroup}>
              <View style={styles.labelContainer}>
                <Text type="medium" style={styles.label}>
                  Password
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={text => setState({ ...form, password: text })}
                  value={form.password}
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
                <Text style={{ fontSize: 11, color: 'red' }}>{errors.password}</Text>
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
                  onChangeText={text => setState({ ...form, password2: text })}
                  value={form.password2}
                  onSubmitEditing={signup}
                  ref={input => {
                    inputs.password2 = input;
                  }}
                  secureTextEntry
                  returnKeyType="done"
                  style={[styles.input, errors.password2 && styles.errorInput]}
                />
              </View>
              {errors.password2 && (
                <Text style={{ fontSize: 11, color: 'red' }}>{errors.password2}</Text>
              )}
            </View>
            <TouchableOpacity onPress={signup} style={styles.submitButton}>
              <Text type="medium" style={styles.submitButtonText}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <View style={styles.loginWithSocialMediaTextContainer}>
              <Text type="medium" style={{ color: '#7F8FA4', fontWeight: 'bold' }}>
                Or login via social networks
              </Text>
            </View>
            <View style={styles.socialMediaButtonsContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#3ABDFF',
                  ...styles.socialMediaButton
                }}>
                <Entypo name="twitter-with-circle" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#1382D5',
                  ...styles.socialMediaButton
                }}>
                <Entypo name="facebook-with-circle" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
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
                <View>
                  <Text style={styles.goToLoginPageButtonText}>Log in</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <PageSpinner visible={loading} />
    </KeyboardAvoidingView>
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
