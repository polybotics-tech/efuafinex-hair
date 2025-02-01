import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { StatusBar } from "expo-status-bar";
import { COLOR_THEME } from "../constants";
import { Stack } from "expo-router";

const AppStatusBar = () => {
  return (
    <>
      <StatusBar
        backgroundColor={COLOR_THEME.white}
        style="dark"
        animated={true}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          navigationBarHidden: false,
          navigationBarColor: COLOR_THEME.white,
          animation: "none",
        }}
      />
    </>
  );
};

export default memo(AppStatusBar);

const styles = StyleSheet.create({});
