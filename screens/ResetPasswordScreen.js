import React from 'react';
import { View, ScrollView, Image, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native-paper';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Text from '../components/CustomText';
import SRLogo from '../assets/images/scriptorerum-logo.png';
import { useDidUpdateEffect } from '../hooks/useDidUpdateEffect';
import { resetPassword } from '../redux/actions/actionCreators';
import Toast from '../components/Toast';

const validationSchema = yup.object().shape({
  usernameOrEmail: yup.string().required('Enter your username or your email')
});

const ResetPasswordScreen = ({ navigation }) => {
  const message = useSelector(state => state.user.message);
  const loading = useSelector(state => state.user.loadingPasswordReset);
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  const { errors, control, handleSubmit } = useForm({
    validationSchema
  });

  useDidUpdateEffect(() => {
    navigation.navigate('ResetPasswordTwo');
  }, [token]);

  const submit = data => {
    dispatch(resetPassword(data));
  };

  let submitText = (
    <Text type="medium" style={styles.submitButtonText}>
      Send Password Reset Code
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
            We will send you a One Time Password via email for you to be able to reset your password
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Username or Email</Text>
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
          </View>
          {errors.usernameOrEmail && (
            <Text style={{ marginTop: 10, color: 'red' }}>{errors.usernameOrEmail.message}</Text>
          )}
          <TouchableOpacity
            onPress={handleSubmit(submit)}
            testID="reset-password-button"
            style={styles.submitButton}>
            {submitText}
          </TouchableOpacity>
          <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row' }}>
            <Text style={{ color: '#7F8FA4' }}>Do you remember it now? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.goToLoginPageButton}>
              <View testID="return-to-login-page">
                <Text style={styles.goToLoginPageButtonText}>Log in</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast message={message} />
    </ScrollView>
  );
};

ResetPasswordScreen.propTypes = {
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

export default ResetPasswordScreen;
