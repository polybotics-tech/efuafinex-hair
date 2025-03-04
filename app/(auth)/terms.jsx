import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthScreenWrapper from "../../components/ui/AuthScreenWrapper";
import PopupModalWrapper from "../../components/ui/PopupModalWrapper";
import PrimaryButton from "../../components/reuseables/PrimaryButton";
import { COLOR_THEME } from "../../constants";
import { FONT_SIZE, FONT_WEIGHT } from "../../constants/theme";
import { router, useLocalSearchParams } from "expo-router";
import TermsAndConditions from "../../components/TermsAndConditions";
import BackBtn from "../../components/reuseables/BackBtn";

export default function Terms() {
  const theme = useSelector((s) => s.app.theme);

  const [isVisible, setIsVisible] = useState(false);

  const submitForm = () => {
    setIsVisible(true);
    return;
  };

  //////
  const [canGoBack, setCanGoBack] = useState(false);
  const [isForced, setIsForced] = useState(false);

  const { ref } = useLocalSearchParams();

  useEffect(() => {
    if (ref) {
      if (ref === "read") {
        setCanGoBack(true);
      } else if (ref === "refund") {
        setIsForced(true);
      }
    }
  }, [ref]);

  return (
    <>
      {canGoBack && <BackBtn />}
      <AuthScreenWrapper
        title={"Terms and Conditions"}
        subText={"Please gradually read through our terms and conditions"}
        buttonText={isForced ? "I agree, Continue" : ""}
        formSubmitFunction={submitForm}
      >
        {/**terms and conditions */}
        <TermsAndConditions />
      </AuthScreenWrapper>

      {/**action block popup */}
      <PopupModalWrapper
        title={"User Preference"}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      >
        <RefundChoice />
      </PopupModalWrapper>
    </>
  );
}

const RefundChoice = ({}) => {
  const theme = useSelector((s) => s.app.theme);

  const _addRefund = () => {
    router.dismissTo("/refunds/");
  };

  const _skip = () => {
    router.dismissTo("/(tabs)/");
  };

  return (
    <View style={styles(theme).refund}>
      <Text style={styles(theme).warning}>
        Incase of any need for a refund, we would like to save a record of a
        bank account details of your choice to recieve these funds. This makes
        it easier to process your requests in due time without delays.
      </Text>

      <View style={styles(theme).action}>
        <PrimaryButton title={"Continue"} onPress={() => _addRefund()} />

        <TouchableOpacity style={styles(theme).skip} onPress={() => _skip()}>
          <Text style={styles(theme).skipText}>Skip, maybe later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    refund: {
      width: "100%",
      paddingBottom: 32,
      gap: 48,
    },
    warning: {
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray200,
      textAlign: "center",
    },
    action: {
      wodth: "100%",
      gap: 16,
    },
    skip: {
      width: "100%",
      height: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    skipText: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].error,
    },
  });
