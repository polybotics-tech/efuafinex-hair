const HOST = "http://192.168.138.31:5050";
const API = HOST + "/v1";

export const END_POINTS = {
  home: HOST,
  media: (url) => HOST + url,
  auth: {
    login: API + "/auth/login",
  },
  user: {
    notify: API + "/user/notify",
  },
  package: {
    multiple: (page = 1, sort = "all") =>
      API + `/package/?page=${page}&sort=${sort}`,
    single: (package_id) => API + `/package/${package_id}`,
  },
  deposit: {
    multiple: (page = 1, sort = "all") =>
      API + `/deposit/?page=${page}&sort=${sort}`,
    single: (transaction_ref) => API + `/deposit/${transaction_ref}`,
  },
};
