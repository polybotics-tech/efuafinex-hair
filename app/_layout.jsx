import { Stack } from "expo-router";
import { Provider, useSelector } from "react-redux";
import store from "../redux/store";
import TabsHeaderComponent from "../components/TabsHeaderComponent";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../constants";
import { useEffect, useMemo } from "react";
import { USER_HOOKS } from "../helpers/hooks/user";

export default function RootLayout() {
  //creating custom toast configurations
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: COLOR_THEME.primary }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        text1Style={{
          fontSize: FONT_SIZE.m,
          fontWeight: FONT_WEIGHT.semibold,
          color: COLOR_THEME.primary,
          textTransform: "uppercase",
        }}
        text2Style={{
          fontSize: FONT_SIZE.s,
          fontWeight: FONT_WEIGHT.regular,
          color: COLOR_THEME.gray200,
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
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
    /*
      Overwrite 'pending' type,
      by modifying the existing `BaseToast` component
    */
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
