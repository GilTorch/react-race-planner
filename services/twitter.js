import * as AuthSession from 'expo-auth-session';
import Toast from 'react-native-root-toast';

import axios from './axiosService';

/**
 * Converts an object to a query string.
 */
const toQueryString = params => {
  return `?${Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')}`;
};

const authSession = async isLogin => {
  const requestTokenURL = '/users/login/twitter/request-token';
  const accessTokenURL = '/users/login/twitter/accesss-token';
  const userInfoURL = '/users/twitter/profile';

  try {
    // Step #1 - first we need to fetch a request token to start the browser-based authentication flow
    const requestParams = toQueryString({ callback_url: AuthSession.getRedirectUrl() });
    const { twitterRequestToken } = await axios
      .get(requestTokenURL + requestParams)
      .then(res => res.data);

    // Step #2 - after we received the request tokens, we can start the auth session flow using these tokens
    const authResponse = await AuthSession.startAsync({
      authUrl: `https://api.twitter.com/oauth/authenticate${toQueryString(twitterRequestToken)}`
    });

    if (authResponse.type === 'cancel') {
      Toast.show('You cancelled the Twitter login', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });

      return {};
    }

    // Validate if the auth session response is successful
    if (authResponse.params?.denied || authResponse.type === 'error') {
      Toast.show('You did not authorize the app', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });

      return {};
    }

    // Step #3 - when the user (successfully) authorized the app, we will receive a verification code.
    // With this code we can request an access token and finish the auth flow.
    const accessParams = toQueryString({
      oauth_token: twitterRequestToken.oauth_token,
      oauth_token_secret: twitterRequestToken.oauth_token_secret,
      oauth_verifier: authResponse.params.oauth_verifier
    });
    const { twitterAccessToken } = await axios
      .get(accessTokenURL + accessParams)
      .then(res => res.data);

    if (isLogin) {
      return { twitterAccountId: twitterAccessToken.user_id };
    }

    // Step #4 - using the access tokens, we can pull more data about the user from Twitter
    // ## TODO: store oauth_token and oauth_token_secret for future authenticated resquest
    const { twitterProfile } = await axios
      .get(userInfoURL + toQueryString(twitterAccessToken))
      .then(res => res.data);

    const [firstName, ...lastName] = twitterProfile.name.split(' ');
    return {
      twitterAccountId: twitterAccessToken.user_id,
      username: twitterAccessToken.screen_name,
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
