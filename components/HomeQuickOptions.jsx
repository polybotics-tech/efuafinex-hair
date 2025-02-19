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
import PrimaryButton from "./reuseables/PrimaryButton";
import { useSelector } from "react-redux";

const HomeQuickOptions = ({ type }) => {
  const theme = useSelector((state) => state.app.theme);

  const options = JSON_QUICK_OPTIONS_LIST;

  if (type === "float") {
    /**add button */

    return (
      <TouchableOpacity
        style={styles(theme).floatBtn}
        activeOpacity={0.6}
        onPress={() => {
          router.navigate("/create/");
        }}
      >
        <Octicons name="plus" size={24} color={COLOR_THEME[theme].white} />
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View style={styles(theme).quickOptionTab}>
        {options?.map((item, index) => (
          <OptionTab key={index} data={item} theme={theme} />
        ))}
      </View>
    </>
  );
};

const OptionTab = ({ data, theme }) => {
  const { tab, title, desc, path } = data;

  return (
    <View
      style={[
        styles(theme).option,
        {
          backgroundColor:
            tab === 2 ? COLOR_THEME[theme].primary : COLOR_THEME[theme].white,
        },
      ]}
    >
      <View style={styles(theme).inner}>
        <Text
          style={[
            styles(theme).optionTitle,
            {
              color:
                tab === 2 ? COLOR_THEME[theme].white : COLOR_THEME[theme].black,
            },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles(theme).optionDesc,
            {
              color:
                tab === 2
                  ? COLOR_THEME[theme].gray50
                  : COLOR_THEME[theme].gray200,
            },
          ]}
        >
          {desc}
        </Text>
      </View>

      <PrimaryButton
        title={"Start a package"}
        type={"secondary"}
        onPress={() => {
          router.navigate(path);
        }}
      />
    </View>
  );
};

export default memo(HomeQuickOptions);

const styles = (theme) =>
  StyleSheet.create({
    quickOptionTab: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    option: {
      width: "100%", //SCREEN_DIMENSION.halfWidth(16, 32),
      minHeight: SCREEN_DIMENSION.heightRatio(1 / 4),
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
      backgroundColor: COLOR_THEME[theme].primary,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      bottom: 12,
      right: 16,
      zIndex: 2,
    },
  });
