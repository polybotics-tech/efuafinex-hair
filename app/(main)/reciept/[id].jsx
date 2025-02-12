import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { useLocalSearchParams } from "expo-router";
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
import { format_date_time_readable } from "../../../helpers/utils/datetime";
import { DEPOSIT_HOOKS } from "../../../helpers/hooks/deposit";
import NotFoundComponent from "../../../components/reuseables/NotFoundComponent";
import PrimaryButton from "../../../components/reuseables/PrimaryButton";
import { Alert } from "../../../helpers/utils/alert";
import { BORDER_RADIUS } from "../../../constants/theme";

export default function RecieptPage() {
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

  // create a ref for reciept
  const recieptRef = useRef();

  //--download reciept handle
  const [isDownloading, setIsDownloading] = useState(false);

  // request media library permissions
  const requestPermission = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.error(
          "Download error",
          "Permission to save to storage was not granted"
        );
        return false;
      }
      return true;
    } catch (error) {
      Alert.error(
        "Download error",
        "Permission to save to storage was not granted"
      );
      return false;
    }
  };

  // capture the View and Save to Gallery
  const saveRecieptToGallery = async () => {
    try {
      setIsDownloading(true);

      //check for permission
      const hasPermission = await requestPermission();
      if (!hasPermission) return;

      // Capture the view as an image
      const uri = await captureRef(recieptRef, {
        format: "png",
        quality: 1,
        result: "tmpfile",
      });

      // Save to phone gallery
      const asset = await MediaLibrary.createAssetAsync(uri);

      Alert.success(
        "Download successful",
        "Reciept has been saved to your gallery"
      );
    } catch (error) {
      Alert.error("Download error", error?.message || "Something went wrong");
    } finally {
      setIsDownloading(false);
    }
  };

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
          <View style={styles.reciept} ref={recieptRef} collapsable={false}>
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

            {/**copy right marker */}
            <View style={styles.copyRight}>
              <Octicons
                name="shield-check"
                size={FONT_SIZE.xs}
                color={COLOR_THEME.gray100}
              />
              <Text style={styles.copyText}>Transaction from EFUAFINEX</Text>
            </View>
          </View>
        )}
        {/**download button */}
        <View style={{ padding: 16 }}>
          <PrimaryButton
            title={"Download"}
            onPress={() => saveRecieptToGallery()}
            isLoading={isDownloading}
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
    gap: 16,
  },
  reciept: {
    width: "100%",
    height: "auto",
    padding: 16,
    gap: 16,
    backgroundColor: COLOR_THEME.gray50,
    alignItems: "center",
    justifyContent: "center",
  },
  statusComponent: (s) => ({
    height: 22,
    paddingHorizontal: 32,
    borderRadius: BORDER_RADIUS.r,
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
    borderRadius: BORDER_RADIUS.s,
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
  copyRight: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  copyText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray100,
  },
});
