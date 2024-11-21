/**
 * @format
 */

export const SHOW_STORYBOOK = false;
import { AppRegistry } from 'react-native';
import App from './app/app';
import { name as appName } from './app.json';
import SplashScreen from 'react-native-splash-screen';

let RootComponent = App;
if (__DEV__ && SHOW_STORYBOOK) {
  // Only include Storybook if we're in dev mode
  const AppStorybook = require('./.storybook').default;
  RootComponent = AppStorybook;
  SplashScreen.hide();
}

AppRegistry.registerComponent(appName, () => RootComponent);
