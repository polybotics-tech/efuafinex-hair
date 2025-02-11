import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScrollViewWrapper from "../../components/ui/ScrollViewWrapper";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import ImageComponent from "../../components/reuseables/ImageComponent";
import { IMAGE_LOADER } from "../../helpers/utils/image-loader";
import { BORDER_RADIUS } from "../../constants/theme";

export default function Account() {
  return (
    <ScrollViewWrapper style={styles.scrollView}>
      {/**profile card */}
      <ProfileCard />

      {/**setting card */}
      <SectionContainer title={"Settings"}>
        <OptionTag
          title={"Account Details"}
          icon={"gear"}
          path={"/account/settings/"}
        />
        <OptionTag
          title={"Change Password"}
          icon={"shield-lock"}
          path={"/account/password/"}
        />
        <OptionTag
          title={"Push Notifications"}
          icon={"bell"}
          path={"/account/notification/"}
        />
        {/*<OptionTag
          title={"Delivery Location"}
          icon={"location"}
          path={"/account/location/"}
        />*/}
      </SectionContainer>

      {/**support card */}
      <SectionContainer title={"Support"}>
        <OptionTag
          title={"Contact Us"}
          icon={"unmute"}
          path={"/account/contact/"}
        />
        <OptionTag title={"Privacy Policy"} icon={"file"} />
      </SectionContainer>

      {/**support card */}
      <SectionContainer title={"Miscellaneous"}>
        <OptionTag
          title={"Log Out"}
          icon={"sign-out"}
          path={"/account/logout/"}
        />
        <OptionTag
          title={"Delete Account"}
          icon={"trash"}
          path={"/account/delete/"}
        />
      </SectionContainer>
    </ScrollViewWrapper>
  );
}

const ProfileCard = ({}) => {
  const user = useSelector((state) => state.user.user);

  return (
    <View style={styles.cardTemplate}>
      <View style={styles.userCard}>
        <View style={styles.profileThumbnail}>
          <ImageComponent
            uri={IMAGE_LOADER.user_thumbnail(user?.thumbnail)}
            blur={user?.thumbnail_blur}
          />
        </View>

        <View>
          <Text style={styles.userName}>{user?.fullname}</Text>
          <Text style={styles.userMail}>{user?.email}</Text>
        </View>
      </View>

      {/**options */}
      <View style={styles.optionList}>
        <OptionTag
          title={"Packages Record"}
          icon={"archive"}
          path={"/records/?type=packages"}
        />
        <OptionTag
          title={"Deposits Record"}
          icon={"credit-card"}
          path={"/records/?type=deposits"}
        />
      </View>
    </View>
  );
};

const SectionContainer = ({ children, title }) => {
  return (
    <View style={styles.cardTemplate}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {/**options */}
      <View style={styles.optionList}>{children}</View>
    </View>
  );
};

const OptionTag = ({ title, icon, path }) => {
  const handlePress = () => {
    if (path) {
      // navigate to path
      router.navigate(path);
    }
  };

  return (
    <Pressable style={styles.option} onPress={handlePress}>
      <View style={styles.optionLeft}>
        <View style={styles.optionIcon}>
          <Octicons name={icon} size={18} color={COLOR_THEME.gray200} />
        </View>
        <Text style={styles.optionTitle}>{title}</Text>
      </View>

      <Octicons name="chevron-right" size={16} color={COLOR_THEME.gray200} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  cardTemplate: {
    width: "100%",
    padding: 16,
    backgroundColor: COLOR_THEME.gray50,
    borderRadius: BORDER_RADIUS.xb,
  },
  userCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: COLOR_THEME.white,
  },
  profileThumbnail: {
    width: 72,
    height: 72,
    borderRadius: BORDER_RADIUS.r,
    backgroundColor: COLOR_THEME.white,
    overflow: "hidden",
  },
  userName: {
    fontSize: FONT_SIZE.b,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
    textTransform: "capitalize",
  },
  userMail: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
    textTransform: "lowercase",
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
    paddingRight: 8,
  },
  optionLeft: {
    width: "100%",
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
    backgroundColor: COLOR_THEME.white,
  },
  optionTitle: {
    fontSize: FONT_SIZE.m,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
    textTransform: "capitalize",
  },
  sectionTitle: {
    fontSize: FONT_SIZE.b,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
    textTransform: "capitalize",
  },
  sectionHeader: {
    width: "100%",
    paddingBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: COLOR_THEME.white,
  },
});
