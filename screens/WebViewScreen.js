import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Surface, IconButton } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

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

  return (
    <View style={{ flex: 1 }}>
      <Surface
        style={{
          elevation: 3
        }}>
        <LinearGradient
          colors={['#03a2a2', '#23c2c2']}
          locations={[0.5, 1]}
          style={{
            paddingBottom: Constants.statusBarHeight,
            paddingTop: Constants.statusBarHeight * 2
          }}>
          <IconButton
            onPress={() => navigation.goBack()}
            icon="arrow-left"
            style={{ position: 'absolute', top: 85 }}
            color="white"
          />
          <Text type="bold" style={{ color: 'white', fontSize: 18, alignSelf: 'center' }}>
            {title}
          </Text>
        </LinearGradient>
      </Surface>
      <WebView source={{ uri: 'https://google.com' }} />
    </View>
  );
};

WebViewScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

export default WebViewScreen;
