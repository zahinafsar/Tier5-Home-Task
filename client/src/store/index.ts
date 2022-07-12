import { configureStore, combineReducers } from '@reduxjs/toolkit';
import global from './reducers/global';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  global
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useCustomDispatch = () => useDispatch<AppDispatch>();

export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
