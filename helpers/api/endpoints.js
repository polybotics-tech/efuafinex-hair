const HOST = "http://192.168.138.31:5050";
const API = HOST + "/v1";

export const END_POINTS = {
  home: HOST,
  media: (url) => HOST + url,
  auth: {
    login: API + "/auth/login",
    revalidate: API + "/auth/revalidate",
  },
  user: {
    notify: API + "/user/notify",
  },
  package: {
    multiple: (page = 1, sort = "all") =>
      API + `/package/?page=${page}&sort=${sort}`,
    single: (package_id) => API + `/package/${package_id}`,
    mark_complete: (package_id) => API + `/package/completed/${package_id}`,
  },
  deposit: {
    multiple: (page = 1, sort = "all") =>
      API + `/deposit/?page=${page}&sort=${sort}`,
    single: (transaction_ref) => API + `/deposit/${transaction_ref}`,
    package_records: (package_id, page = 1) =>
      API + `/deposit/records/${package_id}/?page=${page}`,
    make_deposit: (package_id) => API + `/deposit/${package_id}/`,
    verify_transaction: (transaction_ref) =>
      API + `/deposit/verify/${transaction_ref}`,
  },
};
