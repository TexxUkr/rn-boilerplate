import { FC } from 'react';
import { Text } from '@/components';
import styled from '@emotion/native';

const RetryButton = styled.TouchableOpacity(
  {
    marginTop: 20,
    paddingVertical: 5,
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.errorBackground,
    borderRadius: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  }),
);

const EmptyListContainer = styled.View({
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

export const ErrorView: FC<{ onRetryHandler: () => void }> = ({
  onRetryHandler,
}) => (
  <EmptyListContainer>
    <Text tx="errorScreen:title" />
    <RetryButton onPress={onRetryHandler}>
      <Text tx={'common:retry'} weight="medium" size="md" />
    </RetryButton>
  </EmptyListContainer>
);
