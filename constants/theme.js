import store from "../redux/store";

const _globalColor = store.getState().app.color_theme;

export let COLOR_THEME = _globalColor;

export const FONT_SIZE = {
  xxs: 10,
  xs: 11.5,
  s: 14,
  xm: 15,
  m: 16,
  b: 18,
  xb: 22,
  xxb: 28,
  xxxb: 32,
};

export const BORDER_RADIUS = {
  xs: 4,
  s: 8,
  m: 16,
  b: 20,
  xb: 32,
  r: 1000,
};

export const FONT_WEIGHT = {
  regular: 400,
  semibold: 600,
  bold: 700,
};
