import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import * as Screens from '@/screens';

export type AppStackParamList = {
  Welcome: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
