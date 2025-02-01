import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { Octicons } from "@expo/vector-icons";
import { COLOR_THEME } from "../../constants";
import Toast from "react-native-toast-message";

const CopyIcon = ({ text_to_copy = "" }) => {
  const CopyText = (text) => {
    //#implement copy feature later

    //copying successful
    Toast.show({
      type: "success",
      text1: "Copied to clipboard",
      text2: text,
    });
  };

  return (
    <TouchableOpacity onPress={() => CopyText(text_to_copy)}>
      <Octicons name="copy" size={14} color={COLOR_THEME.gray100} />
    </TouchableOpacity>
  );
};

export default memo(CopyIcon);

const styles = StyleSheet.create({});
