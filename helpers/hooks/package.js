import axios from "axios";
import store from "../../redux/store";
import { END_POINTS } from "../api/endpoints";
import { HEADERS } from "../api/header";
import { Alert } from "../utils/alert";

export const PACKAGE_HOOKS = {
  fetch_user_packages: async (setLoader = () => {}, page, sort) => {
    try {
      setLoader(true);

      const token = store.getState()?.user?.token;

      const { data } = await axios.get(
        END_POINTS.package.multiple(page, sort),
        HEADERS.json(token)
      );

      const { success, message } = data;
      if (success) {
        const res = data?.data;

        return res;
      }
    } catch (error) {
      Alert.error("Request failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  fetch_single_package: async (setLoader = () => {}, package_id) => {
    try {
      setLoader(true);

      const token = store.getState()?.user?.token;

      const { data } = await axios.get(
        END_POINTS.package.single(package_id),
        HEADERS.json(token)
      );

      const { success, message } = data;
      if (success) {
        const res = data?.data;

        return res;
      }
    } catch (error) {
      Alert.error("Request failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  close_package: async (setLoader = () => {}, package_id) => {
    try {
      setLoader(true);

      const token = store.getState()?.user?.token;

      const { data } = await axios.put(
        END_POINTS.package.mark_complete(package_id),
        {},
        HEADERS.json(token)
      );

      const { success, message } = data;
      if (success) {
        Alert.success("Request successful", message);
        return true;
      }
    } catch (error) {
      Alert.error("Request failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
};
