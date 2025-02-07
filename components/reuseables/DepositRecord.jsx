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

const DepositRecord = ({ data }) => {
  const view_transaction = (id = "") => {
    router.navigate(`/reciept/${id}`);
  };
  return (
    <TouchableOpacity
      style={styles.component}
      onPress={() => {
        view_transaction(data?.transaction_ref);
      }}
    >
      <View style={styles.topRow}>
        {/* package id */}
        <Text style={styles.packageId}>{data?.transaction_ref}</Text>

        {/* status */}
        <StatusComponent status={data?.status} />
      </View>

      <View style={styles.bottomRow}>
        {/* amount */}
        <Text style={styles.amount}>
          {NAIRA_CURRENCY} {format_number(data?.amount_expected)}{" "}
          {data?.fee_charged > 0 && (
            <Text style={styles.fee}>
              [- {NAIRA_CURRENCY}
              {format_number(data?.fee_charged)}]
            </Text>
          )}
        </Text>

        {/* created time */}
        <Text style={styles.createdTime}>
          {format_date_time_readable(data?.created_time)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(DepositRecord);

const StatusComponent = ({ status }) => {
  return (
    <View style={styles.statusComponent(status)}>
      <Text style={styles.status(status)}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    width: "100%",
    padding: 16,
    gap: 4,
    backgroundColor: COLOR_THEME.white,
    borderRadius: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderStyle: "dashed",
    borderBottomColor: COLOR_THEME.gray50,
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
    color: COLOR_THEME.gray200,
  },
  createdTime: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray100,
  },
  amount: {
    fontSize: FONT_SIZE.b,
    fontWeight: FONT_WEIGHT.bold,
    color: COLOR_THEME.black,
  },
  fee: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.error,
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
        ? COLOR_THEME.primaryFaded
        : s === "failed" || s === "canceled"
        ? COLOR_THEME.errorFaded
        : COLOR_THEME.gray50,
  }),
  status: (s) => ({
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color:
      s === "success"
        ? COLOR_THEME.primary
        : s === "failed" || s === "canceled"
        ? COLOR_THEME.error
        : COLOR_THEME.gray200,
    lineHeight: 12,
  }),
});
