import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScrollViewWrapper from "../../components/ui/ScrollViewWrapper";
import { COLOR_THEME } from "../../constants";
import RecordsSortingComponent from "../../components/RecordsSortingComponent";
import DepositRecordsComponent from "../../components/DepositRecordsComponent";
import PackageRecordsComponent from "../../components/PackageRecordsComponent";

export default function Records() {
  const [activeSort, setActiveSort] = useState();
  const [activeFilter, setActiveFilter] = useState();

  return (
    <View style={styles.safeArea}>
      {/**sort records */}
      <RecordsSortingComponent
        activeSort={activeSort}
        setActiveSort={setActiveSort}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <ScrollViewWrapper style={styles.scrollArea}>
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

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
    flex: 1,
  },
  scrollArea: {
    backgroundColor: COLOR_THEME.gray50,
  },
});
