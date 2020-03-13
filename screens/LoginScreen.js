import React from "react";
import {
  View,
  ScrollView,
  Image,
  TextInput,
  Text,
  StyleSheet
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, EvilIcons, Entypo } from "@expo/vector-icons";
import SRLogo from "../assets/images/scriptorerum-logo.png";
import GoogleColorfulIcon from "../components/GoogleColorfulIcon";

const LoginScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={{ marginTop: 25 }}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={SRLogo} resizeMode="cover" styles={styles.logo} />
        </View>
        <View style={styles.headlineContainer}>
          <Text style={styles.headline}>Login</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Username or Email</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} />
            </View>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Password</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} />
            </View>
          </View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.goToLoginPageButtonText}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Log in</Text>
          </TouchableOpacity>
          <View style={styles.loginWithSocialMediaTextContainer}>
            <Text style={{ color: "#7F8FA4", fontWeight: "bold" }}>
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
            <Text style={{ color: "#7F8FA4" }}>
              Don't have an account yet?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={styles.goToLoginPageButton}
            >
              <View>
                <Text style={styles.goToLoginPageButtonText}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  logoContainer: {
    backgroundColor: "red",
    width: "70%",
    height: 149,
    marginTop: 50,
    overflow: "hidden"
  },
  logo: {
    // width: "100%"
  },
  headlineContainer: {},
  headline: {
    color: "#38434A",
    fontSize: 24,
    fontWeight: "bold"
  },
  inputContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 4.87,
    borderColor: "#DFE3E9",
    borderWidth: 1
  },
  labelContainer: {
    marginBottom: 10
  },
  label: {
    color: "#7F8FA4",
    fontWeight: "bold",
    fontSize: 11
  },
  input: {
    paddingLeft: 8,
    flex: 1,
    height: 35.43
  },
  form: {
    width: "75%"
  },
  formGroup: {
    marginTop: 10
  },
  submitButton: {
    // marginTop: 30,
    borderRadius: 4.87,
    backgroundColor: "#23C2C2",
    justifyContent: "center",
    alignItems: "center",
    height: 35.43
  },
  submitButtonText: {
    color: "white"
  },
  loginWithSocialMediaTextContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  socialMediaButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  socialMediaButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  goToLoginPageButton: {},
  goToLoginPageButtonText: {
    color: "#23C2C2"
  }
});

export default LoginScreen;
