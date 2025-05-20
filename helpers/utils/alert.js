import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";

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
  push: () => {
    // Second, call scheduleNotificationAsync()
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Look at that notification",
        body: "I'm so proud of myself!",
      },
      trigger: null,
    });
  },
};
