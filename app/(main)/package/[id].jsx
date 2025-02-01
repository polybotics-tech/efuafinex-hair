import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaWrapper from "../../../components/ui/safeAreaWrapper";
import ScrollViewWrapper from "../../../components/ui/ScrollViewWrapper";
import DefaultHeaderComponent from "../../../components/DefaultHeaderComponent";
import { useLocalSearchParams } from "expo-router";
import { fetch_package_data } from "../../../helpers/hooks/package";
import PackageCard from "../../../components/reuseables/PackageCard";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../../constants";

export default function Package() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState();

  useEffect(() => {
    if (id) {
      setData(fetch_package_data(id));
    }
  }, [id]);

  return (
    <SafeAreaWrapper>
      <DefaultHeaderComponent directory={"package"} />

      <ScrollViewWrapper style={styles.page}>
        {/**package details */}
        <PackageCard type={data?.package_type} data={data} />

        {/**description */}
        <DescriptionComp description={data?.description} />
      </ScrollViewWrapper>
    </SafeAreaWrapper>
  );
}

const DescriptionComp = ({ description }) => {
  return (
    <View style={styles.descriptionComp}>
      <View style={styles.descriptionTopBar}>
        <Text style={styles.descriptionTitle}>Description</Text>
      </View>

      <Text style={styles.descriptionValue}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width: "100%",
    minHeight: "100%",
    padding: 16,
    backgroundColor: COLOR_THEME.gray50,
    gap: 16,
  },
  descriptionComp: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLOR_THEME.white,
    gap: 16,
  },
  descriptionTopBar: {
    width: "100%",
    paddingBottom: 8,
    borderBottomWidth: 0.8,
    borderBottomColor: COLOR_THEME.gray50,
  },
  descriptionTitle: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
  },
  descriptionValue: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
  },
});
