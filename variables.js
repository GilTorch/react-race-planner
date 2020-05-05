import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const prodUrl = 'http://localhost:3000/api/v1';

const ENV = {
  dev: {
    apiUrl: Platform.OS === 'ios' ? 'http://localhost:3000/api/v1' : 'http://10.0.2.2:3000/api/v1'
  },
  staging: {
    apiUrl: prodUrl
  },
  prod: {
    apiUrl: prodUrl
  }
};

function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return ENV.dev;
  if (env.indexOf('dev') !== -1) return ENV.dev;
  if (env.indexOf('staging') !== -1) return ENV.staging;
  if (env.indexOf('prod') !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);
