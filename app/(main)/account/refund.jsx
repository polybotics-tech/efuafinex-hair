import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  NAIRA_CURRENCY,
  SCREEN_DIMENSION,
} from "../../../constants";
import { format_number } from "../../../helpers/utils/numbers";
import { TRANSFER_HOOKS } from "../../../helpers/hooks/transfer";
import { extract_name_from_bank_code } from "../../../helpers/utils";
import AuthFormComponent from "../../../components/AuthFormComponent";
import PrimaryButton from "../../../components/reuseables/PrimaryButton";
import PopupModalWrapper from "../../../components/ui/PopupModalWrapper";
import ImageComponent from "../../../components/reuseables/ImageComponent";
import { Octicons } from "@expo/vector-icons";
import { BANK_LIST } from "../../../helpers/json";
import { BORDER_RADIUS } from "../../../constants/theme";
import { DEBOUNCE } from "../../../helpers/utils/debounce";
import NotFoundComponent from "../../../components/reuseables/NotFoundComponent";
import { IMAGE_LOADER } from "../../../helpers/utils/image-loader";
import { format_date_time_readable } from "../../../helpers/utils/datetime";

export default function ManageRefund() {
  const theme = useSelector((s) => s.app.theme);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  //fetch package details
  const fetchRefundAccount = DEBOUNCE(async () => {
    const result = await TRANSFER_HOOKS.fetch_refund_account(setIsLoading);

    if (result) {
      const { refund_account_record } = result;
      setData(refund_account_record);
    }
  }, 5);

  useEffect(() => {
    fetchRefundAccount();
  }, []);

  return (
    <View style={styles(theme).page}>
      {/**preview */}
      {data ? (
        <PreviewData theme={theme} data={data} />
      ) : (
        <NotFoundComponent
          text={"No refund account saved"}
          isLoading={isLoading}
        />
      )}

      {/**update refund account */}
      <RefundAccountComponent
        theme={theme}
        refreshFunc={() => fetchRefundAccount()}
      />
    </View>
  );
}

const PreviewData = ({ theme, data }) => {
  return (
    <View style={styles(theme).previewComp}>
      <Text style={styles(theme).sectionHeader}>Saved Bank Account</Text>
      <PDTab
        theme={theme}
        title={"Account Name"}
        value={String(data?.account_name)?.toUpperCase()}
      />
      <PDTab
        theme={theme}
        title={"Account Number"}
        value={data?.account_number}
      />
      <PDTab
        theme={theme}
        title={"Bank Name"}
        value={String(
          `${extract_name_from_bank_code(data?.bank_code)}`
        )?.toUpperCase()}
      />
      <PDTab
        theme={theme}
        title={"Last Updated"}
        value={`${format_date_time_readable(data?.last_updated)}`}
      />
    </View>
  );
};

const PDTab = ({ theme, title, value }) => {
  return (
    <View style={styles(theme).pdTab}>
      <Text style={styles(theme).pdTitle}>{title}</Text>
      <Text style={styles(theme).pdValue}>{value}</Text>
    </View>
  );
};

const RefundAccountComponent = ({ theme, refreshFunc = () => {} }) => {
  const [formData, setFormData] = useState({
    account_number: "",
    bank_code: null,
    account_name: "",
    recipient_code: "",
  });

  //refresh form if bank change
  useEffect(() => {
    setFormData((prev) => ({ ...prev, account_name: "", recipient_code: "" }));
  }, [formData?.bank_code, formData?.account_number]);

  //handle account verification from server
  const [verificationLoading, setVerificationLoading] = useState(false);
  const _verifyAccount = DEBOUNCE(async () => {
    const { account_number, bank_code } = formData;
    const res = await TRANSFER_HOOKS.verify_transfer_account(
      setVerificationLoading,
      account_number,
      bank_code
    );

    if (res) {
      const { account_name, recipient_code } = res;

      setFormData((prev) => ({ ...prev, account_name, recipient_code }));
      console.log("recipient_code: ", recipient_code);
    }
  });

  //save refund function
  const [refundLoading, setRefundLoading] = useState(false);
  const _saveRefund = DEBOUNCE(async () => {
    const res = await TRANSFER_HOOKS.save_refund_account(
      formData,
      setRefundLoading
    );

    if (res) {
      setFormData({
        account_number: "",
        bank_code: null,
        account_name: "",
        recipient_code: "",
      });

      refreshFunc();
      return;
    }
  });

  return (
    <>
      {/**request transfer component */}
      <View style={styles(theme).transferComp}>
        <Text style={styles(theme).sectionHeader}>
          Update Refunds Bank Account
        </Text>

        {/** form */}
        <View style={styles(theme).form}>
          {/**account number */}
          <AuthFormComponent
            formType={"input"}
            inputMode={"numeric"}
            inputIcon={
              <Octicons
                name="number"
                size={18}
                color={COLOR_THEME[theme].gray100}
              />
            }
            label={"Account Number"}
            placeholder={"Enter 10-digit account number"}
            name={"account_number"}
            form={formData}
            setForm={setFormData}
          />

          {/**selected bank */}
          {Boolean(formData?.bank_code) && (
            <AuthFormComponent
              formType={"input"}
              inputMode={"text"}
              inputIcon={
                <Octicons
                  name="book"
                  size={18}
                  color={COLOR_THEME[theme].gray100}
                />
              }
              label={"Bank Name"}
              placeholder={"Select a bank"}
              disabled={true}
              value={String(
                extract_name_from_bank_code(formData?.bank_code)
              )?.toUpperCase()}
            />
          )}

          {/**bank selector */}
          {Boolean(formData?.account_number) &&
            String(formData?.account_number)?.length >= 9 && (
              <BankSelector
                theme={theme}
                name={"bank_code"}
                form={formData}
                setForm={setFormData}
              />
            )}

          {/**account name */}
          {Boolean(formData?.account_name != "") && (
            <AuthFormComponent
              formType={"input"}
              inputMode={"text"}
              inputIcon={
                <Octicons
                  name="book"
                  size={18}
                  color={COLOR_THEME[theme].gray100}
                />
              }
              label={"Verified Account Name"}
              placeholder={"Verify account"}
              disabled={true}
              value={String(formData?.account_name)?.toUpperCase()}
            />
          )}

          {/**submit button */}
          <View style={{ marginTop: 32 }}>
            {Boolean(formData?.account_number && formData?.bank_code) &&
              Boolean(!formData?.account_name && !formData?.recipient_code) && (
                <PrimaryButton
                  title={"Verify Bank Account"}
                  isLoading={verificationLoading}
                  type={"secondary"}
                  onPress={() => _verifyAccount()}
                />
              )}

            {Boolean(
              formData?.account_number &&
                formData?.bank_code &&
                formData?.account_name &&
                formData?.recipient_code
            ) && (
              <PrimaryButton
                title={"Update Account"}
                isLoading={refundLoading}
                onPress={() => _saveRefund()}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const BankSelector = ({ theme, name, form, setForm }) => {
  const [isVisible, setIsVisible] = useState(false);

  const select_bank = (bank_code) => {
    setForm((prev) => ({ ...prev, [name]: bank_code }));
    setIsVisible(false);
  };

  return (
    <>
      {/**selector */}
      <TouchableOpacity
        style={styles(theme).selectTab}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles(theme).selectButton}>
          {Boolean(form[name]) ? "Change" : "Select"} Bank
        </Text>
      </TouchableOpacity>

      {/**select bank */}
      <PopupModalWrapper
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        title={"Select Bank"}
        containerStyle={{ gap: 16 }}
      >
        {BANK_LIST?.map((bank, index) => (
          <TouchableOpacity
            key={index}
            style={styles(theme).bankTab}
            onPress={() => select_bank(bank?.code)}
          >
            <View style={styles(theme).bankTabThumbnail}>
              <ImageComponent
                uri={IMAGE_LOADER.bank_thumbnail(bank?.logo)}
                blur={"1"}
                scale={true}
              />
            </View>

            <Text style={styles(theme).bankTabName}>
              {String(bank?.name)?.toUpperCase()}
            </Text>

            {Boolean(bank?.code === form[name]) && (
              <Octicons
                name="check"
                size={16}
                color={COLOR_THEME[theme].success}
              />
            )}
          </TouchableOpacity>
        ))}
      </PopupModalWrapper>
    </>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    page: {
      width: "100%",
      minHeight: "100%",
      paddingVertical: 16,
      backgroundColor: COLOR_THEME[theme].white,
      alignItems: "center",
      gap: 64,
    },
    previewComp: {
      width: "100%",
      paddingHorizontal: 16,
    },
    pdTab: {
      width: "100%",
      paddingVertical: 16,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 16,
      borderBottomWidth: 0.8,
      borderBottomColor: COLOR_THEME[theme].gray50,
    },
    pdTitle: {
      maxWidth: 120,
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray200,
    },
    pdValue: {
      maxWidth: SCREEN_DIMENSION.subtractWidth(16, 32 + 32, 120),
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].black,
      textAlign: "right",
    },
    sectionHeader: {
      fontSize: FONT_SIZE.b,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].black,
      paddingBottom: 16,
      textAlign: "center",
    },
    transferComp: {
      width: "100%",
      padding: 16,
      marginBottom: 92,
    },
    selectTab: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
      marginHorizontal: "auto",
    },
    selectButton: {
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].primary,
    },
    bankTab: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    bankTabThumbnail: {
      width: 48,
      height: 48,
      borderRadius: BORDER_RADIUS.xs,
      backgroundColor: COLOR_THEME[theme].gray50,
      overflow: "hidden",
    },
    bankTabName: {
      width: SCREEN_DIMENSION.subtractWidth(8 + 8, 32, 48 + 16),
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].gray200,
    },
    form: {
      paddingVertical: 16,
      gap: 16,
    },
  });
