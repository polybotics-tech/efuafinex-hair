import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  version: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    ACTION_STORE_APP_VERSION: (state, action) => {
      const { version } = action.payload;

      //update version state
      state.version = version;
    },
  },
});

export const { ACTION_STORE_APP_VERSION } = appSlice.actions;
export default appSlice;
