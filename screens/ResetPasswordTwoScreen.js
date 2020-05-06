import React, { useEffect } from 'react';
import { View, ScrollView, Image, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native-paper';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import SRLogo from '../assets/images/scriptorerum-logo.png';
import Text from '../components/CustomText';
import Toast from '../components/Toast';
import { resetPasswordVerify } from '../redux/actions/actionCreators';

const validationSchema = yup.object().shape({
  otpCode: yup
    .number()
    .typeError('One-Time Password must be a number')
    .required('Enter the otp code you received by email'),
  newPassword: yup
    .string()
    .min(8, 'Your password should be at least 8 characters')
    .required('Enter your password'),
  newPasswordConfirmation: yup
    .string()
    .required('Confirm password')
    .oneOf([yup.ref('newPassword'), null], 'Passwords are not the same')
});

const ResetPasswordScreenTwo = ({ navigation }) => {
  const message = useSelector(state => state.user.message);
  const resetPasswordVerifySuccess = useSelector(state => state.user.resetPasswordVerifySuccess);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loadingResetPasswordVerify);

  const { handleSubmit, errors, control } = useForm({
    validationSchema
  });

  const submit = data => {
    dispatch(resetPasswordVerify(data));
  };

  useEffect(() => {
    if (resetPasswordVerifySuccess) {
      navigation.navigate('Login');
    }
  }, [resetPasswordVerifySuccess]);

  let submitText = (
    <Text type="medium" style={styles.submitButtonText}>
      Reset Password
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
              fontSize: 11,
              lineHeight: 16,
              textAlign: 'center',
              color: '#7F8FA4'
            }}>
            We’ve sent you a one-time password via email (test123@gmail.com). Please, enter it below
            to be able to reset the password for your account.
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                One-Time Password
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
                name="otpCode"
                onChange={args => args[0].nativeEvent.text}
                rules={{ required: true }}
                defaultValue=""
                style={styles.input}
                testID="login-user-name"
                editable={!loading}
              />
            </View>
          </View>
          {errors.otpCode && (
            <Text style={{ marginTop: 10, color: 'red' }}>{errors.otpCode.message}</Text>
          )}
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                New Password
              </Text>
            </View>
            <View
              style={{
                ...styles.inputContainer,
                backgroundColor: loading ? '#CFD4E6' : '#F8FAFC',
                borderBottomColor: errors.newPassword ? 'red' : '#DFE3E9'
              }}>
              <Controller
                as={TextInput}
                control={control}
                name="newPassword"
                onChange={args => args[0].nativeEvent.text}
                rules={{ required: true }}
                defaultValue=""
                style={styles.input}
                testID="login-user-name"
                editable={!loading}
                secureTextEntry
              />
            </View>
          </View>
          {errors.password && (
            <Text style={{ marginTop: 10, color: 'red' }}>
              {errors.newPasswordConfirmation.message}
            </Text>
          )}
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Confirm New Password
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
                name="newPasswordConfirmation"
                onChange={args => args[0].nativeEvent.text}
                rules={{ required: true }}
                defaultValue=""
                style={styles.input}
                testID="login-user-name"
                editable={!loading}
                secureTextEntry
              />
            </View>
          </View>
          {errors.confirmPassword && (
            <Text style={{ marginTop: 10, color: 'red' }}>{errors.confirmPassword.message}</Text>
          )}
          <TouchableOpacity
            onPress={handleSubmit(submit)}
            testID="reset-password-button-2"
            style={styles.submitButton}>
            {submitText}
          </TouchableOpacity>
          <View style={{ width: '100%', marginTop: 20, flexDirection: 'row' }}>
            <Text style={{ color: '#7F8FA4' }}>
              Do you wish to cancel resetting your password?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.goToLoginPageButton}>
              <View testID="shrink-to-login-page">
                <Text type="medium" style={styles.goToLoginPageButtonText}>
                  Log in
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

ResetPasswordScreenTwo.propTypes = {
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
  goToLoginPageButton: {},
  goToLoginPageButtonText: {
    color: '#23C2C2'
  }
});

export default ResetPasswordScreenTwo;
