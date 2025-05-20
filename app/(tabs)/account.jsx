import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import ScrollViewWrapper from "../../components/ui/ScrollViewWrapper";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../../constants";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import ImageComponent from "../../components/reuseables/ImageComponent";
import { IMAGE_LOADER } from "../../helpers/utils/image-loader";
import { BORDER_RADIUS } from "../../constants/theme";
import CopyIcon from "../../components/reuseables/CopyIcon";
import { USER_HOOKS } from "../../helpers/hooks/user";

export default function Account() {
  const theme = useSelector((state) => state.app.theme);

  return (
    <ScrollViewWrapper style={styles(theme).scrollView}>
      {/**profile card */}
      <ProfileCard theme={theme} />

      {/**setting card */}
      <SectionContainer title={"Settings"} theme={theme}>
        <OptionTag
          title={"Account Details"}
          icon={"gear"}
          path={"/account/settings/"}
          theme={theme}
        />
        <OptionTag
          title={"Change Password"}
          icon={"shield-lock"}
          path={"/account/password/"}
          theme={theme}
        />
        <OptionTag
          title={"Manage Bank Account"}
          icon={"checklist"}
          path={"/account/refund/"}
          theme={theme}
        />

        <OptionTag
          title={"Manage Notifications"}
          icon={"bell"}
          path={"/account/notification/"}
          theme={theme}
        />
      </SectionContainer>

      {/**support card */}
      <SectionContainer title={"Support"} theme={theme}>
        <OptionTag
          title={"Contact Us"}
          icon={"unmute"}
          path={"/account/contact/"}
          theme={theme}
        />
        <OptionTag
          title={"Terms and Conditions"}
          icon={"file"}
          theme={theme}
          path={"/terms/?ref=read"}
        />

        <OptionTag title={"Privacy Policy"} icon={"file"} theme={theme} />
      </SectionContainer>

      {/**miscellaneous */}
      <SectionContainer title={"Miscellaneous"} theme={theme}>
        <ThemeToggle theme={theme} />
        <OptionTag
          title={"Log Out"}
          icon={"sign-out"}
          path={"/account/logout/"}
          theme={theme}
        />
        <OptionTag
          title={"Delete Account"}
          icon={"trash"}
          path={"/account/delete/"}
          theme={theme}
        />
      </SectionContainer>
    </ScrollViewWrapper>
  );
}

const ProfileCard = ({ theme }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <View style={styles(theme).cardTemplate}>
      <View style={styles(theme).userCard}>
        <View style={styles(theme).profileThumbnail}>
          <ImageComponent
            uri={IMAGE_LOADER.user_thumbnail(user?.thumbnail)}
            blur={user?.thumbnail_blur}
          />
        </View>

        <View style={{ gap: 3 }}>
          <View style={styles(theme).userIdCont}>
            <Text numberOfLines={1} style={styles(theme).userId}>
              {user?.user_id}
            </Text>
            <CopyIcon text_to_copy={user?.user_id} />
          </View>
          <Text style={styles(theme).userName}>{user?.fullname}</Text>
          <Text style={styles(theme).userMail} numberOfLines={1}>
            {user?.email}
          </Text>
        </View>
      </View>

      {/**options */}
      <View style={styles(theme).optionList}>
        <OptionTag
          title={"Packages Record"}
          icon={"archive"}
          path={"/records/?type=packages"}
          theme={theme}
        />
        <OptionTag
          title={"Deposits Record"}
          icon={"credit-card"}
          path={"/records/?type=deposits"}
          theme={theme}
        />
      </View>
    </View>
  );
};

const SectionContainer = ({ children, title, theme }) => {
  return (
    <View style={styles(theme).cardTemplate}>
      <View style={styles(theme).sectionHeader}>
        <Text style={styles(theme).sectionTitle}>{title}</Text>
      </View>
      {/**options */}
      <View style={styles(theme).optionList}>{children}</View>
    </View>
  );
};

const OptionTag = ({ title, icon, path, theme }) => {
  const handlePress = () => {
    if (path) {
      // navigate to path
      router.navigate(path);
    }
  };

  return (
    <Pressable style={styles(theme).option} onPress={handlePress}>
      <View style={styles(theme).optionLeft}>
        <View style={styles(theme).optionIcon}>
          <Octicons name={icon} size={18} color={COLOR_THEME[theme].gray200} />
        </View>
        <Text style={styles(theme).optionTitle}>{title}</Text>
      </View>

      <Octicons
        name="chevron-right"
        size={16}
        color={COLOR_THEME[theme].gray200}
      />
    </Pressable>
  );
};

const ThemeToggle = ({ theme }) => {
  const is_dark = useSelector((state) => state.app.is_dark);

  const toggleSwitch = async () => {
    //handle toggling theme
    await USER_HOOKS.toggle_theme_preference();
  };

  return (
    <Pressable style={styles(theme).option}>
      <View style={styles(theme).optionLeft}>
        <View style={styles(theme).optionIcon}>
          <MaterialCommunityIcons
            name={"theme-light-dark"}
            size={18}
            color={COLOR_THEME[theme].gray200}
          />
        </View>
        <Text style={styles(theme).optionTitle}>Dark Theme</Text>
      </View>

      {/*switch*/}
      <Switch
        trackColor={{
          false: COLOR_THEME[theme].white,
          true: COLOR_THEME[theme].primaryFaded,
        }}
        thumbColor={
          is_dark ? COLOR_THEME[theme].primary : COLOR_THEME[theme].gray200
        }
        ios_backgroundColor={COLOR_THEME[theme].white}
        onValueChange={toggleSwitch}
        value={Boolean(is_dark)}
      />
    </Pressable>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    scrollView: {
      paddingTop: 8,
      paddingHorizontal: 16,
      paddingBottom: 16,
      gap: 16,
      backgroundColor: COLOR_THEME[theme].white,
    },
    cardTemplate: {
      width: "100%",
      padding: 16,
      backgroundColor: COLOR_THEME[theme].gray50,
      borderRadius: BORDER_RADIUS.xb,
    },
    userCard: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingBottom: 8,
      borderBottomWidth: 1.5,
      borderBottomColor: COLOR_THEME[theme].white,
    },
    profileThumbnail: {
      width: 72,
      height: 72,
      borderRadius: BORDER_RADIUS.r,
      backgroundColor: COLOR_THEME[theme].white,
      overflow: "hidden",
    },
    userName: {
      fontSize: FONT_SIZE.b,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].black,
      textTransform: "capitalize",
    },
    userMail: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray200,
      textTransform: "lowercase",
    },
    userIdCont: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    userId: {
      maxWidth: SCREEN_DIMENSION.subtractWidth(8 + 16, 32 + 32, 72),
      fontSize: FONT_SIZE.xs,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray100,
    },
    optionList: {
      width: "100%",
      paddingTop: 16,
      gap: 16,
    },
    option: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      paddingRight: 8,
    },
    optionLeft: {
      width: "100%",
      maxWidth: SCREEN_DIMENSION.subtractWidth(16, 32 + 32, 54),
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    optionIcon: {
      width: 48,
      height: 48,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: BORDER_RADIUS.r,
      backgroundColor: COLOR_THEME[theme].white,
    },
    optionTitle: {
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray200,
      textTransform: "capitalize",
    },
    sectionTitle: {
      fontSize: FONT_SIZE.b,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].black,
      textTransform: "capitalize",
    },
    sectionHeader: {
      width: "100%",
      paddingBottom: 8,
      borderBottomWidth: 1.5,
      borderBottomColor: COLOR_THEME[theme].white,
    },
  });
