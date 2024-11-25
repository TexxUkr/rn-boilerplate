import { FC } from 'react';
import { Screen, Text, Switch } from '@/components';
import { AppDrawerStackScreenProps } from '@/navigators/AppDrawerNavigator';
import { screenName } from '@/navigators/screenName';

import styled from '@emotion/native';
import { useAppTheme } from '@/utils/useAppTheme';

const SwitchContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 10,
});

const Container = styled(Screen)({
  flexDirection: 'column',
  paddingHorizontal: 10,
});

interface SettingScreenProps
  extends AppDrawerStackScreenProps<
    typeof screenName.appDrawerStack.settings
  > {}

export const SettingsScreen: FC<SettingScreenProps> = () => {
  const { setThemeContextOverride, themeContext } = useAppTheme();
  return (
    <Container preset="scroll" unsafe>
      <SwitchContainer>
        <Text tx="settings:darkTheme" />
        <Switch
          value={themeContext !== 'light'}
          onValueChange={value =>
            setThemeContextOverride(value ? 'dark' : 'light')
          }
        />
      </SwitchContainer>
    </Container>
  );
};
