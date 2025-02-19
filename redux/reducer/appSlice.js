import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  version: "",
  theme: "light",
  is_dark: false,
  color_theme: {
    light: {
      white: "#FAFAFA",
      black: "#333333",
      primary: "#E82E89", //#008080
      primaryFaded: "rgba(232, 46, 137, 0.1)",
      success: "#008080", //#008080
      successFaded: "rgba(0, 128, 128, 0.1)",
      error: "#D9534F",
      errorFaded: "rgba(217, 83, 79, 0.1)",
      gray50: "#F3F3F3",
      gray100: "#B6B6B6",
      gray200: "#929498",
    },
    dark: {
      white: "#090105", //"#090005"
      black: "#c2c0c1", //"#d9d7d8",
      primary: "#EE4196", //#e82e89
      primaryFaded: "#2C0B1A",
      success: "#008080", //#008080
      successFaded: "#081417",
      error: "#D9534F",
      errorFaded: "#290D10",
      gray50: "#131313", //"#181014"
      gray100: "#545354", //"#443d40",
      gray200: "#696868", //"#767274",
    },
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    ACTION_STORE_APP_VERSION: (state, action) => {
      const { version } = action.payload;

      //update version state
      state.version = version;
    },
    ACTION_TOGGLE_APP_THEME: (state, action) => {
      const { theme } = action.payload;

      //update app theme
      state.theme = theme;

      if (theme === "light") {
        state.is_dark = false;
      } else {
        state.is_dark = true;
      }
    },
  },
});

export const { ACTION_STORE_APP_VERSION, ACTION_TOGGLE_APP_THEME } =
  appSlice.actions;
export default appSlice;
