import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { router } from "expo-router";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants/theme";
import PrimaryButton from "../reuseables/PrimaryButton";
import { useSelector } from "react-redux";

const AuthScreenWrapper = ({
  children,
  title,
  subText,
  switchPath = "/",
  bottomText,
  switchText,
  buttonText,
  buttonIsLoading,
  buttonIsDisabled = false,
  formSubmitFunction = () => {},
}) => {
  const theme = useSelector((state) => state.app.theme);

  //handle keyboard display
  const [keyboardPadding, setKeyboardPadding] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardPadding(Number(event.endCoordinates.height / 4));
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardPadding(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  //

  return (
    <View style={[styles(theme).wrapper, { paddingBottom: keyboardPadding }]}>
      {/**title block */}
      {(title || subText) && (
        <View style={styles(theme).titleBlock}>
          <Text style={styles(theme).pageTitle}>{title}</Text>
          <Text style={styles(theme).subText}>{subText}</Text>
        </View>
      )}

      {/**form */}
      <View style={styles(theme).form}>{children}</View>

      {/**submit button */}
      <View style={styles(theme).bottomCont}>
        <PrimaryButton
          title={buttonText}
          onPress={formSubmitFunction}
          isLoading={buttonIsLoading}
          disabled={buttonIsLoading || buttonIsDisabled}
        />

        <Text style={styles(theme).bottomText}>
          {bottomText}{" "}
          <Text
            onPress={() => {
              router.replace(switchPath);
            }}
            style={styles(theme).bottomLink}
          >
            {switchText}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default memo(AuthScreenWrapper);

const styles = (theme) =>
  StyleSheet.create({
    wrapper: {
      width: "100%",
      gap: 24,
    },
    titleBlock: {
      gap: 2,
      paddingBottom: 16,
      borderBottomWidth: 0.3,
      borderBottomColor: COLOR_THEME[theme].gray100,
    },
    pageTitle: {
      fontSize: FONT_SIZE.xb,
      fontWeight: FONT_WEIGHT.bold,
      color: COLOR_THEME[theme].black,
      textAlign: "left",
    },
    subText: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray200,
      textAlign: "left",
    },
    subLink: {
      color: COLOR_THEME[theme].primary,
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
      color: COLOR_THEME[theme].gray200,
    },
    bottomLink: {
      color: COLOR_THEME[theme].primary,
      fontWeight: FONT_WEIGHT.semibold,
    },
  });
