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
import { useSelector } from "react-redux";
import { USER_HOOKS } from "../../../helpers/hooks/user";

export default function DeleteAccount() {
  const theme = useSelector((state) => state.app.theme);

  const [isLoading, setIsLoading] = useState(false);

  const goBack = () => {
    router.back();
  };

  const deleteAcct = async () => {
    let success = await USER_HOOKS.delete_account(setIsLoading);

    if (success) {
      console.log("deleted");
      router.dismissTo("/(auth)/login/");
    }
  };

  return (
    <View style={styles(theme).page}>
      {/*log out modal*/}
      <View style={styles(theme).logoutComponent}>
        <Text style={styles(theme).title}>Critical Warning</Text>

        <Text style={styles(theme).text}>
          Deleting your account will wipe out any existing records or activities
          related to this email on this platform. This can not be reversed if
          done. Do you really want to delete your account?
        </Text>

        <View style={styles(theme).btnTab}>
          <TouchableOpacity
            style={styles(theme).btn}
            disabled={isLoading}
            onPress={() => deleteAcct()}
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
      color: COLOR_THEME[theme].error,
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
