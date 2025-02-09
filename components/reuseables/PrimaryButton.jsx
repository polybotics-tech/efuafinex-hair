import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo } from "react";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";

const PrimaryButton = ({ ...props }) => {
  return (
    <TouchableOpacity
      style={[
        styles.primaryBtn(props?.type),
        props?.style,
        { opacity: props?.disabled ? 0.5 : 1 },
      ]}
      disabled={props?.disabled || props?.isLoading}
      onPress={props?.onPress}
      activeOpacity={0.6}
    >
      <Text
        style={[
          styles.primaryBtnText,
          {
            color:
              props?.color || props?.type === "secondary"
                ? COLOR_THEME.primary
                : COLOR_THEME.white,
          },
        ]}
      >
        {props?.title}
      </Text>

      {props?.isLoading ? (
        <ActivityIndicator
          size={FONT_SIZE.s}
          color={
            props?.color || props?.type === "secondary"
              ? COLOR_THEME.primary
              : COLOR_THEME.white
          }
        />
      ) : (
        <>
          {props?.icon && (
            <View
              style={[
                styles.primaryBtnIcon,
                props?.iconSize && { width: props?.iconSize },
              ]}
            >
              {props?.icon}
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default memo(PrimaryButton);

const styles = StyleSheet.create({
  primaryBtn: (type = "primary") => ({
    width: "100%",
    height: 48,
    borderRadius: 100,
    backgroundColor:
      type === "primary" ? COLOR_THEME.primary : COLOR_THEME.primaryFaded,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  }),
  primaryBtnText: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.semibold,
  },
  primaryBtnIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
});
