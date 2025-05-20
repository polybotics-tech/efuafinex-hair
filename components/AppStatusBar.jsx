import { StyleSheet } from "react-native";
import React, { memo } from "react";
import { StatusBar } from "expo-status-bar";
import { COLOR_THEME } from "../constants";
import { Stack } from "expo-router";
import { useSelector } from "react-redux";

const AppStatusBar = () => {
  const theme = useSelector((state) => state.app.theme);
  const theme_is_dark = useSelector((state) => state.app.is_dark);
  return (
    <>
      <StatusBar
        style={theme_is_dark ? "light" : "dark"}
        animated={true}
        backgroundColor="transparent"
        translucent
      />

      <Stack.Screen
        options={{
          headerShown: false,
          navigationBarHidden: false,
          navigationBarColor: COLOR_THEME[theme].white,
          animation: "none",
        }}
      />
    </>
  );
};

export default memo(AppStatusBar);

const styles = StyleSheet.create({});
