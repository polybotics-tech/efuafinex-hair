import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import AuthScreenWrapper from "../../components/ui/AuthScreenWrapper";
import AuthFormComponent from "../../components/AuthFormComponent";
import { Octicons } from "@expo/vector-icons";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants/theme";
import { router } from "expo-router";
import { Alert } from "../../helpers/utils/alert";
import { AUTH_HOOKS } from "../../helpers/hooks/auth";
import { DEBOUNCE } from "../../helpers/utils/debounce";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  //handle form submission
  const submitForm = DEBOUNCE(async () => {
    const login = await AUTH_HOOKS.attempt_login(formData, setIsLoading);
    if (login) {
      //redirect to home
      router.dismissTo("/(tabs)");
    }
  });

  return (
    <AuthScreenWrapper
      title={"Login"}
      subText={"Continue to existing account"}
      switchText={"Register"}
      bottomText={"Don't have an account?"}
      switchPath={"/register/"}
      buttonText={"Login to account"}
      buttonIsLoading={isLoading}
      formSubmitFunction={submitForm}
    >
      {/**email */}
      <AuthFormComponent
        formType={"input"}
        inputMode={"email"}
        inputIcon={
          <Octicons name="mail" size={16} color={COLOR_THEME.gray200} />
        }
        label={"Email address"}
        placeholder={"Ex. johndoe@example.com"}
        name={"email"}
        form={formData}
        setForm={setFormData}
      />

      {/**password */}
      <AuthFormComponent
        formType={"input"}
        inputMode={"password"}
        inputIcon={
          <Octicons name="lock" size={16} color={COLOR_THEME.gray200} />
        }
        label={"Password"}
        placeholder={"Enter account password"}
        name={"pass"}
        form={formData}
        setForm={setFormData}
      />

      {/**forgot password */}
      <Pressable
        style={styles.forgotBtn}
        onPress={() => {
          router.navigate("/forgot-pass/");
        }}
      >
        <Text style={styles.forgotPass}>Forgot password?</Text>
      </Pressable>
    </AuthScreenWrapper>
  );
}

const styles = StyleSheet.create({
  forgotBtn: {
    marginLeft: "auto",
    paddingHorizontal: 2,
  },
  forgotPass: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.primary,
    textAlign: "right",
    maxWidth: 130,
  },
});
