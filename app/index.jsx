import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as Application from "expo-application";
import { useDispatch } from "react-redux";
import { ACTION_STORE_APP_VERSION } from "../redux/reducer/appSlice";
import SafeAreaWrapper from "../components/ui/safeAreaWrapper";
import { AUTH_HOOKS } from "../helpers/hooks/auth";
import { COLOR_THEME, FONT_SIZE } from "../constants";

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
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Text style={{ fontSize: FONT_SIZE.s, color: COLOR_THEME.black }}>
          Loading, please wait.....
        </Text>
      </View>
    </SafeAreaWrapper>
  );
}
