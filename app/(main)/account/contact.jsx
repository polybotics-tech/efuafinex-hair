import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useState } from "react";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../../constants";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { DEMO_FAQs } from "../../../helpers/json";
import NotFoundComponent from "../../../components/reuseables/NotFoundComponent";

export default function ContactUs() {
  return (
    <View style={styles.page}>
      {/**helper block */}
      <HelperBlock />

      {/**faqs block */}
      <FaqsBlock />
    </View>
  );
}

const HelperBlock = () => {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>How May We Help You?</Text>

      <Text style={styles.blockDesc}>
        We are here to assist you with any inquiries or concerns. Please select
        from the available contact options below to reach our support team. We
        look forward to assisting you promptly.
      </Text>

      {/**contact options */}
      <View style={styles.optionsList}>
        <SocialTab name={"email"} />
        <SocialTab name={"instagram"} />
        <SocialTab name={"whatsapp"} />
      </View>
    </View>
  );
};

const FaqsBlock = () => {
  const faqs = DEMO_FAQs;

  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>Frequently Asked Questions (FAQs)</Text>

      <Text style={styles.blockDesc}>
        Here are answers to common enquiries about our services, policies, and
        features. Browse through the questions below to quickly find the
        information you need. However, if you require further assistance, feel
        free to contact us directly.
      </Text>

      {/**faqs list */}
      <View style={styles.faqsList}>
        {!faqs ? (
          <NotFoundComponent text={"Unable to load FAQs"} />
        ) : (
          faqs?.map((item, index) => <FaqsTab key={index} faq={item} />)
        )}
      </View>
    </View>
  );
};

const SocialTab = ({ name }) => {
  const icon = {
    email: "mail-outline",
    whatsapp: "logo-whatsapp",
    instagram: "logo-instagram",
  };
  return (
    <TouchableOpacity style={styles.socialBtn}>
      <View style={styles.socialIcon}>
        <Ionicons name={icon[name]} size={18} color={COLOR_THEME.gray100} />
      </View>
      <Text style={styles.socialName}>{String(name)?.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const FaqsTab = memo(({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <TouchableOpacity style={styles.faqTab} onPress={toggle}>
      {/**top bar */}
      <View style={styles.faqTop}>
        <Text style={styles.faqQuestion}>
          {String(faq?.question)?.toUpperCase()}
        </Text>
        <Octicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={FONT_SIZE.s}
          color={COLOR_THEME.gray200}
        />
      </View>

      {/**bottom bar */}
      {isOpen && (
        <View style={styles.faqBottom}>
          <Text style={styles.faqAnswer}>{String(faq?.answer)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  page: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: COLOR_THEME.white,
    alignItems: "center",
    gap: 64,
    padding: 16,
  },
  block: {
    width: "100%",
    gap: 16,
  },
  blockTitle: {
    fontSize: FONT_SIZE.b,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
  },
  blockDesc: {
    fontSize: FONT_SIZE.m,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
  },
  optionsList: {
    width: "100%",
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  socialBtn: {
    width: 92,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR_THEME.gray50,
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLOR_THEME.gray50,
    alignItems: "center",
    justifyContent: "center",
  },
  socialName: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.gray100,
  },
  faqsList: {
    paddingVertical: 16,
    width: "100%",
    gap: 4,
  },
  faqTab: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLOR_THEME.gray50,
  },
  faqTop: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  faqQuestion: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.gray200,
  },
  faqBottom: {
    width: "100%",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLOR_THEME.gray50,
  },
  faqAnswer: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray100,
  },
});
