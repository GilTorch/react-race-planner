import React from 'react';
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert
} from 'react-native';
import Toast from 'react-native-root-toast';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Surface, Portal, Modal, Divider, Button, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { ImageManipulator } from 'expo-image-crop';
import { useDispatch, useSelector } from 'react-redux';
import * as Google from 'expo-google-app-auth';

import { updateUserProfile, clearRequestError } from '../redux/actions/AuthActions';
import Text from '../components/CustomText';
import Logo from '../assets/images/scriptorerum-logo.png';
import app from '../app.json';
import GoogleColorfulIcon from '../components/GoogleColorfulIcon';
import PageSpinner from '../components/PageSpinner';
import * as Facebook from '../services/facebook';
import * as Twitter from '../services/twitter';

const SettingsScreen = ({ navigation }) => {
  navigation.setOptions({
    headerShown: false
  });
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  const {
    expo: { version }
  } = app;

  const user = useSelector(state => state.auth.currentUser);
  const { _id: id } = user;
  const requestError = useSelector(state => state.auth.requestError);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const dateOfBirth = user?.dateOfBirth ? new Date(user.dateOfBirth) : new Date(687041730000);
  const picture = user?.picture || null;

  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = React.useState(dateOfBirth);
  const [show, setShow] = React.useState(false);
  const [showImageManipulator, setShowImageManipulator] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(picture);
  const [socialLink, setSocialLink] = React.useState(false);

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

  const onChange = async selectedDate => {
    let currentDate;
    if (Platform.OS === 'ios') {
      currentDate = new Date(selectedDate.nativeEvent.timestamp);
    } else {
      currentDate =
        selectedDate.type === 'set' ? new Date(selectedDate.nativeEvent.timestamp) : date;
    }
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    if (Platform.OS === 'android') {
      updateDateOfBirth(currentDate);
    }
  };

  const showDatepicker = () => setShow(!show);

  const showDeleteModal = () => setVisible(true);
  const hideDeleteModal = () => setVisible(false);

  const updateDateOfBirth = async newDate => {
    if (newDate.getTime() !== dateOfBirth.getTime()) {
      const data = await dispatch(updateUserProfile({ id, dateOfBirth: newDate }));
      if (data) {
        showSuccessMessage('update Date of Birth');
      }
    }
  };

  const showSuccessMessage = field => {
    Toast.show(`Successfully ${field}`, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM
    });
  };

  const facebookLogin = async () => {
    const facebookData = await Facebook.logIn();
    const facebookAccountId = facebookData.id;
    if (facebookAccountId) {
      const data = await dispatch(updateUserProfile({ id, facebookAccountId }));
      if (data) {
        showSuccessMessage('link to Facebook account');
      }
    }
    setSocialLink(false);
  };

  const googleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '179189574549-p2l06hbg13fqqba7nfib4nq7na5ci1lc.apps.googleusercontent.com',
        iosClientId: '179189574549-3379mn2seve0i471eqfkpgduqkgvnd98.apps.googleusercontent.com',
        scopes: ['profile']
      });

      if (result.type === 'success') {
        const googleAccountId = result.user.id;
        const data = await dispatch(updateUserProfile({ id, googleAccountId }));
        if (data) {
          showSuccessMessage('link to Google account');
        }
      }
    } catch (e) {
      console.log(e);
    }
    setSocialLink(false);
  };

  const twitterLogin = async () => {
    const { twitterAccountId } = await Twitter.authSession(true);
    if (twitterAccountId) {
      const data = await dispatch(updateUserProfile({ id, twitterAccountId }));
      if (data) {
        showSuccessMessage('link to Twitter account');
      }
    }
    setSocialLink(false);
  };

  const linkOrUnlinkAccount = async socialAccountId => {
    if (user[socialAccountId]) {
      const data = await dispatch(updateUserProfile({ id, [socialAccountId]: '' }));
      if (data) {
        showSuccessMessage('unlink the social account');
      }
    } else {
      setSocialLink(true);
      switch (socialAccountId) {
        case 'facebookAccountId':
          facebookLogin();
          break;
        case 'googleAccountId':
          googleLogin();
          break;
        case 'twitterAccountId':
          twitterLogin();
          break;
        default:
          return null;
      }
    }
    return null;
  };

  if (requestError) {
    Toast.show(requestError.message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM
    });

    dispatch(clearRequestError());
  }

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
          <View style={{ justifyContent: 'center', marginLeft: 20, marginVertical: 20 }}>
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
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'username',
                  value: { username: user.username }
                })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Username</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>{user.username || ''}</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'firstname',
                  value: { firstName: user.firstName }
                })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>First Name</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>{user.firstName || ''}</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'lastname',
                  value: { lastName: user.lastName }
                })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Last Name</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>{user.lastName || ''}</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'gender',
                  value: { gender: user.gender || '' }
                })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Gender</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>{user.gender || ''}</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity onPress={showDatepicker} style={styles.profileField}>
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
              <>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  maximumDate={new Date(2010, 1, 1)}
                  display="default"
                  onChange={onChange}
                />
                {Platform.OS === 'ios' && (
                  <TouchableOpacity
                    onPress={async () => {
                      updateDateOfBirth(date);
                      setShow(false);
                    }}
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
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'email',
                  value: { email: user.email || '' }
                })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Email</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>{user.email || ''}</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'phones',
                  value: {
                    phone1: user.phone1 || '',
                    phone2: user.phone2 || ''
                  }
                })
              }
              style={{ ...styles.profileField, paddingRight: 30 }}>
              <Text style={{ fontSize: 18 }}>Phones</Text>
              <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'address',
                  value: {
                    addressLine1: user.addressLine1 || '',
                    addressLine2: user.addressLine2 || '',
                    city: user.city || '',
                    country: user.country || ''
                  }
                })
              }
              style={{ ...styles.profileField, paddingRight: 30 }}>
              <Text style={{ fontSize: 18 }}>Address</Text>
              <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={{ marginVertical: 20, justifyContent: 'center', marginLeft: 20 }}>
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
              onPress={() => navigation.navigate('EditSettingsScreen', { key: 'password' })}
              style={{ ...styles.profileField, paddingRight: 30 }}>
              <Text style={{ fontSize: 18 }}>Update Password</Text>
              <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'privacy',
                  value: { preferences: user.preferences || 'username' }
                })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Default Privacy</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>
                  {user.preferences || 'username'}
                </Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={{ marginVertical: 20, justifyContent: 'center', marginLeft: 20 }}>
            <Text style={styles.headline}>SOCIAL ACCOUNTS</Text>
          </View>
          <View style={{ backgroundColor: 'white' }}>
            <TouchableOpacity
              onPress={() => linkOrUnlinkAccount('facebookAccountId')}
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
                <FontAwesome
                  name="facebook-square"
                  size={30}
                  color="#1382D5"
                  style={{ marginRight: 10 }}
                />
                <Text style={{ fontSize: 18 }}>Facebook</Text>
              </View>
              {!user.facebookAccountId && (
                <Text style={{ fontSize: 18, color: '#03A2A2' }}>Link</Text>
              )}
              {user.facebookAccountId && <Text style={{ fontSize: 18, color: 'red' }}>Unlink</Text>}
            </TouchableOpacity>
            <Divider style={{ marginLeft: 20 }} />
            <TouchableOpacity
              onPress={() => linkOrUnlinkAccount('googleAccountId')}
              style={{
                height: 50,
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
                <View style={{ marginRight: 10 }}>
                  <GoogleColorfulIcon />
                </View>
                <Text style={{ fontSize: 18 }}>Google</Text>
              </View>
              {!user.googleAccountId && (
                <Text style={{ fontSize: 18, color: '#03A2A2' }}>Link</Text>
              )}
              {user.googleAccountId && <Text style={{ fontSize: 18, color: 'red' }}>Unlink</Text>}
            </TouchableOpacity>
            <Divider style={{ marginLeft: 20 }} />
            <TouchableOpacity
              onPress={() => linkOrUnlinkAccount('twitterAccountId')}
              style={{
                height: 50,
                borderColor: '#C8C7CC',
                borderBottomWidth: 1,
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
                <FontAwesome
                  name="twitter-square"
                  size={30}
                  color="#1ca0f1"
                  style={{ marginRight: 10 }}
                />
                <Text style={{ fontSize: 18 }}>Twitter</Text>
              </View>
              {!user.twitterAccountId && (
                <Text style={{ fontSize: 18, color: '#03A2A2' }}>Link</Text>
              )}
              {user.twitterAccountId && <Text style={{ fontSize: 18, color: 'red' }}>Unlink</Text>}
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={{ marginVertical: 20, justifyContent: 'center', marginLeft: 20 }}>
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
          <View style={{ marginVertical: 20, justifyContent: 'center', marginLeft: 20 }}>
            <Text style={styles.headline}>LEGAL</Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderColor: '#C8C7CC',
              borderWidth: 1,
              paddingLeft: 20
            }}>
            <TouchableOpacity>
              <View style={styles.profileField}>
                <Text style={{ fontSize: 18 }}>Privacy Policy</Text>
                <View>
                  <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
                </View>
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity>
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
            <TouchableOpacity>
              <View style={styles.profileField}>
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
                  <Button onPress={() => ''} style={{ backgroundColor: '#f44336' }}>
                    <Text type="bold" style={{ color: '#fff' }}>
                      Delete
                    </Text>
                  </Button>
                </Surface>
                <Surface style={styles.btnSurface}>
                  <Button onPress={() => hideDeleteModal()} style={{ backgroundColor: '#03A2A2' }}>
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
      <PageSpinner visible={loading} />
      <PageSpinner visible={socialLink} />
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

export default SettingsScreen;
