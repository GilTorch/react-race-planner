import React from 'react';
import { View, ScrollView, Image, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import SRLogo from '../assets/images/scriptorerum-logo.png';
import Text from '../components/CustomText';
import GoogleColorfulIcon from '../components/GoogleColorfulIcon';

const SignupScreen = ({ navigation }) => {
  // console.error(navigation);
  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: "white", marginTop: 25 }}
    >
      <View style={styles.container}>
        {/* <View style={styles.logoContainer}> */}
        <Image source={SRLogo} resizeMode="contain" style={styles.logo} />
        {/* </View> */}
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
              <TextInput style={styles.input} />
            </View>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                First Name
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} />
            </View>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Last Name
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} />
            </View>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Email
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} />
            </View>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Password
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} />
            </View>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Confirm Password
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} />
            </View>
          </View>
          <TouchableOpacity style={styles.submitButton}>
            <Text type="medium" style={styles.submitButtonText}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={styles.loginWithSocialMediaTextContainer}>
            <Text
              type="medium"
              style={{ color: "#7F8FA4", fontWeight: "bold" }}
            >
              Or login via social networks
            </Text>
          </View>
          <View style={styles.socialMediaButtonsContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: "#3ABDFF",
                ...styles.socialMediaButton
              }}
            >
              <Entypo name="twitter-with-circle" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#1382D5",
                ...styles.socialMediaButton
              }}
            >
              <Entypo name="facebook-with-circle" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#e6e6e6",
                ...styles.socialMediaButton
              }}
            >
              <GoogleColorfulIcon />
            </TouchableOpacity>
          </View>
          <View
            style={{ marginTop: 20, marginBottom: 40, flexDirection: "row" }}
          >
            <Text style={{ color: "#7F8FA4" }}>Already a member? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.goToLoginPageButton}
            >
              <View>
                <Text
                  style={styles.goToLoginPageButtonText}
                >
                  Log in
                </Text>
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
