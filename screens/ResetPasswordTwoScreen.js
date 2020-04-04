import React from "react";
import { View, ScrollView, Image, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PropTypes from "prop-types";

import SRLogo from "../assets/images/scriptorerum-logo.png";
import Text from "../components/CustomText";

const ResetPasswordScreenTwo = ({ navigation }) => {
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{ backgroundColor: "white" }}
    >
      <View style={styles.container}>
        <Image testID="logo" source={SRLogo} style={styles.logo} />
        {/* <View style={styles.logoContainer}>
        </View> */}
        <View
          testID="reset-your-password-text"
          style={styles.headlineContainer}
        >
          <Text type="medium" style={styles.headline}>
            Reset Your Password
          </Text>
        </View>
        <View
          style={{
            width: "60%",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Text
            type="medium"
            style={{
              fontSize: 11,
              lineHeight: 16,
              textAlign: "center",
              color: "#7F8FA4",
            }}
          >
            We’ve sent you a one-time password via email (test123@gmail.com).
            Please, enter it below to be able to reset the password for your
            account.
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
              <TextInput testID="password-field-1" style={styles.input} />
            </View>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                New Password
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput testID="new-password-field" style={styles.input} />
            </View>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text type="medium" style={styles.label}>
                Confirm New Password
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                testID="confirm-new-password-field"
                style={styles.input}
              />
            </View>
          </View>
          <TouchableOpacity
            testID="reset-password-button-2"
            style={styles.submitButton}
          >
            <Text type="medium" style={styles.submitButtonText}>
              Reset Password
            </Text>
          </TouchableOpacity>
          <View style={{ width: "100%", marginTop: 20, flexDirection: "row" }}>
            <Text style={{ color: "#7F8FA4" }}>
              Do you wish to cancel resetting your password?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.goToLoginPageButton}
            >
              <View>
                <Text type="medium" style={styles.goToLoginPageButtonText}>
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

ResetPasswordScreenTwo.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 70,
  },
  logoContainer: {
    width: "70%",
    height: 249,
    backgroundColor: "green",
    overflow: "hidden",
  },
  logo: {
    width: "70%",
    height: 149,
    resizeMode: "stretch",
  },
  headlineContainer: {
    marginTop: 30,
  },
  headline: {
    color: "#38434A",
    fontSize: 24,
  },
  inputContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 4.87,
    borderColor: "#DFE3E9",
    borderWidth: 1,
  },
  labelContainer: {
    marginBottom: 10,
  },
  label: {
    color: "#7F8FA4",
    fontWeight: "bold",
    fontSize: 11,
  },
  input: {
    paddingLeft: 8,
    flex: 1,
    height: 35.43,
  },
  form: {
    width: "75%",
  },
  formGroup: {
    marginTop: 10,
  },
  submitButton: {
    marginTop: 30,
    borderRadius: 4.87,
    backgroundColor: "#23C2C2",
    justifyContent: "center",
    alignItems: "center",
    height: 35.43,
  },
  submitButtonText: {
    color: "white",
  },
  loginWithSocialMediaTextContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  socialMediaButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  socialMediaButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  goToLoginPageButton: {},
  goToLoginPageButtonText: {
    color: "#23C2C2",
  },
});

export default ResetPasswordScreenTwo;
