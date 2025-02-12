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
};
