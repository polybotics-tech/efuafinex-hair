import axios from "axios";
import { Alert } from "../utils/alert";
import { END_POINTS } from "../api/endpoints";
import { HEADERS } from "../api/header";
import store from "../../redux/store";
import { ACTION_LOG_USER_IN } from "../../redux/reducer/userSlice";
import { LOCAL_STORAGE } from "../local-storage";

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
      setTimeout(() => {
        setLoader(false);
      }, 2000);
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
};
