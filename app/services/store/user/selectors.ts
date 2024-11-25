import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/services/store/index';
import { UserState } from './index';

const userSelector = (state: RootState): UserState => state.user;
export const selectUserLoggedIn = createSelector(
  userSelector,
  state => state.isAuthed,
);
