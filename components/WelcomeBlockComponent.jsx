import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../constants";
import { useSelector } from "react-redux";
import ImageComponent from "./reuseables/ImageComponent";
import { IMAGE_LOADER } from "../helpers/utils/image-loader";
import { BORDER_RADIUS } from "../constants/theme";
import { get_current_greeting } from "../helpers/utils/datetime";

const WelcomeBlockComponent = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <View style={styles.component}>
      <View style={styles.thumbnail}>
        <ImageComponent
          uri={IMAGE_LOADER.user_thumbnail(user?.thumbnail)}
          blur={user?.thumbnail_blur}
        />
      </View>

      {/** */}
      <View style={styles.details}>
        <Text style={styles.greeting}>{get_current_greeting()},</Text>
        <Text style={styles.name}>{user?.fullname}</Text>
      </View>
    </View>
  );
};

export default memo(WelcomeBlockComponent);

const styles = StyleSheet.create({
  component: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    borderRadius: BORDER_RADIUS.m,
    backgroundColor: COLOR_THEME.white,
  },
  thumbnail: {
    width: 54,
    height: 54,
    borderRadius: BORDER_RADIUS.r,
    backgroundColor: COLOR_THEME.gray50,
    overflow: "hidden",
  },
  details: {
    width: SCREEN_DIMENSION.subtractWidth(8, 16 + 16, 64),
    gap: 2,
  },
  greeting: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
  },
  name: {
    fontSize: FONT_SIZE.m,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
    textTransform: "capitalize",
  },
});
