import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useEffect, useMemo, useState } from "react";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../constants";
import { router, usePathname } from "expo-router";
import { useSelector } from "react-redux";
import { BORDER_RADIUS } from "../constants/theme";
import ImageComponent from "./reuseables/ImageComponent";
import { IMAGE_LOADER } from "../helpers/utils/image-loader";
import { get_current_greeting } from "../helpers/utils/datetime";

const TabsHeaderComponent = () => {
  const theme = useSelector((state) => state.app.theme);
  const user = useSelector((state) => state.user?.user);

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
        case "/notices":
          setPageName("Latest Notices");
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
    <View style={styles(theme).header(pageName?.toLowerCase())}>
      {pageName === "Home" ? (
        <View style={styles(theme).logo}>
          <Text style={styles(theme).LogoName} numberOfLines={1}>
            Hello {String(user?.fullname)?.split(" ")[0]},
          </Text>
          <Text style={styles(theme).greetings}>{get_current_greeting()}</Text>
        </View>
      ) : (
        <Text style={styles(theme).pageTitle}>{pageName}</Text>
      )}

      {/**action buttons */}
      <TouchableOpacity
        style={styles(theme).userThumbnailCont}
        onPress={() => {
          router.navigate("/account");
        }}
      >
        <ImageComponent
          uri={IMAGE_LOADER.user_thumbnail(user?.thumbnail)}
          blur={user?.thumbnail_blur}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(TabsHeaderComponent);

const styles = (theme) =>
  StyleSheet.create({
    header: (page) => ({
      width: "100%",
      paddingTop: 8,
      paddingBottom: 12,
      paddingHorizontal: 16,
      backgroundColor: COLOR_THEME[theme].white,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      borderBottomWidth: 0.8,
      borderBottomColor:
        page === "home" ? COLOR_THEME[theme].gray50 : COLOR_THEME[theme].white,
    }),
    logo: {
      width: SCREEN_DIMENSION.subtractWidth(20, 32, 44),
      gap: 2,
    },
    LogoName: {
      maxWidth: "100%",
      fontSize: FONT_SIZE.b,
      fontWeight: FONT_WEIGHT.semibold,
      lineHeight: 18,
      color: COLOR_THEME[theme].black,
      textTransform: "capitalize",
    },
    greetings: {
      maxWidth: "100%",
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray100,
    },
    LogoNameLink: {
      color: COLOR_THEME[theme].primary,
    },
    pageTitle: {
      fontSize: FONT_SIZE.xb,
      fontWeight: FONT_WEIGHT.bold,
      color: COLOR_THEME[theme].black,
    },
    userThumbnailCont: {
      width: 44,
      height: 44,
      borderRadius: BORDER_RADIUS.r,
      backgroundColor: COLOR_THEME[theme].gray50,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
    },
  });
