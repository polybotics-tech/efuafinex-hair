import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthScreenWrapper from "../../components/ui/AuthScreenWrapper";
import AuthFormComponent from "../../components/AuthFormComponent";
import { Octicons } from "@expo/vector-icons";
import { COLOR_THEME } from "../../constants/theme";
import { AUTH_HOOKS } from "../../helpers/hooks/auth";
import { router } from "expo-router";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  //handle form submission
  const submitForm = async () => {
    const found = await AUTH_HOOKS.forgot_verify_email(formData, setIsLoading);

    if (found) {
      //redirect to verify email page
      router.dismissTo(`/verify/?ref=forgot`);
    }
  };

  return (
    <AuthScreenWrapper
      title={"Forgot Password"}
      subText={"Reset password by verifying account email"}
      switchText={"Login"}
      bottomText={"Remember your password?"}
      switchPath={"/login/"}
      buttonText={"Check account email"}
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
    </AuthScreenWrapper>
  );
}

const styles = StyleSheet.create({});
