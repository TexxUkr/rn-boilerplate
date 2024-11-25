import {
  createDrawerNavigator,
  DrawerScreenProps,
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Pressable } from 'react-native';
import { screenName, AppDrawerStackParamList } from './screenName';
import AppNavigator from './AppNavigator';
import { Text } from '@/components';
import { SettingsScreen } from '@/screens';
import styled from '@emotion/native';

export type AppDrawerStackScreenProps<T extends keyof AppDrawerStackParamList> =
  DrawerScreenProps<AppDrawerStackParamList, T>;

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const handleLogout = () => {
    props.navigation.navigate(screenName.authStack.self);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <LogoutButton onPress={handleLogout}>
        <Text weight="medium" tx="settings:logout" />
      </LogoutButton>
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

const LogoutButton = styled(Pressable)(
  {
    alignItems: 'center',
  },
  ({ theme }) => ({
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.palette.accent300,
    borderRadius: theme.spacing.sm,
  }),
);

export default AppDrawerNavigator;
