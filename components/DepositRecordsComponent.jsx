import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { DEMO_DEPOSIT_LIST } from "../helpers/demo_data";
import DepositRecord from "./reuseables/DepositRecord";
import NotFoundComponent from "./reuseables/NotFoundComponent";
import SeeMoreBtn from "./reuseables/SeeMoreBtn";

const DepositRecordsComponent = ({ filter }) => {
  const deposit_records = DEMO_DEPOSIT_LIST;

  return (
    <View style={styles.component}>
      {deposit_records?.length > 0 ? (
        deposit_records?.map((item, index) => (
          <DepositRecord key={index} data={item} />
        ))
      ) : (
        <NotFoundComponent text={"No deposits recorded"} />
      )}

      {/**see more button logic */}
      {deposit_records?.length > 0 && (
        <SeeMoreBtn onPress={() => console.log("see more")} />
      )}
    </View>
  );
};

export default memo(DepositRecordsComponent);

const styles = StyleSheet.create({
  component: {
    width: "100%",
    padding: 16,
    gap: 16,
  },
});
