import axios from "axios";
import store from "../../redux/store";
import { END_POINTS } from "../api/endpoints";
import { HEADERS } from "../api/header";
import { Alert } from "../utils/alert";

export const PACKAGE_HOOKS = {
  create_new_package: async (form, setLoader = () => {}) => {
    try {
      setLoader(true);

      //spread form
      const { has_photo, photo } = form;

      //check has_photo choice and if photo is required
      if (has_photo && !photo?.uri) {
        Alert.error(
          "request failed",
          "Select a photo or turn off 'Add Screenshot Photo'"
        );
        return;
      }

      //initialize form data
      const formData = new FormData();

      //append all form value to form data
      for (let prop in form) {
        if (prop === "photo") {
          if (has_photo) {
            formData.append("file", form[prop]);
          }
        } else {
          formData.append(prop, form[prop]);
        }
      }

      const token = store.getState()?.user?.token;

      const { data } = await axios.post(
        END_POINTS.package.create,
        formData,
        HEADERS.form(token)
      );

      const { success, message } = data;
      if (success) {
        Alert.success("request successful", message);
        const res = data?.data;

        return res;
      }
    } catch (error) {
      Alert.error("request failed", HEADERS.error_extractor(error));
    } finally {
      setLoader(false);
    }
  },
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
