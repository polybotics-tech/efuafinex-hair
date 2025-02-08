import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Circle } from "react-native-svg";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";

const ProgressBarComponent = ({ ...props }) => {
  return (
    <>
      {props?.type === "regular" ? (
        <RegularBar
          current_value={props?.current_value}
          maximum_value={props?.maximum_value}
          strokeWidth={props?.strokeWidth}
          props={props}
        />
      ) : (
        <CircularBar
          current_value={props?.current_value}
          maximum_value={props?.maximum_value}
          size={props?.size}
          strokeWidth={props?.strokeWidth}
          props={props}
        />
      )}
    </>
  );
};

export default ProgressBarComponent;

const RegularBar = ({
  maximum_value,
  current_value,
  strokeWidth = 8,
  props,
}) => {
  const progress =
    current_value > maximum_value
      ? 0
      : parseInt(Number((current_value / maximum_value) * 100)) || 0;

  return (
    <View style={styles.regular.container}>
      <View
        style={styles.regular.progressContainer(
          strokeWidth,
          props?.backgroundColor
        )}
      >
        <View
          style={[
            styles.regular.progressBar(props?.primaryColor),
            { width: `${progress}%` },
          ]}
        />
      </View>
    </View>
  );
};

const CircularBar = ({
  maximum_value,
  current_value,
  size = 64,
  strokeWidth = 8,
  props,
}) => {
  const progress =
    current_value > maximum_value
      ? 0
      : parseInt(Number((current_value / maximum_value) * 100)) || 0;

  //
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.circular.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={props?.backgroundColor || COLOR_THEME.gray100}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={props?.primaryColor || COLOR_THEME.primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <Text
        style={[
          styles.circular.percentageText,
          {
            fontSize: size / 5,
            color: props?.textColor || COLOR_THEME.primary,
          },
        ]}
      >
        {`${progress}%`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  regular: {
    container: {
      alignItems: "center",
      marginVertical: 4,
    },
    progressContainer: (skWidth, bgColor) => ({
      width: "100%",
      height: skWidth || 8,
      backgroundColor: bgColor || COLOR_THEME.gray50,
      borderRadius: 10,
      overflow: "hidden",
    }),
    progressBar: (priColor) => ({
      height: "100%",
      backgroundColor: priColor || COLOR_THEME.primary,
      borderRadius: 10,
    }),
  },
  circular: {
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    percentageText: {
      position: "absolute",
      fontWeight: "bold",
    },
  },
});
