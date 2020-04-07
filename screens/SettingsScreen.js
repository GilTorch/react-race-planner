import React from 'react';
import { ScrollView, Image, View, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Surface, Portal, Modal, Divider, Button, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

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
  const [date, setDate] = React.useState(new Date(687041730000));
  const [show, setShow] = React.useState(false);
  const birthDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    await ImagePicker.launchImageLibraryAsync();
  };

  const onChange = selectedDate => {
    let currentDate;
    if (Platform.OS === 'ios') {
      currentDate = new Date(selectedDate.nativeEvent.timestamp);
    } else {
      currentDate =
        selectedDate.type === 'set' ? new Date(selectedDate.nativeEvent.timestamp) : date;
    }
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    if (show === true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

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

      <ScrollView>
        <View>
          <View style={{ height: 50, justifyContent: 'center', marginLeft: 20 }}>
            <Text style={styles.headline}>PROFILE INFO</Text>
          </View>
          <TouchableOpacity
            onPress={openImagePickerAsync}
            style={{
              backgroundColor: '#fff',
              borderColor: '#C8C7CC',
              borderWidth: 1,
              marginBottom: 20,
              width: 100,
              height: 100,
              borderRadius: 100,
              alignSelf: 'center'
            }}
          />
          <View
            style={{
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              borderWidth: 1,
              paddingHorizontal: 20
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditSettingsScreen', { key: 'username' })}
              style={{
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 18 }}>Username</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>Claim Yours</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
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
          <View
            style={{
              paddingLeft: 20,
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              borderWidth: 1
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditSettingsScreen', { key: 'firstname', value: 'John' })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>First Name</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>John</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditSettingsScreen', { key: 'lastname', value: 'Doe' })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Last Name</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>Doe</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditSettingsScreen', { key: 'gender', value: 'Male' })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Gender</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>Male</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity onPress={() => showDatepicker()} style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Date of Birth</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>{birthDate}</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                maximumDate={new Date(2010, 1, 1)}
                display="default"
                onChange={onChange}
              />
            )}
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'email',
                  value: 'johndoe@email.com'
                })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Email</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>johndoe@email.com</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => navigation.navigate('EditSettingsScreen', { key: 'phones' })}
              style={{ ...styles.profileField, paddingRight: 30 }}>
              <Text style={{ fontSize: 18 }}>Phones</Text>
              <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => navigation.navigate('EditSettingsScreen', { key: 'address' })}
              style={{ ...styles.profileField, paddingRight: 30 }}>
              <Text style={{ fontSize: 18 }}>Address</Text>
              <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={{ height: 50, justifyContent: 'center', marginLeft: 20 }}>
            <Text style={styles.headline}>SECURITY</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              borderWidth: 1,
              paddingHorizontal: 20
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditSettingsScreen', { key: 'password' })}
              style={{
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 10,
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 18 }}>Update Password</Text>
              <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
            </TouchableOpacity>
            <Divider inset />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditSettingsScreen', { key: 'privacy', value: 'username' })
              }
              style={{
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 18 }}>Default Privacy</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>username</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={{ height: 50, justifyContent: 'center', marginLeft: 20 }}>
            <Text style={styles.headline}>SOCIAL ACCOUNT</Text>
          </View>
          <View style={{ backgroundColor: 'white' }}>
            <TouchableOpacity
              style={{
                height: 50,
                borderColor: '#C8C7CC',
                borderTopWidth: 1,
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <FontAwesome name="facebook" size={25} />
                <Text style={{ fontSize: 18 }}>acebook</Text>
              </View>
              <Text style={{ fontSize: 18 }}>Linked</Text>
            </TouchableOpacity>
            <Divider style={{ marginLeft: 20 }} />
            <TouchableOpacity
              style={{
                height: 50,
                borderColor: '#C8C7CC',
                borderBottomWidth: 1,
                paddingLeft: 20,
                paddingRight: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <TouchableOpacity
                style={{
                  // flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <FontAwesome name="google" size={25} />
                <Text style={{ fontSize: 18 }}>oogle</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 18 }}>Not Linked</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={{ height: 50, justifyContent: 'center', marginLeft: 20 }}>
            <Text style={styles.headline}>CONTACT US</Text>
          </View>
          <View
            style={{
              height: 50,
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              borderWidth: 1
            }}>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18 }}>Help & Support</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 50,
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              borderWidth: 1,
              marginTop: 30
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
              borderColor: '#C8C7CC',
              borderWidth: 1,
              paddingHorizontal: 20
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
                  <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
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
                  marginVertical: 20,
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
            height: 50,
            backgroundColor: 'white',
            borderColor: '#C8C7CC',
            borderWidth: 1,
            marginTop: 30
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
            height: 50,
            backgroundColor: '#fff',
            borderColor: '#C8C7CC',
            borderWidth: 1,
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
  },
  btnSurface: {
    elevation: 4,
    marginVertical: 10,
    borderRadius: 5
  },
  profileField: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    alignItems: 'center'
  }
};

export default SettingsScreen;
