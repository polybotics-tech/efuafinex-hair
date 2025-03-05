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
