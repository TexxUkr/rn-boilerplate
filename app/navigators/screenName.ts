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
  [P in ScreenNamesAppStack]:
    | undefined
    | { albumMbid?: string; albumName?: string; artistName?: string };
};

export const rootStack = {
  authStack: authStack.self,
  appStack: appStack.self,
};

type ScreenKeysRoot = keyof typeof rootStack;
type ScreenNamesRoot = (typeof rootStack)[ScreenKeysRoot];
export type RootStackParamList = {
  [P in ScreenNamesRoot]: undefined;
};

export type StackParamList = RootStackParamList &
  AppStackParamList &
  AuthStackParamList;

export type ScreenName =
  | ScreenNamesRoot
  | ScreenNamesAppStack
  | ScreenNamesAuthStack;

export const screenName = {
  rootStack,
  appStack,
  authStack,
};
