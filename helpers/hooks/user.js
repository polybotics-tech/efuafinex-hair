import axios from "axios";
import { HEADERS } from "../api/header";
import store from "../../redux/store";
import { END_POINTS } from "../api/endpoints";
import {
  ACTION_LOG_USER_IN,
  ACTION_LOG_USER_OUT,
  ACTION_UPDATE_USER_THUMBNAIL,
} from "../../redux/reducer/userSlice";
import { Alert } from "../utils/alert";
import { LOCAL_STORAGE } from "../local-storage";
import {
  ACTION_CLEAR_NOTIFICATION_RECORDS,
  ACTION_UPDATE_LATEST_NOTIFICATION_ID,
  ACTION_UPDATE_LATEST_NOTIFICATIONS,
  ACTION_UPDATE_NOTIFICATION_HAS_UNREAD,
} from "../../redux/reducer/notificationSlice";
import { ACTION_TOGGLE_APP_THEME } from "../../redux/reducer/appSlice";

export const USER_HOOKS = {
  fetch_theme_preference: async () => {
    //fetch locally saved theme
    let theme = await LOCAL_STORAGE.read(LOCAL_STORAGE.paths.app_theme);

    if (theme && theme != "") {
      //save to global storage
      store.dispatch(ACTION_TOGGLE_APP_THEME({ theme }));
    } else {
      store.dispatch(ACTION_TOGGLE_APP_THEME({ theme: "light" }));
      await LOCAL_STORAGE.save(LOCAL_STORAGE.paths.app_theme, "light");
    }
  },
  toggle_theme_preference: async () => {
    try {
      const current_theme = store.getState().app.theme;

      let theme;
      if (current_theme === "light") {
        theme = "dark";
      } else {
        theme = "light";
      }

      //save to global and local storage
      store.dispatch(ACTION_TOGGLE_APP_THEME({ theme }));

      await LOCAL_STORAGE.save(LOCAL_STORAGE.paths.app_theme, theme);

      //alert user
      Alert.success(
        "Theme update successful",
        `App theme preference set to ${theme} mode`
      );

      return true;
    } catch (error) {
      Alert.error("Theme update failed", HEADERS.error_extractor(error));
      return false;
    }
  },
  update_user_thumbnail: async (setLoader = () => {}, photo) => {
    try {
      setLoader(true);

      const form = new FormData();
      form.append("file", photo);

      const token = store.getState()?.user?.token;

      const { data } = await axios.put(
        END_POINTS.user.thumbnail,
        form,
        HEADERS.form(token)
      );

      const { success, message } = data;
      if (success) {
        Alert.success("Profile updated", message);

        const res = data?.data;
        const { user } = res;

        const { thumbnail, thumbnail_blur } = user;

        store.dispatch(
          ACTION_UPDATE_USER_THUMBNAIL({ thumbnail, thumbnail_blur })
        );

        return true;
      }
    } catch (error) {
      Alert.error("Request failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  update_account: async (form = {}, setLoader = () => {}) => {
    try {
      setLoader(true);

      //check if token stored in global state
      const token = store.getState()?.user?.token;

      const { data } = await axios.put(
        END_POINTS.user.account,
        form,
        HEADERS.json(token)
      );

      const { success, message } = data;
      if (success) {
        Alert.success("request successful", message);

        const res = data?.data;
        //extract user and token
        const { user } = res;

        //update user global state
        store.dispatch(ACTION_LOG_USER_IN({ user }));
        return true;
      }
    } catch (error) {
      Alert.error("request failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  delete_account: async (setLoader = () => {}) => {
    try {
      setLoader(true);

      //check if token stored in global state
      const token = store.getState()?.user?.token;

      const { data } = await axios.delete(
        END_POINTS.user.account,
        HEADERS.json(token)
      );

      const { success, message } = data;
      if (success) {
        Alert.success("request successful", message);

        const res = data?.data;

        //delete token from local storage
        await LOCAL_STORAGE.delete(LOCAL_STORAGE.paths.token);

        //remove user and token from global state
        store.dispatch(ACTION_LOG_USER_OUT());

        //remove notifications from global state
        store.dispatch(ACTION_CLEAR_NOTIFICATION_RECORDS());

        Alert.success(
          "Account Deleted",
          "You will be logged out of device now"
        );

        return true;
      }
    } catch (error) {
      Alert.error("request failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  update_pass: async (form = {}, setLoader = () => {}) => {
    try {
      setLoader(true);

      //check if token stored in global state
      const token = store.getState()?.user?.token;

      const { data } = await axios.put(
        END_POINTS.user.pass,
        form,
        HEADERS.json(token)
      );

      const { success, message } = data;
      if (success) {
        Alert.success("request successful", message);

        const res = data?.data;
        //extract user and token
        const { user, token } = res;

        //store token in local storage
        await LOCAL_STORAGE.save(LOCAL_STORAGE.paths.token, token);

        //update user global state
        store.dispatch(ACTION_LOG_USER_IN({ user, token }));
        return true;
      }
    } catch (error) {
      Alert.error("request failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  update_notify: async (form = {}, setLoader = () => {}) => {
    try {
      setLoader(true);

      //check if token stored in global state
      const token = store.getState()?.user?.token;

      const { data } = await axios.put(
        END_POINTS.user.notify,
        form,
        HEADERS.json(token)
      );

      const { success, message } = data;
      if (success) {
        Alert.success("request successful", message);

        const res = data?.data;
        //extract user and token
        const { user } = res;

        //update user global state
        store.dispatch(ACTION_LOG_USER_IN({ user }));
        return true;
      }
    } catch (error) {
      Alert.error("request failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  fetch_notifications: async () => {
    try {
      const token = store.getState()?.user?.token;

      if (!token) {
        return false;
      }

      const { data } = await axios.get(
        END_POINTS.user.notifications(1),
        HEADERS.json(token)
      );

      const { success, message } = data;
      if (success) {
        const res = data?.data;
        const { notifications } = res;

        console.log("single notification: ", notifications[0]);

        //update notifications list in global state
        store.dispatch(ACTION_UPDATE_LATEST_NOTIFICATIONS({ notifications }));

        //update latest_id
        store.dispatch(
          ACTION_UPDATE_LATEST_NOTIFICATION_ID({
            latest_id: notifications[0]?.notification_id,
          })
        );

        return true;
      }
    } catch (error) {
      return false;
    }
  },
  validate_notification_latest_id: async (latest_id) => {
    const local_id = await LOCAL_STORAGE.read(
      LOCAL_STORAGE.paths.latest_notification_id
    );

    //means it's a new id
    if (latest_id != local_id) {
      //update global has unread
      store.dispatch(
        ACTION_UPDATE_NOTIFICATION_HAS_UNREAD({ has_unread: true })
      );

      //update local storage id
      await LOCAL_STORAGE.save(
        LOCAL_STORAGE.paths.latest_notification_id,
        latest_id
      );

      //push local notification
    }
  },
  mark_notifications_read: async () => {
    //update global has unread
    store.dispatch(
      ACTION_UPDATE_NOTIFICATION_HAS_UNREAD({ has_unread: false })
    );
  },
};
