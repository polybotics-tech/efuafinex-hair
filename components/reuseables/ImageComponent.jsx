import { Image, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

const ImageComponent = ({ uri, scale }) => {
  return <>{uri != "" && <Image source={uri} style={styles.image(scale)} />}</>;
};

export default memo(ImageComponent);

const styles = StyleSheet.create({
  image: (s) => ({
    width: "100%",
    height: "100%",
    objectFit: s ? "scale-down" : "cover",
  }),
});
