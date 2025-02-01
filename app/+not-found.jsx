import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaWrapper from "../components/ui/safeAreaWrapper";
import DefaultHeaderComponent from "../components/DefaultHeaderComponent";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../constants";
import { Octicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <SafeAreaWrapper style={styles.safeArea}>
      {/*header*/}
      <DefaultHeaderComponent directory="404" />

      {/*page content*/}
      <View style={styles.content}>
        <Octicons name="unverified" size={100} color={COLOR_THEME.error} />
        <Text style={styles?.big}>404</Text>
        <Text style={styles?.sub}>
          Unknown Route: <Text style={styles.route}>{pathname}</Text>
        </Text>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR_THEME.gray50,
    gap: 16,
  },
  content: {
    width: SCREEN_DIMENSION.subtractWidth(0, 32, 0),
    marginHorizontal: 16,
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    backgroundColor: COLOR_THEME.white,
    borderRadius: 32,
  },
  big: {
    fontSize: 64,
    fontWeight: FONT_WEIGHT.bold,
    color: COLOR_THEME.error,
    lineHeight: 64,
  },
  sub: {
    fontSize: FONT_SIZE.m,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.gray200,
  },
  route: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray100,
  },
});
