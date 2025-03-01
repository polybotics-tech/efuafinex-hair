import axios from "axios";
import { END_POINTS } from "../api/endpoints";
import { HEADERS } from "../api/header";
import { Alert } from "../utils/alert";

export const BANNER_HOOKS = {
  fetch_banners: async (setLoader = () => {}, page) => {
    try {
      setLoader(true);

      const { data } = await axios.get(
        END_POINTS.admin.banners(page),
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
