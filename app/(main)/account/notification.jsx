import { StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../../constants/theme";
import AuthFormComponent from "../../../components/AuthFormComponent";

export default function NotificationSettings() {
  const [formData, setFormData] = React.useState({
    emailNotification: false,
    pushNotification: false,
  });

  return (
    <View style={styles.page}>
      {/*email notification*/}
      <AuthFormComponent
        formType={"toggle"}
        label={"Email Notification"}
        placeholder={
          "Recieve information on all activities related to your account via email"
        }
        name={"emailNotification"}
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
        name={"pushNotification"}
        form={formData}
        setForm={setFormData}
      />
    </View>
  );
}

const NoticeSettingComponent = ({
  title,
  description,
  form,
  name,
  setForm,
}) => {
  const toggleSwitch = () => {
    setForm({ ...form, [name]: !form[name] });
  };

  return (
    <View style={styles.noticeComponent}>
      <View style={styles.noticeComponentHeader}>
        <Text style={styles.noticeComponentTitle}>{title}</Text>

        {/*switch*/}
        <Switch
          trackColor={{
            false: COLOR_THEME.gray50,
            true: COLOR_THEME.primaryFaded,
          }}
          thumbColor={form[name] ? COLOR_THEME.primary : COLOR_THEME.gray200}
          ios_backgroundColor={COLOR_THEME.gray50}
          onValueChange={toggleSwitch}
          value={form[name]}
        />
      </View>

      <Text style={styles.noticeComponentDescription}>{description}</Text>
    </View>
  );
};

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
});
