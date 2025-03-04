import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  BORDER_RADIUS,
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
} from "../../constants/theme";
import { SCREEN_DIMENSION } from "../../constants";
import { Octicons } from "@expo/vector-icons";
import ImageComponent from "../../components/reuseables/ImageComponent";
import { BANK_LIST } from "../../helpers/json";
import PopupModalWrapper from "../../components/ui/PopupModalWrapper";
import PrimaryButton from "../../components/reuseables/PrimaryButton";
import AuthFormComponent from "../../components/AuthFormComponent";
import { extract_name_from_bank_code } from "../../helpers/utils";
import { DEBOUNCE } from "../../helpers/utils/debounce";
import { TRANSFER_HOOKS } from "../../helpers/hooks/transfer";
import { useSelector } from "react-redux";
import AuthScreenWrapper from "../../components/ui/AuthScreenWrapper";
import { IMAGE_LOADER } from "../../helpers/utils/image-loader";
import { router } from "expo-router";

export default function Refunds() {
  const theme = useSelector((s) => s.app.theme);

  //
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
  const [isLoading, setIsLoading] = useState(false);
  const _saveRefund = DEBOUNCE(async () => {
    const res = await TRANSFER_HOOKS.save_refund_account(
      formData,
      setIsLoading
    );

    if (res) {
      router.dismissTo("/(tabs)");
    }
  });

  return (
    <AuthScreenWrapper
      title={"Add Refund Account"}
      subText={"Verify and save bank account for possible refunds"}
    >
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
              formData?.recipient_code &&
              formData?.reason
          ) && (
            <PrimaryButton
              title={"Save Refund Account"}
              isLoading={isLoading}
              onPress={() => _saveRefund()}
            />
          )}
        </View>
      </View>
    </AuthScreenWrapper>
  );
}

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
      gap: 16,
    },
  });
