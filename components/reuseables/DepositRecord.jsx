import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { format_number } from "../../helpers/utils/numbers";
import { format_date_time_readable } from "../../helpers/utils/datetime";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  NAIRA_CURRENCY,
} from "../../constants";
import { router } from "expo-router";
import { BORDER_RADIUS } from "../../constants/theme";
import { useSelector } from "react-redux";

const DepositRecord = ({ data }) => {
  const theme = useSelector((state) => state.app.theme);

  const view_transaction = (id = "") => {
    router.navigate(`/reciept/${id}`);
  };
  return (
    <TouchableOpacity
      style={styles(theme).component}
      onPress={() => {
        view_transaction(data?.transaction_ref);
      }}
    >
      <View style={styles(theme).topRow}>
        {/* package id */}
        <Text style={styles(theme).packageId}>{data?.transaction_ref}</Text>

        {/* status */}
        <StatusComponent status={data?.status} theme={theme} />
      </View>

      <View style={styles(theme).bottomRow}>
        {/* amount */}
        <Text style={styles(theme).amount}>
          {NAIRA_CURRENCY} {format_number(data?.amount_expected)}{" "}
          {data?.fee_charged > 0 && (
            <Text style={styles(theme).fee}>
              [- {NAIRA_CURRENCY}
              {format_number(data?.fee_charged)}]
            </Text>
          )}
        </Text>

        {/* created time */}
        <Text style={styles(theme).createdTime}>
          {format_date_time_readable(data?.created_time)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(DepositRecord);

const StatusComponent = ({ status, theme }) => {
  return (
    <View style={styles(theme).statusComponent(status)}>
      <Text style={styles(theme).status(status)}>{status}</Text>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    component: {
      width: "100%",
      padding: 16,
      gap: 4,
      backgroundColor: COLOR_THEME[theme].white,
      borderRadius: BORDER_RADIUS.m,
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      paddingBottom: 8,
      borderBottomWidth: 2,
      borderStyle: "dashed",
      borderBottomColor: COLOR_THEME[theme].gray50,
    },
    bottomRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
    },
    packageId: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].gray200,
    },
    createdTime: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray100,
    },
    amount: {
      fontSize: FONT_SIZE.b,
      fontWeight: FONT_WEIGHT.bold,
      color: COLOR_THEME[theme].black,
    },
    fee: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].error,
    },
    statusComponent: (s) => ({
      height: 22,
      width: 72,
      borderRadius: 100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:
        s === "success"
          ? COLOR_THEME[theme].successFaded
          : s === "failed" || s === "canceled"
          ? COLOR_THEME[theme].errorFaded
          : COLOR_THEME[theme].gray50,
    }),
    status: (s) => ({
      fontSize: FONT_SIZE.xs,
      fontWeight: FONT_WEIGHT.semibold,
      color:
        s === "success"
          ? COLOR_THEME[theme].success
          : s === "failed" || s === "canceled"
          ? COLOR_THEME[theme].error
          : COLOR_THEME[theme].gray200,
      lineHeight: 12,
    }),
  });
