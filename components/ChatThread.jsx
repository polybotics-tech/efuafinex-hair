import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { format_chat_thread_date_readable } from "../helpers/utils/datetime";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../constants";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ChatThread = () => {
  const theme = useSelector((state) => state.app.theme);

  return (
    <TouchableOpacity style={styles(theme).chatThread}>
      <View style={styles(theme).chatThumbnail}>
        <Octicons name="comment" size={18} color={COLOR_THEME().gray200} />
      </View>

      <View style={styles(theme).chatDesc}>
        <View style={styles(theme).cdTop}>
          <Text style={styles(theme).chatTitle}>PID-34ksT17490583093</Text>

          <Text style={styles(theme).chatDate}>
            {format_chat_thread_date_readable(new Date())}
          </Text>
        </View>

        <Text numberOfLines={1} style={styles(theme).chatMsg}>
          This is the last sent message
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatThread;

const styles = (theme) =>
  StyleSheet.create({
    chatThread: {
      width: "100%",
      paddingVertical: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    chatThumbnail: {
      width: 54,
      height: 54,
      borderRadius: 100,
      backgroundColor: COLOR_THEME[theme].gray50,
      borderWidth: 1.3,
      borderColor: COLOR_THEME[theme].gray200,
      alignItems: "center",
      justifyContent: "center",
    },
    chatDesc: {
      width: SCREEN_DIMENSION.subtractWidth(8, 32, 54),
      gap: 4,
    },
    cdTop: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
    },
    chatTitle: {
      fontSize: FONT_SIZE.xm,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].black,
    },
    chatDate: {
      fontSize: FONT_SIZE.xxs,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray100,
    },
    chatMsg: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray100,
    },
  });
