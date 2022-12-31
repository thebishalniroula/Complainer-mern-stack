import { configureStore } from "@reduxjs/toolkit";
import tabsReducer from "../features/counter/tabsSlice";
import sidebarMaximizeReducer from "../features/counter/sidebarMaximizeSlice";
import modelsReducer from "../features/counter/modelsSlice";
// import
export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    sidebar: sidebarMaximizeReducer,
    models: modelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
