const HOST = "https://api.efuafinexhair.com"; //"http://192.168.138.31:5050";
const API = HOST + "/v1";

export const END_POINTS = {
  home: HOST,
  media: (url) => HOST + url,
  bank_logo: (name) => HOST + "/media/photos/bank-logo/" + name + ".png",
  auth: {
    login: API + "/auth/login",
    register: API + "/auth/register",
    apple: API + "/auth/apple",
    google: API + "/auth/google",
    revalidate: API + "/auth/revalidate",
    forgot: API + "/auth/forgot",
    reset_pass: API + "/auth/reset",
    generate_otp: API + "/auth/verify",
    verify_otp: API + "/auth/otp",
  },
  user: {
    notify: API + "/user/notify",
    pass: API + "/user/pass",
    account: API + "/user/account",
    thumbnail: API + "/user/thumbnail",
    notifications: (page = 1) => API + `/user/notifications/?page=${page}`,
  },
  package: {
    create: API + "/package",
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
    make_deposit: (package_id) => API + `/deposit/${package_id}`,
    verify_transaction: (transaction_ref) =>
      API + `/deposit/verify/${transaction_ref}`,
  },
  admin: {
    faqs: (page = 1) => API + `/admin/faqs/?page=${page}`,
    contact_info: API + "/admin/faqs/contacts",
    banners: (page = 1) => API + `/admin/banners/?page=${page}`,
    transfer: {
      verify_account: API + "/admin/transfers/verify/account/",
      refund_account: API + "/admin/transfers/refund/",
    },
  },
};
