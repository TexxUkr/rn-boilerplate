import {
  createDrawerNavigator,
  DrawerScreenProps,
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer';
import { StyleSheet, Pressable } from 'react-native';
import { screenName, AppDrawerStackParamList } from './screenName';
import AppNavigator from './AppNavigator';
import { Text } from '@/components';
import { SettingsScreen } from '@/screens';

export type AppDrawerStackScreenProps<T extends keyof AppDrawerStackParamList> =
  DrawerScreenProps<AppDrawerStackParamList, T>;

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const handleLogout = () => {
    props.navigation.navigate(screenName.authStack.self);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();
export const AppDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen name={screenName.appStack.self} component={AppNavigator} />
      <Drawer.Screen
        options={{ headerShown: true }}
        name={screenName.appDrawerStack.settings}
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff6666',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppDrawerNavigator;