import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AuthScreenWrapper from "../../components/ui/AuthScreenWrapper";
import AuthFormComponent from "../../components/AuthFormComponent";
import { Octicons } from "@expo/vector-icons";
import { BORDER_RADIUS, COLOR_THEME } from "../../constants/theme";
import { AUTH_HOOKS } from "../../helpers/hooks/auth";
import { router, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import NotFoundComponent from "../../components/reuseables/NotFoundComponent";
import { DEBOUNCE } from "../../helpers/utils/debounce";

export default function VerifyEmail() {
  const theme = useSelector((state) => state.app.theme);

  const { ref } = useLocalSearchParams();
  const user = useSelector((state) => state.user.user);

  const [data, setData] = useState();

  //generate otp
  const generateOtp = async () => {
    const res = await AUTH_HOOKS.generate_otp(
      { user_id: user?.user_id },
      setIsLoading
    );

    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    generateOtp();
  }, []);

  const [formData, setFormData] = useState({
    otp: "",
    user_id: user?.user_id,
  });
  const [isLoading, setIsLoading] = useState(false);

  //handle form submission
  const submitForm = DEBOUNCE(async () => {
    const verified = await AUTH_HOOKS.verify_otp(formData, setIsLoading);

    if (verified) {
      if (ref && ref === "forgot") {
        //redirect to reset password page
        router.dismissTo("/reset-pass/");
      } else if (ref && ref === "register") {
        //redirect to reset password page
        router.dismissTo("/thumbnail/");
      } else {
        //redirect to home page
        router.dismissTo("/(tabs)/");
      }
    }
  });

  return (
    <>
      {/**back button */}
      <BackBtn />

      {/**page */}
      <AuthScreenWrapper
        title={"Verify Email"}
        subText={`An OTP has been sent to ${user?.email}`}
        switchText={"Resend"}
        bottomText={"Didn't get code?"}
        switchPath={`/verify/?ref=${ref}`}
        buttonText={"Verify"}
        buttonIsLoading={isLoading}
        formSubmitFunction={submitForm}
      >
        {!data ? (
          <NotFoundComponent
            text={"Something went wrong. Click below to resend code"}
            isLoading={isLoading}
          />
        ) : (
          <AuthFormComponent
            formType={"input"}
            inputMode={"numeric"}
            inputIcon={
              <Octicons
                name="number"
                size={16}
                color={COLOR_THEME[theme].gray200}
              />
            }
            label={"6-digit OTP"}
            placeholder={"Ex. 123456"}
            name={"otp"}
            form={formData}
            setForm={setFormData}
          />
        )}
      </AuthScreenWrapper>
    </>
  );
}

const BackBtn = ({}) => {
  const theme = useSelector((state) => state.app.theme);

  const [isLoading, setIsLoading] = useState(false);

  const _goBack = async () => {
    let success = await AUTH_HOOKS.attempt_logout(setIsLoading);

    if (success) {
      router.dismissTo("/(auth)/login/");
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles(theme).actionBtn}
      onPress={_goBack}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size={18} color={COLOR_THEME[theme].black} />
      ) : (
        <Octicons
          name="arrow-left"
          size={18}
          color={COLOR_THEME[theme].black}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    actionBtn: {
      width: 44,
      height: 44,
      borderRadius: BORDER_RADIUS.r,
      backgroundColor: COLOR_THEME[theme].gray50,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
  });
