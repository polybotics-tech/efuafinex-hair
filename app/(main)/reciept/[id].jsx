import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaWrapper from "../../../components/ui/safeAreaWrapper";
import DefaultHeaderComponent from "../../../components/DefaultHeaderComponent";
import ScrollViewWrapper from "../../../components/ui/ScrollViewWrapper";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  NAIRA_CURRENCY,
} from "../../../constants";
import { format_number } from "../../../helpers/utils/numbers";
import { Octicons } from "@expo/vector-icons";
import { format_date_time_readable } from "../../../helpers/utils/datetime";

export default function Reciept() {
  return (
    <SafeAreaWrapper>
      <DefaultHeaderComponent directory={"reciept"} />
      {/**page */}
      <ScrollViewWrapper style={styles.page}>
        {/**amount */}
        <View style={styles.component}>
          <Text style={styles.amountHeader}>AMOUNT</Text>
          <Text style={styles.amount}>
            {NAIRA_CURRENCY} {format_number(20000)}
          </Text>

          <View>
            <StatusComponent status={"success"} />
          </View>
        </View>

        {/**detail summary */}
        <View style={styles.component}>
          <DetailTab
            title={"Transaction ID"}
            value={"TRANS-361fVkE1798475824"}
            canCopy={true}
          />

          <DetailTab
            title={"Transaction Ref"}
            value={"TRANS-361fVkE1798475824"}
            canCopy={true}
          />

          <DetailTab
            title={"Package ID"}
            value={"PID-84Eq1798475824"}
            canCopy={true}
          />
        </View>

        {/**account summary */}
        <View style={styles.component}>
          <DetailTab
            title={"Account Name"}
            value={String("Onyeleonu ifeanyichukwu g")?.toUpperCase()}
          />

          <DetailTab
            title={"Account Number"}
            value={"0109684942"}
            canCopy={true}
          />

          <DetailTab
            title={"Bank Name"}
            value={String("United bank of africa")?.toUpperCase()}
          />
        </View>

        {/**amount, status, date */}
        <View style={styles.component}>
          <DetailTab
            title={"Amount"}
            value={`${NAIRA_CURRENCY} ${format_number(67000)}`}
          />

          <DetailTab
            title={"Date"}
            value={`${format_date_time_readable(new Date())}`}
          />

          <DetailTab
            title={"Status"}
            value={String("success")?.toUpperCase()}
          />
        </View>
      </ScrollViewWrapper>
    </SafeAreaWrapper>
  );
}

const StatusComponent = ({ status }) => {
  return (
    <View style={styles.statusComponent(status)}>
      <Text style={styles.status(status)}>{String(status)?.toUpperCase()}</Text>
    </View>
  );
};

const DetailTab = ({ title, value, canCopy }) => {
  return (
    <View style={styles.detailTab}>
      <Text style={styles.detailTitle}>{title}</Text>

      <View style={styles.detailValueTab}>
        <Text style={styles.detailValue}>{value}</Text>

        {canCopy && (
          <Octicons name="copy" size={12} color={COLOR_THEME.gray200} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: COLOR_THEME.gray50,
    padding: 16,
    gap: 16,
  },
  statusComponent: (s) => ({
    height: 22,
    paddingHorizontal: 32,
    borderRadius: 100,
    alignSelf: "flex-start",
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
  component: {
    width: "100%",
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLOR_THEME.white,
    gap: 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  amountHeader: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.gray200,
    textAlign: "center",
  },
  amount: {
    fontSize: FONT_SIZE.xxxb,
    fontWeight: FONT_WEIGHT.bold,
    color: COLOR_THEME.black,
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 8,
  },
  detailTab: {
    width: "100%",
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  detailTitle: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
    textAlign: "left",
    maxWidth: "45%",
  },
  detailValueTab: {
    maxWidth: "54%",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailValue: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.gray200,
    textAlign: "right",
  },
});
