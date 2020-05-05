import { Platform } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';
import Toast from 'react-native-root-toast';

/**
 * Converts an object to a query string.
 */
const toQueryString = params => {
  return `?${Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')}`;
};

const authSession = async isLogin => {
  const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
  const requestTokenURL = `${baseUrl}/request-token`;
  const accessTokenURL = `${baseUrl}/access-token`;
  const userInfoURL = `${baseUrl}/users_show`;

  try {
    // Step #1 - first we need to fetch a request token to start the browser-based authentication flow
    const requestParams = toQueryString({ callback_url: AuthSession.getRedirectUrl() });
    const requestTokens = await axios.get(requestTokenURL + requestParams).then(res => res.data);
    // console.log('Request tokens fetched!', requestTokens);

    // Step #2 - after we received the request tokens, we can start the auth session flow using these tokens
    const authResponse = await AuthSession.startAsync({
      authUrl: `https://api.twitter.com/oauth/authenticate${toQueryString(requestTokens)}`
    });
    // console.log('Auth response received!', authResponse);

    // Validate if the auth session response is successful
    // if (authResponse.params && authResponse.params.denied) {
    if (authResponse.type === 'error') {
      Toast.show('You did not authorize the app', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });
      return {};
    }

    // Step #3 - when the user (successfully) authorized the app, we will receive a verification code.
    // With this code we can request an access token and finish the auth flow.
    const accessParams = toQueryString({
      oauth_token: requestTokens.oauth_token,
      oauth_token_secret: requestTokens.oauth_token_secret,
      oauth_verifier: authResponse.params.oauth_verifier
    });
    const accessTokens = await axios.get(accessTokenURL + accessParams).then(res => res.data);
    // console.log('Access tokens fetched!', accessTokens);

    if (isLogin) {
      return { twitterAccountId: accessTokens.user_id };
    }

    // ## TODO: store oauth_token and oauth_token_secret for future authenticated resquest
    const user = await axios.get(userInfoURL + toQueryString(accessTokens)).then(res => res.data);

    const [firstName, ...lastName] = user.name.split(' ');
    return {
      twitterAccountId: accessTokens.user_id,
      username: accessTokens.screen_name,
      firstName,
      lastName: lastName.join(' '),
      email: ''
    };
  } catch (error) {
    Toast.show('Something went wrong...', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM
    });
    return {};
  }
};

export { authSession };
