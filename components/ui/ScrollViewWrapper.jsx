import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import React, { memo, useCallback, useState } from "react";
import { COLOR_THEME, SCREEN_DIMENSION } from "../../constants";
import AppStatusBar from "../AppStatusBar";
import { useSelector } from "react-redux";

const ScrollViewWrapper = ({
  children,
  style = {},
  refreshFunc = () => {},
}) => {
  const theme = useSelector((state) => state.app.theme);

  //handle refreshing
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    //run refresh function
    refreshFunc();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  });

  return (
    <ScrollView
      contentContainerStyle={[styles(theme).scroll, style]}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor={COLOR_THEME[theme].white}
          colors={[COLOR_THEME[theme].primary]}
          tintColor={COLOR_THEME[theme].primary}
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

const styles = (theme) =>
  StyleSheet.create({
    scroll: {
      width: SCREEN_DIMENSION.width,
      minHeight: "100%",
      backgroundColor: COLOR_THEME[theme].white,
      paddingBottom: 64,
    },
  });
