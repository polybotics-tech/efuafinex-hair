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
      setLoader(false);
    }
  },
  fetch_package_deposits: async (setLoader = () => {}, package_id, page) => {
    try {
      setLoader(true);

      const token = store.getState()?.user?.token;

      const { data } = await axios.get(
        END_POINTS.deposit.package_records(package_id, page),
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
  make_deposit: async (setLoader = () => {}, package_id, form) => {
    try {
      setLoader(true);

      const token = store.getState()?.user?.token;

      const { data } = await axios.post(
        END_POINTS.deposit.make_deposit(package_id),
        form,
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
  verify_transaction: async (setLoader = () => {}, transaction_ref) => {
    try {
      setLoader(true);

      const token = store.getState()?.user?.token;

      const { data } = await axios.get(
        END_POINTS.deposit.verify_transaction(transaction_ref),
        HEADERS.json(token)
      );

      const { success, message } = data;
      if (success) {
        const res = data?.data;

        return res;
      }
    } catch (error) {
      Alert.error(
        "Request failed",
        "Transaction verification process was interrupted"
      );
      return false;
    } finally {
      setLoader(false);
    }
  },
};
