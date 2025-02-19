import { StyleSheet, Switch, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../../constants/theme";
import AuthFormComponent from "../../../components/AuthFormComponent";
import { useSelector } from "react-redux";
import PrimaryButton from "../../../components/reuseables/PrimaryButton";
import { USER_HOOKS } from "../../../helpers/hooks/user";

export default function NotificationSettings() {
  const theme = useSelector((state) => state.app.theme);

  //fetch user
  const user = useSelector((state) => state.user.user);
  const [changed, setIschanged] = useState(false);

  const [formData, setFormData] = useState({
    email_notify: Boolean(user?.email_notify),
    push_notify: Boolean(user?.push_notify),
  });

  //update form from global state
  useMemo(() => {
    if (formData) {
      const { email_notify, push_notify } = user;

      //check if there is change
      if (
        formData?.email_notify != email_notify ||
        formData?.push_notify != push_notify
      ) {
        setIschanged(true);
      } else {
        setIschanged(false);
      }
    }
  }, [formData]);

  const [isLoading, setIsLoading] = useState(false);

  //handle form submission
  const submitForm = async () => {
    const success = await USER_HOOKS.update_notify(formData, setIsLoading);

    if (success) {
      //redirect to back to account page
      router.back();
    }
  };

  return (
    <View style={styles(theme).page}>
      {/*email notification*/}
      <AuthFormComponent
        formType={"toggle"}
        label={"Email Notification"}
        placeholder={
          "Recieve information on all activities related to your account via email"
        }
        name={"email_notify"}
        form={formData}
        setForm={setFormData}
      />

      {/*push notification*/}
      <AuthFormComponent
        formType={"toggle"}
        label={"Push Notification"}
        placeholder={
          "Recieve information on in-app activities related to your account right on your device"
        }
        name={"push_notify"}
        form={formData}
        setForm={setFormData}
      />

      {/**save button */}
      <View style={styles(theme).btnCont}>
        <PrimaryButton
          title={"Save changes"}
          disabled={!changed}
          isLoading={isLoading}
          onPress={() => submitForm()}
        />
      </View>
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
      backgroundColor: COLOR_THEME[theme].gray50,
    },
    btnCont: {
      width: "100%",
      paddingTop: 32,
    },
  });
