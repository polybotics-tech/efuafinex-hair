import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaWrapper from "../../../../components/ui/safeAreaWrapper";
import DefaultHeaderComponent from "../../../../components/DefaultHeaderComponent";
import ScrollViewWrapper from "../../../../components/ui/ScrollViewWrapper";
import AuthScreenWrapper from "../../../../components/ui/AuthScreenWrapper";
import { router, useLocalSearchParams } from "expo-router";
import AuthFormComponent from "../../../../components/AuthFormComponent";
import { PACKAGE_HOOKS } from "../../../../helpers/hooks/package";
import {
  COLOR_THEME,
  FONT_SIZE,
  NAIRA_CURRENCY,
  SCREEN_DIMENSION,
} from "../../../../constants";
import { Octicons } from "@expo/vector-icons";
import { format_number } from "../../../../helpers/utils/numbers";

import { WebView } from "react-native-webview";
import PopupModalWrapper from "../../../../components/ui/PopupModalWrapper";
import { Alert } from "../../../../helpers/utils/alert";
import { DEPOSIT_HOOKS } from "../../../../helpers/hooks/deposit";
import { DEBOUNCE } from "../../../../helpers/utils/debounce";

export default function Deposit() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  //fetch package details
  const fetchPackage = DEBOUNCE(async (id) => {
    const result = await PACKAGE_HOOKS.fetch_single_package(setIsLoading, id);

    if (result) {
      setData(result);
    }
  }, 500);

  useEffect(() => {
    if (id) {
      fetchPackage(id);
    }
  }, [id]);

  //fetch balance
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (data) {
      if (data?.package_type === "defined") {
        setBalance(Number(data?.target_amount - data?.available_amount));
      }
    }
  }, [data]);

  //handle form data
  const [formData, setFormData] = useState({
    amount: "",
  });

  //handle deposit functionality
  const [authorization_url, setAuthUrl] = useState("");
  const [transaction_ref, setTransRef] = useState("");
  const [lauchWeb, setLauchWeb] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  //handle transaction verification on webview close
  const [beginVerification, setBeginVerification] = useState(false);
  const verifyTransaction = () => {
    setBeginVerification(true);
  };

  //to reset every parameter incase of verification error
  const resetAllParams = () => {
    setLauchWeb(false);
    setAuthUrl("");
    setTransRef("");
    setBeginVerification(false);
  };

  //submit form
  const submitForm = async () => {
    const initialize_transaction = await DEPOSIT_HOOKS.make_deposit(
      setBtnLoading,
      id,
      formData
    );

    if (initialize_transaction) {
      //launch web view
      setAuthUrl(String(initialize_transaction?.authorization_url));
      setTransRef(String(initialize_transaction?.transaction_ref));
      setLauchWeb(true);
    }
  };

  // Check payment status when WebView navigation state changes
  const handleWebViewNavigation = (navState) => {
    const { url } = navState;

    if (url != authorization_url) {
      setLauchWeb(false);
    }
  };

  return (
    <SafeAreaWrapper>
      <DefaultHeaderComponent directory={"deposit"} />

      <ScrollViewWrapper style={styles.page}>
        {!data ? (
          <ActivityIndicator size={FONT_SIZE.s} color={COLOR_THEME.gray200} />
        ) : (
          <AuthScreenWrapper
            title={`${id}`}
            subText={
              "Make a deposit to boost the available funds in this package"
            }
            buttonText={"Proceed"}
            buttonIsLoading={btnLoading}
            formSubmitFunction={submitForm}
          >
            {/**target amount */}
            <AuthFormComponent
              formType={"input"}
              inputIcon={
                <Octicons
                  name="credit-card"
                  size={16}
                  color={COLOR_THEME.gray200}
                />
              }
              inputMode={"numeric"}
              label={"Amount"}
              placeholder={"How much would you like to deposit?"}
              description={
                balance > 0
                  ? `You can deposit anything from ${NAIRA_CURRENCY}100 - ${NAIRA_CURRENCY}${format_number(
                      balance
                    )}`
                  : ""
              }
              name={"amount"}
              form={formData}
              setForm={setFormData}
            />
          </AuthScreenWrapper>
        )}

        {/**web view in modal */}
        <PopupModalWrapper
          isVisible={lauchWeb}
          setIsVisible={setLauchWeb}
          onCloseFunc={() => verifyTransaction()}
          containerStyle={styles.containerStyle}
        >
          <WebView
            style={styles.webContainer}
            source={{ uri: authorization_url }}
            onNavigationStateChange={handleWebViewNavigation}
            startInLoadingState
            renderLoading={() => (
              <ActivityIndicator
                size={FONT_SIZE.m}
                color={COLOR_THEME.primary}
              />
            )}
          />
        </PopupModalWrapper>
      </ScrollViewWrapper>

      {/**verification modal */}
      {Boolean(beginVerification) && (
        <VerificationInProgress
          transaction_ref={transaction_ref}
          resetParams={() => resetAllParams()}
        />
      )}
    </SafeAreaWrapper>
  );
}

const VerificationInProgress = ({
  transaction_ref,
  resetParams = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const loadReciept = () => {
    if (router.canDismiss()) {
      router.dismiss(2);
    }
    router.push(`/reciept/${transaction_ref}`);
  };

  const verifyTrans = async () => {
    const verify = await DEPOSIT_HOOKS.verify_transaction(
      setIsLoading,
      transaction_ref
    );

    if (verify) {
      return loadReciept();
    } else {
      return resetParams();
    }
  };

  useEffect(() => {
    if (transaction_ref) {
      verifyTrans();
    }
  }, [transaction_ref]);

  return (
    <View style={styles.verifyCont}>
      <ActivityIndicator size={"large"} color={COLOR_THEME.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width: "100%",
    minHeight: "100%",
    padding: 16,
    backgroundColor: COLOR_THEME.white,
  },
  containerStyle: {
    width: "100%",
    minHeight: SCREEN_DIMENSION.heightRatio(1 / 0.5),
  },
  webContainer: {
    width: "100%",
    height: "100%",
  },
  verifyCont: {
    width: SCREEN_DIMENSION.width,
    height: SCREEN_DIMENSION.height,
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
});
