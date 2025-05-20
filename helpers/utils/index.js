import { BANK_LIST } from "../json";

export const extract_name_from_bank_code = (bank_code) => {
  let bank;

  BANK_LIST?.forEach((e) => {
    if (e?.code === bank_code) {
      bank = e;
    }
  });

  if (!bank) {
    return "Unknown Bank";
  }

  return bank?.name;
};

export const extract_latest_notification_by_id = (
  latest_id = "",
  notifications = {}
) => {
  let notice;

  if (notifications && latest_id) {
    notifications?.forEach((n) => {
      if (n?.notification_id === latest_id) {
        notice = n;
      }
    });
  }

  return notice;
};
