import Constants from 'expo-constants';

export const SERVER_URL =
  Constants.expoConfig?.extra?.serverUrl ||
  'http://localhost:3000';
}