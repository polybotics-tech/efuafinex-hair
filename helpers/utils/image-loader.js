import { END_POINTS } from "../api/endpoints";

export const IMAGE_LOADER = {
  user_thumbnail: (url) => {
    if (!url) {
      return `${require("../../assets/images/icon.png")}`;
    }

    return { uri: `${END_POINTS.media(url)}` };
  },
};
