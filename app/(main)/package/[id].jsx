import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaWrapper from "../../../components/ui/safeAreaWrapper";
import ScrollViewWrapper from "../../../components/ui/ScrollViewWrapper";
import DefaultHeaderComponent from "../../../components/DefaultHeaderComponent";
import { useLocalSearchParams } from "expo-router";
import {
  fetch_package_data,
  PACKAGE_HOOKS,
} from "../../../helpers/hooks/package";
import PackageCard from "../../../components/reuseables/PackageCard";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../../constants";
import NotFoundComponent from "../../../components/reuseables/NotFoundComponent";

export default function Package() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  //fetch package details
  const fetchPackage = async (id) => {
    const result = await PACKAGE_HOOKS.fetch_single_package(setIsLoading, id);

    if (result) {
      setData(result);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPackage(id);
    }
  }, [id]);

  return (
    <SafeAreaWrapper>
      <DefaultHeaderComponent directory={"package"} />

      <ScrollViewWrapper
        style={styles.page}
        refreshFunc={() => {
          setData();
          fetchPackage(id);
        }}
      >
        {/**package details */}
        {!data ? (
          <NotFoundComponent text={"Package not found"} isLoading={isLoading} />
        ) : (
          <>
            <PackageCard type={data?.package_type} data={data} />

            {/**description */}
            <DescriptionComp description={data?.description} />
          </>
        )}
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
