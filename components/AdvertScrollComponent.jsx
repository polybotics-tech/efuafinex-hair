import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { COLOR_THEME, SCREEN_DIMENSION } from "../constants";

const AdvertScrollComponent = () => {
  const adverts = [1, 2, 3, 4];

  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={true}
        contentContainerStyle={styles.scroll}
      >
        {adverts?.map((item, index) => (
          <AdComp key={index} />
        ))}
      </ScrollView>

      {/**indicator */}
      <View style={styles.indicatorHolder}>
        <ScrollIndicator items={adverts} active={1} />
      </View>
    </View>
  );
};

const AdComp = ({}) => {
  return <Pressable style={styles.adComp}></Pressable>;
};

const ScrollIndicator = ({ items, active }) => {
  return (
    <View style={styles.indicator}>
      {items?.map((item, index) => (
        <View
          key={index}
          style={[
            styles.indicatorDot,
            item === active && { backgroundColor: COLOR_THEME.primary },
          ]}
        ></View>
      ))}
    </View>
  );
};

export default memo(AdvertScrollComponent);

const styles = StyleSheet.create({
  scroll: {
    minWidth: "100%",
  },
  adComp: {
    width: SCREEN_DIMENSION.subtractWidth(0, 32, 0),
    height: SCREEN_DIMENSION.heightRatio(1 / 5),
    backgroundColor: COLOR_THEME.white,
    borderRadius: 32,
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
    borderRadius: 20,
    backgroundColor: COLOR_THEME.white,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 20,
    backgroundColor: COLOR_THEME.gray100,
  },
});
