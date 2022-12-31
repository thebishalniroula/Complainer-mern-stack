import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  navProfileModel: boolean;
  editProfileModel: boolean;
}

const initialState: InitialState = {
  navProfileModel: false,
  editProfileModel: false,
};

export const modelSLice = createSlice({
  name: "models",
  initialState,
  reducers: {
    toggleNavProfileModel: (state) => {
      state.navProfileModel = !state.navProfileModel;
    },
    setNavProfileModel: (state) => {
      state.navProfileModel = true;
    },
    resetNavProfileModel: (state) => {
      state.navProfileModel = false;
    },
    resetEditProfileModel: (state) => {
      state.editProfileModel = false;
    },
    setEditProfileModel: (state) => {
      state.editProfileModel = true;
    },
    resetAllmodel: (state) => {
      state.editProfileModel = false;
      state.navProfileModel = false;
    },
  },
});

export default modelSLice.reducer;
export const {
  toggleNavProfileModel,
  setNavProfileModel,
  resetNavProfileModel,
  setEditProfileModel,
  resetEditProfileModel,
  resetAllmodel,
} = modelSLice.actions;
