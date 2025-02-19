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
import { COLOR_THEME } from "../../constants";
import ImageComponent from "./ImageComponent";
import { IMAGE_LOADER } from "../../helpers/utils/image-loader";
import { USER_HOOKS } from "../../helpers/hooks/user";
import { BORDER_RADIUS } from "../../constants/theme";

const ThumbnailPicker = () => {
  const theme = useSelector((state) => state.app.theme);
  const thumbnail = useSelector((state) => state.user.user?.thumbnail);
  const thumbnail_blur = useSelector(
    (state) => state.user.user?.thumbnail_blur
  );
  const [isLoading, setIsLoading] = useState(false);

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

      await USER_HOOKS.update_user_thumbnail(setIsLoading, selected);
    }
  };

  return (
    <View style={styles(theme).component}>
      {/**placeholder */}
      <View style={styles(theme).placeholder}>
        <ImageComponent
          uri={IMAGE_LOADER.user_thumbnail(thumbnail)}
          blur={thumbnail_blur}
        />
      </View>

      {/**picker toggle */}
      <TouchableOpacity
        style={styles(theme).button}
        activeOpacity={0.9}
        disabled={isLoading}
        onPress={() => SELECT_IMAGE()}
      >
        {isLoading ? (
          <ActivityIndicator size={18} color={COLOR_THEME[theme].white} />
        ) : (
          <Octicons name="plus" size={18} color={COLOR_THEME[theme].white} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default memo(ThumbnailPicker);

const styles = (theme) =>
  StyleSheet.create({
    component: {
      width: 150,
      height: 150,
      position: "relative",
    },
    placeholder: {
      width: 150,
      height: 150,
      backgroundColor: COLOR_THEME[theme].gray50,
      borderRadius: BORDER_RADIUS.r,
      overflow: "hidden",
    },
    button: {
      width: 48,
      height: 48,
      borderRadius: BORDER_RADIUS.r,
      backgroundColor: COLOR_THEME[theme].primary,
      borderWidth: 1,
      borderColor: COLOR_THEME[theme].white,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      bottom: 0,
      right: 0,
    },
  });
