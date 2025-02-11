import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "./utils/alert";

const _prefix = "eha_alstrge_";

export const LOCAL_STORAGE = {
  paths: {
    token: _prefix + "token",
    app_version: _prefix + "app_version",
    latest_notification_id: _prefix + "latest_notification_id",
  },
  save: async (path, data) => {
    try {
      const jsonValue = JSON.stringify(data); //stringify data
      await AsyncStorage.setItem(path, jsonValue);
    } catch (e) {
      // saving error
      Alert.error("Error saving to storage", e?.message);
    }
  },
  read: async (path) => {
    try {
      const jsonValue = await AsyncStorage.getItem(path);
      return JSON.parse(jsonValue);
    } catch (e) {
      // error reading value
      return null;
    }
  },
  delete: async (path) => {
    try {
      await AsyncStorage.removeItem(path);
    } catch (e) {
      // remove error
      Alert.error("Error deleting from storage", e?.message);
    }
  },
};
