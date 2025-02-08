import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import SafeAreaWrapper from "../components/ui/safeAreaWrapper";
import { AUTH_HOOKS } from "../helpers/hooks/auth";
import { COLOR_THEME, FONT_SIZE } from "../constants";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);

  const _userNotLogged = () => {
    router.dismissTo("/onboarding/");
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
          Loading, please wait...
        </Text>
        {isLoading && (
          <ActivityIndicator size={FONT_SIZE.s} color={COLOR_THEME.black} />
        )}
      </View>
    </SafeAreaWrapper>
  );
}
