import { Action } from 'redux';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../utils/types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export type AppThunkDispatch = ThunkDispatch<RootState, never, Action<string>>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
