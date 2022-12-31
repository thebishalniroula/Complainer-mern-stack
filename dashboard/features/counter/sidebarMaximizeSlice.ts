import { createSlice } from "@reduxjs/toolkit";

interface SidebarMaximizeType {
  value: boolean;
}
const initialState: SidebarMaximizeType = {
  value: true,
};

export const sidebarMaximizeSlice = createSlice({
  name: "sidebarMaximize",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.value = !state.value;
    },
  },
});
export const { toggleSidebar } = sidebarMaximizeSlice.actions;
export default sidebarMaximizeSlice.reducer;
