import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import ProgressBarComponent from "./ProgressBarComponent";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  NAIRA_CURRENCY,
  SCREEN_DIMENSION,
} from "../../constants";
import { Octicons } from "@expo/vector-icons";
import CopyIcon from "./CopyIcon";
import { format_number } from "../../helpers/utils/numbers";
import { format_date_readable } from "../../helpers/utils/datetime";
import { router } from "expo-router";
import { BORDER_RADIUS } from "../../constants/theme";

const PackageCard = ({ ...props }) => {
  if (props?.type === "defined")
    return (
      <BudgetDefinedCard
        data={props?.data}
        clickable={props?.clickable}
        full={props?.full}
      />
    );

  if (props?.type === "free")
    return (
      <FreeFlowCard
        data={props?.data}
        clickable={props?.clickable}
        full={props?.full}
      />
    );

  return <></>;
};

const BudgetDefinedCard = ({ data, clickable, full }) => {
  const view_package = (id) => {
    if (clickable) {
      router.navigate(`/package/${id}`);
    }
  };

  return (
    <View style={styles.component}>
      {/**type */}
      <View style={styles.typeComp}>
        <Text style={styles.type}>{data?.package_type?.toUpperCase()}</Text>
      </View>

      {/**meta data */}
      <View style={styles.metaTop}>
        {/**details */}
        <TouchableOpacity
          onPress={() => view_package(data?.package_id)}
          style={styles.mainDetails(true)}
        >
          <Text style={styles.title} numberOfLines={full ? 3 : 1}>
            {data?.title}
          </Text>
          {/**creation date */}
          <View style={styles.packageIdTab}>
            <Text style={styles.packageId}>{data?.package_id}</Text>

            {/**copy package id */}
            <CopyIcon text_to_copy={`${data?.package_id}`} />
          </View>
        </TouchableOpacity>

        {/**progress */}
        <View style={styles.progress}>
          <ProgressBarComponent
            type={"circular"}
            current_value={data?.available_amount || 0}
            maximum_value={data?.target_amount || 1}
            size={48}
            strokeWidth={8}
            backgroundColor={COLOR_THEME.gray50}
          />
        </View>
      </View>

      {/**other data */}
      <View style={styles.metaBottom}>
        {/** */}
        <View style={styles.subDataBlock}>
          {/**status */}
          <View style={styles.subDataTab}>
            <View style={styles.subDataIcon}>
              <Octicons name="history" size={18} color={COLOR_THEME.gray200} />
            </View>

            <View style={styles.subData}>
              <Text style={styles.subDataTitle}>Status:</Text>
              <Text style={styles.subDataValue}>{data?.status}</Text>
            </View>
          </View>

          {/**due date */}
          <View style={styles.subDataTab}>
            <View style={styles.subDataIcon}>
              <Octicons name="calendar" size={18} color={COLOR_THEME.gray200} />
            </View>

            <View style={styles.subData}>
              <Text style={styles.subDataTitle}>Deadline:</Text>
              <Text style={styles.subDataValue}>
                {format_date_readable(data?.deadline)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const FreeFlowCard = ({ data, clickable, full }) => {
  const view_package = (id) => {
    if (clickable) {
      router.navigate(`/package/${id}`);
    }
  };

  return (
    <View style={styles.component}>
      <View style={styles.freeTopBar}>
        {/**type */}
        <View style={styles.typeComp}>
          <Text style={styles.type}>{data?.package_type?.toUpperCase()}</Text>
        </View>

        {/**amount */}
        <View style={styles.amountComp}>
          <Text style={styles.amount}>
            {NAIRA_CURRENCY} {format_number(data?.available_amount)}
          </Text>
        </View>
      </View>

      {/**meta data */}
      <View style={styles.metaTop}>
        {/**details */}
        <TouchableOpacity
          onPress={() => view_package(data?.package_id)}
          style={styles.mainDetails(false)}
        >
          <Text style={styles.title} numberOfLines={full ? 3 : 1}>
            {data?.title}
          </Text>
          {/**creation date */}
          <View style={styles.packageIdTab}>
            <Text style={styles.packageId}>{data?.package_id}</Text>

            {/**copy package id */}
            <CopyIcon text_to_copy={`${data?.package_id}`} />
          </View>
        </TouchableOpacity>
      </View>

      {/**other data */}
      <View style={styles.metaBottom}>
        {/** */}
        <View style={styles.subDataBlock}>
          {/**status */}
          <View style={styles.subDataTab}>
            <View style={styles.subDataIcon}>
              <Octicons name="history" size={18} color={COLOR_THEME.gray200} />
            </View>

            <View style={styles.subData}>
              <Text style={styles.subDataTitle}>Status:</Text>
              <Text style={styles.subDataValue}>{data?.status}</Text>
            </View>
          </View>

          {/**due date */}
          <View style={styles.subDataTab}>
            <View style={styles.subDataIcon}>
              <Octicons name="calendar" size={18} color={COLOR_THEME.gray200} />
            </View>

            <View style={styles.subData}>
              <Text style={styles.subDataTitle}>Commenced:</Text>
              <Text style={styles.subDataValue}>
                {format_date_readable(data?.created_time)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(PackageCard);

const styles = StyleSheet.create({
  component: {
    width: "100%",
    padding: 16,
    borderRadius: BORDER_RADIUS.m,
    backgroundColor: COLOR_THEME.white,
    gap: 8,
  },
  typeComp: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.xs,
    backgroundColor: COLOR_THEME.gray50,
    alignSelf: "flex-start",
  },
  type: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.gray200,
    maxWidth: 200,
  },
  freeTopBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  amountComp: {
    alignSelf: "flex-start",
  },
  amount: {
    fontSize: FONT_SIZE.b,
    fontWeight: FONT_WEIGHT.bold,
    color: COLOR_THEME.black,
    maxWidth: 300,
  },
  metaTop: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    paddingBottom: 8,
  },
  mainDetails: (shorten) => ({
    width: shorten ? SCREEN_DIMENSION.subtractWidth(16, 32 + 32, 48) : "100%",
    gap: 4,
  }),
  progress: {
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: FONT_SIZE.b,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.primary,
    textTransform: "capitalize",
  },
  packageIdTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  packageId: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray100,
  },
  metaBottom: {
    width: "100%",
    paddingTop: 16,
    borderTopWidth: 1.8,
    borderStyle: "dashed",
    borderTopColor: COLOR_THEME.gray50,
    gap: 16,
  },
  subDataBlock: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  subDataTab: {
    maxWidth: SCREEN_DIMENSION.divisionWidth(16, 32 + 32, 2),
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  subDataIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  subData: {
    gap: 2,
  },
  subDataTitle: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
    lineHeight: 13,
  },
  subDataValue: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
    lineHeight: 15,
  },
});
