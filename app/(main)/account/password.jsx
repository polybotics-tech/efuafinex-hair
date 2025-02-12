import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthScreenWrapper from "../../../components/ui/AuthScreenWrapper";
import AuthFormComponent from "../../../components/AuthFormComponent";
import { Octicons } from "@expo/vector-icons";
import { COLOR_THEME } from "../../../constants/theme";
import { router } from "expo-router";
import { USER_HOOKS } from "../../../helpers/hooks/user";
import { DEBOUNCE } from "../../../helpers/utils/debounce";

export default function VerifyEmail() {
  const [formData, setFormData] = useState({
    pass: "",
    new_pass: "",
    confirm_pass: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  //handle form submission
  const submitForm = DEBOUNCE(async () => {
    const success = await USER_HOOKS.update_pass(formData, setIsLoading);

    if (success) {
      //redirect to back to account page
      router.back();
    }
  });

  return (
    <View style={styles.safeArea}>
      <AuthScreenWrapper
        buttonText={"Change"}
        buttonIsLoading={isLoading}
        formSubmitFunction={submitForm}
      >
        {/**current password */}
        <AuthFormComponent
          formType={"input"}
          inputMode={"password"}
          inputIcon={
            <Octicons name="lock" size={16} color={COLOR_THEME.gray200} />
          }
          label={"Current Password"}
          placeholder={"Enter your current password"}
          name={"pass"}
          form={formData}
          setForm={setFormData}
        />

        {/**new password */}
        <AuthFormComponent
          formType={"input"}
          inputMode={"password"}
          inputIcon={
            <Octicons name="lock" size={16} color={COLOR_THEME.gray200} />
          }
          label={"New Password"}
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
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
    padding: 16,
  },
});
