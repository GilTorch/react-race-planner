import React from 'react';
import { View, ScrollView, Image, TextInput, StatusBar, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useSelector, connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import moment from 'moment';

import { passwordResetVerificationSchema } from '../utils/validators';
import SRLogo from '../assets/images/scriptorerum-logo.png';
import Text from '../components/CustomText';
import { passwordResetVerificationAction, otpCodeAction } from '../redux/actions/AuthActions';
import PageSpinner from '../components/PageSpinner';

const PasswordResetVerificationScreen = ({ navigation, verifyPasswordReset, resendOtp }) => {
  const authState = useSelector(state => state.auth);
  const inputs = {};
  const focusNextField = name => inputs[name].focus();
  const { register, handleSubmit, errors, setValue, watch } = useForm({
    validationSchema: passwordResetVerificationSchema,
    validateCriteriaMode: 'all'
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
    register('otpCode');
    register('newPassword');
    register('newPasswordConfirmation');
  }, [register]);

  const submit = async data => {
    try {
      if (!tokenHasExpired) {
        await verifyPasswordReset(data);

        navigation.navigate('Login');
      } else {
        await resendOtp('password-reset');

        Toast.show('We sent the OTP code to your email', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM
        });
      }
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });
    }
  };

  const resendPasswordResetOtp = async () => {
    try {
      await resendOtp('password-reset');

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

  return (
    <ScrollView
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Image testID="logo-" source={SRLogo} style={styles.logo} />
        <View testID="reset-your-password-text" style={styles.headlineContainer}>
          <Text type="medium" style={styles.headline}>
            Reset Your Password
          </Text>
        </View>
        <View
          style={{
            width: '60%',
            marginTop: 20,
            marginBottom: 20
          }}>
          <Text
            type="medium"
            style={{
              fontSize: 13,
              textAlign: 'center',
              color: '#7F8FA4'
            }}>
            We’ve sent you a one-time password via email. Please, enter it below to be able to reset
            the password for your account. It {expiresOrExpired}{' '}
            <Text type="bold">{moment.unix(tokenExpiration).fromNow()}</Text>:
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                One-Time Password
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref={input => {
                  inputs.otpCode = input;
                }}
                autoCapitalize="none"
                onChangeText={text => setValue('otpCode', text)}
                value={watch('otpCode')}
                onSubmitEditing={() => focusNextField('newPassword')}
                blurOnSubmit={false}
                returnKeyType="next"
                style={[styles.input, errors.otpCode && styles.errorInput]}
              />
            </View>
          </View>
          {errors.otpCode && (
            <Text style={{ fontSize: 11, marginTop: 3, color: 'red' }}>
              {errors.otpCode.message}
            </Text>
          )}
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                New Password
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref={input => {
                  inputs.newPassword = input;
                }}
                autoCapitalize="none"
                onChangeText={text => setValue('newPassword', text)}
                value={watch('newPassword')}
                secureTextEntry
                onSubmitEditing={() => focusNextField('newPasswordConfirmation')}
                blurOnSubmit={false}
                returnKeyType="next"
                style={[styles.input, errors.newPassword && styles.errorInput]}
              />
            </View>
          </View>
          {errors.newPassword && (
            <Text style={{ fontSize: 11, marginTop: 3, color: 'red' }}>
              {errors.newPassword.message}
            </Text>
          )}
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Confirm New Password
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref={input => {
                  inputs.newPasswordConfirmation = input;
                }}
                autoCapitalize="none"
                secureTextEntry
                onChangeText={text => setValue('newPasswordConfirmation', text)}
                value={watch('newPasswordConfirmation')}
                onSubmitEditing={handleSubmit(submit)}
                blurOnSubmit={false}
                returnKeyType="send"
                style={[styles.input, errors.newPasswordConfirmation && styles.errorInput]}
              />
            </View>
          </View>
          {errors.newPasswordConfirmation && (
            <Text style={{ fontSize: 11, marginTop: 3, color: 'red' }}>
              {errors.newPasswordConfirmation.message}
            </Text>
          )}
          <TouchableOpacity
            onPress={handleSubmit(submit)}
            testID="reset-password-button-2"
            style={styles.submitButton}>
            <Text type="medium" style={styles.submitButtonText}>
              Reset Password
            </Text>
          </TouchableOpacity>

          <View style={{ marginTop: 15, marginBottom: 10, flexDirection: 'row' }}>
            {!tokenHasExpired && (
              <Text style={{ color: '#7F8FA4' }}>Didn't receive the code? </Text>
            )}

            {tokenHasExpired && (
              <Text style={{ color: '#7F8FA4' }}>Your OTP code has expired. </Text>
            )}
            <TouchableOpacity onPress={() => resendPasswordResetOtp()}>
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

          <View style={{ marginTop: 20 }}>
            <Text style={{ color: '#7F8FA4' }}>Do you wish to cancel resetting your password?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View testID="shrink-to-login-page">
                <Text type="medium" style={styles.goToLoginPageButtonText}>
                  Log in
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
    height: 249,
    backgroundColor: 'green',
    overflow: 'hidden'
  },
  logo: {
    width: '70%',
    height: 149,
    resizeMode: 'stretch'
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
  goToLoginPageButtonText: {
    color: '#23C2C2'
  },
  errorInput: {
    borderColor: 'red',
    borderBottomWidth: 1
  }
});

PasswordResetVerificationScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  verifyPasswordReset: PropTypes.func.isRequired,
  resendOtp: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  verifyPasswordReset: passwordResetVerificationAction,
  resendOtp: otpCodeAction
};

export default connect(null, mapDispatchToProps)(PasswordResetVerificationScreen);
