import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
} from "react-native";
import React, { memo } from "react";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../../constants";
import { useSelector } from "react-redux";

const PopupModalWrapper = ({ children, onCloseFunc = () => {}, ...props }) => {
  const theme = useSelector((state) => state.app.theme);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props?.isVisible}
        onRequestClose={() => {
          props?.setIsVisible(false);
        }}
        onDismiss={() => {
          onCloseFunc();
        }}
      >
        <View style={styles(theme).modalInset}>
          <View style={styles(theme).header}>
            <View style={styles(theme).cancelBtn}></View>

            {/**title */}
            <Text style={styles(theme).headerTitle}>{props?.title}</Text>

            {/**close modal */}
            <Text
              style={styles(theme).cancelBtn}
              onPress={() => {
                props?.setIsVisible(false);
              }}
            >
              Close
            </Text>
          </View>

          {/** */}
          <ScrollView
            contentContainerStyle={[
              styles(theme).container,
              props?.containerStyle,
            ]}
          >
            {children}
          </ScrollView>
        </View>

        {/**transparent bg and close button */}
        <Pressable
          onPress={() => {
            props?.setIsVisible(false);
          }}
          style={styles(theme).backDrop}
        />
      </Modal>
    </>
  );
};

export default memo(PopupModalWrapper);

const styles = (theme) =>
  StyleSheet.create({
    modalInset: {
      width: "100%",
      minHeight: SCREEN_DIMENSION.heightRatio(1 / 3),
      maxHeight: SCREEN_DIMENSION.heightRatio(1 / 1.2),
      position: "absolute",
      bottom: 0,
      left: 0,
      backgroundColor: COLOR_THEME[theme].white,
      shadowColor: COLOR_THEME[theme].black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    header: {
      width: "100%",
      height: 48,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      borderBottomWidth: 0.5,
      borderBottomColor: COLOR_THEME[theme].gray50,
    },
    headerTitle: {
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].black,
    },
    cancelBtn: {
      width: 48,
      paddingVertical: 8,
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].error,
      textAlign: "center",
    },
    container: {
      width: "100%",
      padding: 16,
    },
    backDrop: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.3)",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: -1,
    },
  });
