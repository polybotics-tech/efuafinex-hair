import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLOR_THEME, FONT_SIZE } from "../../constants";
import { Octicons } from "@expo/vector-icons";

const SeeMoreBtn = ({ onPress, isLoading }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>See More</Text>

      {/* show loading indicator */}
      {isLoading ? (
        <ActivityIndicator size={16} color={COLOR_THEME.gray200} />
      ) : (
        <Octicons name="chevron-down" size={16} color={COLOR_THEME.gray200} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 144,
    backgroundColor: COLOR_THEME.white,
    padding: 10,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginVertical: 16,
    marginHorizontal: "auto",
  },
  text: {
    color: COLOR_THEME.gray200,
    fontSize: FONT_SIZE.s,
  },
});

export default SeeMoreBtn;
