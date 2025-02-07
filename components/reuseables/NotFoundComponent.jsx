import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";

const NotFoundComponent = ({ text, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={FONT_SIZE.s} color={COLOR_THEME.gray200} />
        </View>
      ) : (
        <View style={styles.block}>
          <Text style={styles.text}>{text || "Not found"}</Text>
        </View>
      )}
    </>
  );
};

export default memo(NotFoundComponent);

const styles = StyleSheet.create({
  block: {
    width: "100%",
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  text: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
  },
  loading: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
});
