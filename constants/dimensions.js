import { Dimensions } from "react-native";

const screenW = Dimensions.get("screen").width;
const screenH = Dimensions.get("screen").height;

const counterWidth = 24 + 32 * 2 + 8 * 3;

export const SCREEN_DIMENSION = {
  width: screenW,
  widthRatio: (ratio = 1) => Number(screenW * ratio),
  halfWidth: (gap = 0, horizontalPadding = 0) =>
    (screenW - (gap + horizontalPadding)) / 2,
  divisionWidth: (gap = 0, horizontalPadding = 0, divisor = 1) =>
    Number((screenW - (gap * (divisor - 1) + horizontalPadding)) / divisor),
  subtractWidth: (gap = 0, horizontalPadding = 0, targetWidth = 0) =>
    screenW - (gap + horizontalPadding + targetWidth),
  height: screenH,
  heightRatio: (ratio = 1) => Number(screenH * ratio),
  numberCounterWidth: counterWidth,
  bannerHeight: (width) => Number((width * 512) / 1080),
};
