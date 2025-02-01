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
import { Stack } from "expo-router";

const PopupModalWrapper = ({ children, ...props }) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props?.isVisible}
        onRequestClose={() => {
          props?.setIsVisible(false);
        }}
      >
        <View style={styles.modalInset}>
          <View style={styles.header}>
            <View style={styles.cancelBtn}></View>

            {/**title */}
            <Text style={styles.headerTitle}>{props?.title}</Text>

            {/**close modal */}
            <Text
              style={styles.cancelBtn}
              onPress={() => {
                props?.setIsVisible(false);
              }}
            >
              Close
            </Text>
          </View>

          {/** */}
          <ScrollView
            contentContainerStyle={[styles.container, props?.containerStyle]}
          >
            {children}
          </ScrollView>
        </View>

        {/**transparent bg and close button */}
        <Pressable
          onPress={() => {
            props?.setIsVisible(false);
          }}
          style={styles.backDrop}
        />
      </Modal>
    </>
  );
};

export default memo(PopupModalWrapper);

const styles = StyleSheet.create({
  modalInset: {
    width: "100%",
    minHeight: SCREEN_DIMENSION.heightRatio(1 / 3),
    maxHeight: SCREEN_DIMENSION.heightRatio(1 / 1.5),
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: COLOR_THEME.white,
    shadowColor: COLOR_THEME.black,
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
    borderBottomColor: COLOR_THEME.gray50,
  },
  headerTitle: {
    fontSize: FONT_SIZE.m,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
  },
  cancelBtn: {
    width: 48,
    paddingVertical: 8,
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.error,
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
