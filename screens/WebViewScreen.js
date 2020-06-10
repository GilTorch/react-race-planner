import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, SafeAreaView, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Surface, IconButton } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { ANDROID_SERVER_URL, IOS_SERVER_URL } from 'react-native-dotenv';

import Text from '../components/CustomText';

const WebViewScreen = ({ navigation, route }) => {
  navigation.setOptions({
    headerShown: false
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  const { title } = route.params;
  const baseUri = Platform.OS === 'android' ? ANDROID_SERVER_URL : IOS_SERVER_URL;
  const uri = title === 'Privacy Policy' ? `${baseUri}/pp` : `${baseUri}/tos`;

  return (
    <View style={{ flex: 1 }}>
      <Surface
        style={{
          elevation: 3
        }}>
        <LinearGradient colors={['#03a2a2', '#23c2c2']} locations={[0.5, 1]}>
          <SafeAreaView
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start'
            }}>
            <IconButton onPress={() => navigation.goBack()} icon="arrow-left" color="white" />
            <Text type="bold" style={{ color: 'white', marginLeft: 10, fontSize: 18 }}>
              {title}
            </Text>
          </SafeAreaView>
        </LinearGradient>
      </Surface>
      <WebView source={{ uri }} />
    </View>
  );
};

WebViewScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

export default WebViewScreen;
