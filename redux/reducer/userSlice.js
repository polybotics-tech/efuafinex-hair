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
      state.token = token;
    },
    ACTION_LOG_USER_OUT: (state) => {
      //update user and token to initial state
      state.user = {};
      state.token = "";
    },
  },
});

export const { ACTION_LOG_USER_IN, ACTION_LOG_USER_OUT } = userSlice.actions;
export default userSlice;
