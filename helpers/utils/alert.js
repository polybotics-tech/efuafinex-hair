import Toast from "react-native-toast-message";

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
