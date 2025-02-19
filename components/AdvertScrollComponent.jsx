import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { COLOR_THEME, SCREEN_DIMENSION } from "../constants";
import { BORDER_RADIUS } from "../constants/theme";
import { useSelector } from "react-redux";

const AdvertScrollComponent = () => {
  const theme = useSelector((state) => state.app.theme);
  const adverts = [1, 2, 3, 4];

  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={true}
        contentContainerStyle={styles(theme).scroll}
      >
        {adverts?.map((item, index) => (
          <AdComp key={index} theme={theme} />
        ))}
      </ScrollView>

      {/**indicator */}
      <View style={styles(theme).indicatorHolder}>
        <ScrollIndicator items={adverts} active={1} theme={theme} />
      </View>
    </View>
  );
};

const AdComp = ({ theme }) => {
  return <Pressable style={styles(theme).adComp}></Pressable>;
};

const ScrollIndicator = ({ items, active, theme }) => {
  return (
    <View style={styles(theme).indicator}>
      {items?.map((item, index) => (
        <View
          key={index}
          style={[
            styles(theme).indicatorDot,
            item === active && { backgroundColor: COLOR_THEME[theme].primary },
          ]}
        ></View>
      ))}
    </View>
  );
};

export default memo(AdvertScrollComponent);

const styles = (theme) =>
  StyleSheet.create({
    scroll: {
      minWidth: "100%",
    },
    adComp: {
      width: SCREEN_DIMENSION.subtractWidth(0, 32, 0),
      height: SCREEN_DIMENSION.heightRatio(1 / 5),
      backgroundColor: COLOR_THEME[theme].white,
      borderRadius: BORDER_RADIUS.b,
    },
    indicatorHolder: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
    },
    indicator: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
      borderRadius: BORDER_RADIUS.r,
      backgroundColor: COLOR_THEME[theme].white,
    },
    indicatorDot: {
      width: 6,
      height: 6,
      borderRadius: BORDER_RADIUS.r,
      backgroundColor: COLOR_THEME[theme].gray100,
    },
  });
