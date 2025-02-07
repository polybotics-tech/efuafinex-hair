import { StyleSheet, Switch, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../../constants/theme";
import AuthFormComponent from "../../../components/AuthFormComponent";
import { useSelector } from "react-redux";
import PrimaryButton from "../../../components/reuseables/PrimaryButton";

export default function NotificationSettings() {
  //fetch user
  const user = useSelector((state) => state.user.user);
  const [isUnchanged, setIsUnchanged] = useState(true);

  const [formData, setFormData] = useState({
    email_notify: false,
    push_notify: false,
  });

  //update form from global state
  useMemo(() => {
    if (user) {
      const { email_notify, push_notify } = user;

      setFormData({
        email_notify,
        push_notify,
      });
    }
  }, [user]);

  return (
    <View style={styles.page}>
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
      <View style={styles.btnCont}>
        <PrimaryButton title={"Save changes"} disabled={isUnchanged} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: "100%",
    padding: 16,
    gap: 16,
  },
  noticeComponent: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLOR_THEME.white,
    gap: 16,
  },
  noticeComponentHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noticeComponentTitle: {
    fontSize: FONT_SIZE.b,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
  },
  noticeComponentDescription: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
  },
  btnCont: {
    width: "100%",
    paddingTop: 32,
  },
});
