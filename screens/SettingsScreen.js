import React from 'react';
import { ScrollView, Image, View, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { Surface, Portal, Modal, Divider, Button, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { ImageManipulator } from 'expo-image-crop';
import { connect } from 'react-redux';

import Text from '../components/CustomText';
import Logo from '../assets/images/scriptorerum-logo.png';
import app from '../app.json';
import GoogleColorfulIcon from '../components/GoogleColorfulIcon';
import { logoutAction } from '../redux/actions/AuthActions';

const SettingsScreen = ({ navigation, logout }) => {
  const {
    expo: { version }
  } = app;

  navigation.setOptions({
    headerShown: false
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = React.useState(new Date(687041730000));
  const [show, setShow] = React.useState(false);
  const [showImageManipulator, setShowImageManipulator] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const birthDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      setSelectedImage(null);
      return;
    }

    setSelectedImage(pickerResult.uri);
    setShowImageManipulator(true);
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

  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      {selectedImage && (
        <ImageManipulator
          photo={{ uri: selectedImage }}
          isVisible={showImageManipulator}
          onPictureChoosed={({ uri: uriM }) => setSelectedImage(uriM)}
          onToggleModal={() => setShowImageManipulator(false)}
        />
      )}
      <Surface
        style={{
          elevation: 3,
          zIndex: 1
        }}>
        <LinearGradient
          colors={['#03a2a2', '#23c2c2']}
          locations={[0.5, 1]}
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            paddingBottom: 44,
            paddingTop: 44 * 2
          }}>
          <Text testID="settings-text" type="bold" style={{ color: 'white', fontSize: 18 }}>
            Settings
          </Text>
        </LinearGradient>
      </Surface>

      <ScrollView>
        <View>
          <View
            testID="profile-text"
            style={{
              justifyContent: 'center',
              marginLeft: 20,
              marginVertical: 20
            }}>
            <Text style={styles.headline}>PROFILE INFO</Text>
          </View>
          <TouchableOpacity
            testID="open-image-picker"
            onPress={openImagePickerAsync}
            style={{
              backgroundColor: '#fff',
              borderColor: '#C8C7CC',
              borderWidth: 1,
              marginBottom: 20,
              width: 100,
              height: 100,
              borderRadius: 100,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center'
            }}>
            {selectedImage === null && <FontAwesome name="user" color="#898989" size={70} />}
            {selectedImage !== null && (
              <View style={{ flex: 1 }}>
                <Image source={{ uri: selectedImage }} style={styles.thumbnail} />
              </View>
            )}
          </TouchableOpacity>
          <View
            style={{
              paddingLeft: 20,
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              borderWidth: 1
            }}>
            <TouchableOpacity
              testID="username-btn"
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'username',
                  value: 'john.doe'
                })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Username</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>john.doe</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              testID="firstname-btn"
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'firstname',
                  value: 'John'
                })
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
              testID="lastname-btn"
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'lastname',
                  value: 'Doe'
                })
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
              testID="gender-btn"
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'gender',
                  value: 'Male'
                })
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
            <TouchableOpacity onPress={showDatepicker} style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Date of Birth</Text>
              <View
                testID="dob-btn"
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>{birthDate}</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            {show && (
              <>
                <View testID="dateTimePicker">
                  <DateTimePicker
                    value={date}
                    mode="date"
                    maximumDate={new Date(2010, 1, 1)}
                    display="default"
                    onChange={onChange}
                  />
                </View>

                {Platform.OS === 'ios' && (
                  <TouchableOpacity
                    testID="done-btn"
                    onPress={() => setShow(false)}
                    style={{
                      alignSelf: 'flex-end',
                      paddingRight: 27,
                      marginBottom: 10
                    }}>
                    <Text style={{ fontSize: 14, color: '#03A2A2' }}>Done</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>

          <View
            style={{
              marginTop: 10,
              marginBottom: 20,
              paddingHorizontal: 20,
              justifyContent: 'center'
            }}>
            <Text style={{ color: '#898989' }}>
              We ask for your date of birth so we can better personalize your content
            </Text>
          </View>

          <View
            style={{
              paddingLeft: 20,
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              borderWidth: 1
            }}>
            <TouchableOpacity
              testID="email-btn"
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
              testID="phones-btn"
              onPress={() => navigation.navigate('EditSettingsScreen', { key: 'phones' })}
              style={{ ...styles.profileField, paddingRight: 30 }}>
              <Text style={{ fontSize: 18 }}>Phones</Text>
              <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              testID="address-btn"
              onPress={() => navigation.navigate('EditSettingsScreen', { key: 'address' })}
              style={{ ...styles.profileField, paddingRight: 30 }}>
              <Text style={{ fontSize: 18 }}>Address</Text>
              <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View
            style={{
              marginVertical: 20,
              justifyContent: 'center',
              marginLeft: 20
            }}>
            <Text style={styles.headline}>SECURITY</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              borderWidth: 1,
              paddingLeft: 20
            }}>
            <TouchableOpacity
              testID="update-password-btn"
              onPress={() => navigation.navigate('EditSettingsScreen', { key: 'password' })}
              style={{ ...styles.profileField, paddingRight: 30 }}>
              <Text style={{ fontSize: 18 }}>Update Password</Text>
              <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              testID="defaut-privacy"
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'privacy',
                  value: 'username'
                })
              }
              style={styles.profileField}>
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
          <View
            style={{
              marginVertical: 20,
              justifyContent: 'center',
              marginLeft: 20
            }}>
            <Text style={styles.headline}>SOCIAL ACCOUNTS</Text>
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
                testID="facebook-btn"
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <FontAwesome
                  name="facebook-square"
                  size={30}
                  color="#1382D5"
                  style={{ marginRight: 10 }}
                />
                <Text style={{ fontSize: 18 }}>Facebook</Text>
              </View>
              <Text style={{ fontSize: 18, color: '#03A2A2' }}>Link</Text>
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
                testID="google-btn"
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <View style={{ marginRight: 10 }}>
                  <GoogleColorfulIcon />
                </View>
                <Text style={{ fontSize: 18 }}>Google</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 18, color: 'red' }}>Unlink</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View>
          <View style={{ marginVertical: 20, justifyContent: 'center', marginLeft: 20 }}>
            <Text style={styles.headline}>CONTACT US</Text>
          </View>
          <View
            testID="support-and-help"
            style={{
              height: 50,
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              borderWidth: 1
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 18 }}>Help & Support</Text>
            </TouchableOpacity>
          </View> */}
        {/* <View
            style={{
              height: 50,
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              borderWidth: 1,
              marginTop: 30
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{ fontSize: 18 }}>Rate Us</Text>
            </TouchableOpacity>
          </View> */}
        {/* </View> */}

        <View>
          <View
            style={{
              marginVertical: 20,
              justifyContent: 'center',
              marginLeft: 20
            }}>
            <Text style={styles.headline}>LEGAL</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              borderWidth: 1,
              paddingLeft: 20
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('WebViewScreen', { title: 'Privacy Policy' })}
              testID="privacy-policy">
              <View style={styles.profileField}>
                <Text style={{ fontSize: 18 }}>Privacy Policy</Text>
                <View>
                  <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
                </View>
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => navigation.navigate('WebViewScreen', { title: 'Terms of Service' })}
              testID="term-and-service-btn">
              <View style={styles.profileField}>
                <Text style={{ fontSize: 18 }}>Terms of Service</Text>
                <View>
                  <View>
                    <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <Divider />
            {/* <TouchableOpacity>
              <View style={styles.profileField}>
                <Text style={{ fontSize: 18 }}>Licenses</Text>
                <View>
                  <View>
                    <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
                  </View>
                </View>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>

        <View
          testID="logout-btn"
          style={{
            height: 50,
            backgroundColor: 'white',
            borderColor: '#C8C7CC',
            borderWidth: 1,
            marginTop: 30
          }}>
          <TouchableOpacity
            onPress={() => logout()}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View testID="_logo" style={{ marginTop: 40 }}>
          <Image style={styles.logo} source={Logo} />
        </View>

        <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 18 }}>Version {version}</Text>
          </View>
        </View>

        <View
          testID="delete-account"
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
              borderRadius: 6,
              height: '30%',
              width: '90%',
              alignSelf: 'center'
            }}
            onDismiss={() => hideDeleteModal()}>
            <View
              style={{
                alignItems: 'center',
                margin: 20,
                marginBottom: 10
              }}>
              <Text type="bold" style={{ fontSize: 24, color: '#5A7582' }}>
                Delete Account !
              </Text>
            </View>
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
                  <Button
                    testID="delete-account"
                    onPress={() => ''}
                    style={{ backgroundColor: '#f44336' }}>
                    <Text type="bold" style={{ color: '#fff' }}>
                      Delete
                    </Text>
                  </Button>
                </Surface>
                <Surface style={styles.btnSurface}>
                  <Button
                    testID="cancel-deletion"
                    onPress={() => hideDeleteModal()}
                    style={{ backgroundColor: '#03A2A2' }}>
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
    fontSize: 18
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
  },
  thumbnail: {
    width: 120,
    height: 100,
    resizeMode: 'contain'
  }
};

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  logout: logoutAction
};

export default connect(null, mapDispatchToProps)(SettingsScreen);
