import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ScrollViewWrapper from "../../components/ui/ScrollViewWrapper";
import { COLOR_THEME } from "../../constants";
import HomeQuickOptions from "../../components/HomeQuickOptions";
import AdvertScrollComponent from "../../components/AdvertScrollComponent";
import SectionGroupWrapper from "../../components/ui/SectionGroupWrapper";
import PackageCard from "../../components/reuseables/PackageCard";
import NotFoundComponent from "../../components/reuseables/NotFoundComponent";
import { PACKAGE_HOOKS } from "../../helpers/hooks/package";
import { useSelector } from "react-redux";

export default function Home() {
  const theme = useSelector((state) => state.app.theme);

  //fetch user packages
  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] = useState();

  const fetchPackages = async () => {
    //send request
    const result = await PACKAGE_HOOKS.fetch_user_packages(setIsLoading, 1);

    if (result) {
      setPackages(result?.packages);
    }
  };

  //fetch packages
  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <>
      <ScrollViewWrapper
        style={styles(theme).scrollArea}
        refreshFunc={() => {
          setPackages();
          fetchPackages();
        }}
      >
        {/**advert block */}
        <AdvertScrollComponent />

        {/**quick options */}
        <HomeQuickOptions />

        {/**recommended section block */}
        <SectionGroupWrapper
          title={"Your latest packages"}
          seeAllPath={"/records/?type=packages"}
        >
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
              text={"No existing package found"}
              isLoading={isLoading}
            />
          )}
        </SectionGroupWrapper>
      </ScrollViewWrapper>

      {/**float add button */}
      <HomeQuickOptions type={"float"} />
    </>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    scrollArea: {
      backgroundColor: COLOR_THEME[theme].gray50,
      padding: 16,
      gap: 16,
    },
    dualScrollView: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });
