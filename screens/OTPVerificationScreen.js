import React, { useState } from 'react';
import { View, ScrollView, Image, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Text from '../components/CustomText';
import SRLogo from '../assets/images/scriptorerum-logo.png';
// import { useDidUpdateEffect } from '../hooks/useDidUpdateEffect';
import { verifyOTP } from '../redux/actions/actionCreators';
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
  const loading = useSelector(state => state.user.loadingVerifyOTP);
  const currentUser = useSelector(state => state.user.currentUser);
  const [requestEnabled, setRequestEnabled] = useState(true);
  // const token = useSelector(state => state.user.token);
  const tokenExpiration = useSelector(state => state.user.currentUser.exp);
  const formattedTime = moment.unix(tokenExpiration).fromNow();
  const tokenHasExpired = formattedTime.includes('ago');
  const expiresOrExpired = tokenHasExpired ? 'expired' : 'expires';
  const dispatch = useDispatch();
  const otpSuccess = useSelector(state => state.user.otpSuccess);
  // const [requestTimeOut, setRequestTimeOut] = useState(180000);

  if (otpSuccess) {
    navigation.push('Login');
  }

  // only fire request when token is not expired
  // and 3 minutes after last token
  // useDidUpdateEffect(() => {
  //   // this will work exactly as componentDidUpdate
  //   // and will fire only when the token has changed
  //   setRequestEnabled(false);
  //   const requestTimeOutInterval = setInterval(() => {
  //     const newRequestTimeOut = requestTimeOut - 1000;
  //     setRequestTimeOut(newRequestTimeOut);
  //   }, 1000);
  //   setTimeout(() => {
  //     setRequestEnabled(true);
  //     clearInterval(requestTimeOutInterval);
  //   }, 180000);
  // }, [token]);

  const submit = data => {
    if (!tokenHasExpired) {
      if (requestEnabled) {
        // send request
        dispatch(verifyOTP(data));
      } else {
        console.error('REQUEST NOT ENABLED. OTP NOT SENT');
      }
    } else {
      console.error('TOKEN HAS EXPIRED. OTP NOT SENT');
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
            <View style={styles.inputContainer}>
              <Controller
                as={TextInput}
                control={control}
                name="otpCode"
                onChange={args => args[0].nativeEvent.text}
                defaultValue=""
                style={styles.input}
                testID="otp"
                editable={!loading}
              />
              {/* <TextInput testID="add-email-address-to-reset" style={styles.input} /> */}
            </View>
            {errors.otp && (
              <Text style={{ marginTop: 10, color: 'red' }}>{errors.otp.message}</Text>
            )}
          </View>
          {/* <Text>{requestTimeOut}</Text> */}
          <TouchableOpacity
            testID="reset-password-button"
            style={styles.submitButton}
            onPress={handleSubmit(submit)}>
            <Text style={styles.submitButtonText}>{submitText}</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 20, marginBottom: 10, flexDirection: 'row' }}>
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
