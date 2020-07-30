/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ScrollView, Image, View, TouchableOpacity, Platform, SafeAreaView, StatusBar, Alert } from 'react-native';
import Toast from 'react-native-root-toast';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { Surface, Portal, Modal, Divider, Button, TextInput, ActivityIndicator } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { ImageManipulator } from 'expo-image-crop';
import { useSelector, connect } from 'react-redux';

import Menu, { MenuItem } from 'react-native-material-menu';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
import { ANDROID_SERVER_URL, IOS_SERVER_URL, USER_AVATAR_UPLOAD_LOCATION, GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from 'react-native-dotenv';

import moment from 'moment';
import * as Google from 'expo-google-app-auth';
import * as Facebook from '../services/facebook';
import * as Twitter from '../services/twitter';
import { logoutAction, deleteAccountAction } from '../redux/actions/AuthActions';
import { updateUserAction } from '../redux/actions/UserActions';

import Text from '../components/CustomText';
import Logo from '../assets/images/scriptorerum-logo.png';
import app from '../app.json';
import CustomStatusBar from '../components/StatusBar';
import GoogleColorfulIcon from '../components/GoogleColorfulIcon';

const platformServerURL = Platform.OS === 'android' ? ANDROID_SERVER_URL : IOS_SERVER_URL;

const SettingsScreen = ({ navigation, logout, updateUser, deleteAccount }) => {
  const {
    expo: { version }
  } = app;
  let imageUrl;

  const user = useSelector(state => state.auth.currentUser);
  const [linkingFbLoading, setLinkingFbLoading] = useState(false);
  const [linkingTwitterLoading, setLinkingTwitterLoading] = useState(false);
  const [linkingGoogleLoading, setLinkingGoogleLoading] = useState(false);

  const dateOfBirth = user?.dateOfBirth ? new Date(user?.dateOfBirth) : new Date(687041730000);
  const [modalUsername, setModalUsername] = useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [date, setDate] = React.useState(dateOfBirth);
  const [show, setShow] = React.useState(false);
  const [showImageManipulator, setShowImageManipulator] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(user?.picture);
  const birthDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const [socialAccountFieldName, setSocialAccountFieldName] = useState();
  const [socialName, setSocialName] = useState();
  const menuRef = React.useRef();
  imageUrl = `${Constants.isDevice ? ANDROID_SERVER_URL : platformServerURL}/${
    USER_AVATAR_UPLOAD_LOCATION
    }/${user?.picture}`;

  // If it starts with http, it's probably from a social account login
  if (user?.picture?.startsWith('http')) {
    imageUrl = user?.picture;
  }

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(false);
      StatusBar.setBarStyle('dark-content');
    }, [])
  );

  // const showMenu = () => menuRef.current.show();
  const hideMenu = () => menuRef.current.hide();

  const openImagePickerAsync = async () => {
    // Prompt the user for the CAMERA_ROLL permission. If they have already
    // granted access, response will be successful
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);

    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    if (!Constants.isDevice) {
      Alert.alert('Camera access is not available on the emulator/simulator');
      return;
    }

    // Display the system UI for taking a photo with the camera
    const { cancelled, uri } = await ImagePicker.launchCameraAsync();

    if (cancelled === true) {
      Toast.show('You cancelled taking the picture', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });
      return;
    }

    setSelectedImage(uri);
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

  const showDeleteModal = () => setModalVisible(true);
  const hideDeleteModal = () => setModalVisible(false);

  const updateDateOfBirth = async newDate => {
    if (newDate.getTime() !== dateOfBirth.getTime()) {
      try {
        await updateUser({
          id: user?._id, data: {
            dateOfBirth: newDate
          }
        });

        Toast.show('Successfully updated', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM
        });
      } catch (e) {
        Toast.show(e.message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM
        });
      }
    }
  };

  const updateProfilePicture = async uri => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    // eslint-disable-next-line no-undef
    const formData = new FormData();

    // User avatars are saved in this format:
    // [USER-FIRST-NAME]-[USER-LAST-NAME]-[USER-ID-IN-THE-DB]-[UNIX-TIMESTAMP-AT-TIME-OF-UPLOAD].[FILE-TYPE]
    const fileName = `${user?.firstName.toLowerCase()}-${user?.lastName.toLowerCase()}-${
      user?._id
      // eslint-disable-next-line prettier/prettier
      }-${moment().unix()}.${fileType}`;

    formData.append('picture', {
      uri,
      name: fileName,
      type: `image/${fileType}`
    });

    try {
      updateUser({ id: user?._id, data: formData });
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
  };

  const showSuccessMessage = message => {
    Toast.show(`Successfully ${message}`, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM
    });
  };

  const linkToTwitterAccount = async () => {
    const { twitterAccountId } = await Twitter.authSession(true);
    if (twitterAccountId) {
      setLinkingTwitterLoading(true);
      await linkSocialAcount('Twitter', twitterAccountId);
      setLinkingTwitterLoading(false);
    }
  };

  const linkToFacebookAccount = async () => {
    const facebookData = await Facebook.logIn();
    const facebookAccountId = facebookData.id;
    if (facebookAccountId) {
      setLinkingFbLoading(true);
      await linkSocialAcount('Facebook', facebookAccountId);
      setLinkingFbLoading(false);
    }
  };

  const linkToGoogleAccount = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        scopes: ['profile']
      });

      if (result.type === 'success') {
        setLinkingGoogleLoading(true);
        const googleAccountId = result.user?.id;
        await linkSocialAcount('Google', googleAccountId);
        setLinkingGoogleLoading(false);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  const linkSocialAcount = async (accountName, socialId) => {
    try {
      let socialFieldName;
      if (accountName === 'Facebook') {
        socialFieldName = 'facebookAccountId';
      } else if (accountName === 'Twitter') {
        socialFieldName = 'twitterAccountId';
      } else if (accountName === 'Google') {
        socialFieldName = 'googleAccountId';
      }
      await updateUser({ id: user._id, data: { [socialFieldName]: socialId, link: true } });

      Toast.show(`Successfully link to ${accountName} account`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
  };

  const unlinkSocialAccount = async () => {
    try {
      if (socialName === 'Facebook') {
        setLinkingFbLoading(true);
        await updateUser({ id: user._id, data: { socialAccountFieldName, link: false } });
      } else if (socialName === 'Twitter') {
        setLinkingTwitterLoading(true);
        await updateUser({ id: user._id, data: { socialAccountFieldName, link: false } });
      } else if (socialName === 'Google') {
        setLinkingGoogleLoading(true);
        await updateUser({ id: user._id, data: { socialAccountFieldName, link: false } });
      }
      showSuccessMessage(`unlink to ${socialName} account`);
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
    setLinkingFbLoading(false);
    setLinkingTwitterLoading(false);
    setLinkingGoogleLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (user?.username === modalUsername) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        await deleteAccount(user?._id);
      } catch (e) {
        let toastMessage = e?.message || 'Something unexpected happened';

        if (e?.code === 'ServerError') {
          toastMessage = 'Something unexpected happened';
        }

        Toast.show(toastMessage, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM
        });
      }
    } else {
      Toast.show('Enter your username to confirm you want to delete your account', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />

      {selectedImage && (
        <ImageManipulator
          photo={{
            uri: selectedImage.startsWith('file://')
              ? selectedImage
              : imageUrl
          }}
          isVisible={showImageManipulator}
          onPictureChoosed={({ uri: uriM }) => {
            updateProfilePicture(uriM);
          }}
          onToggleModal={() => setShowImageManipulator(false)}
        />
      )}

      <ScrollView>
        <SafeAreaView>
          <View
            testID="profile-text"
            style={{
              justifyContent: 'center',
              marginLeft: 20,
              marginVertical: 15
            }}>
            <Text style={styles.headline}>PROFILE INFO</Text>
          </View>
          <Menu
            ref={menuRef}
            style={{ marginLeft: 150, marginTop: 50 }}
            button={
              <TouchableOpacity
                onPress={() => {
                  // TODO: We'll implement this feature soon
                  // if (selectedImage) {
                  //   showMenu();
                  // } else {
                  //   openImagePickerAsync();
                  // }

                  openImagePickerAsync();
                }}
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
                {!selectedImage && <FontAwesome name="user" color="#898989" size={70} />}
                {selectedImage && (
                  <View style={{ flex: 1 }}>
                    <Image source={{
                      uri: selectedImage.startsWith('file://')
                        ? selectedImage
                        : imageUrl
                    }} style={styles.thumbnail} />
                  </View>
                )}
              </TouchableOpacity>
            }>
            <MenuItem
              onPress={() => {
                setShowImageManipulator(true);
                hideMenu();
              }}>
              Edit Photo
            </MenuItem>
            <MenuItem
              onPress={() => {
                openImagePickerAsync();
                hideMenu();
              }}>
              Choose Photo
            </MenuItem>
            <MenuItem
              onPress={() => {
                setSelectedImage(null);
                hideMenu();
                // TODO: api endpoint or logic to remove the picture on the server
              }}
              textStyle={{ color: 'red' }}>
              Delete Photo
            </MenuItem>
          </Menu>
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
                  value: { username: user?.username }
                })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Username</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>{user?.username || ''}</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              testID="firstname-btn"
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'firstname',
                  value: { firstName: user?.firstName }
                })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>First Name</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>{user?.firstName || ''}</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              testID="lastname-btn"
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'lastname',
                  value: { lastName: user?.lastName }
                })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Last Name</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>{user?.lastName || ''}</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              testID="gender-btn"
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'gender',
                  value: { gender: user?.gender || '' }
                })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Gender</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>{user?.gender || ''}</Text>
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
                    onPress={async () => {
                      updateDateOfBirth(date);
                      setShow(false);
                    }}
                    testID="done-btn"
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
                  value: { email: user?.email || '' }
                })
              }
              style={styles.profileField}>
              <Text style={{ fontSize: 18 }}>Email</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text style={{ fontSize: 18, color: '#898989' }}>{user?.email || ''}</Text>
                <MaterialIcons style={{ color: '#C7C7CC' }} size={22} name="keyboard-arrow-right" />
              </View>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'phones',
                  value: {
                    phone1: user?.phone1 || '',
                    phone2: user?.phone2 || ''
                  }
                })
              }
              testID="phones-btn"
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
                    addressLine1: user?.addressLine1 || '',
                    addressLine2: user?.addressLine2 || '',
                    city: user?.city || '',
                    country: user?.country || ''
                  }
                })
              }
              testID="address-btn"
              style={{ ...styles.profileField, paddingRight: 30 }}>
              <Text style={{ fontSize: 18 }}>Address</Text>
              <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

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
            {/* <TouchableOpacity
              testID="update-password-btn"
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'password',
                  value: { preferences: user?.preferences }
                })
              }
              style={{ ...styles.profileField, paddingRight: 30 }}>
              <Text style={{ fontSize: 18 }}>Update Password</Text>
              <Ionicons style={{ color: '#C7C7CC' }} size={24} name="ios-arrow-forward" />
            </TouchableOpacity> */}
            <Divider />
            <TouchableOpacity
              testID="defaut-privacy"
              onPress={() =>
                navigation.navigate('EditSettingsScreen', {
                  key: 'privacy',
                  value: { preferences: user?.preferences || '' }
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
                  {user?.preferences || ''}
                </Text>
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
              disabled={linkingFbLoading}
              onPress={() => {
                if (user?.facebookAccountId) {
                  setSocialAccountFieldName('facebookAccountId');
                  setSocialName('Facebook');
                  setConfirmModalVisible(true);
                } else {
                  linkToFacebookAccount();
                }
              }}
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
              {linkingFbLoading && (
                <ActivityIndicator color="#000" size={Platform.OS === 'android' ? 30 : 'small'} />
              )}
              {!linkingFbLoading && !user?.facebookAccountId && (
                <Text style={{ fontSize: 18, color: '#03A2A2' }}>Link</Text>
              )}
              {!linkingFbLoading && user?.facebookAccountId && (
                <Text style={{ fontSize: 18, color: 'red' }}>Unlink</Text>
              )}
            </TouchableOpacity>
            <Divider style={{ marginLeft: 20 }} />
            <TouchableOpacity
              disabled={linkingGoogleLoading}
              onPress={() => {
                if (user?.googleAccountId) {
                  setSocialAccountFieldName('googleAccountId');
                  setSocialName('Google');
                  setConfirmModalVisible(true);
                } else {
                  linkToGoogleAccount();
                }
              }}
              style={{
                height: 50,
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <View
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
              </View>
              {linkingGoogleLoading && (
                <ActivityIndicator color="#000" size={Platform.OS === 'android' ? 30 : 'small'} />
              )}
              {!linkingGoogleLoading && !user?.googleAccountId && (
                <Text style={{ fontSize: 18, color: '#03A2A2' }}>Link</Text>
              )}
              {!linkingGoogleLoading && user?.googleAccountId && <Text style={{ fontSize: 18, color: 'red' }}>Unlink</Text>}
            </TouchableOpacity>
            <Divider style={{ marginLeft: 20 }} />
            <TouchableOpacity
              disabled={linkingTwitterLoading}
              onPress={() => {
                if (user?.twitterAccountId) {
                  setSocialAccountFieldName('twitterAccountId');
                  setSocialName('Twitter');
                  setConfirmModalVisible(true);
                } else {
                  linkToTwitterAccount();
                }
              }}
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
              {linkingTwitterLoading && (
                <ActivityIndicator color="#000" size={Platform.OS === 'android' ? 30 : 'small'} />
              )}
              {!linkingTwitterLoading && !user?.twitterAccountId && (
                <Text style={{ fontSize: 18, color: '#03A2A2' }}>Link</Text>
              )}
              {!linkingTwitterLoading && user?.twitterAccountId && <Text style={{ fontSize: 18, color: 'red' }}>Unlink</Text>}
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
            visible={modalVisible}
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
              <Text type="bold" style={{ fontSize: 20, color: '#5A7582' }}>
                Before you delete your Account
              </Text>
              <Text style={{ marginTop: 10, fontSize: 16, color: '#5A7582' }}>
                Please enter your
                <Text type="bold" style={{ fontSize: 16 }}>
                  {' '}
                  username{' '}
                </Text>
                to confirm that you wish to delete your account.
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
              <TextInput
                autoCapitalize="none"
                placeholder="Enter your username"
                onChangeText={text => setModalUsername(text)}
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
                    onPress={() => handleDeleteAccount()}
                    testID="delete-account"
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
          <Modal
            dismissable={false}
            visible={confirmModalVisible}
            contentContainerStyle={{
              backgroundColor: 'white',
              borderRadius: 6,
              height: '25%',
              width: '90%',
              alignSelf: 'center'
            }}>
            <View
              style={{
                marginTop: 10,
                margin: 20,
              }}>
              <Text type="bold" style={{ fontSize: 20, color: '#5A7582' }}>
                Are you sure you want to unlink with your {socialName} account?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 'auto',
              }}>
              <Surface style={styles.btnSurface}>
                <Button
                  onPress={() => {
                    setConfirmModalVisible(false);
                    unlinkSocialAccount();
                  }}
                  testID="delete-account"
                  style={{ backgroundColor: '#f44336' }}>
                  <Text type="bold" style={{ color: '#fff' }}>
                    Unlink
                    </Text>
                </Button>
              </Surface>
              <Surface style={styles.btnSurface}>
                <Button
                  testID="cancel-deletion"
                  onPress={() => setConfirmModalVisible(false)}
                  style={{ backgroundColor: '#03A2A2' }}>
                  <Text type="bold" style={{ color: '#FFF' }}>
                    Cancel
                    </Text>
                </Button>
              </Surface>
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
  logout: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  logout: logoutAction,
  deleteAccount: deleteAccountAction,
  updateUser: updateUserAction
};

export default connect(null, mapDispatchToProps)(SettingsScreen);
