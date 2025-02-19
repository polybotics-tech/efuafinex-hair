import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";
import { useSelector } from "react-redux";

const NotFoundComponent = ({ text, isLoading }) => {
  const theme = useSelector((state) => state.app.theme);

  return (
    <>
      {isLoading ? (
        <View style={styles(theme).loading}>
          <ActivityIndicator
            size={FONT_SIZE.s}
            color={COLOR_THEME[theme].gray200}
          />
        </View>
      ) : (
        <View style={styles(theme).block}>
          <Text style={styles(theme).text}>{text || "Not found"}</Text>
        </View>
      )}
    </>
  );
};

export default memo(NotFoundComponent);

const styles = (theme) =>
  StyleSheet.create({
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
      color: COLOR_THEME[theme].gray200,
    },
    loading: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      padding: 32,
    },
  });
