import { END_POINTS } from "../api/endpoints";

export const IMAGE_LOADER = {
  user_thumbnail: (url) => {
    if (!url) {
      return null;
    }

    return { uri: `${END_POINTS.media(url)}` };
  },
  picker_thumbnail: (url) => {
    if (!url) {
      return null;
    }

    return { uri: url };
  },
  app_logo: () => {
    return require("../../assets/images/icon.png");
  },
  app_logo_with_title: () => {
    return require("../../assets/images/adaptive-icon.png");
  },
};
