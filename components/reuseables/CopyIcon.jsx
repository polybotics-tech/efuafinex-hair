import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { memo, useState } from "react";
import * as Clipboard from "expo-clipboard";
import { Octicons } from "@expo/vector-icons";
import { COLOR_THEME } from "../../constants";
import { Alert } from "../../helpers/utils/alert";

const CopyIcon = ({ text_to_copy = "" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const CopyText = async (text) => {
    try {
      setIsLoading(true);

      //implement copy feature
      const copy = await Clipboard.setStringAsync(String(text));

      if (copy) {
        //copying successful
        Alert.success("Copied to clipboard", String(text));
      }
    } catch (error) {
      Alert.error("Action failed", "Error copying to clipboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => CopyText(text_to_copy)}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size={14} color={COLOR_THEME.gray100} />
      ) : (
        <Octicons name="copy" size={14} color={COLOR_THEME.gray100} />
      )}
    </TouchableOpacity>
  );
};

export default memo(CopyIcon);

const styles = StyleSheet.create({});
