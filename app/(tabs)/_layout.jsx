import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLOR_THEME.primary,
        tabBarInactiveTintColor: COLOR_THEME.gray100,
        tabBarStyle: {
          height: 64,
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
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => (
            <Octicons name="comment" size={18} color={color} />
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
  );
}

const styles = StyleSheet.create({});
