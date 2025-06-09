import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Slot, usePathname } from "expo-router";
import * as AppleAuthentication from "expo-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SafeAreaWrapper from "../../components/ui/safeAreaWrapper";
import { Alert } from "../../helpers/utils/alert";
import { AUTH_HOOKS } from "../../helpers/hooks/auth";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const theme = useSelector((state) => state.app.theme);

  const pathname = usePathname();

  const _readTerms = () => {
    router.navigate("/terms/?ref=read");
  };

  return (
    <SafeAreaWrapper>
      <ScrollView
        contentContainerStyle={[styles(theme).scrollView]}
        showsVerticalScrollIndicator={false}
      >
        <Slot />

        {(pathname === "/login" || pathname === "/register") && (
          <>
            {/**social auth button */}
            <View style={styles(theme).socialCont}>
              <View style={styles(theme).splitView}>
                <Text style={styles(theme).splitText}>or continue with</Text>
              </View>

              {/** */}
              <View style={styles(theme).btnCont}>
                <SignInWithGoogle theme={theme} />

                <SignInWithApple theme={theme} />
              </View>

              {/**terms and policies */}
              <Text style={styles(theme).bottomText}>
                By continuing, you agree to our{" "}
                <Text
                  style={styles(theme).bottomLink}
                  onPress={() => _readTerms()}
                >
                  Terms and Privacy Policies
                </Text>
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const SignInWithGoogle = ({ theme }) => {
  const [isLoading, setIsLoading] = useState(false);

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId:
        "385057153859-po5ijs4sqqn9627c34m39v6eo9hvmaj4.apps.googleusercontent.com",
      iosClientId:
        "385057153859-vuav0b4a4tp84vg7vsredf9vkd281ntj.apps.googleusercontent.com",
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      profileImageSize: 1280,
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  //handle form submission
  const submitForm = async (formData) => {
    const login = await AUTH_HOOKS.attempt_google_signin(
      formData,
      setIsLoading
    );

    if (login) {
      if (login?.new_registration) {
        //redirect to terms
        router.dismissTo("/(auth)/terms?ref=refund");
      } else {
        //redirect to home
        router.dismissTo("/(tabs)");
      }
    }
  };

  //check if google auth is availabke for device
  const googleAuthIsAvailable = async () => {
    const check = await GoogleSignin.hasPlayServices();

    return check;
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);

      //check availability
      const proceed = await googleAuthIsAvailable();

      if (!proceed) {
        Alert.error(
          "Google authentication failed",
          "This feature is not available on this device"
        );
        return;
      }

      const googleInfo = await GoogleSignin.signIn();

      if (googleInfo) {
        if (googleInfo?.type === "cancelled") {
          Alert.error(
            "Google authentication failed",
            "Request was interupted or canceled"
          );
          return;
        }

        //continue
        const { user } = googleInfo?.data;
        const { email, name, photo } = user;

        //create form
        const form = {
          provider: "google",
          email,
          photo_url: photo,
          fullname: name,
        };

        await submitForm(form);
      } else {
        Alert.error(
          "Google authentication failed",
          "Error processing request. Check internet connection"
        );
        return;
      }
    } catch (error) {
      Alert.error(
        "Google authentication failed",
        error?.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles(theme).socialBtn}
      activeOpacity={0.6}
      disabled={isLoading}
      onPress={() => signInWithGoogle()}
    >
      {isLoading ? (
        <ActivityIndicator
          size={FONT_SIZE.s}
          color={COLOR_THEME[theme].primary}
        />
      ) : (
        <MaterialCommunityIcons
          name="google"
          size={24}
          color={COLOR_THEME[theme].primary}
        />
      )}
    </TouchableOpacity>
  );
};

const SignInWithApple = ({ theme }) => {
  const [isLoading, setIsLoading] = useState(false);

  //handle form submission
  const submitForm = async (formData) => {
    const login = await AUTH_HOOKS.attempt_apple_signin(formData, setIsLoading);
    if (login) {
      //redirect to home
      router.dismissTo("/(tabs)");
    }
  };

  //check if apple auth is availabke for device
  const appleAuthIsAvailable = async () => {
    const check = await AppleAuthentication.isAvailableAsync();

    return check;
  };

  const signInWithApple = async () => {
    try {
      setIsLoading(true);

      //check availability
      const proceed = await appleAuthIsAvailable();

      if (!proceed) {
        Alert.error(
          "Apple authentication failed",
          "This feature is not available on this device"
        );
        return;
      }

      //fetch credentials
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credentials) {
        Alert.error(
          "Apple authentication failed",
          "Something went wrong. Try again later"
        );
        return;
      }

      //extract identity token
      const { identityToken, email, fullName, user } = credentials;

      // signed in with apple
      if (identityToken && user) {
        //extract fullname
        const fullname = Boolean(fullName?.familyName || fullName?.givenName)
          ? `${fullName?.familyName} ${fullName?.givenName}`
          : "New Apple User";

        //create form
        const form = {
          provider: "apple",
          identityToken,
          userSub: user,
          email,
          fullname,
        };

        //submit form to api
        await submitForm(form);
      } else {
        Alert.error(
          "Apple authentication failed",
          "Unable to fetch user identity token"
        );
        return;
      }
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
        Alert.error(
          "Apple authentication failed",
          e?.message || "Process was interupted or canceled"
        );
      } else {
        Alert.error(
          "Apple authentication failed",
          e?.message || "Something went wrong. Try again later"
        );
        // handle other errors
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {Platform.OS === "ios" && (
        <TouchableOpacity
          style={styles(theme).socialBtn}
          activeOpacity={0.6}
          disabled={isLoading}
          onPress={() => signInWithApple()}
        >
          {isLoading ? (
            <ActivityIndicator
              size={FONT_SIZE.s}
              color={COLOR_THEME[theme].primary}
            />
          ) : (
            <MaterialCommunityIcons
              name="apple"
              size={26}
              color={COLOR_THEME[theme].primary}
            />
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    scrollView: {
      width: "100%",
      gap: 32,
      padding: 16,
    },
    socialCont: {
      paddingVertical: 16,
    },
    splitView: {
      width: "100%",
      height: 0.8,
      backgroundColor: COLOR_THEME[theme].gray100,
      alignItems: "center",
      justifyContent: "center",
      overflow: "visible",
    },
    splitText: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray100,
      textAlign: "center",
      height: 15,
      paddingHorizontal: 16,
      backgroundColor: COLOR_THEME[theme].white,
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
      borderColor: COLOR_THEME[theme].primary,
      // backgroundColor: COLOR_THEME[theme].primary,
    },
    bottomText: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray100,
      textAlign: "center",
    },
    bottomLink: {
      color: COLOR_THEME[theme].primary,
      fontWeight: FONT_WEIGHT.semibold,
    },
  });
