import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    ACTION_LOG_USER_IN: (state, action) => {
      const { user, token } = action.payload;

      //update user and token state
      state.user = user;
      if (token) {
        state.token = token;
      }
    },
    ACTION_LOG_USER_OUT: (state) => {
      //update user and token to initial state
      state.user = {};
      state.token = "";
    },
    ACTION_UPDATE_USER_THUMBNAIL: (state, action) => {
      const { thumbnail, thumbnail_blur } = action.payload;

      //update user and token state
      state.user.thumbnail = thumbnail;
      state.user.thumbnail_blur = thumbnail_blur;
    },
  },
});

export const {
  ACTION_LOG_USER_IN,
  ACTION_LOG_USER_OUT,
  ACTION_UPDATE_USER_THUMBNAIL,
} = userSlice.actions;
export default userSlice;
