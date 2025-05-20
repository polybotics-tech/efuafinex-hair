import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR_THEME, SCREEN_DIMENSION } from "../../constants";
import AppStatusBar from "../AppStatusBar";
import { useSelector } from "react-redux";

const SafeAreaWrapper = ({ children, style = {} }) => {
  const theme = useSelector((state) => state.app.theme);

  return (
    <View style={styles(theme).layout}>
      <SafeAreaView
        style={[styles(theme).safeArea, style]}
        edges={["top", "bottom"]}
      >
        <AppStatusBar />
        {children}
      </SafeAreaView>
    </View>
  );
};

export default memo(SafeAreaWrapper);

const styles = (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      width: "100%",
      maxWidth: SCREEN_DIMENSION.maxWidth,
      marginHorizontal: "auto",
    },
    layout: {
      flex: 1,
      backgroundColor: COLOR_THEME[theme].white,
      width: SCREEN_DIMENSION.fullWidth,
    },
  });
