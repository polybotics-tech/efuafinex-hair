import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { router } from "expo-router";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";
import { useSelector } from "react-redux";

const SectionGroupWrapper = ({ children, ...props }) => {
  const theme = useSelector((state) => state.app.theme);

  return (
    <View style={styles(theme).sectionGroup}>
      {props?.title && (
        <View style={styles(theme).sectionHeader}>
          <Text style={styles(theme).sectionTitle}>{props?.title}</Text>

          {/**link */}
          {props?.seeAllPath && (
            <Text
              onPress={() => {
                router.navigate(`${props?.seeAllPath}`);
              }}
              style={styles(theme).sectionLink}
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
          contentContainerStyle={[
            styles(theme).scroll,
            props?.scrollContainerStyle,
          ]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles(theme).scroll, props?.scrollContainerStyle]}>
          {children}
        </View>
      )}
    </View>
  );
};

export default memo(SectionGroupWrapper);

const styles = (theme) =>
  StyleSheet.create({
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
      color: COLOR_THEME[theme].black,
      textTransform: "capitalize",
    },
    sectionLink: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].primary,
    },
    scroll: {
      minWidth: "100%",
      gap: 16,
      paddingVertical: 4,
    },
  });
