import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Tabs, usePathname } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants/theme";
import SafeAreaWrapper from "../../components/ui/safeAreaWrapper";
import TabsHeaderComponent from "../../components/TabsHeaderComponent";

export default function TabsLayout() {
  const path = usePathname();
  const [sceneColor, setSceneColor] = useState(COLOR_THEME.gray50);

  useEffect(() => {
    console.log("path: ", path);
    const whiteBGs = ["/account", "/create"];

    if (path) {
      if (whiteBGs?.includes(path)) {
        console.log("in");
        setSceneColor(COLOR_THEME.white);
      } else {
        console.log("out");
        setSceneColor(COLOR_THEME.gray50);
      }
    }
  }, [path]);

  return (
    <SafeAreaWrapper>
      <TabsHeaderComponent />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLOR_THEME.primary,
          tabBarInactiveTintColor: COLOR_THEME.gray100,
          tabBarStyle: {
            height: Platform.OS === "ios" ? 74 : 64,
            backgroundColor: COLOR_THEME.white,
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarItemStyle: {
            paddingVertical: 6,
          },
          tabBarLabelStyle: {
            fontSize: FONT_SIZE.xs,
            fontWeight: FONT_WEIGHT.semibold,
          },
          tabBarHideOnKeyboard: true,
          tabBarButton: ({ children, ...props }) => (
            <TouchableOpacity
              style={props?.style}
              onPress={props?.onPress}
              activeOpacity={0.6}
            >
              {children}
            </TouchableOpacity>
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Octicons name="home" size={18} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="records"
          options={{
            title: "Records",
            tabBarIcon: ({ color }) => (
              <Octicons name="project" size={18} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color }) => (
              <Octicons name="person" size={18} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({});
