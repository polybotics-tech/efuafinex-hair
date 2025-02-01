import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthScreenWrapper from "../../components/ui/AuthScreenWrapper";
import AuthFormComponent from "../../components/AuthFormComponent";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { COLOR_THEME } from "../../constants";

export default function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <AuthScreenWrapper
      title={"Register"}
      subText={"Create new account to explore"}
      switchText={"Login"}
      bottomText={"Already have account?"}
      switchPath={"/login/"}
      buttonText={"Register new account"}
    >
      {/**fullname */}
      <AuthFormComponent
        formType={"input"}
        inputMode={"text"}
        inputIcon={
          <Octicons name="note" size={16} color={COLOR_THEME.gray200} />
        }
        label={"Legal full name"}
        placeholder={"Ex. Okoye Raymond"}
        name={"fullname"}
        form={formData}
        setForm={setFormData}
      />

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

      {/**phone number */}
      <AuthFormComponent
        formType={"input"}
        inputMode={"numeric"}
        inputIcon={
          <Octicons
            name="device-mobile"
            size={16}
            color={COLOR_THEME.gray200}
          />
        }
        label={"Phone number"}
        placeholder={"Ex. 07010000000"}
        name={"phone"}
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
        placeholder={"Enter a new password"}
        name={"password"}
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
        name={"confirmPassword"}
        form={formData}
        setForm={setFormData}
      />
    </AuthScreenWrapper>
  );
}

const styles = StyleSheet.create({});
