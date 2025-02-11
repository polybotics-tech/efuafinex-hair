import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  latest_id: "",
  has_unread: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    ACTION_UPDATE_LATEST_NOTIFICATIONS: (state, action) => {
      const { notifications } = action.payload;

      //update notifications state
      state.notifications = notifications;
    },
    ACTION_UPDATE_LATEST_NOTIFICATION_ID: (state, action) => {
      const { latest_id } = action.payload;

      //update latest_id state
      state.latest_id = latest_id;
    },
    ACTION_UPDATE_NOTIFICATION_HAS_UNREAD: (state, action) => {
      const { has_unread } = action.payload;

      //update has_unread state
      state.has_unread = Boolean(has_unread);
    },
    ACTION_CLEAR_NOTIFICATION_RECORDS: (state) => {
      //update to initial state
      state.notifications = {};
      state.latest_id = "";
      state.has_unread = false;
    },
  },
});

export const {
  ACTION_UPDATE_LATEST_NOTIFICATIONS,
  ACTION_UPDATE_LATEST_NOTIFICATION_ID,
  ACTION_UPDATE_NOTIFICATION_HAS_UNREAD,
  ACTION_CLEAR_NOTIFICATION_RECORDS,
} = notificationSlice.actions;
export default notificationSlice;
