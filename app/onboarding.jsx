import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../constants";
import SafeAreaWrapper from "../components/ui/safeAreaWrapper";
import { JSON_ONBOARD_TAB_LIST } from "../helpers/json";
import { router } from "expo-router";

export default function Onboarding() {
  const [btnIcon, setBtnIcon] = useState("arrow-right"); //arrow-right, check
  const pagerTabs = JSON_ONBOARD_TAB_LIST;

  //reference
  const scrollRef = useRef(null);
  const [currentTab, setCurrentTab] = useState(1);

  //scroll function
  const handleBtnClick = () => {
    let totalTab = pagerTabs.length;
    let scrollX = 0;

    //scroll logic
    if (currentTab < totalTab) {
      scrollX = Number(SCREEN_DIMENSION.width * currentTab);
      setCurrentTab((pre) => Number(pre + 1));

      //scroll tab
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollTo({
          x: scrollX,
          y: 0,
          animated: scrollX === 0 ? false : true,
        });
      }
    } else {
      //redirect to login page
      router.dismissTo("/login/");
    }
  };

  //handle button icon change
  useMemo(() => {
    if (currentTab === pagerTabs.length) {
      setBtnIcon("check");
    }
  }, [currentTab]);

  return (
    <SafeAreaWrapper style={styles.safeArea}>
      <ScrollView
        style={styles.scrollCont}
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
      >
        {pagerTabs?.map((item, index) => (
          <OnboardTab key={index} data={item} />
        ))}
      </ScrollView>

      <View style={styles.buttonHolder}>
        <Pressable style={styles.buttonCont} onPress={handleBtnClick}>
          <View style={styles.buttonIconHolder}>
            <Octicons name={btnIcon} size={24} color={COLOR_THEME.white} />
          </View>
        </Pressable>
      </View>
    </SafeAreaWrapper>
  );
}

const OnboardTab = ({ data }) => {
  return (
    <View style={styles.tabContainer}>
      <View style={data?.page === 2 ? styles.frameReverse : styles.frame}>
        <View style={[styles.innerFrame, styles.long]}></View>
        <View style={styles.frameSplit}>
          <View style={[styles.innerFrame, styles.short]}></View>
          <View style={[styles.innerFrame, styles.short]}></View>
        </View>
      </View>

      <View style={{ gap: 2 }}>
        <Text style={styles.heading}>{data?.heading}</Text>
        <Text style={styles.subText}>{data?.subtext}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    justifyContent: "space-between",
  },
  scrollCont: {
    minWidth: SCREEN_DIMENSION.width,
    height: "auto",
  },
  buttonHolder: {
    paddingTop: 16,
    paddingBottom: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCont: {
    padding: 4,
    borderWidth: 1.5,
    borderColor: COLOR_THEME.primary,
    borderRadius: 100,
  },
  buttonIconHolder: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: COLOR_THEME.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  tabContainer: {
    minWidth: SCREEN_DIMENSION.width,
    width: SCREEN_DIMENSION.width,
    maxWidth: SCREEN_DIMENSION.width,
    padding: 16,
    gap: 32,
  },
  heading: {
    fontSize: FONT_SIZE.xb,
    fontWeight: FONT_WEIGHT.bold,
    color: COLOR_THEME.black,
    textAlign: "center",
    textTransform: "capitalize",
  },
  subText: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
    textAlign: "center",
  },
  frame: {
    width: "100%",
    gap: 16,
  },
  frameReverse: {
    width: "100%",
    flexDirection: "column-reverse",
    gap: 16,
  },
  frameSplit: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  long: {
    width: "100%",
    height: SCREEN_DIMENSION.heightRatio(1 / 4),
  },
  short: {
    width: SCREEN_DIMENSION.halfWidth(16, 32),
    height: SCREEN_DIMENSION.heightRatio(1 / 3),
  },
  innerFrame: {
    borderRadius: 8,
    backgroundColor: COLOR_THEME.gray50,
    overflow: "hidden",
  },
});
