import { StyleSheet, Text, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
import PackageCard from "./reuseables/PackageCard";
import NotFoundComponent from "./reuseables/NotFoundComponent";
import SeeMoreBtn from "./reuseables/SeeMoreBtn";
import { PACKAGE_HOOKS } from "../helpers/hooks/package";

const PackageRecordsComponent = ({ filter }) => {
  const [packages, setPackages] = useState();
  const [meta, setMeta] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPackages = async (page) => {
    //send request
    const result = await PACKAGE_HOOKS.fetch_user_packages(setIsLoading, page);

    if (result) {
      setMeta(result?.meta);

      if (page > 1 && result?.packages) {
        setPackages((prev) => [...prev, ...result?.packages]);
      } else {
        setPackages(result?.packages);
      }
    }
  };

  useEffect(() => {
    fetchPackages(1);
  }, [filter]);

  const seeMore = () => {
    fetchPackages(Number(meta?.page + 1));
  };

  return (
    <View style={styles.component}>
      {packages?.length > 0 ? (
        packages?.map((item, index) => (
          <PackageCard
            key={index}
            type={item?.package_type}
            data={item}
            clickable={true}
          />
        ))
      ) : (
        <NotFoundComponent
          text={"No packages recorded"}
          isLoading={isLoading}
        />
      )}

      {/**see more button logic */}
      {packages?.length > 0 && meta?.has_next_page && (
        <SeeMoreBtn onPress={() => seeMore()} isLoading={isLoading} />
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
