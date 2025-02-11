import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, usePathname } from "expo-router";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SafeAreaWrapper from "../../components/ui/safeAreaWrapper";

export default function AuthLayout() {
  const pathname = usePathname();

  return (
    <SafeAreaWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Slot />

        {/*(pathname === "/login" || pathname === "/register") && (
          <>
            {/**social auth button /}
            <View style={styles.socialCont}>
              <View style={styles.splitView}>
                <Text style={styles.splitText}>or continue with</Text>
              </View>

              {/** /}
              <View style={styles.btnCont}>
                <SignInWithGoogle />

                <SignInWithApple />
              </View>

              {/**terms and policies /}
              <Text style={styles.bottomText}>
                By continuing, you agree to our{" "}
                <Text style={styles.bottomLink}>
                  Terms and Privacy Policies
                </Text>
              </Text>
            </View>
          </>
        )*/}
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const SignInWithGoogle = () => {
  return (
    <Pressable style={styles.socialBtn}>
      <MaterialCommunityIcons
        name="google"
        size={24}
        color={COLOR_THEME.primary}
      />
    </Pressable>
  );
};

const SignInWithApple = () => {
  return (
    <Pressable style={styles.socialBtn}>
      <MaterialCommunityIcons
        name="apple"
        size={26}
        color={COLOR_THEME.primary}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    gap: 32,
    padding: 16,
  },
  socialCont: {
    paddingBottom: 32,
  },
  splitView: {
    width: "100%",
    height: 0.3,
    backgroundColor: COLOR_THEME.gray100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  splitText: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray100,
    textAlign: "center",
    height: 15,
    paddingHorizontal: 16,
    backgroundColor: COLOR_THEME.white,
  },
  btnCont: {
    paddingVertical: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  socialBtn: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: COLOR_THEME.primary,
    // backgroundColor: COLOR_THEME.primary,
  },
  bottomText: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray100,
    textAlign: "center",
  },
  bottomLink: {
    color: COLOR_THEME.primary,
    fontWeight: FONT_WEIGHT.semibold,
  },
});
