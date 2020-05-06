import React, { useState } from 'react';
import { View, ScrollView, Image, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Entypo } from '@expo/vector-icons';
import { useDidUpdateEffect } from '../hooks/useDidUpdateEffect';
import Text from '../components/CustomText';
import SRLogo from '../assets/images/scriptorerum-logo.png';
import { verifyAccount } from '../redux/actions/actionCreators';
import Toast from '../components/Toast';

const validationSchema = yup.object().shape({
  otpCode: yup
    .number('One-Time Password should be numbers only')
    .required('Enter One-Time Passwrod')
});

const OTPVerificationScreen = ({ navigation }) => {
  const { control, errors, handleSubmit } = useForm({
    validationSchema
  });
  const message = useSelector(state => state.user.message);
  const loading = useSelector(state => state.user.loadingVerifyAccount);
  const token = useSelector(state => state.user.token);
  const [requestEnabled, setRequestEnabled] = useState(true);
  const tokenExpiration = useSelector(state => state.user.currentUser.exp);
  const formattedTime = moment.unix(tokenExpiration).fromNow();
  const tokenHasExpired = formattedTime.includes('ago');
  const expiresOrExpired = tokenHasExpired ? 'expired' : 'expires';
  const dispatch = useDispatch();
  const otpSuccess = useSelector(state => state.user.otpSuccess);

  if (otpSuccess) {
    navigation.navigate('Login');
  }

  useDidUpdateEffect(() => {
    const expirationDate = new Date(tokenExpiration * 1000);
    const now = new Date();
    const diff = expirationDate - now;
    if (diff >= 1.99 && !tokenHasExpired) {
      setRequestEnabled(false);
      setTimeout(() => {
        setRequestEnabled(true);
        clearInterval();
      }, 180000);
    }
  }, [token]);

  const submit = data => {
    if (!tokenHasExpired) {
      if (requestEnabled) {
        dispatch(verifyAccount(data));
      }
    }
  };

  let submitText = (
    <Text type="medium" style={styles.submitButtonText}>
      Activate my account
    </Text>
  );

  if (loading) {
    submitText = <ActivityIndicator animated color="#fff" />;
  }

  if (!requestEnabled) {
    submitText = (
      // <Text type="medium" style={styles.submitButtonText}>
      <Entypo size={18} color="#fff" style={{ marginRight: 10 }} name="lock" />
    );
  }

  let inputEditable = true;

  if (loading) {
    inputEditable = false;
  }

  if (!requestEnabled) {
    inputEditable = false;
  }

  return (
    <ScrollView
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image testID="logo--" source={SRLogo} resizeMode="contain" style={styles.logo} />
        </View>
        <View style={styles.headlineContainer}>
          <Text type="medium" style={styles.headline}>
            Account Verification
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>
                {' '}
                Enter the One-Time Password (OTP) that was sent to your email (it {
                  expiresOrExpired
                }{' '}
                <Text type="bold">{moment.unix(tokenExpiration).fromNow()}</Text>):
              </Text>
            </View>
            <View
              style={{
                ...styles.inputContainer,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: loading || !requestEnabled ? '#CFD4E6' : '#F8FAFC',
                borderBottomColor: errors.usernameOrEmail ? 'red' : '#DFE3E9'
              }}>
              <Controller
                as={TextInput}
                control={control}
                name="otpCode"
                onChange={args => args[0].nativeEvent.text}
                defaultValue=""
                style={styles.input}
                testID="otp"
                editable={inputEditable}
              />
              {!requestEnabled && (
                <Entypo size={18} color="#8A8D99" style={{ marginRight: 10 }} name="lock" />
              )}
            </View>
            {errors.otp && (
              <Text style={{ marginTop: 10, color: 'red' }}>{errors.otp.message}</Text>
            )}
          </View>
          {!requestEnabled && (
            <Text style={{ marginTop: 10, ...styles.label }}>
              Wait <Text type="bold">3 minutes</Text> before sending the next OTP{' '}
            </Text>
          )}
          <TouchableOpacity
            testID="reset-password-button"
            style={styles.submitButton}
            onPress={handleSubmit(submit)}>
            <Text style={styles.submitButtonText}>{submitText}</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 4, marginBottom: 10, flexDirection: 'row' }}>
            <Text style={{ color: '#7F8FA4' }}>Didn't receive an OTP on your email? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPassword')}
              style={styles.goToLoginPageButton}>
              <View testID="return-to-login-page">
                <Text style={styles.goToLoginPageButtonText}>Send one</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View />
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#7F8FA4' }}>Already activated your account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.goToLoginPageButton}>
              <View testID="return-to-login-page">
                <Text style={styles.goToLoginPageButtonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast message={message} />
    </ScrollView>
  );
};

OTPVerificationScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    width: '70%',
    height: 149,
    marginTop: 50,
    overflow: 'hidden'
  },
  logo: {
    flex: 1,
    width: 265,
    height: 149
    // width: "100%"
  },
  headlineContainer: {
    marginTop: 30
  },
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
    fontWeight: 'bold',
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

export default OTPVerificationScreen;
