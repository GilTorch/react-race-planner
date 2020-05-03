import Constants from 'expo-constants';

export const prodUrl = 'http://localhost:3000/api/v1';

const ENV = {
  dev: {
    apiUrl: 'http://localhost:3000/api/v1'
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
