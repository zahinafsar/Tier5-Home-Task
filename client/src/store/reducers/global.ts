

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDashboardProp } from '../../interface/IDashboard';

interface IGlobalState {
  dashboard: IDashboardProp[]
}
const initialState: IGlobalState = {
  dashboard: []
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalStore: (state, action: PayloadAction<typeof initialState>) => {
      return ({
        ...state,
        ...action.payload,
      })
    }
  },
});

export const { setGlobalStore } = globalSlice.actions;

export default globalSlice.reducer;