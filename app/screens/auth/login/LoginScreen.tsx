import { FC, useCallback, useState } from 'react';
import { Screen } from '@/components';
import { AuthStackScreenProps } from '@/navigators/AuthNavigator';
import { GoogleSigninButton as GoogleSigninButtonComponent } from '@react-native-google-signin/google-signin';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import styled from '@emotion/native';
import { delay } from '@/utils/delay';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { userActions } from '@/services/store/user/userActions';

interface LoginScreenProps extends AuthStackScreenProps<'Login'> {}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const signInHandler = useCallback(async () => {
    setIsLoading(true);
    await delay(1000);
    dispatch(userActions.userLoggedIn());
  }, []);
  return (
    <Container preset="fixed">
      <GoogleSigninButton
        disabled={isLoading}
        size={GoogleSigninButtonComponent.Size.Wide}
        color={GoogleSigninButtonComponent.Color.Dark}
        onPress={signInHandler}
      />
      <AppleSignInButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        onPress={() => {
          if (!isLoading) {
            signInHandler();
          }
        }}
      />
      {isLoading && (
        <LoaderContainer pointerEvents="none">
          <ActivityIndicator size="large" color="lightGrey" />
        </LoaderContainer>
      )}
    </Container>
  );
};

const AppleSignInButton = styled(AppleButton)({
  width: 160,
  height: 45,
  alignSelf: 'center',
  marginTop: 20,
});

const GoogleSigninButton = styled(GoogleSigninButtonComponent)({
  alignSelf: 'center',
});

const Container = styled(Screen)(({ theme }) => ({
  ...theme.layout.fill,
  backgroundColor: theme.colors.background,
  justifyContent: 'center',
  alignItems: 'center',
}));

const LoaderContainer = styled.View(
  {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.background + '80',
  }),
);
