import { Stack } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { fetch } from "@react-native-community/netinfo";
import * as Notifications from "expo-notifications";
import store from "../redux/store";
import TabsHeaderComponent from "../components/TabsHeaderComponent";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../constants";
import { USER_HOOKS } from "../helpers/hooks/user";
import { Alert } from "../helpers/utils/alert";

// First, set the handler that will cause the notification to show the alert
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
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

      <ThemeChecker />
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
    }, 120000);

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
          "Poor Connection Detected",
          "Check your internet connection and try again"
        );
      }
    }

    setIsDefault(false);
  }, [isConnected]);

  //test for connection every 30sec
  useEffect(() => {
    const testInterval = setInterval(() => {
      fetch().then((state) => {
        setIsConnected(state.isConnected);
      });
    }, 30000);

    return () => {
      clearInterval(testInterval);
    };
  }, []);

  return <></>;
};

const ThemeChecker = () => {
  const theme = useSelector((state) => state.app.theme);

  //update app theme from user preference
  useEffect(() => {
    const write_theme_from_user = async () => {
      await USER_HOOKS.fetch_theme_preference();
    };

    write_theme_from_user();
  }, []);

  //creating custom toast configurations
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: COLOR_THEME[theme].success,
          backgroundColor: COLOR_THEME[theme].white,
        }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        text1Style={{
          fontSize: FONT_SIZE.m,
          fontWeight: FONT_WEIGHT.semibold,
          color: COLOR_THEME[theme].success,
          textTransform: "uppercase",
        }}
        text2Style={{
          fontSize: FONT_SIZE.s,
          fontWeight: FONT_WEIGHT.regular,
          color: COLOR_THEME[theme].gray200,
        }}
      />
    ),

    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: COLOR_THEME[theme].error,
          backgroundColor: COLOR_THEME[theme].white,
        }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        text1Style={{
          fontSize: FONT_SIZE.m,
          fontWeight: FONT_WEIGHT.semibold,
          color: COLOR_THEME[theme].error,
          textTransform: "uppercase",
        }}
        text2Style={{
          fontSize: FONT_SIZE.s,
          fontWeight: FONT_WEIGHT.regular,
          color: COLOR_THEME[theme].gray200,
        }}
      />
    ),

    pending: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: COLOR_THEME[theme].black,
          backgroundColor: COLOR_THEME[theme].white,
        }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        text1Style={{
          fontSize: FONT_SIZE.m,
          fontWeight: FONT_WEIGHT.semibold,
          color: COLOR_THEME[theme].black,
          textTransform: "uppercase",
        }}
        text2Style={{
          fontSize: FONT_SIZE.s,
          fontWeight: FONT_WEIGHT.regular,
          color: COLOR_THEME[theme].gray200,
        }}
      />
    ),
  };

  return (
    <Toast
      autoHide={true}
      visibilityTime={5000}
      config={toastConfig}
      position="bottom"
      bottomOffset={100}
    />
  );
};
