import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../../../constants";
import { router } from "expo-router";

export default function LogOut() {
  return (
    <View style={styles.page}>
      {/*log out modal*/}
      <View style={styles.logoutComponent}>
        <Text style={styles.title}>Confirmation</Text>

        <Text style={styles.text}>
          You will be logged out of this device. Do you wish to continue?
        </Text>

        <View style={styles.btnTab}>
          <Text style={[styles.btn, { color: COLOR_THEME.error }]}>Yes</Text>

          <Text
            style={[styles.btn, { color: COLOR_THEME.primary }]}
            onPress={() => {
              router.back();
            }}
          >
            No
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: COLOR_THEME.gray50,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  logoutComponent: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 32,
    gap: 16,
  },
  title: {
    fontSize: FONT_SIZE.b,
    fontWeight: FONT_WEIGHT.bold,
    color: COLOR_THEME.black,
    textAlign: "center",
  },
  text: {
    fontSize: FONT_SIZE.m,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
    textAlign: "center",
  },
  btnTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 16,
  },
  btn: {
    width: SCREEN_DIMENSION.divisionWidth(16, 32 + 40, 2),
    textAlign: "center",
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.semibold,
  },
});
