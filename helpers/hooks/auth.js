import axios from "axios";
import { Alert } from "../utils/alert";
import { END_POINTS } from "../api/endpoints";
import { ErrorExtractor, HEADERS } from "../api/header";
import store from "../../redux/store";
import { ACTION_LOG_USER_IN } from "../../redux/reducer/userSlice";

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
};
