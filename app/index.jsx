import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as Application from "expo-application";
import { useDispatch } from "react-redux";
import { ACTION_STORE_APP_VERSION } from "../redux/reducer/appSlice";
import SafeAreaWrapper from "../components/ui/safeAreaWrapper";
import { AUTH_HOOKS } from "../helpers/hooks/auth";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../constants";
import ImageComponent from "../components/reuseables/ImageComponent";
import { IMAGE_LOADER } from "../helpers/utils/image-loader";

export default function Index() {
  //fetch and store current app version
  const dispatch = useDispatch();
  const currentAppVersion = Application.nativeApplicationVersion;

  useEffect(() => {
    if (currentAppVersion) {
      dispatch(ACTION_STORE_APP_VERSION({ version: currentAppVersion }));
    }
  }, []);
  ///

  const [isLoading, setIsLoading] = useState(false);

  const _userNotLogged = async () => {
    //check whether to send to login or onboard
    const toLogin = await AUTH_HOOKS.send_to_login();

    if (toLogin) {
      router.dismissTo("/login/");
    } else {
      router.dismissTo("/onboarding/");
    }
  };

  const _userLogged = () => {
    router.dismissTo("/(tabs)/");
  };

  //check user log status
  const validateUserStatus = async () => {
    let logged = await AUTH_HOOKS.revalidate_token(setIsLoading);

    if (logged) {
      _userLogged();
    } else {
      _userNotLogged();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      validateUserStatus();
    }, 2000);
  }, []);

  //remember to edit this file before production
  return (
    <SafeAreaWrapper>
      <View style={styles.page}>
        <View></View>

        <View style={styles.logoComp}>
          <ImageComponent
            uri={IMAGE_LOADER.app_logo_with_title()}
            scale={true}
            blur={"1"}
          />
        </View>

        <View style={styles.btmText}>
          <Text style={styles.version}>Version {currentAppVersion}</Text>
          <ActivityIndicator size={FONT_SIZE.s} color={COLOR_THEME.gray100} />
        </View>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    paddingVertical: 16,
  },
  logoComp: {
    width: SCREEN_DIMENSION.widthRatio(1 / 2),
    height: SCREEN_DIMENSION.widthRatio(1 / 2),
  },
  btmText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  version: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray100,
  },
});
