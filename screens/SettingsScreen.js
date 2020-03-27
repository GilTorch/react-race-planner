import React from 'react';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '../components/CustomText';
import Logo from '../assets/images/scriptorerum-logo.png';
import app from '../app.json';

const Header = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: 50,
        marginTop: 20
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <View style={{ flex: 1, alignSelf: 'center' }}>
          <Text style={{ fontSize: 18, textAlign: 'center' }}>Settings</Text>
        </View>
        <TouchableOpacity style={{ position: 'absolute', right: 10 }}>
          <Text style={{ fontSize: 18, color: '#03A2A2' }}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SettingsScreen = () => {
  const {
    expo: { version }
  } = app;

  return (
    <ScrollView style={{ backgroundColor: '#eee' }}>
      <View>
        <Header />
        <View style={{ height: 50, justifyContent: 'center', marginLeft: 20 }}>
          <Text style={styles.headline}>PROFILE INFO</Text>
        </View>
        <View>
          <View
            style={{
              backgroundColor: 'white',
              height: 50,
              paddingLeft: 20,
              paddingRight: 20,
              borderColor: '#C8C7CC',
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Text style={{ fontSize: 18 }}>Username</Text>
            <TouchableOpacity>
              <View
                style={{
                  width: 120,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <View>
                  <Text style={{ fontSize: 18, color: '#898989' }}>Claim Yours</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 1.5
                  }}>
                  <Ionicons style={{ color: '#C7C7CC' }} size={18} name="ios-arrow-forward" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ height: 70, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '80%' }}>
              <Text style={{ color: '#B8B8BA' }}>
                Create a public Username. Having a username will make It easier for other authors to
                find you in the future.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={{ height: 50, justifyContent: 'center', marginLeft: 20 }}>
          <Text style={styles.headline}>CONTACT US</Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            height: 50,
            paddingLeft: 20,
            paddingRight: 20,
            borderColor: '#C8C7CC',
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>Help & Support</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            height: 50,
            paddingLeft: 20,
            paddingRight: 20,
            borderColor: '#C8C7CC',
            borderWidth: 1,
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>Rate Us</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={{ height: 50, justifyContent: 'center', marginLeft: 20 }}>
          <Text style={styles.headline}>LEGAL</Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            paddingLeft: 20,
            paddingRight: 20,
            borderColor: '#C8C7CC',
            borderWidth: 1
          }}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 18 }}>Privacy Policy</Text>
              <View>
                <View>
                  <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 18 }}>Terms of Service</Text>
              <View>
                <View>
                  <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                marginBottom: 20,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 18 }}>Licenses</Text>
              <View>
                <View>
                  <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          height: 50,
          paddingLeft: 20,
          paddingRight: 20,
          borderColor: '#C8C7CC',
          borderWidth: 1,
          marginTop: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18 }}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 40 }}>
        <Image style={styles.logo} source={Logo} />
      </View>
      <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 18 }}>Version {version}</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          height: 50,
          paddingLeft: 20,
          paddingRight: 20,
          borderColor: '#C8C7CC',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 40
        }}>
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18 }}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  headline: {
    color: '#898989',
    fontSize: 15
  },
  logoContainer: {
    backgroundColor: 'red',
    width: '70%',
    height: 149,
    marginTop: 50,
    overflow: 'hidden'
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'stretch'
  }
};

export default SettingsScreen;
