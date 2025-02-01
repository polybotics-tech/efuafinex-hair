import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLOR_THEME } from "../../../constants";

export default function AccountSettings() {
  return (
    <View style={styles.page}>
      <Text>AccountSettings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: "100%",
    minHeight: "100%",
    padding: 16,
    gap: 16,
    backgroundColor: COLOR_THEME.white,
  },
});
