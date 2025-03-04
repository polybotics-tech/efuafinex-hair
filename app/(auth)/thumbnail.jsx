import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SafeAreaWrapper from "../../components/ui/safeAreaWrapper";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";
import PrimaryButton from "../../components/reuseables/PrimaryButton";
import ThumbnailPicker from "../../components/reuseables/ThumbnailPicker";
import { useSelector } from "react-redux";
import { router } from "expo-router";

export default function SetThumbnail() {
  const theme = useSelector((state) => state.app.theme);

  const thumbnail = useSelector((state) => state.user.user?.thumbnail);

  const continueToHome = () => {
    router.dismissTo("/terms/?ref=refund");
  };

  return (
    <SafeAreaWrapper style={styles(theme).safeArea}>
      <Text style={styles(theme).header}>Choose Profile Picture</Text>

      {/**thumbnail picker */}
      <View style={styles(theme).thumbnailCont}>
        <ThumbnailPicker />
      </View>

      {/**action buttons */}
      <View style={styles(theme).actionCont}>
        <PrimaryButton
          title={"Continue"}
          disabled={!thumbnail}
          onPress={() => continueToHome()}
        />

        {/**skip button */}
        <TouchableOpacity
          style={styles(theme).skipBtn}
          onPress={() => continueToHome()}
        >
          <Text style={styles(theme).skipBtnText}>Skip, maybe later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    safeArea: {
      width: "100%",
      minHeight: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 32,
    },
    header: {
      fontSize: FONT_SIZE.b,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].black,
    },
    thumbnailCont: {
      width: "100%",
      alignItems: "center",
    },
    actionCont: {
      width: "100%",
      alignItems: "center",
      gap: 16,
      marginBottom: 32,
    },
    skipBtn: {
      width: "100%",
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    skipBtnText: {
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].primary,
    },
  });
