import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import AuthScreenWrapper from "../../../components/ui/AuthScreenWrapper";
import AuthFormComponent from "../../../components/AuthFormComponent";
import { COLOR_THEME, NAIRA_CURRENCY } from "../../../constants";
import { PACKAGE_DURATION_OPTIONS } from "../../../helpers/json";
import { return_future_year_for_date_picker } from "../../../helpers/utils/datetime";
import SafeAreaWrapper from "../../../components/ui/safeAreaWrapper";
import DefaultHeaderComponent from "../../../components/DefaultHeaderComponent";
import ScrollViewWrapper from "../../../components/ui/ScrollViewWrapper";
import PhotoPicker from "../../../components/reuseables/PhotoPicker";
import { PACKAGE_HOOKS } from "../../../helpers/hooks/package";

export default function CreatePackage() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_defined: true,
    target_amount: 0,
    auto_complete: false,
    fixed_deadline: false,
    duration: "",
    deadline: new Date(),
    has_photo: false,
    photo: {},
  });

  //check if package type passed as params
  const { type } = useLocalSearchParams();
  useEffect(() => {
    if (type && type === "free") {
      setFormData((prev) => ({ ...prev, is_defined: false, has_photo: false }));
    }
  }, [type]);

  //listen for change in has_photo toggle to clear photo
  useMemo(() => {
    setFormData((prev) => ({ ...prev, photo: {} }));

    if (!formData?.is_defined) {
      setFormData((prev) => ({ ...prev, has_photo: false }));
    }
  }, [formData?.has_photo, formData?.is_defined]);

  const submitForm = async () => {
    let res = await PACKAGE_HOOKS.create_new_package(formData, setIsLoading);

    //redirect to home page
    if (res) {
      if (router.canDismiss()) {
        router.dismissAll();
      }
      router.replace("/(tabs)/");
    }
  };

  return (
    <SafeAreaWrapper>
      <DefaultHeaderComponent directory={"package"} />

      <ScrollViewWrapper style={styles.page}>
        <AuthScreenWrapper
          buttonText={"Create package"}
          buttonIsLoading={isLoading}
          formSubmitFunction={submitForm}
        >
          {/**title */}
          <AuthFormComponent
            formType={"input"}
            inputIcon={
              <Octicons name="log" size={16} color={COLOR_THEME.gray200} />
            }
            label={"Package Title"}
            placeholder={"Ex. Hair for valentine"}
            description={
              "Keep it concise and clear to make it easy to indentify"
            }
            name={"title"}
            form={formData}
            setForm={setFormData}
          />

          {/**description */}
          <AuthFormComponent
            formType={"textarea"}
            label={"Description"}
            placeholder={
              "Write a short description of what you're creating this package for"
            }
            description={
              "Make it clear and concise to accurately describe the package's goal."
            }
            optional={true}
            name={"description"}
            form={formData}
            setForm={setFormData}
          />

          {/**package type */}
          <AuthFormComponent
            formType={"toggle"}
            label={"Set Fixed Amount"}
            placeholder={
              "Enable this option to work with a fixed, agreed-upon amount. Otherwise, disable option to work with a free-flow plan"
            }
            name={"is_defined"}
            form={formData}
            setForm={setFormData}
          />

          {formData?.is_defined && (
            <>
              {/**target amount */}
              <AuthFormComponent
                formType={"input"}
                inputIcon={
                  <Octicons
                    name="credit-card"
                    size={16}
                    color={COLOR_THEME.gray200}
                  />
                }
                inputMode={"numeric"}
                label={"Target Goal"}
                placeholder={"Ex. 15000"}
                description={`A fixed amount you want to set as a goal. Minimum of ${NAIRA_CURRENCY}1,000`}
                name={"target_amount"}
                form={formData}
                setForm={setFormData}
              />

              {/**mark auto complete */}
              {formData?.target_amount != "" &&
                formData?.target_amount >= 1000 && (
                  <AuthFormComponent
                    formType={"toggle"}
                    label={"Auto-Complete on Goal"}
                    placeholder={
                      "Automatically update package status to completed when set goal is reached"
                    }
                    name={"auto_complete"}
                    form={formData}
                    setForm={setFormData}
                  />
                )}
            </>
          )}

          {/**deadline type */}
          <AuthFormComponent
            formType={"toggle"}
            label={"Set Fixed Deadline"}
            placeholder={
              "Enable this option to work with a fixed selected date as a deadline. Otherwise, disable option to work with preset monthly plans"
            }
            name={"fixed_deadline"}
            form={formData}
            setForm={setFormData}
          />

          {/**dynamically set kind of duration/deadline */}
          {formData?.fixed_deadline ? (
            <AuthFormComponent
              formType={"date"}
              label={"Deadline"}
              placeholder={"Select deadline"}
              description={"When would you like this package to be closed?"}
              inputIcon={
                <Octicons
                  name="calendar"
                  size={16}
                  color={COLOR_THEME.gray200}
                />
              }
              name={"deadline"}
              form={formData}
              setForm={setFormData}
              minimumDate={new Date()}
              maximumDate={return_future_year_for_date_picker(2)}
            />
          ) : (
            <AuthFormComponent
              formType={"select"}
              label={"Duration"}
              placeholder={"Select duration"}
              description={
                "How long would you like this package plan to run for?"
              }
              optional={true}
              inputIcon={
                <Octicons
                  name="stopwatch"
                  size={16}
                  color={COLOR_THEME.gray200}
                />
              }
              name={"duration"}
              options={PACKAGE_DURATION_OPTIONS}
              form={formData}
              setForm={setFormData}
            />
          )}

          {/**screeshot photo */}
          {formData?.is_defined && (
            <AuthFormComponent
              formType={"toggle"}
              label={"Add Screenshot Photo"}
              placeholder={
                "Upload a photo reference of what made you create this package. For instance, a screenshot of a product, etc."
              }
              name={"has_photo"}
              form={formData}
              setForm={setFormData}
            />
          )}

          {formData?.has_photo && (
            <PhotoPicker name={"photo"} form={formData} setForm={setFormData} />
          )}
        </AuthScreenWrapper>
      </ScrollViewWrapper>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  page: {
    width: "100%",
    minHeight: "100%",
    padding: 16,
    backgroundColor: COLOR_THEME.white,
  },
});
