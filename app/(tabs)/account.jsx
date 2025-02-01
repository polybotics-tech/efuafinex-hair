import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScrollViewWrapper from "../../components/ui/ScrollViewWrapper";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";

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
          title={"Delivery Location"}
          icon={"location"}
          path={"/account/location/"}
        />
        <OptionTag
          title={"Push Notifications"}
          icon={"bell"}
          path={"/account/notification/"}
        />
        <OptionTag
          title={"Log Out"}
          icon={"sign-out"}
          path={"/account/logout/"}
        />
      </SectionContainer>

      {/**support card */}
      <SectionContainer title={"Support"}>
        <OptionTag title={"Contact Us"} icon={"unmute"} />
        <OptionTag title={"Privacy Policy"} icon={"file"} />
      </SectionContainer>
    </ScrollViewWrapper>
  );
}

const ProfileCard = ({}) => {
  return (
    <View style={styles.cardTemplate}>
      <View style={styles.userCard}>
        <View style={styles.profileThumbnail}></View>
        <View>
          <Text style={styles.userName}>Emma emeka</Text>
          <Text style={styles.userMail}>emmanuelemeka@gmail.com</Text>
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
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  cardTemplate: {
    width: "100%",
    padding: 16,
    backgroundColor: COLOR_THEME.gray50,
    borderRadius: 32,
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
    borderRadius: 100,
    backgroundColor: COLOR_THEME.white,
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
    borderRadius: 100,
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
