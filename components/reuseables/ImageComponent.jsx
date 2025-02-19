import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import React, { memo } from "react";
import { COLOR_THEME } from "../../constants";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ImageComponent = ({ uri, blur, scale }) => {
  const theme = useSelector((state) => state.app.theme);
  const blurhash = blur || "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

  return (
    <>
      {uri ? (
        <Image
          source={uri}
          style={styles(theme).image(scale)}
          placeholder={{ blurhash }}
          contentFit={scale ? "contain" : "cover"}
          transition={1000}
        />
      ) : (
        <View style={styles(theme).empty}>
          <Octicons name="image" size={18} color={COLOR_THEME[theme].gray100} />
        </View>
      )}
    </>
  );
};

export default memo(ImageComponent);

const styles = (theme) =>
  StyleSheet.create({
    image: (s) => ({
      width: "100%",
      height: "100%",
      objectFit: s ? "scale-down" : "cover",
    }),
    empty: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });
