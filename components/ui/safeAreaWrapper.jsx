import { StyleSheet } from "react-native";
import React, { memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR_THEME, SCREEN_DIMENSION } from "../../constants";
import AppStatusBar from "../AppStatusBar";

const SafeAreaWrapper = ({ children, style = {} }) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      {children}
      <AppStatusBar />
    </SafeAreaView>
  );
};

export default memo(SafeAreaWrapper);

const styles = StyleSheet.create({
  safeArea: {
    width: SCREEN_DIMENSION.width,
    flex: 1,
    backgroundColor: COLOR_THEME.white,
  },
});
