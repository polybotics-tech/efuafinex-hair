import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SafeAreaWrapper from "../../components/ui/safeAreaWrapper";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";
import PrimaryButton from "../../components/reuseables/PrimaryButton";
import ThumbnailPicker from "../../components/reuseables/ThumbnailPicker";
import { useSelector } from "react-redux";
import { router } from "expo-router";

export default function SetThumbnail() {
  const thumbnail = useSelector((state) => state.user.user?.thumbnail);

  const continueToHome = () => {
    router.dismissTo("/(tabs)/");
  };

  return (
    <SafeAreaWrapper style={styles.safeArea}>
      <Text style={styles.header}>Choose Profile Picture</Text>

      {/**thumbnail picker */}
      <View style={styles.thumbnailCont}>
        <ThumbnailPicker />
      </View>

      {/**action buttons */}
      <View style={styles.actionCont}>
        <PrimaryButton
          title={"Continue"}
          disabled={!thumbnail}
          onPress={() => continueToHome()}
        />

        {/**skip button */}
        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() => continueToHome()}
        >
          <Text style={styles.skipBtnText}>Skip, maybe later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
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
    color: COLOR_THEME.black,
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
    color: COLOR_THEME.primary,
  },
});
