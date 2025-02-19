import React, { memo } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLOR_THEME, FONT_SIZE } from "../../constants";
import { Octicons } from "@expo/vector-icons";
import { BORDER_RADIUS } from "../../constants/theme";
import { useSelector } from "react-redux";

const SeeMoreBtn = ({ onPress, isLoading }) => {
  const theme = useSelector((state) => state.app.theme);

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>See More</Text>

      {/* show loading indicator */}
      {isLoading ? (
        <ActivityIndicator size={16} color={COLOR_THEME[theme].gray200} />
      ) : (
        <Octicons
          name="chevron-down"
          size={16}
          color={COLOR_THEME[theme].gray200}
        />
      )}
    </TouchableOpacity>
  );
};

export default memo(SeeMoreBtn);

const styles = (theme) =>
  StyleSheet.create({
    button: {
      width: 144,
      backgroundColor: COLOR_THEME[theme].white,
      padding: 10,
      borderRadius: BORDER_RADIUS.r,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginVertical: 16,
      marginHorizontal: "auto",
    },
    text: {
      color: COLOR_THEME[theme].gray200,
      fontSize: FONT_SIZE.s,
    },
  });
