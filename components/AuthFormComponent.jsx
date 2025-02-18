import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  BORDER_RADIUS,
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
} from "../constants/theme";
import { SCREEN_DIMENSION } from "../constants/dimensions";
import { format_input_number } from "../helpers/utils/numbers";
import PopupModalWrapper from "./ui/PopupModalWrapper";
import NotFoundComponent from "./reuseables/NotFoundComponent";
import { format_date_readable } from "../helpers/utils/datetime";

const AuthFormComponent = ({ ...props }) => {
  return (
    <KeyboardAvoidingView>
      {props?.formType === "input" ? (
        <FormInput
          label={props?.label}
          placeholder={props?.placeholder}
          description={props?.description}
          optional={props?.optional}
          disabled={props?.disabled}
          value={props?.value}
          name={props?.name}
          form={props?.form}
          setForm={props?.setForm}
          mode={props?.inputMode}
          inputIcon={props?.inputIcon}
        />
      ) : props?.formType === "select" ? (
        <FormSelect
          label={props?.label}
          placeholder={props?.placeholder}
          description={props?.description}
          optional={props?.optional}
          name={props?.name}
          form={props?.form}
          setForm={props?.setForm}
          inputIcon={props?.inputIcon}
          options={props?.options}
        />
      ) : props?.formType === "textarea" ? (
        <FormTextarea
          label={props?.label}
          placeholder={props?.placeholder}
          description={props?.description}
          optional={props?.optional}
          name={props?.name}
          form={props?.form}
          setForm={props?.setForm}
        />
      ) : props?.formType === "toggle" ? (
        <FormToggle
          label={props?.label}
          placeholder={props?.placeholder}
          name={props?.name}
          form={props?.form}
          setForm={props?.setForm}
        />
      ) : props?.formType === "date" ? (
        <FormDatePicker
          label={props?.label}
          placeholder={props?.placeholder}
          description={props?.description}
          optional={props?.optional}
          name={props?.name}
          form={props?.form}
          setForm={props?.setForm}
          inputIcon={props?.inputIcon}
          minimumDate={props?.minimumDate}
          maximumDate={props?.maximumDate}
        />
      ) : (
        <></>
      )}
    </KeyboardAvoidingView>
  );
};

export default memo(AuthFormComponent);

const FormInput = ({
  label = "",
  placeholder = "Type here",
  description = "",
  optional = false,
  disabled = false,
  value = "",
  name = "",
  form = [],
  setForm = () => {},
  mode = "text",
  inputIcon = <></>,
}) => {
  const [inputMode, setInputMode] = useState(`${mode}`);

  //update form input by name
  const updateFormInput = (value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <View style={styles.formInput.inputContainer}>
      {label && (
        <Text style={styles.formInput.label}>
          {label}{" "}
          {optional && (
            <Text style={styles.formTextarea.optional}>(optional)</Text>
          )}
        </Text>
      )}

      <View style={styles.formInput.inputTab}>
        <>{inputIcon}</>

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLOR_THEME.gray100}
          style={styles.formInput.input(mode === "password")}
          value={!disabled ? `${form[name]}` : `${value}`}
          onChangeText={(text) => {
            if (!disabled) {
              updateFormInput(
                mode === "numeric" ? format_input_number(text) : text
              );
            }
          }}
          inputMode={mode}
          secureTextEntry={mode === "password" && inputMode === "password"}
          autoCapitalize="none"
          autoCorrect={false}
          cursorColor={COLOR_THEME.gray200}
          editable={!disabled}
        />

        {mode === "password" && (
          <Pressable
            onPress={() => {
              setInputMode((prev) =>
                prev === "password" ? "text" : "password"
              );
            }}
          >
            <Octicons
              name={inputMode === "password" ? "eye" : "eye-closed"}
              size={16}
              color={COLOR_THEME.gray200}
            />
          </Pressable>
        )}
      </View>

      {description && (
        <View style={styles.formInput.infoBox}>
          <View style={{ width: 12 }}>
            <Octicons name="info" size={12} color={COLOR_THEME.gray100} />
          </View>
          <Text style={styles.formInput.description}>{description}</Text>
        </View>
      )}
    </View>
  );
};

const FormTextarea = ({
  label = "",
  placeholder = "Type here",
  description = "",
  optional = false,
  name = "",
  form = [],
  setForm = () => {},
}) => {
  //update form input by name
  const updateFormInput = (value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <View style={styles.formTextarea.inputContainer}>
      {label && (
        <Text style={styles.formTextarea.label}>
          {label}{" "}
          {optional && (
            <Text style={styles.formTextarea.optional}>(optional)</Text>
          )}
        </Text>
      )}

      <View style={styles.formTextarea.inputTab}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLOR_THEME.gray100}
          style={styles.formTextarea.input}
          value={form[name]}
          onChangeText={(text) => updateFormInput(text)}
          inputMode={"text"}
          multiline={true}
          autoCapitalize="none"
          autoCorrect={false}
          cursorColor={COLOR_THEME.gray200}
        />
      </View>

      {description && (
        <View style={styles.formTextarea.infoBox}>
          <View style={{ width: 12 }}>
            <Octicons name="info" size={12} color={COLOR_THEME.gray100} />
          </View>
          <Text style={styles.formTextarea.description}>{description}</Text>
        </View>
      )}
    </View>
  );
};

const FormToggle = ({ label, placeholder, form, name, setForm }) => {
  const toggleSwitch = () => {
    setForm({ ...form, [name]: !form[name] });
  };

  return (
    <View style={styles.formToggle.toggleComponent}>
      <View style={styles.formToggle.toggleComponentHeader}>
        <Text style={styles.formToggle.toggleComponentTitle}>{label}</Text>

        {/*switch*/}
        <Switch
          trackColor={{
            false: COLOR_THEME.gray50,
            true: COLOR_THEME.primaryFaded,
          }}
          thumbColor={form[name] ? COLOR_THEME.primary : COLOR_THEME.gray200}
          ios_backgroundColor={COLOR_THEME.gray50}
          onValueChange={toggleSwitch}
          value={Boolean(form[name])}
        />
      </View>

      <Text style={styles.formToggle.toggleComponentDescription}>
        {placeholder}
      </Text>
    </View>
  );
};

const FormSelect = ({
  label = "",
  placeholder = "Type here",
  description = "",
  optional = false,
  name = "",
  form = [],
  setForm = () => {},
  inputIcon = <></>,
  options = [],
}) => {
  //update form input by name
  const updateFormInput = (value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  //handle drop down popup
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/**Selector */}
      <View style={styles.formInput.inputContainer}>
        {label && (
          <Text style={styles.formInput.label}>
            {label}{" "}
            {optional && (
              <Text style={styles.formTextarea.optional}>(optional)</Text>
            )}
          </Text>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.formInput.inputTab}
          onPress={() => setModalVisible((prev) => !prev)}
        >
          <>{inputIcon}</>

          {!form[name] ? (
            <Text style={styles.formSelect.placeholder}>{placeholder}</Text>
          ) : (
            <Text style={styles.formSelect.value}>{form[name]}</Text>
          )}

          {/**chevron icon */}
          <View style={styles.formSelect.dropDownIcon}>
            <Octicons
              name={"chevron-down"}
              size={16}
              color={COLOR_THEME.gray200}
            />
          </View>
        </TouchableOpacity>

        {description && (
          <View style={styles.formInput.infoBox}>
            <View style={{ width: 12 }}>
              <Octicons name="info" size={12} color={COLOR_THEME.gray100} />
            </View>
            <Text style={styles.formInput.description}>{description}</Text>
          </View>
        )}
      </View>

      {/**dropdown modal */}
      <PopupModalWrapper
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        title={"Select Duration"}
      >
        {options.length > 0 ? (
          options?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.formSelect.optionTab}
              onPress={() => {
                updateFormInput(item);
                setModalVisible(false);
              }}
            >
              <Text style={styles.formSelect.optionText}>{item}</Text>

              {item === form[name] && (
                <Octicons name="check" size={16} color={COLOR_THEME.primary} />
              )}
            </TouchableOpacity>
          ))
        ) : (
          <NotFoundComponent text={"No durations found"} />
        )}
      </PopupModalWrapper>
    </>
  );
};

const FormDatePicker = ({
  label = "",
  placeholder = "Type here",
  description = "",
  optional = false,
  name = "",
  form = [],
  setForm = () => {},
  inputIcon = <></>,
  minimumDate = new Date("1900-01-01"),
  maximumDate = new Date("2090-12-30"),
}) => {
  //update form input by name
  const updateFormInput = (value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  //date picker handle
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };
  const onChange = (selectedDate) => {
    hideModal();
    updateFormInput(selectedDate);
  };
  /////

  return (
    <>
      {/**Selector */}
      <View style={styles.formInput.inputContainer}>
        {label && (
          <Text style={styles.formInput.label}>
            {label}{" "}
            {optional && (
              <Text style={styles.formTextarea.optional}>(optional)</Text>
            )}
          </Text>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.formInput.inputTab}
          onPress={() => showModal()}
        >
          <>{inputIcon}</>

          {!form[name] ? (
            <Text style={styles.formSelect.placeholder}>{placeholder}</Text>
          ) : (
            <Text style={styles.formSelect.value}>
              {format_date_readable(form[name])}
            </Text>
          )}

          {/**chevron icon */}
          <View style={styles.formSelect.dropDownIcon}>
            <Octicons
              name={"chevron-down"}
              size={16}
              color={COLOR_THEME.gray200}
            />
          </View>
        </TouchableOpacity>

        {description && (
          <View style={styles.formInput.infoBox}>
            <View style={{ width: 12 }}>
              <Octicons name="info" size={12} color={COLOR_THEME.gray100} />
            </View>
            <Text style={styles.formInput.description}>{description}</Text>
          </View>
        )}
      </View>

      {/**datetime picker modal */}
      {show && form[name] && (
        <DateTimePickerModal
          isVisible={show}
          mode="date"
          date={form[name]}
          onConfirm={onChange}
          onCancel={hideModal}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          buttonTextColorIOS={COLOR_THEME.primary}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  formInput: {
    inputContainer: {
      width: "100%",
      gap: 4,
      paddingVertical: 4,
    },
    label: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME.gray200,
    },
    optional: {
      fontSize: FONT_SIZE.xs,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME.gray100,
    },
    inputTab: {
      width: "100%",
      height: 48,
      paddingHorizontal: 16,
      borderRadius: BORDER_RADIUS.s,
      backgroundColor: COLOR_THEME.gray50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    input: (isPassword = false) => ({
      width: isPassword
        ? SCREEN_DIMENSION.subtractWidth(8 + 8, 32 + 32, 16 + 16)
        : SCREEN_DIMENSION.subtractWidth(8, 32 + 32, 16),
      padding: 0,
      color: COLOR_THEME.gray200,
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.regular,
    }),
    infoBox: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingTop: 2,
    },
    description: {
      fontSize: FONT_SIZE.xs,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME.gray100,
      maxWidth: SCREEN_DIMENSION.subtractWidth(4, 32, 12),
    },
  },
  formTextarea: {
    inputContainer: {
      width: "100%",
      gap: 4,
      paddingVertical: 4,
    },
    label: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME.gray200,
    },
    optional: {
      fontSize: FONT_SIZE.xs,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME.gray100,
    },
    inputTab: {
      width: "100%",
      height: SCREEN_DIMENSION.heightRatio(1 / 4),
      padding: 16,
      borderRadius: BORDER_RADIUS.s,
      backgroundColor: COLOR_THEME.gray50,
    },
    input: {
      width: SCREEN_DIMENSION.subtractWidth(8, 32 + 32, 16),
      height: "100%",
      padding: 0,
      color: COLOR_THEME.gray200,
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.regular,
      textAlignVertical: "top",
    },
    infoBox: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingTop: 2,
    },
    description: {
      fontSize: FONT_SIZE.xs,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME.gray100,
      maxWidth: SCREEN_DIMENSION.subtractWidth(4, 32, 12),
    },
  },
  formToggle: {
    toggleComponent: {
      width: "100%",
      padding: 16,
      borderRadius: BORDER_RADIUS.s,
      backgroundColor: COLOR_THEME.white,
      borderWidth: 1.3,
      borderColor: COLOR_THEME.gray50,
      gap: 16,
    },
    toggleComponentHeader: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    toggleComponentTitle: {
      fontSize: FONT_SIZE.b,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME.gray200,
    },
    toggleComponentDescription: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME.gray100,
    },
  },
  formSelect: {
    inputContainer: {
      width: "100%",
      gap: 4,
      paddingVertical: 4,
    },
    label: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME.gray200,
    },
    optional: {
      fontSize: FONT_SIZE.xs,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME.gray100,
    },
    inputTab: {
      width: "100%",
      height: 48,
      paddingHorizontal: 16,
      borderRadius: BORDER_RADIUS.s,
      backgroundColor: COLOR_THEME.gray50,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    placeholder: {
      width: SCREEN_DIMENSION.subtractWidth(8 + 8, 32 + 32, 16 + 16),
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME.gray100,
    },
    value: {
      width: SCREEN_DIMENSION.subtractWidth(8 + 8, 32 + 32, 16 + 16),
      color: COLOR_THEME.gray200,
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.regular,
    },
    dropDownIcon: {
      width: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    infoBox: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingTop: 2,
    },
    description: {
      fontSize: FONT_SIZE.xs,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME.gray100,
      maxWidth: SCREEN_DIMENSION.subtractWidth(4, 32, 12),
    },
    optionTab: {
      width: "100%",
      paddingBottom: 32,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
    },
    optionText: {
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME.gray200,
      textTransform: "uppercase",
    },
  },
});
