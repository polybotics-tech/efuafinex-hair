import { StyleSheet } from "react-native";
import React, { memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR_THEME, SCREEN_DIMENSION } from "../../constants";
import AppStatusBar from "../AppStatusBar";
import { useSelector } from "react-redux";

const SafeAreaWrapper = ({ children, style = {} }) => {
  const theme = useSelector((state) => state.app.theme);

  return (
    <SafeAreaView style={[styles(theme).safeArea, style]}>
      <AppStatusBar />
      {children}
    </SafeAreaView>
  );
};

export default memo(SafeAreaWrapper);

const styles = (theme) =>
  StyleSheet.create({
    safeArea: {
      width: SCREEN_DIMENSION.width,
      flex: 1,
      backgroundColor: COLOR_THEME[theme].white,
    },
  });
