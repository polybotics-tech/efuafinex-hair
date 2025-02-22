import axios from "axios";
import { END_POINTS } from "../api/endpoints";
import { HEADERS } from "../api/header";
import { Alert } from "../utils/alert";

export const FAQS_HOOKS = {
  fetch_faqs: async (setLoader = () => {}, page) => {
    try {
      setLoader(true);

      const { data } = await axios.get(
        END_POINTS.admin.faqs(page),
        HEADERS.json()
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
  fetch_contact_info: async (setLoader = () => {}) => {
    try {
      setLoader(true);

      const { data } = await axios.get(
        END_POINTS.admin.contact_info,
        HEADERS.json()
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
};
