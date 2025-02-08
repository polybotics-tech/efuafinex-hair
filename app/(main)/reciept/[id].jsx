import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import { useLocalSearchParams } from "expo-router";
import { DEPOSIT_HOOKS } from "../../../helpers/hooks/deposit";
import NotFoundComponent from "../../../components/reuseables/NotFoundComponent";
import PrimaryButton from "../../../components/reuseables/PrimaryButton";

export default function Reciept() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  //fetch deposit details
  const fetchDeposit = async (id) => {
    const result = await DEPOSIT_HOOKS.fetch_single_deposit(setIsLoading, id);

    if (result) {
      setData(result);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDeposit(id);
    }
  }, [id]);

  return (
    <SafeAreaWrapper>
      <DefaultHeaderComponent directory={"reciept"} />
      {/**page */}
      <ScrollViewWrapper
        style={styles.page}
        refreshFunc={() => {
          setData();
          fetchDeposit(id);
        }}
      >
        {!data ? (
          <NotFoundComponent
            text={"Deposit record not found"}
            isLoading={isLoading}
          />
        ) : (
          <>
            {/**amount */}
            <View style={styles.component}>
              <Text style={styles.amountHeader}>AMOUNT</Text>
              <Text style={styles.amount}>
                {NAIRA_CURRENCY} {format_number(data?.amount_expected)}
              </Text>

              <View>
                <StatusComponent status={data?.status} />
              </View>
            </View>

            {/**detail summary */}
            <View style={styles.component}>
              <DetailTab title={"Serial No"} value={data?.deposit_id} />

              <DetailTab
                title={"Transaction Ref"}
                value={data?.transaction_ref}
                canCopy={true}
              />

              <DetailTab
                title={"Package ID"}
                value={data?.package_id}
                canCopy={true}
              />
            </View>

            {/**account summary */}
            {data?.extra &&
              String(data?.extra?.channel)?.toLowerCase() === "card" && (
                <View style={styles.component}>
                  <DetailTab
                    title={"Payment Mode"}
                    value={String(data?.extra?.channel)?.toUpperCase()}
                  />

                  <DetailTab
                    title={"Card Number"}
                    value={`${data?.extra?.bin}xxxxxx${data?.extra?.last4}`}
                  />

                  <DetailTab
                    title={"Card Expiry Date"}
                    value={`${data?.extra?.exp_month}/${data?.extra?.exp_year}`}
                  />

                  <DetailTab
                    title={"Card Type"}
                    value={String(data?.extra?.card_type)?.toUpperCase()}
                  />
                </View>
              )}

            {/**amount, status, date */}
            <View style={styles.component}>
              <DetailTab
                title={"Amount Paid"}
                value={`${NAIRA_CURRENCY} ${format_number(data?.amount_paid)}`}
              />

              <DetailTab
                title={"Fee Charged"}
                value={`${NAIRA_CURRENCY} ${format_number(data?.fee_charged)}`}
              />

              <DetailTab
                title={"Date"}
                value={`${format_date_time_readable(data?.created_time)}`}
              />

              <DetailTab
                title={"Status"}
                value={String(data?.status)?.toUpperCase()}
              />
            </View>
          </>
        )}
        {/**download button */}
        <View style={{ marginTop: 16 }}>
          <PrimaryButton title={"Download"} />
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
