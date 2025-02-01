import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { DEMO_PACKAGE_LIST } from "../helpers/demo_data";
import PackageCard from "./reuseables/PackageCard";
import NotFoundComponent from "./reuseables/NotFoundComponent";
import SeeMoreBtn from "./reuseables/SeeMoreBtn";

const PackageRecordsComponent = ({ filter }) => {
  const package_records = DEMO_PACKAGE_LIST;

  return (
    <View style={styles.component}>
      {package_records?.length > 0 ? (
        package_records?.map((item, index) => (
          <PackageCard
            key={index}
            type={item?.package_type}
            data={item}
            clickable={true}
          />
        ))
      ) : (
        <NotFoundComponent text={"No packages recorded"} />
      )}

      {/**see more button logic */}
      {package_records?.length > 0 && (
        <SeeMoreBtn onPress={() => console.log("see more")} />
      )}
    </View>
  );
};

export default memo(PackageRecordsComponent);

const styles = StyleSheet.create({
  component: {
    width: "100%",
    padding: 16,
    gap: 16,
  },
});
