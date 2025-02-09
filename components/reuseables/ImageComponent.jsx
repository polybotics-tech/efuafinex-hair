import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import React, { memo } from "react";
import { COLOR_THEME } from "../../constants";
import { Octicons } from "@expo/vector-icons";

const ImageComponent = ({ uri, blur, scale }) => {
  const blurhash = blur || "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

  return (
    <>
      {uri ? (
        <Image
          source={uri}
          style={styles.image(scale)}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
      ) : (
        <View style={styles.empty}>
          <Octicons name="question" size={18} color={COLOR_THEME.gray100} />
        </View>
      )}
    </>
  );
};

export default memo(ImageComponent);

const styles = StyleSheet.create({
  image: (s) => ({
    width: "100%",
    height: "100%",
    objectFit: s ? "scale-down" : "cover",
    backgroundColor: COLOR_THEME.gray50,
  }),
  empty: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
