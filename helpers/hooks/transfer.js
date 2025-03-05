import axios from "axios";
import { END_POINTS } from "../api/endpoints";
import store from "../../redux/store";
import { Alert } from "../utils/alert";
import { HEADERS } from "../api/header";

export const TRANSFER_HOOKS = {
  verify_transfer_account: async (
    setLoader = () => {},
    account_number,
    bank_code
  ) => {
    try {
      setLoader(true);

      const { data } = await axios.post(
        END_POINTS.admin.transfer.verify_account,
        { account_number, bank_code },
        HEADERS.json()
      );

      const { success, message } = data;
      if (success) {
        Alert.success("Request successful", message);
        let res = data?.data;

        return res;
      }
    } catch (error) {
      console.log("err: ", error);
      Alert.error("Request failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  save_refund_account: async (form, setLoader = () => {}) => {
    try {
      setLoader(true);

      const token = store.getState().user.token;

      const { data } = await axios.post(
        END_POINTS.admin.transfer.refund_account,
        form,
        HEADERS.json(token)
      );

      const { success, message } = data;
      if (success) {
        Alert.success("Request successful", message);
        let res = data?.data;

        return res;
      }
    } catch (error) {
      Alert.error("Request failed", HEADERS.error_extractor(error));
      return false;
    } finally {
      setLoader(false);
    }
  },
  fetch_refund_account: async (setLoader = () => {}) => {
    try {
      setLoader(true);

      const token = store.getState().user.token;

      const { data } = await axios.get(
        END_POINTS.admin.transfer.refund_account,
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
};
