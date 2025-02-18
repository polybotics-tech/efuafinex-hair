import { Stack } from "expo-router";
import { Provider, useSelector } from "react-redux";
import store from "../redux/store";
import TabsHeaderComponent from "../components/TabsHeaderComponent";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../constants";
import { useEffect, useMemo, useState } from "react";
import { USER_HOOKS } from "../helpers/hooks/user";
import { fetch } from "@react-native-community/netinfo";
import { Alert } from "../helpers/utils/alert";

export default function RootLayout() {
  //creating custom toast configurations
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: COLOR_THEME.success }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        text1Style={{
          fontSize: FONT_SIZE.m,
          fontWeight: FONT_WEIGHT.semibold,
          color: COLOR_THEME.success,
          textTransform: "uppercase",
        }}
        text2Style={{
          fontSize: FONT_SIZE.s,
          fontWeight: FONT_WEIGHT.regular,
          color: COLOR_THEME.gray200,
        }}
      />
    ),

    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: COLOR_THEME.error }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        text1Style={{
          fontSize: FONT_SIZE.m,
          fontWeight: FONT_WEIGHT.semibold,
          color: COLOR_THEME.error,
          textTransform: "uppercase",
        }}
        text2Style={{
          fontSize: FONT_SIZE.s,
          fontWeight: FONT_WEIGHT.regular,
          color: COLOR_THEME.gray200,
        }}
      />
    ),

    pending: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: COLOR_THEME.black }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        text1Style={{
          fontSize: FONT_SIZE.m,
          fontWeight: FONT_WEIGHT.semibold,
          color: COLOR_THEME.black,
          textTransform: "uppercase",
        }}
        text2Style={{
          fontSize: FONT_SIZE.s,
          fontWeight: FONT_WEIGHT.regular,
          color: COLOR_THEME.gray200,
        }}
      />
    ),
  };

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            headerShadowVisible: false,
            header: ({}) => <TabsHeaderComponent />,
          }}
        />
      </Stack>

      <Toast
        autoHide={true}
        visibilityTime={5000}
        config={toastConfig}
        position="bottom"
        bottomOffset={64}
      />

      <DefaultChecker />
      <NetworkChecker />
    </Provider>
  );
}

const DefaultChecker = () => {
  const latest_id = useSelector((state) => state.notification.latest_id);

  //set request checker on interval
  useEffect(() => {
    const requestNotifications = async () => {
      let res = await USER_HOOKS.fetch_notifications();
    };

    const interval = setInterval(() => {
      requestNotifications();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //update global state notification has unread when latest_id changes
  useMemo(() => {
    if (latest_id) {
      USER_HOOKS.validate_notification_latest_id(latest_id);
    }
  }, [latest_id]);

  return <></>;
};

const NetworkChecker = () => {
  const [isDefault, setIsDefault] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    if (!isDefault) {
      if (isConnected) {
        Alert.success(
          "Stable Connection Restored",
          "Your internet connection was restored"
        );
      } else {
        Alert.error(
          "error",
          "Poor Connection Detected",
          "Check your internet connection and try again"
        );
      }
    }

    setIsDefault(false);
  }, [isConnected]);

  //test for connection every 10sec
  useEffect(() => {
    const testInterval = setInterval(() => {
      fetch().then((state) => {
        setIsConnected(state.isConnected);
      });
    }, 10000);

    return () => {
      clearInterval(testInterval);
    };
  }, []);

  return <></>;
};
