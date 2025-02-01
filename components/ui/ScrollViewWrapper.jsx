import { ScrollView, StyleSheet } from "react-native";
import React, { memo } from "react";
import { COLOR_THEME, SCREEN_DIMENSION } from "../../constants";
import AppStatusBar from "../AppStatusBar";

const ScrollViewWrapper = ({ children, style = {}, statusBar }) => {
  return (
    <ScrollView
      contentContainerStyle={[styles.scroll, style]}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      {children}

      {/**rewrite status bar */}
      <AppStatusBar />
    </ScrollView>
  );
};

export default memo(ScrollViewWrapper);

const styles = StyleSheet.create({
  scroll: {
    width: SCREEN_DIMENSION.width,
    minHeight: "100%",
    backgroundColor: COLOR_THEME.white,
  },
});
