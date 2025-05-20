import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";
import { NOTICE_SUBTITLE, NOTICE_TITLE } from "../json";

export const Alert = {
  success: (title, msg = "") => {
    Toast.show({
      type: "success",
      text1: title || "Request successful",
      text2: msg,
    });
  },
  error: (title, msg = "") => {
    Toast.show({
      type: "error",
      text1: title || "Request failed",
      text2: msg || "Something went wrong. Please try again",
    });
  },
};

export const Notify = {
  push: (type = "", extra = {}) => {
    if (!type) {
      return;
    }

    const title = NOTICE_TITLE[type];
    const subtitle = NOTICE_SUBTITLE[type];

    // Second, call scheduleNotificationAsync()
    Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: subtitle,
        data: extra,
      },
      trigger: null,
    });
  },
};
