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
  },
});

export const { ACTION_LOG_USER_IN } = userSlice.actions;
export default userSlice;
