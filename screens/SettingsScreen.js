import React from 'react';
import { ScrollView, Image, View, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Surface, Portal, Modal, Divider, Button, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import Text from '../components/CustomText';
import Logo from '../assets/images/scriptorerum-logo.png';
import app from '../app.json';

const SettingsScreen = ({ navigation }) => {
  const {
    expo: { version }
  } = app;

  navigation.setOptions({
    headerShown: false
  });

  const [visible, setVisible] = React.useState(false);

  const showDeleteModal = () => setVisible(true);
  const hideDeleteModal = () => setVisible(false);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      <Surface
        style={{
          elevation: 5
        }}>
        <LinearGradient
          colors={['#03a2a2', '#23c2c2']}
          locations={[0.2, 1]}
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            paddingBottom: Constants.statusBarHeight,
            paddingTop: Constants.statusBarHeight * 2
          }}>
          <Text type="bold" style={{ color: 'white', fontSize: 18 }}>
            Settings
          </Text>
        </LinearGradient>
      </Surface>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100
        }}>
        <View>
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
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  <Text style={{ fontSize: 18, color: '#898989' }}>Claim Yours</Text>
                  <MaterialIcons
                    style={{ color: '#898989' }}
                    size={22}
                    name="keyboard-arrow-right"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ height: 70, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: '80%' }}>
                <Text style={{ color: '#B8B8BA' }}>
                  Create a public Username. Having a username will make It easier for other authors
                  to find you in the future.
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
          <TouchableOpacity
            onPress={() => showDeleteModal()}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#f44336' }}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        <Portal>
          <Modal
            dismissable={false}
            visible={visible}
            contentContainerStyle={{
              backgroundColor: 'white',
              borderRadius: 10,
              marginBottom: 20,
              height: '30%',
              width: '90%',
              alignSelf: 'center'
            }}
            onDismiss={() => hideDeleteModal()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10
              }}>
              <FontAwesome name="trash" size={16} color="#5A7582" />
              <Text type="bold" style={{ fontSize: 18, color: '#5A7582' }}>
                {' '}
                Delete Account !
              </Text>
              <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => hideDeleteModal()}>
                <Text type="bold" style={{ fontSize: 18, color: '#5A7582' }}>
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <Divider />
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
              <TextInput
                placeholder="Enter your username"
                style={{
                  height: 35,
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: 10,
                  backgroundColor: 'white'
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly'
                }}>
                <Surface style={styles.btnSurface}>
                  <Button onPress={() => ''} style={{ backgroundColor: '#f44336' }}>
                    <Text type="bold" style={{ color: '#fff' }}>
                      Delete
                    </Text>
                  </Button>
                </Surface>
                <Surface style={styles.btnSurface}>
                  <Button onPress={() => hideDeleteModal()} style={{ backgroundColor: '#A39F9F' }}>
                    <Text type="bold" style={{ color: '#FFF' }}>
                      Cancel
                    </Text>
                  </Button>
                </Surface>
              </View>
            </View>
          </Modal>
        </Portal>
      </ScrollView>
    </View>
  );
};

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired
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
