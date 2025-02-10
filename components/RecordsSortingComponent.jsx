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

const RecordsSortingComponent = ({
  activeSort,
  setActiveSort,
  activeFilter,
  setActiveFilter,
}) => {
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
    <View style={styles.component}>
      {/**sort component */}
      <SortTab
        options={sortOptions}
        active={activeSort}
        setActive={setActiveSort}
      />

      {/**filter component */}
      <FilterTab
        options={filterOptions}
        active={activeFilter}
        setActive={setActiveFilter}
      />
    </View>
  );
};

export default memo(RecordsSortingComponent);

const SortTab = ({ options, active, setActive }) => {
  const [popupModal, setPopupModal] = useState(false);

  //handle option selection
  const selectItem = (item) => {
    setActive(item);
    setPopupModal(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.innerComp}
        onPress={() => {
          setPopupModal(true);
        }}
      >
        <Text style={styles.activeText}>{active?.name}</Text>

        <Octicons name="chevron-down" size={18} color={COLOR_THEME.gray200} />
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
              style={styles.optionTab}
              onPress={() => {
                selectItem(item);
              }}
            >
              <Text
                style={[
                  styles?.optionText,
                  item?.name === active?.name && { color: COLOR_THEME.black },
                ]}
              >
                {item?.name}
              </Text>

              {item?.name === active?.name && (
                <Octicons name="check" size={18} color={COLOR_THEME.primary} />
              )}
            </TouchableOpacity>
          ))}
      </PopupModalWrapper>
    </>
  );
};

const FilterTab = ({ options, active, setActive }) => {
  const [popupModal, setPopupModal] = useState(false);

  //handle option selection
  const selectItem = (item) => {
    setActive(item);
    setPopupModal(false);
  };

  return (
    <>
      {/**preview block */}
      <TouchableOpacity
        style={styles.innerComp}
        onPress={() => {
          setPopupModal(true);
        }}
      >
        <Text style={styles.activeText}>{active}</Text>

        <Octicons name="chevron-down" size={18} color={COLOR_THEME.gray200} />
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
              style={styles.optionTab}
              onPress={() => {
                selectItem(item);
              }}
            >
              <Text
                style={[
                  styles?.optionText,
                  item === active && { color: COLOR_THEME.black },
                ]}
              >
                {item}
              </Text>

              {item === active && (
                <Octicons name="check" size={18} color={COLOR_THEME.primary} />
              )}
            </TouchableOpacity>
          ))}
      </PopupModalWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  component: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    backgroundColor: COLOR_THEME.white,
    borderBottomWidth: 0.8,
    borderBottomColor: COLOR_THEME.gray50,
  },
  innerComp: {
    width: SCREEN_DIMENSION.divisionWidth(8, 16 + 16, 2),
    height: 36,
    paddingHorizontal: "16",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
    borderRadius: 8,
    backgroundColor: COLOR_THEME.gray50,
  },
  activeText: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
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
    color: COLOR_THEME.gray200,
    textTransform: "uppercase",
  },
});
