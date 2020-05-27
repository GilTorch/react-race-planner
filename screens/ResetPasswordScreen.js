import React from 'react';
import { View, ScrollView, Image, TextInput, StyleSheet, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useSelector, connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

import { passwordResetSchema } from '../utils/validators';
import Text from '../components/CustomText';
import SRLogo from '../assets/images/scriptorerum-logo.png';
import { passwordResetAction } from '../redux/actions/AuthActions';
import PageSpinner from '../components/PageSpinner';

const ResetPasswordScreen = ({ navigation, resetPassword }) => {
  const authState = useSelector(state => state.auth);

  const { errors, handleSubmit, register, watch, setValue } = useForm({
    validationSchema: passwordResetSchema
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true);

      navigation.setOptions({
        headerShown: false
      });
    }, [])
  );

  React.useEffect(() => {
    register('usernameOrEmail');
  }, [register]);

  const submit = async data => {
    try {
      await resetPassword(data);

      navigation.navigate('ResetPasswordTwo');
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });

      if (authState.currentUser?.isActive === false) {
        navigation.navigate('OTPVerification');
      }
    }
  };

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
              fontSize: 13,
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
            <View style={styles.inputContainer}>
              <TextInput
                testID="login-user-name"
                autoCapitalize="none"
                onChangeText={text => setValue('usernameOrEmail', text)}
                value={watch('usernameOrEmail')}
                onSubmitEditing={handleSubmit(submit)}
                blurOnSubmit={false}
                returnKeyType="send"
                style={[styles.input, errors.usernameOrEmail && styles.errorInput]}
              />
            </View>

            {errors.usernameOrEmail && (
              <Text style={{ fontSize: 11, marginTop: 3, color: 'red' }}>
                {errors.usernameOrEmail.message}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={handleSubmit(submit)}
            testID="reset-password-button"
            style={styles.submitButton}>
            <Text type="medium" style={styles.submitButtonText}>
              Send Password Reset Code
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row' }}>
            <Text style={{ color: '#7F8FA4' }}>Do you remember it now? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View testID="return-to-login-page">
                <Text style={{ color: '#23C2C2' }}>Log in</Text>
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
  errorInput: {
    borderColor: 'red',
    borderBottomWidth: 1
  }
});

ResetPasswordScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  resetPassword: passwordResetAction
};

export default connect(null, mapDispatchToProps)(ResetPasswordScreen);
