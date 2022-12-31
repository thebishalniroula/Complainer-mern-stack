import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  value: number | null;
}
const initialState: TabState = {
  value: null,
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    switchTab: (state, actions: PayloadAction<number | null>) => {
      state.value = actions.payload;
    },
  },
});
export const { switchTab } = tabsSlice.actions;
export default tabsSlice.reducer;
