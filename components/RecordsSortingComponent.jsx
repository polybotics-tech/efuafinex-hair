import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  View,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import { RECORDS_SORTING_OPTIONS } from "../helpers/json";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../constants";
import { Octicons } from "@expo/vector-icons";
import PopupModalWrapper from "./ui/PopupModalWrapper";
import { useLocalSearchParams } from "expo-router";
import { BORDER_RADIUS } from "../constants/theme";
import { DEBOUNCE } from "../helpers/utils/debounce";
import { useSelector } from "react-redux";

const RecordsSortingComponent = ({
  activeSort,
  setActiveSort,
  activeFilter,
  setActiveFilter,
}) => {
  const theme = useSelector((state) => state.app.theme);

  const sortOptions = RECORDS_SORTING_OPTIONS;
  const [filterOptions, setFilterOptions] = useState([]);

  //get type
  const { type } = useLocalSearchParams();

  //set active sort
  useEffect(() => {
    if (sortOptions) {
      setActiveSort(sortOptions[0]);
    }

    if (type) {
      if (type === "deposits") {
        setActiveSort(sortOptions[0]);
      } else if (type === "packages") {
        setActiveSort(sortOptions[1]);
      }
    }
  }, [sortOptions, type]);

  useEffect(() => {
    if (activeSort) {
      setFilterOptions(activeSort?.filters);
      setActiveFilter(activeSort?.filters[0]);
    }
  }, [activeSort]);

  return (
    <View style={styles(theme).component}>
      {/**sort component */}
      <SortTab
        options={sortOptions}
        active={activeSort}
        setActive={setActiveSort}
        theme={theme}
      />

      {/**filter component */}
      <FilterTab
        options={filterOptions}
        active={activeFilter}
        setActive={setActiveFilter}
        theme={theme}
      />
    </View>
  );
};

export default memo(RecordsSortingComponent);

const SortTab = ({ options, active, setActive, theme }) => {
  const [popupModal, setPopupModal] = useState(false);

  //handle option selection
  const selectItem = DEBOUNCE((item) => {
    setActive(item);
    setPopupModal(false);
  });

  return (
    <>
      <TouchableOpacity
        style={styles(theme).innerComp}
        onPress={() => {
          setPopupModal(true);
        }}
      >
        <Text style={styles(theme).activeText}>{active?.name}</Text>

        <Octicons
          name="chevron-down"
          size={18}
          color={COLOR_THEME[theme].gray200}
        />
      </TouchableOpacity>

      {/**popup modal for sorting */}
      <PopupModalWrapper
        isVisible={popupModal}
        setIsVisible={setPopupModal}
        title={"Sort Records"}
      >
        {options?.length > 0 &&
          options?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles(theme).optionTab}
              onPress={() => {
                selectItem(item);
              }}
            >
              <Text
                style={[
                  styles(theme).optionText,
                  item?.name === active?.name && {
                    color: COLOR_THEME[theme].black,
                  },
                ]}
              >
                {item?.name}
              </Text>

              {item?.name === active?.name && (
                <Octicons
                  name="check"
                  size={18}
                  color={COLOR_THEME[theme].primary}
                />
              )}
            </TouchableOpacity>
          ))}
      </PopupModalWrapper>
    </>
  );
};

const FilterTab = ({ options, active, setActive, theme }) => {
  const [popupModal, setPopupModal] = useState(false);

  //handle option selection
  const selectItem = DEBOUNCE((item) => {
    setActive(item);
    setPopupModal(false);
  });

  return (
    <>
      {/**preview block */}
      <TouchableOpacity
        style={styles(theme).innerComp}
        onPress={() => {
          setPopupModal(true);
        }}
      >
        <Text style={styles(theme).activeText}>{active}</Text>

        <Octicons
          name="chevron-down"
          size={18}
          color={COLOR_THEME[theme].gray200}
        />
      </TouchableOpacity>

      {/**popup modal for sorting */}
      <PopupModalWrapper
        isVisible={popupModal}
        setIsVisible={setPopupModal}
        title={"Filter Result"}
      >
        {options?.length > 0 &&
          options?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles(theme).optionTab}
              onPress={() => {
                selectItem(item);
              }}
            >
              <Text
                style={[
                  styles(theme).optionText,
                  item === active && { color: COLOR_THEME[theme].black },
                ]}
              >
                {item}
              </Text>

              {item === active && (
                <Octicons
                  name="check"
                  size={18}
                  color={COLOR_THEME[theme].primary}
                />
              )}
            </TouchableOpacity>
          ))}
      </PopupModalWrapper>
    </>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    component: {
      width: "100%",
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      backgroundColor: COLOR_THEME[theme].white,
      borderBottomWidth: 0.8,
      borderBottomColor: COLOR_THEME[theme].gray50,
    },
    innerComp: {
      width: SCREEN_DIMENSION.divisionWidth(8, 16 + 16, 2),
      height: 36,
      paddingHorizontal: "16",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 16,
      borderRadius: BORDER_RADIUS.s,
      backgroundColor: COLOR_THEME[theme].gray50,
    },
    activeText: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray200,
      textTransform: "uppercase",
    },
    optionTab: {
      width: "100%",
      paddingBottom: 32,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
    },
    optionText: {
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray200,
      textTransform: "uppercase",
    },
  });
