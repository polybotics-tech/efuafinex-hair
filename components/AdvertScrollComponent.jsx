import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import { COLOR_THEME, SCREEN_DIMENSION } from "../constants";
import { BORDER_RADIUS } from "../constants/theme";
import { useSelector } from "react-redux";
import ImageComponent from "./reuseables/ImageComponent";
import { IMAGE_LOADER } from "../helpers/utils/image-loader";
import { BANNER_HOOKS } from "../helpers/hooks/banner";

const AdvertScrollComponent = () => {
  const theme = useSelector((state) => state.app.theme);

  const [banners, setBanners] = useState();
  const [meta, setMeta] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchBanners = async (page = 1) => {
    //send request
    const result = await BANNER_HOOKS.fetch_banners(setIsLoading, page);

    if (result) {
      setMeta(result?.meta);

      if (page > 1 && result?.banners) {
        setBanners((prev) => [...prev, ...result?.banners]);
      } else {
        setBanners(result?.banners);
      }
    }
  };

  useEffect(() => {
    fetchBanners(1);
  }, []);

  //reference
  const adWidth = SCREEN_DIMENSION.subtractWidth(0, 32, 0);
  const scrollRef = useRef(null);
  const [currentAd, setCurrentAd] = useState(1);

  //scroll function
  const handleAutoScroll = () => {
    let totalAd = banners?.length;
    let scrollX = 0;

    //scroll logic
    if (currentAd < totalAd) {
      scrollX = Number(
        parseInt(adWidth * currentAd) + parseInt(16 * currentAd)
      );
      setCurrentAd((pre) => Number(pre + 1));
    } else {
      setCurrentAd(1);
    }

    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({
        x: scrollX,
        y: 0,
        animated: scrollX === 0 ? false : true,
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Boolean(banners && banners?.length > 0)) {
        handleAutoScroll();
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentAd, banners]);

  return (
    <>
      {banners && banners?.length > 0 && (
        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled={true}
            ref={scrollRef}
            scrollEnabled={false}
            contentContainerStyle={styles(theme).scroll}
          >
            {banners?.map((item, index) => (
              <AdComp key={index} theme={theme} data={item} />
            ))}
          </ScrollView>

          {/**indicator */}
          <View style={styles(theme).indicatorHolder}>
            <ScrollIndicator items={banners} active={currentAd} theme={theme} />
          </View>
        </View>
      )}
    </>
  );
};

const AdComp = ({ theme, data }) => {
  const { thumbnail, thumbnail_blur } = data;

  return (
    <Pressable style={styles(theme).adComp}>
      <ImageComponent
        uri={IMAGE_LOADER.user_thumbnail(thumbnail)}
        blur={thumbnail_blur}
      />
    </Pressable>
  );
};

const ScrollIndicator = ({ items, active, theme }) => {
  return (
    <View style={styles(theme).indicator}>
      {items?.map((item, index) => (
        <View
          key={index}
          style={[
            styles(theme).indicatorDot,
            Number(index + 1) === active && {
              backgroundColor: COLOR_THEME[theme].primary,
            },
          ]}
        ></View>
      ))}
    </View>
  );
};

export default memo(AdvertScrollComponent);

const styles = (theme) =>
  StyleSheet.create({
    scroll: {
      minWidth: "100%",
      gap: 16,
    },
    adComp: {
      width: SCREEN_DIMENSION.subtractWidth(0, 32, 0),
      height: SCREEN_DIMENSION.heightRatio(1 / 5),
      backgroundColor: COLOR_THEME[theme].white,
      borderRadius: BORDER_RADIUS.b,
      overflow: "hidden",
    },
    indicatorHolder: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
    },
    indicator: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
      borderRadius: BORDER_RADIUS.r,
      backgroundColor: COLOR_THEME[theme].white,
    },
    indicatorDot: {
      width: 6,
      height: 6,
      borderRadius: BORDER_RADIUS.r,
      backgroundColor: COLOR_THEME[theme].gray100,
    },
  });
