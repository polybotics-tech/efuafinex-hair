import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScrollViewWrapper from "../../components/ui/ScrollViewWrapper";
import { COLOR_THEME } from "../../constants";
import HomeQuickOptions from "../../components/HomeQuickOptions";
import AdvertScrollComponent from "../../components/AdvertScrollComponent";
import SectionGroupWrapper from "../../components/ui/SectionGroupWrapper";
import WelcomeBlockComponent from "../../components/WelcomeBlockComponent";
import PackageCard from "../../components/reuseables/PackageCard";
import NotFoundComponent from "../../components/reuseables/NotFoundComponent";
import { DEMO_PACKAGE_LIST } from "../../helpers/demo_data";

export default function Home() {
  //fetch existing packages
  //const [existingPackages, setExistingPackages] = useState([1, 2, 3]);
  const existingPackages = DEMO_PACKAGE_LIST;

  return (
    <ScrollViewWrapper style={styles.scrollArea}>
      {/**welcome block */}
      <WelcomeBlockComponent />

      {/**advert block */}
      <AdvertScrollComponent />

      {/**quick options */}
      <HomeQuickOptions />

      {/**recommended section block */}
      <SectionGroupWrapper title={"Your pending packages"} seeAllPath={"/"}>
        {existingPackages?.length > 0 ? (
          existingPackages?.map((item, index) => (
            <PackageCard
              key={index}
              type={item?.package_type}
              data={item}
              clickable={true}
            />
          ))
        ) : (
          <NotFoundComponent text={"No existing package found"} />
        )}
      </SectionGroupWrapper>
    </ScrollViewWrapper>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    backgroundColor: COLOR_THEME.gray50,
    padding: 16,
    gap: 16,
  },
  dualScrollView: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
