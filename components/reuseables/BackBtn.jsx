import { StyleSheet, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { router } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import { COLOR_THEME } from "../../constants";

const BackBtn = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.actionBtn}
      onPress={() => {
        router.back();
      }}
    >
      <Octicons name="arrow-left" size={18} color={COLOR_THEME.black} />
    </TouchableOpacity>
  );
};

export default memo(BackBtn);

const styles = StyleSheet.create({
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 100,
    backgroundColor: COLOR_THEME.gray50,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
