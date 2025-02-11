import axios from "axios";
import { Alert } from "../utils/alert";
import { END_POINTS } from "../api/endpoints";
import { HEADERS } from "../api/header";
import store from "../../redux/store";
import {
  ACTION_LOG_USER_IN,
  ACTION_LOG_USER_OUT,
} from "../../redux/reducer/userSlice";
import { LOCAL_STORAGE } from "../local-storage";
import { ACTION_CLEAR_NOTIFICATION_RECORDS } from "../../redux/reducer/notificationSlice";

export const AUTH_HOOKS = {
  attempt_login: async (form = {}, setLoader = () => {}) => {
    try {
      setLoader(true);

      const { data } = await axios.post(
        END_POINTS.auth.login,
        form,
        HEADERS.json()
      );

      const { success, message } = data;
      if (success) {
        Alert.success("login successful", message);

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
      Alert.error("login failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  attempt_register: async (form = {}, setLoader = () => {}) => {
    try {
      setLoader(true);

      const { data } = await axios.post(
        END_POINTS.auth.register,
        form,
        HEADERS.json()
      );

      const { success, message } = data;
      if (success) {
        Alert.success("registration successful", message);

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
      Alert.error("registration failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  revalidate_token: async (setLoader = () => {}) => {
    try {
      setLoader(true);

      //check if token stored in local storage
      const token = await LOCAL_STORAGE.read(LOCAL_STORAGE.paths.token);

      if (!token) {
        return false;
      }

      const { data } = await axios.get(
        END_POINTS.auth.revalidate,
        HEADERS.json(token)
      );

      const { success, message } = data;
      if (success) {
        const res = data?.data;
        //extract user
        const { user } = res;

        //update user global state
        store.dispatch(ACTION_LOG_USER_IN({ user, token }));
        return true;
      }
    } catch (error) {
      return false;
    } finally {
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  },
  attempt_logout: async (setLoader = () => {}) => {
    try {
      setLoader(true);

      //delete token from local storage
      await LOCAL_STORAGE.delete(LOCAL_STORAGE.paths.token);

      //remove user and token from global state
      store.dispatch(ACTION_LOG_USER_OUT());

      //remove notifications from global state
      store.dispatch(ACTION_CLEAR_NOTIFICATION_RECORDS());

      Alert.success("Request successful", "You have been logged out of device");
      return true;
    } catch (error) {
      Alert.error("Request failed", error?.message);
      return false;
    } finally {
      setLoader(false);
    }
  },
  send_to_login: async () => {
    try {
      const global_version = store.getState().app.version;

      //fetch app version from local storage
      let local_version = await LOCAL_STORAGE.read(
        LOCAL_STORAGE.paths.app_version
      );

      if (!local_version) {
        //store app version in local storage
        await LOCAL_STORAGE.save(
          LOCAL_STORAGE.paths.app_version,
          global_version
        );
        return false;
      }

      //compare if both versions match
      if (local_version != global_version) {
        //store update app version in local storage
        await LOCAL_STORAGE.save(
          LOCAL_STORAGE.paths.app_version,
          global_version
        );
        return false;
      }

      return true;
    } catch (error) {
      Alert.error("Request failed", error?.message);
      return false;
    }
  },
  forgot_verify_email: async (form = {}, setLoader = () => {}) => {
    try {
      setLoader(true);

      const { data } = await axios.post(
        END_POINTS.auth.forgot,
        form,
        HEADERS.json()
      );

      const { success, message } = data;
      if (success) {
        const res = data?.data;
        //extract user and token
        const { user } = res;

        //update user global state
        store.dispatch(ACTION_LOG_USER_IN({ user, token: "" }));
        return true;
      }
    } catch (error) {
      Alert.error("Email verification failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  reset_pass: async (form = {}, setLoader = () => {}) => {
    try {
      setLoader(true);

      //check if token stored in global state
      const token = store.getState()?.user?.token;

      const { data } = await axios.put(
        END_POINTS.auth.reset_pass,
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
      Alert.error("Password reset failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  generate_otp: async (form = {}, setLoader = () => {}) => {
    try {
      setLoader(true);

      const { data } = await axios.post(
        END_POINTS.auth.generate_otp,
        form,
        HEADERS.json()
      );

      const { success, message } = data;
      if (success) {
        const res = data?.data;

        return res;
      }
    } catch (error) {
      Alert.error("OTP generation failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  verify_otp: async (form = {}, setLoader = () => {}) => {
    try {
      setLoader(true);

      const { data } = await axios.post(
        END_POINTS.auth.verify_otp,
        form,
        HEADERS.json()
      );

      const { success, message } = data;
      if (success) {
        Alert.success("verification successful", message);

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
      Alert.error("OTP verification failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
};
