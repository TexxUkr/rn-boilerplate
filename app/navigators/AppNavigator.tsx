import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { screenName, AppStackParamList } from './screenName';
import { HomeScreen, ArtistScreen, AlbumScreen } from '@/screens';

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenName.appStack.home} component={HomeScreen} />
      <Stack.Screen
        name={screenName.appStack.artist}
        component={ArtistScreen}
      />
      <Stack.Screen name={screenName.appStack.album} component={AlbumScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
