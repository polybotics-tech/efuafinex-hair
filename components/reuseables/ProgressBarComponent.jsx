import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Circle } from "react-native-svg";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";
import { BORDER_RADIUS } from "../../constants/theme";
import { useSelector } from "react-redux";

const ProgressBarComponent = ({ ...props }) => {
  const theme = useSelector((state) => state.app.theme);

  return (
    <>
      {props?.type === "regular" ? (
        <RegularBar
          current_value={props?.current_value}
          maximum_value={props?.maximum_value}
          strokeWidth={props?.strokeWidth}
          props={props}
          theme={theme}
        />
      ) : (
        <CircularBar
          current_value={props?.current_value}
          maximum_value={props?.maximum_value}
          size={props?.size}
          strokeWidth={props?.strokeWidth}
          props={props}
          theme={theme}
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
  theme,
}) => {
  const progress =
    current_value > maximum_value
      ? 0
      : parseInt(Number((current_value / maximum_value) * 100)) || 0;

  return (
    <View style={styles(theme).regular.container}>
      <View
        style={styles(theme).regular.progressContainer(
          strokeWidth,
          props?.backgroundColor
        )}
      >
        <View
          style={[
            styles(theme).regular.progressBar(props?.primaryColor),
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
  theme,
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
    <View style={styles(theme).circular.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={props?.backgroundColor || COLOR_THEME[theme].gray100}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={props?.primaryColor || COLOR_THEME[theme].primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <Text
        style={[
          styles(theme).circular.percentageText,
          {
            fontSize: size / 5,
            color: props?.textColor || COLOR_THEME[theme].primary,
          },
        ]}
      >
        {`${progress}%`}
      </Text>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    regular: {
      container: {
        alignItems: "center",
        marginVertical: 4,
      },
      progressContainer: (skWidth, bgColor) => ({
        width: "100%",
        height: skWidth || 8,
        backgroundColor: bgColor || COLOR_THEME[theme].gray50,
        borderRadius: BORDER_RADIUS.b,
        overflow: "hidden",
      }),
      progressBar: (priColor) => ({
        height: "100%",
        backgroundColor: priColor || COLOR_THEME[theme].primary,
        borderRadius: BORDER_RADIUS.b,
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
