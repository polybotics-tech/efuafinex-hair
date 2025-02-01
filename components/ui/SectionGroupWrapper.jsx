import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { router } from "expo-router";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";

const SectionGroupWrapper = ({ children, ...props }) => {
  return (
    <View style={styles.sectionGroup}>
      {props?.title && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{props?.title}</Text>

          {/**link */}
          {props?.seeAllPath && (
            <Text
              onPress={() => {
                router.navigate(`${props?.seeAllPath}`);
              }}
              style={styles.sectionLink}
            >
              See all
            </Text>
          )}
        </View>
      )}

      {/**section children populate */}
      {props?.horizontal ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scroll, props?.scrollContainerStyle]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.scroll, props?.scrollContainerStyle]}>
          {children}
        </View>
      )}
    </View>
  );
};

export default memo(SectionGroupWrapper);

const styles = StyleSheet.create({
  sectionGroup: {
    width: "100%",
    gap: 16,
  },
  sectionHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  sectionTitle: {
    fontSize: FONT_SIZE.m,
    fontWeight: FONT_WEIGHT.bold,
    color: COLOR_THEME.black,
    textTransform: "capitalize",
  },
  sectionLink: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.primary,
  },
  scroll: {
    minWidth: "100%",
    gap: 16,
    paddingVertical: 4,
  },
});
