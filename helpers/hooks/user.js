import axios from "axios";
import { HEADERS } from "../api/header";
import store from "../../redux/store";
import { END_POINTS } from "../api/endpoints";
import {
  ACTION_LOG_USER_IN,
  ACTION_UPDATE_USER_THUMBNAIL,
} from "../../redux/reducer/userSlice";
import { Alert } from "../utils/alert";
import { LOCAL_STORAGE } from "../local-storage";

export const USER_HOOKS = {
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
};
