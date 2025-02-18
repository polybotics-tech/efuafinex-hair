import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo } from "react";
import { Octicons } from "@expo/vector-icons";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../constants";
import { JSON_QUICK_OPTIONS_LIST } from "../helpers/json";
import { router } from "expo-router";
import { BORDER_RADIUS } from "../constants/theme";

const HomeQuickOptions = () => {
  const options = JSON_QUICK_OPTIONS_LIST;

  return (
    <>
      {/*<View style={styles.quickOptionTab}>
      {options?.map((item, index) => (
        <OptionTab key={index} data={item} />
      ))}
    </View>*/}

      {/**add button */}
      <TouchableOpacity
        style={styles.floatBtn}
        activeOpacity={0.6}
        onPress={() => {
          router.navigate("/create/");
        }}
      >
        <Octicons name="plus" size={24} color={COLOR_THEME.white} />
      </TouchableOpacity>
    </>
  );
};

const OptionTab = ({ data }) => {
  const { tab, title, desc, path } = data;

  return (
    <View
      style={[
        styles.option,
        {
          backgroundColor: tab === 2 ? COLOR_THEME.primary : COLOR_THEME.white,
        },
      ]}
    >
      <View style={styles.inner}>
        <Text
          style={[
            styles.optionTitle,
            { color: tab === 2 ? COLOR_THEME.white : COLOR_THEME.black },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.optionDesc,
            { color: tab === 2 ? COLOR_THEME.gray50 : COLOR_THEME.gray200 },
          ]}
        >
          {desc}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.optionBtn,
          {
            backgroundColor: tab === 2 ? COLOR_THEME.white : COLOR_THEME.gray50,
          },
        ]}
        onPress={() => {
          router.navigate(path);
        }}
        activeOpacity={0.8}
      >
        <Octicons name="plus" size={18} color={COLOR_THEME.black} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(HomeQuickOptions);

const styles = StyleSheet.create({
  quickOptionTab: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  option: {
    width: SCREEN_DIMENSION.halfWidth(16, 32),
    minHeight: SCREEN_DIMENSION.heightRatio(1 / 3),
    padding: 16,
    gap: 32,
    justifyContent: "space-between",
    borderRadius: BORDER_RADIUS.b,
  },
  inner: {
    width: "100%",
    gap: 16,
  },
  optionTitle: {
    fontSize: FONT_SIZE.b,
    fontWeight: FONT_WEIGHT.bold,
    textTransform: "capitalize",
  },
  optionDesc: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
  },
  optionBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS.r,
    marginLeft: "auto",
  },
  floatBtn: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.r,
    backgroundColor: COLOR_THEME.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 12,
    right: 16,
    zIndex: 2,
  },
});
