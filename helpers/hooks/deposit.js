import axios from "axios";
import store from "../../redux/store";
import { END_POINTS } from "../api/endpoints";
import { HEADERS } from "../api/header";
import { Alert } from "../utils/alert";

export const DEPOSIT_HOOKS = {
  fetch_user_deposits: async (setLoader = () => {}, page, sort) => {
    try {
      setLoader(true);

      const token = store.getState()?.user?.token;

      const { data } = await axios.get(
        END_POINTS.deposit.multiple(page, sort),
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
  fetch_single_deposit: async (setLoader = () => {}, transaction_ref) => {
    try {
      setLoader(true);

      const token = store.getState()?.user?.token;

      const { data } = await axios.get(
        END_POINTS.deposit.single(transaction_ref),
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
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  },
};
