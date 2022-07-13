

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDashboardItem, IDashboardProp } from '../../interface/IDashboard';


interface IGlobalPayloadState {
  allDashboard?: IDashboardItem[],
  dashboard?: IDashboardProp[],
  dashboardId?: string,
  dashboardName?: string,
}
interface IGlobalState {
  allDashboard: IDashboardItem[],
  dashboard: IDashboardProp[],
  dashboardId: string,
  dashboardName: string,
}
const initialState: IGlobalState = {
  allDashboard: [],
  dashboard: [],
  dashboardId: '',
  dashboardName: '',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalStore: (state, action: PayloadAction<IGlobalPayloadState>) => {
      return ({
        ...state,
        ...action.payload,
      })
    }
  },
});

export const { setGlobalStore } = globalSlice.actions;

export default globalSlice.reducer;