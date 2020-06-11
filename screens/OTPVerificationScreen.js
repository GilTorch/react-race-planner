import React from 'react';
import { View, ScrollView, Image, TextInput, StyleSheet, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { useSelector, connect } from 'react-redux';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-root-toast';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../components/CustomText';
import SRLogo from '../assets/images/scriptorerum-logo.png';
import { accountVerificationAction, otpCodeAction } from '../redux/actions/AuthActions';
import { otpVerificationSchema } from '../utils/validators';
import PageSpinner from '../components/PageSpinner';

const OTPVerificationScreen = ({ navigation, verifyAccount, resendOtp }) => {
  const authState = useSelector(state => state.auth);
  const { errors, handleSubmit, register, watch, setValue } = useForm({
    validationSchema: otpVerificationSchema
  });
  const tokenExpiration = authState.currentUser?.exp;
  const formattedTime = moment.unix(tokenExpiration).fromNow();
  const tokenHasExpired = formattedTime.includes('ago');
  const expiresOrExpired = tokenHasExpired ? 'expired' : 'expires';

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true);

      navigation.setOptions({
        headerShown: false
      });
    }, [])
  );

  React.useEffect(() => {
    if (!authState.currentUser) {
      navigation.navigate('Login');
    }
  }, [authState.currentUser]);

  const resendVerificationOtp = async () => {
    try {
      await resendOtp('account-verification');

      Toast.show('We sent the OTP code to your email', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });
    } catch (e) {
      Toast.show(e?.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });
    }
  };

  const submit = async data => {
    try {
      if (!tokenHasExpired) {
        await verifyAccount(data);
        navigation.navigate('Login');
      } else {
        resendVerificationOtp();
      }
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });
    }
  };

  React.useEffect(() => {
    register('otpCode');
  }, [register]);

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
                Enter the One-Time Password (OTP) that was sent to your email (
                {authState.currentUser?.email}). It {expiresOrExpired}{' '}
                <Text type="bold">{moment.unix(tokenExpiration).fromNow()}</Text>:
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                testID="otp"
                onChangeText={text => setValue('otpCode', text)}
                value={watch('otpCode')}
                onSubmitEditing={handleSubmit(submit)}
                blurOnSubmit={false}
                returnKeyType="send"
                style={[styles.input, errors.otpCode && styles.errorInput]}
              />
            </View>
            {errors.otpCode && (
              <Text style={{ fontSize: 11, marginTop: 3, color: 'red' }}>
                {errors.otpCode.message}
              </Text>
            )}
          </View>
          <TouchableOpacity
            testID="reset-password-button"
            style={styles.submitButton}
            onPress={handleSubmit(submit)}>
            <Text type="medium" style={styles.submitButtonText}>
              Activate my account
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 15, marginBottom: 10, flexDirection: 'row' }}>
            {!tokenHasExpired && (
              <Text style={{ color: '#7F8FA4' }}>Didn't receive the code? </Text>
            )}

            {tokenHasExpired && (
              <Text style={{ color: '#7F8FA4' }}>Your OTP code has expired. </Text>
            )}
            <TouchableOpacity
              onPress={() => resendVerificationOtp()}
              style={styles.goToLoginPageButton}>
              <View testID="return-to-login-page">
                {!tokenHasExpired && (
                  <Text style={styles.goToLoginPageButtonText}>Send another one</Text>
                )}

                {tokenHasExpired && (
                  <Text style={styles.goToLoginPageButtonText}>Send a new one</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.goToLoginPageButton}>
              <View testID="return-to-login-page">
                <Text style={styles.goToLoginPageButtonText}>Cancel signing up</Text>
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
    fontSize: 13,
    textAlign: 'center'
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
    marginTop: 15,
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
  },
  errorInput: {
    borderColor: 'red',
    borderBottomWidth: 1
  }
});

OTPVerificationScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  verifyAccount: PropTypes.func.isRequired,
  resendOtp: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  verifyAccount: accountVerificationAction,
  resendOtp: otpCodeAction
};

export default connect(null, mapDispatchToProps)(OTPVerificationScreen);
