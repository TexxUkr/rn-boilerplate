export const authStack = {
  self: 'AuthStack' as const,
  login: 'Login' as const,
  register: 'Register' as const,
  forgotPassword: 'ForgotPassword' as const,
  ResetPassword: 'ResetPassword' as const,
  appLoading: 'AppLoading' as const,
};

type ScreenKeysAuthStack = keyof typeof authStack;
type ScreenNamesAuthStack = (typeof authStack)[ScreenKeysAuthStack];
export type AuthStackParamList = {
  [P in ScreenNamesAuthStack]: undefined;
};

export const appDrawerStack = {
  self: 'appDrawerStack' as const,
  app: 'App' as const,
  settings: 'Settings' as const,
};

type ScreenKeysAppDrawerStack = keyof typeof appStack;
type ScreenNamesAppDrawerStack = (typeof appStack)[ScreenKeysAppDrawerStack];
export type AppDrawerStackParamList = {
  [P in ScreenNamesAppDrawerStack]: undefined;
};

export const appStack = {
  self: 'AppStack' as const,
  home: 'Home' as const,
  appLoading: 'AppLoading' as const,
  album: 'Album' as const,
  artist: 'Artist' as const,
};

type ScreenKeysAppStack = keyof typeof appStack;
type ScreenNamesAppStack = (typeof appStack)[ScreenKeysAppStack];
export type AppStackParamList = {
  [appStack.album]: {
    albumMbid: string;
    albumName: string;
    artistName: string;
  };
  [appStack.artist]: {
    artistName: string;
  };
  [appStack.home]: undefined;
  [appStack.appLoading]: undefined;
  [appStack.self]: undefined;
};

export const rootStack = {
  authStack: authStack.self,
  appDrawerStack: appDrawerStack.self,
};

type ScreenKeysRoot = keyof typeof rootStack;
type ScreenNamesRoot = (typeof rootStack)[ScreenKeysRoot];
export type RootStackParamList = {
  [P in ScreenNamesRoot]: undefined;
};

export type StackParamList = RootStackParamList &
  AppDrawerStackParamList &
  AppStackParamList &
  AuthStackParamList;

export type ScreenName =
  | ScreenNamesRoot
  | ScreenNamesAppStack
  | ScreenNamesAppStack
  | ScreenNamesAuthStack;

export const screenName = {
  rootStack,
  appDrawerStack,
  appStack,
  authStack,
};
