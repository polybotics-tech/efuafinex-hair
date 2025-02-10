import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../../constants";
import ImageComponent from "./ImageComponent";
import { IMAGE_LOADER } from "../../helpers/utils/image-loader";
import { USER_HOOKS } from "../../helpers/hooks/user";

const PhotoPicker = ({ name, form, setForm }) => {
  //handle photo selection from gallery
  const SELECT_IMAGE = async () => {
    // No permissions request is necessary for launching the image library

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], //ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    if (!result.canceled) {
      let selected = {
        uri: `${result.assets[0].uri}`,
        name: `${result.assets[0].fileName}`,
        type: `${result.assets[0].mimeType}`,
      };

      setForm({ ...form, [name]: selected });
    }
  };

  return (
    <View style={styles.component}>
      {/**picker toggle */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => SELECT_IMAGE()}
      >
        <Text style={styles.buttonText}>Select photo</Text>
        <Octicons name="plus" size={18} color={COLOR_THEME.gray100} />
      </TouchableOpacity>

      {/**placeholder */}
      {form[name] && form[name]?.uri && (
        <View style={styles.placeholder}>
          <ImageComponent
            uri={IMAGE_LOADER.user_thumbnail(form[name]?.uri)}
            scale={true}
          />
        </View>
      )}
    </View>
  );
};

export default memo(PhotoPicker);

const styles = StyleSheet.create({
  component: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  placeholder: {
    width: "100%",
    height: SCREEN_DIMENSION.heightRatio(1 / 4.5),
    backgroundColor: COLOR_THEME.black,
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    width: SCREEN_DIMENSION.halfWidth(0, 32),
    height: 48,
    borderRadius: 8,
    backgroundColor: COLOR_THEME.white,
    borderWidth: 1,
    borderColor: COLOR_THEME.gray50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.gray100,
  },
});
