import { FC, useCallback } from 'react';
import { Screen } from '@/components';
import { AuthStackScreenProps } from '@/navigators/AuthNavigator';
import { GoogleSigninButton as GoogleSigninButtonComponent } from '@react-native-google-signin/google-signin';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import styled from '@emotion/native';

interface LoginScreenProps extends AuthStackScreenProps<'Login'> {}

const signIn = async (cb: () => void) => {
  return new Promise(res => {
    setTimeout(() => {
      res(cb);
    }, 1000);
  });
};

export const LoginScreen: FC<LoginScreenProps> = () => {
  const login = useCallback(() => {}, []);
  return (
    <Container preset="fixed" safeAreaEdges={['top', 'bottom']}>
      {/* <Text testID="login-heading" tx="loginScreen:logIn" preset="heading" style={themed($logIn)} /> */}
      <GoogleSigninButton
        size={GoogleSigninButtonComponent.Size.Wide}
        color={GoogleSigninButtonComponent.Color.Dark}
        onPress={login}
      />
      <AppleSignInButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        onPress={() => null}
      />
    </Container>
  );
};

const AppleSignInButton = styled(AppleButton)`
  width: 160px;
  height: 45px;
  align-self: center;
`;

const GoogleSigninButton = styled(GoogleSigninButtonComponent)`
  align-self: center;
`;

const Container = styled(Screen)(({ theme }) => ({
  ...theme.layout.fill,
  backgroundColor: theme.colors.background,
}));
