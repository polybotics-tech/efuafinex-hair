import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthScreenWrapper from "../../components/ui/AuthScreenWrapper";
import AuthFormComponent from "../../components/AuthFormComponent";
import { Octicons } from "@expo/vector-icons";
import { COLOR_THEME } from "../../constants/theme";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  //handle form update
  const updateEmail = (text) => {
    setFormData((p) => ({
      ...p,
      email: text,
    }));
  };

  return (
    <AuthScreenWrapper
      title={"Forgot Password"}
      subText={"Reset password by verifying account email"}
      switchText={"Login"}
      bottomText={"Remember your password?"}
      switchPath={"/login/"}
      buttonText={"Check account email"}
    >
      {/**email */}
      <AuthFormComponent
        formType={"input"}
        inputMode={"email"}
        inputIcon={
          <Octicons name="mail" size={16} color={COLOR_THEME.gray200} />
        }
        label={"Email address"}
        placeholder={"What is your account email?"}
        value={formData?.email}
        setValue={updateEmail}
      />
    </AuthScreenWrapper>
  );
}

const styles = StyleSheet.create({});
