import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import React, { memo, useCallback, useState } from "react";
import { COLOR_THEME, SCREEN_DIMENSION } from "../../constants";
import AppStatusBar from "../AppStatusBar";

const ScrollViewWrapper = ({
  children,
  style = {},
  refreshFunc = () => {},
}) => {
  //handle refreshing
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      //run refresh function
      refreshFunc();

      setRefreshing(false);
    }, 2000);
  });

  return (
    <ScrollView
      contentContainerStyle={[styles.scroll, style]}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor={COLOR_THEME.primary}
          colors={[COLOR_THEME.primaryFaded]}
          tintColor={COLOR_THEME.primary}
        />
      }
    >
      {children}

      {/**rewrite status bar */}
      <AppStatusBar />
    </ScrollView>
  );
};

export default memo(ScrollViewWrapper);

const styles = StyleSheet.create({
  scroll: {
    width: SCREEN_DIMENSION.width,
    minHeight: "100%",
    backgroundColor: COLOR_THEME.white,
  },
});
