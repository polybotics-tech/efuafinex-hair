import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthScreenWrapper from "../../components/ui/AuthScreenWrapper";
import AuthFormComponent from "../../components/AuthFormComponent";
import { Octicons } from "@expo/vector-icons";
import { COLOR_THEME } from "../../constants/theme";
import { AUTH_HOOKS } from "../../helpers/hooks/auth";
import { router } from "expo-router";

export default function VerifyEmail() {
  const [formData, setFormData] = useState({
    new_pass: "",
    confirm_pass: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  //handle form submission
  const submitForm = async () => {
    const success = await AUTH_HOOKS.reset_pass(formData, setIsLoading);

    if (success) {
      //redirect to login page
      router.dismissTo("/login/");
    }
  };

  return (
    <AuthScreenWrapper
      title={"Reset Password"}
      subText={"Forgot your password? Change it to one you can remember"}
      buttonText={"Reset"}
      buttonIsLoading={isLoading}
      formSubmitFunction={submitForm}
    >
      {/**password */}
      <AuthFormComponent
        formType={"input"}
        inputMode={"password"}
        inputIcon={
          <Octicons name="lock" size={16} color={COLOR_THEME.gray200} />
        }
        label={"Password"}
        placeholder={"Enter a new password"}
        name={"new_pass"}
        form={formData}
        setForm={setFormData}
      />

      {/**confirm password */}
      <AuthFormComponent
        formType={"input"}
        inputMode={"password"}
        inputIcon={
          <Octicons name="lock" size={16} color={COLOR_THEME.gray200} />
        }
        label={"Confirm Password"}
        placeholder={"Retype password"}
        name={"confirm_pass"}
        form={formData}
        setForm={setFormData}
      />
    </AuthScreenWrapper>
  );
}

const styles = StyleSheet.create({});
