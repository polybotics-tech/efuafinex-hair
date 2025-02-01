import { DEMO_PACKAGE_LIST } from "../demo_data";

export const fetch_package_data = (id) => {
  //re-edit this after server is created
  let list = DEMO_PACKAGE_LIST;

  let target;
  list.forEach((e) => {
    if (e?.package_id === id) {
      target = e;
    }
  });

  return target;
};
