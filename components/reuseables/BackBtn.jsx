import { StyleSheet, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { router } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import { COLOR_THEME, BORDER_RADIUS } from "../../constants/theme";
import { useSelector } from "react-redux";

const BackBtn = () => {
  const theme = useSelector((state) => state.app.theme);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles(theme).actionBtn}
      onPress={() => {
        router.back();
      }}
    >
      <Octicons name="arrow-left" size={18} color={COLOR_THEME[theme].black} />
    </TouchableOpacity>
  );
};

export default memo(BackBtn);

const styles = (theme) =>
  StyleSheet.create({
    actionBtn: {
      width: 44,
      height: 44,
      borderRadius: BORDER_RADIUS.r,
      backgroundColor: COLOR_THEME[theme].gray50,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
  });
