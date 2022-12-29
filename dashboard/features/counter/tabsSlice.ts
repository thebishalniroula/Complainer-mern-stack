import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  value: number;
}
const initialState: TabState = {
  value: 0,
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    switchTab: (state, actions: PayloadAction<number>) => {
      state.value = actions.payload;
    },
  },
});
export const { switchTab } = tabsSlice.actions;
export default tabsSlice.reducer;
