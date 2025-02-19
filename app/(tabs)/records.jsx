import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScrollViewWrapper from "../../components/ui/ScrollViewWrapper";
import { COLOR_THEME } from "../../constants";
import RecordsSortingComponent from "../../components/RecordsSortingComponent";
import DepositRecordsComponent from "../../components/DepositRecordsComponent";
import PackageRecordsComponent from "../../components/PackageRecordsComponent";
import { useSelector } from "react-redux";

export default function Records() {
  const theme = useSelector((state) => state.app.theme);

  const [activeSort, setActiveSort] = useState();
  const [activeFilter, setActiveFilter] = useState();

  return (
    <View style={styles(theme).safeArea}>
      {/**sort records */}
      <RecordsSortingComponent
        activeSort={activeSort}
        setActiveSort={setActiveSort}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <ScrollViewWrapper style={styles(theme).scrollArea}>
        {/**deposit block */}
        {activeSort?.name === "deposits" && (
          <DepositRecordsComponent filter={activeFilter} />
        )}

        {/*package block*/}
        {activeSort?.name === "packages" && (
          <PackageRecordsComponent filter={activeFilter} />
        )}
      </ScrollViewWrapper>
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    safeArea: {
      width: "100%",
      flex: 1,
    },
    scrollArea: {
      backgroundColor: COLOR_THEME[theme].gray50,
    },
  });
