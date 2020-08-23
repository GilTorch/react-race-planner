import Constants from 'expo-constants';
import { Platform } from 'react-native';
import {
  ANDROID_SERVER_URL,
  IOS_SERVER_URL,
  USER_AVATAR_UPLOAD_LOCATION,
} from 'react-native-dotenv';
import moment from 'moment';

const platformServerURL = Platform.OS === 'android' ? ANDROID_SERVER_URL : IOS_SERVER_URL;

export const getUserProfileUri = (userPicture) => {
  if (!userPicture) {
    return null;
  }

  if (userPicture.startsWith('http')) {
    return userPicture;
  }

  const baseUri = Constants.isDevice ? ANDROID_SERVER_URL : platformServerURL;
  const profileUri = `${baseUri}/${USER_AVATAR_UPLOAD_LOCATION}/${userPicture}`;

  return profileUri;
};

export const avatarGenerator = (username) => `https://api.adorable.io/avatars/${username}.png`;

export const getStoryPartsEndstime = (story) => {
  const roundSubmittingEndsAt = moment(story?.roundSubmittingStartedAt).add(
    story.settings?.roundTimeLimitSeconds,
    'seconds',
  );
  const introSubmittingEndsAt = moment(story.introSubmittingStartedAt).add(
    story.settings?.introTimeLimitSeconds,
    'seconds',
  );
  const introVotingEndsAt = moment(story.introVotingStartedAt).add(
    story.settings?.voteTimeLimitSeconds,
    'seconds',
  );
  const outroSubmittingEndsAt = moment(story.outroSubmittingStartedAt).add(
    story.settings?.outroTimeLimitSeconds,
    'seconds',
  );
  const outroVotingEndsAt = moment(story.outroVotingStartedAt).add(
    story.settings?.voteTimeLimitSeconds,
    'seconds',
  );
  return {
    roundSubmittingEndsAt,
    introSubmittingEndsAt,
    introVotingEndsAt,
    outroSubmittingEndsAt,
    outroVotingEndsAt,
  };
};
