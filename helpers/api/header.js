export const HEADERS = {
  json: (token = "") => ({
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  }),
  form: (token = "") => ({
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : "",
    },
  }),
  error_extractor: (error) => {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again";

    return msg;
  },
};
