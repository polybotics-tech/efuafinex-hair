import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { router } from "expo-router";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants/theme";
import PrimaryButton from "../reuseables/PrimaryButton";

const AuthScreenWrapper = ({
  children,
  title,
  subText,
  switchPath = "/",
  bottomText,
  switchText,
  buttonText,
  buttonIsLoading,
  formSubmitFunction = () => {},
}) => {
  return (
    <View style={styles.wrapper}>
      {/**title block */}
      {(title || subText) && (
        <View style={styles.titleBlock}>
          <Text style={styles.pageTitle}>{title}</Text>
          <Text style={styles.subText}>{subText}</Text>
        </View>
      )}

      {/**form */}
      <View style={styles.form}>{children}</View>

      {/**submit button */}
      <View style={styles.bottomCont}>
        <PrimaryButton
          title={buttonText}
          onPress={formSubmitFunction}
          isLoading={buttonIsLoading}
          disabled={buttonIsLoading}
        />

        <Text style={styles.bottomText}>
          {bottomText}{" "}
          <Text
            onPress={() => {
              router.replace(switchPath);
            }}
            style={styles.bottomLink}
          >
            {switchText}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default memo(AuthScreenWrapper);

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    gap: 24,
  },
  titleBlock: {
    gap: 2,
    paddingBottom: 16,
    borderBottomWidth: 0.3,
    borderBottomColor: COLOR_THEME.gray100,
  },
  pageTitle: {
    fontSize: FONT_SIZE.xb,
    fontWeight: FONT_WEIGHT.bold,
    color: COLOR_THEME.black,
    textAlign: "left",
  },
  subText: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
    textAlign: "left",
  },
  subLink: {
    color: COLOR_THEME.primary,
    fontWeight: FONT_WEIGHT.semibold,
  },
  form: {
    width: "100%",
    gap: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  bottomCont: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  bottomText: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
  },
  bottomLink: {
    color: COLOR_THEME.primary,
    fontWeight: FONT_WEIGHT.semibold,
  },
});
