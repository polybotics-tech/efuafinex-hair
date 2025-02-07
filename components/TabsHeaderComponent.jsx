import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../constants";
import { usePathname } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TabsHeaderComponent = () => {
  const path = usePathname();
  const [pageName, setPageName] = useState("");

  useMemo(() => {
    if (path) {
      switch (path) {
        case "/":
          setPageName("Home");
          break;
        case "/chats":
          setPageName("Chats");
          break;
        case "/records":
          setPageName("Activity Records");
          break;
        case "/account":
          setPageName("Account");
          break;

        default:
          setPageName("");
          break;
      }
    }
  }, [path]);

  return (
    <View style={styles.header(pageName?.toLowerCase())}>
      {pageName === "Home" ? (
        <Text style={styles.LogoName}>
          Logo<Text style={styles.LogoNameLink}>Name</Text>
        </Text>
      ) : (
        <Text style={styles.pageTitle}>{pageName}</Text>
      )}

      {/**action buttons */}
      <View style={styles.actionBtnSplit}>
        <NotificationBtn />
      </View>
    </View>
  );
};

const NotificationBtn = ({}) => {
  const [isRead, setIsRead] = useState(false);

  return (
    <Pressable style={styles.actionBtn}>
      <MaterialCommunityIcons
        name="bell-outline"
        size={18}
        color={COLOR_THEME.black}
      />

      {/**show indicator */}
      {!isRead && <View style={styles.actionIndicator}></View>}
    </Pressable>
  );
};

export default memo(TabsHeaderComponent);

const styles = StyleSheet.create({
  header: (page) => ({
    width: "100%",
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: COLOR_THEME.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.8,
    borderBottomColor: page === "home" ? COLOR_THEME.gray50 : COLOR_THEME.white,
  }),
  LogoName: {
    fontSize: FONT_SIZE.b,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
  },
  LogoNameLink: {
    color: COLOR_THEME.primary,
  },
  pageTitle: {
    fontSize: FONT_SIZE.xb,
    fontWeight: FONT_WEIGHT.bold,
    color: COLOR_THEME.black,
  },
  actionBtnSplit: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 100,
    backgroundColor: COLOR_THEME.gray50,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  actionIndicator: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: COLOR_THEME.primary,
    position: "absolute",
    top: 0,
    right: 5,
  },
});
