import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import SafeAreaWrapper from "../components/ui/safeAreaWrapper";

export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      router.dismissTo("/onboarding/");
    }, 3000);
  }, []);

  //remember to edit this file before production
  return (
    <SafeAreaWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading, please wait...</Text>
      </View>
    </SafeAreaWrapper>
  );
}
