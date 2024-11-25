import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { screenName, AppStackParamList } from './screenName';
import { HomeScreen, ArtistScreen, AlbumScreen } from '@/screens';
export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const Drawer = createDrawerNavigator();

export function AppDrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="App" component={AppNavigator} />
      <Drawer.Screen name="Settings" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

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

export default AppDrawerNavigator;
