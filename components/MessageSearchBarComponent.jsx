import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../constants";
import PopupModalWrapper from "./ui/PopupModalWrapper";

const MessageSearchBarComponent = ({
  input,
  setInput,
  placeholder,
  filter,
  setFilter,
}) => {
  //handle filter
  const [modalOpen, setModalOpen] = useState(false);

  //filter options
  const filter_options = ["all", "unread"];

  return (
    <>
      <View style={styles.searchComp}>
        {/**search bar */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={COLOR_THEME.gray100}
            style={styles.inputBar}
            value={`${input}`}
            onChangeText={(text) => setInput(text)}
            enterKeyHint="search"
            returnKeyType="search"
            returnKeyLabel="search"
          />
          {/**search button */}
          <Pressable
            style={[
              styles.searchButton,
              !input && { backgroundColor: COLOR_THEME.gray50 },
            ]}
            disabled={!input ? true : false}
            onPress={() => {
              console.log("search btn pressed");
            }}
          >
            <Octicons name="search" size={18} color={COLOR_THEME.white} />
          </Pressable>
        </View>

        {/**filter bar */}
        <View style={styles.filterList}>
          {filter_options?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterTab,
                item === filter && { backgroundColor: COLOR_THEME.primary },
              ]}
              onPress={() => {
                setFilter(item);
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  item === filter && { color: COLOR_THEME.white },
                ]}
              >
                {item?.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

export default memo(MessageSearchBarComponent);

const styles = StyleSheet.create({
  searchComp: {
    width: "100%",
    gap: 8,
  },
  searchBox: {
    width: "100%",
    height: 48,
    padding: 4,
    paddingLeft: 16,
    borderRadius: 100,
    backgroundColor: COLOR_THEME.gray50,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  inputBar: {
    width: SCREEN_DIMENSION.subtractWidth(16, 32 + 16 + 4, 40),
    fontSize: FONT_SIZE.m,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: COLOR_THEME.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: COLOR_THEME.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  filterList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
  },
  filterTab: {
    maxWidth: 200,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 100,
    backgroundColor: COLOR_THEME.gray50,
  },
  filterText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.gray200,
  },
});
