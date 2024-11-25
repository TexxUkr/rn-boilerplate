/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Config from '../config';
import { navigationRef, useBackButtonHandler } from './navigationUtilities';
import AuthStack from './AuthNavigator';
import AppDrawerNavigator from './AppDrawerNavigator';
import { screenName, RootStackParamList } from './screenName';
import { StatusBar } from 'react-native';
import { useThemeProvider, themeContextToTheme } from '@/utils/useAppTheme';
import { ComponentProps } from 'react';
import {
  ThemeProvider as ThemeProviderEmotion,
  useTheme as useEmotionTheme,
} from '@emotion/react';

import { useUserLoggedInSelector } from '@/services/store/user/hooks';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const theme = useEmotionTheme();
  const isAuthed = useUserLoggedInSelector();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: theme.colors.background,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}>
      {isAuthed ? (
        <Stack.Screen
          name={screenName.rootStack.appDrawerStack}
          component={AppDrawerNavigator}
        />
      ) : (
        <Stack.Screen
          name={screenName.rootStack.authStack}
          component={AuthStack}
        />
      )}
    </Stack.Navigator>
  );
};

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer>> {}

export const RootNavigator = (props: NavigationProps) => {
  const {
    themeScheme,
    navigationTheme,
    setThemeContextOverride,
    ThemeProvider,
  } = useThemeProvider();

  useBackButtonHandler(routeName => exitRoutes.includes(routeName));

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <ThemeProviderEmotion theme={themeContextToTheme(themeScheme)}>
        <NavigationContainer
          ref={navigationRef}
          theme={navigationTheme}
          {...props}>
          {
            <StatusBar
              barStyle={
                themeScheme === 'dark' ? 'light-content' : 'dark-content'
              }
            />
          }
          <RootStack />
        </NavigationContainer>
      </ThemeProviderEmotion>
    </ThemeProvider>
  );
};
