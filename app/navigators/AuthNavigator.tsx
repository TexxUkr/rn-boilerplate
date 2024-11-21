import { LoginScreen } from '../screens/auth';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { screenName, AuthStackParamList } from './screenName';

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenName.authStack.login} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
