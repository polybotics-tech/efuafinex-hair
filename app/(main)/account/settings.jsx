import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLOR_THEME } from "../../../constants";
import ThumbnailPicker from "../../../components/reuseables/ThumbnailPicker";
import { USER_HOOKS } from "../../../helpers/hooks/user";
import AuthScreenWrapper from "../../../components/ui/AuthScreenWrapper";
import AuthFormComponent from "../../../components/AuthFormComponent";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { router } from "expo-router";

export default function AccountSettings() {
  const theme = useSelector((state) => state.app.theme);

  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    fullname: user?.fullname,
    phone: user?.phone,
  });
  const [isLoading, setIsLoading] = useState(false);

  //handle form submission
  const submitForm = async () => {
    const success = await USER_HOOKS.update_account(formData, setIsLoading);

    if (success) {
      //redirect to back to account page
      router.back();
    }
  };

  return (
    <View style={styles(theme).page}>
      {/**thumbnail picker */}
      <View style={styles(theme).thumbnailCont}>
        <ThumbnailPicker />
      </View>

      {/**update account details */}
      <>
        <AuthScreenWrapper
          buttonText={"Update Account Details"}
          buttonIsLoading={isLoading}
          formSubmitFunction={submitForm}
        >
          {/**email */}
          {user && (
            <AuthFormComponent
              formType={"input"}
              inputMode={"email"}
              inputIcon={
                <Octicons
                  name="mail"
                  size={16}
                  color={COLOR_THEME[theme].gray200}
                />
              }
              label={"Email Address"}
              placeholder={"Ex. johnsdoe@example.com"}
              disabled={true}
              value={user?.email}
            />
          )}

          {/**fullname */}
          <AuthFormComponent
            formType={"input"}
            inputMode={"text"}
            inputIcon={
              <Octicons
                name="note"
                size={16}
                color={COLOR_THEME[theme].gray200}
              />
            }
            label={"Legal full name"}
            placeholder={"Ex. Okoye Raymond"}
            name={"fullname"}
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
                color={COLOR_THEME[theme].gray200}
              />
            }
            label={"Phone number"}
            placeholder={"Ex. 07010000000"}
            name={"phone"}
            form={formData}
            setForm={setFormData}
          />
        </AuthScreenWrapper>
      </>
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    page: {
      width: "100%",
      minHeight: "100%",
      padding: 16,
      gap: 16,
      backgroundColor: COLOR_THEME[theme].white,
    },
    thumbnailCont: {
      width: "100%",
      alignItems: "center",
      paddingBottom: 32,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_THEME[theme].gray50,
    },
  });
