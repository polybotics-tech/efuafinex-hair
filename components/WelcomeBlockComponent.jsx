import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../constants";

const WelcomeBlockComponent = () => {
  return (
    <View style={styles.component}>
      <View style={styles.thumbnail}></View>

      {/** */}
      <View style={styles.details}>
        <Text style={styles.greeting}>Good morning,</Text>
        <Text style={styles.name}>Emmanuel Nnaemeka</Text>
      </View>
    </View>
  );
};

export default memo(WelcomeBlockComponent);

const styles = StyleSheet.create({
  component: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: COLOR_THEME.white,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 100,
    backgroundColor: COLOR_THEME.gray50,
    overflow: "hidden",
  },
  details: {
    width: SCREEN_DIMENSION.subtractWidth(8, 16 + 16, 64),
    gap: 2,
  },
  greeting: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
  },
  name: {
    fontSize: FONT_SIZE.m,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
    textTransform: "capitalize",
  },
});
