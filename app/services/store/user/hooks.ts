import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/services/store/index';
import * as selectors from './selectors';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Hook for user selectors
 *
 * @export
 * @param
 * @returns {ReturnType}
 */

/** Is user logged in */
export function useUserLoggedInSelector() {
  const isLoggedIn: boolean = useSelector<RootState>(
    selectors.selectUserLoggedIn,
  ) as boolean;
  return isLoggedIn;
}
