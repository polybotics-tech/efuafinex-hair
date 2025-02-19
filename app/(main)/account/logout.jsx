import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../../../constants";
import { router } from "expo-router";
import { AUTH_HOOKS } from "../../../helpers/hooks/auth";
import { useSelector } from "react-redux";

export default function LogOut() {
  const theme = useSelector((state) => state.app.theme);

  const [isLoading, setIsLoading] = useState(false);

  const goBack = () => {
    router.back();
  };

  const logOut = async () => {
    let success = await AUTH_HOOKS.attempt_logout(setIsLoading);

    if (success) {
      router.dismissTo("/login/");
    }
  };

  return (
    <View style={styles(theme).page}>
      {/*log out modal*/}
      <View style={styles(theme).logoutComponent}>
        <Text style={styles(theme).title}>Confirmation</Text>

        <Text style={styles(theme).text}>
          You will be logged out of this device. Do you wish to continue?
        </Text>

        <View style={styles(theme).btnTab}>
          <TouchableOpacity
            style={styles(theme).btn}
            disabled={isLoading}
            onPress={() => logOut()}
          >
            {isLoading ? (
              <ActivityIndicator
                size={FONT_SIZE.s}
                color={COLOR_THEME[theme].error}
              />
            ) : (
              <Text
                style={[
                  styles(theme).btnText,
                  { color: COLOR_THEME[theme].error },
                ]}
              >
                Yes
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles(theme).btn} onPress={() => goBack()}>
            <Text
              style={[
                styles(theme).btnText,
                { color: COLOR_THEME[theme].success },
              ]}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    page: {
      width: "100%",
      minHeight: "100%",
      backgroundColor: COLOR_THEME[theme].gray50,
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 32,
    },
    logoutComponent: {
      width: "100%",
      backgroundColor: COLOR_THEME[theme].white,
      padding: 20,
      borderRadius: 32,
      gap: 16,
    },
    title: {
      fontSize: FONT_SIZE.b,
      fontWeight: FONT_WEIGHT.bold,
      color: COLOR_THEME[theme].black,
      textAlign: "center",
    },
    text: {
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray200,
      textAlign: "center",
    },
    btnTab: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      marginTop: 16,
    },
    btn: {
      width: SCREEN_DIMENSION.divisionWidth(16, 32 + 40, 2),
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    btnText: {
      width: "100%",
      textAlign: "center",
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.semibold,
    },
  });
