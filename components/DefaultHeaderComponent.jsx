import { StyleSheet, Text, View } from "react-native";
import React, { memo, useMemo, useState } from "react";
import BackBtn from "./reuseables/BackBtn";
import { usePathname } from "expo-router";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../constants";

const DefaultHeaderComponent = ({ directory }) => {
  const pathname = usePathname();
  const [title, setTitle] = useState(""); //state to store page title

  //titles for account routes
  const page_titles = {
    account: {
      settings: "Account Settings",
      password: "Change Password",
      location: "Delivery Location",
      notification: "Push Notifications",
      logout: "Log Out",
      delete: "Delete Account",
      contact: "Contact Us",
    },
  };

  //sort page title based on pathname and directory
  useMemo(() => {
    if (pathname) {
      let path = pathname.split(directory + "/")[1];

      //switch case to set title based on directory
      switch (directory) {
        case "404":
          setTitle("Page Not Found");
          break;
        case "reciept":
          setTitle("Transaction Details");
          break;
        case "package":
          setTitle("Package Details");
          break;
        case "create":
          setTitle("Create New Package");
          break;
        case "deposit":
          setTitle("Make Deposit");
          break;
        default:
          setTitle(page_titles[directory][path]);
          break;
      }
    }
  }, [pathname]);
  return (
    <View style={styles.header}>
      {/*back button*/}
      <BackBtn />

      {/*page title*/}
      <Text style={styles.pageTitle}>{title}</Text>
    </View>
  );
};

export default memo(DefaultHeaderComponent);

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: COLOR_THEME.white,
    borderBottomWidth: 0.8,
    borderBottomColor: COLOR_THEME.gray50,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  pageTitle: {
    fontSize: FONT_SIZE.xb,
    fontWeight: FONT_WEIGHT.bold,
    color: COLOR_THEME.black,
  },
});
