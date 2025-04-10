import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { Ionicons, Octicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../../constants";
import { DEMO_FAQs } from "../../../helpers/json";
import NotFoundComponent from "../../../components/reuseables/NotFoundComponent";
import { FAQS_HOOKS } from "../../../helpers/hooks/faqs";
import SeeMoreBtn from "../../../components/reuseables/SeeMoreBtn";
import { useSelector } from "react-redux";

export default function ContactUs() {
  const theme = useSelector((state) => state.app.theme);

  return (
    <View style={styles(theme).page}>
      {/**helper block */}
      <HelperBlock theme={theme} />

      {/**faqs block */}
      <FaqsBlock theme={theme} />
    </View>
  );
}

const HelperBlock = ({ theme }) => {
  const [formData, setFormData] = useState({
    email: "",
    instagram: "",
    whatsapp: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  //handle fetching existing contact info
  const fetch_contact_info = async () => {
    const res = await FAQS_HOOKS.fetch_contact_info(setIsLoading);

    if (res) {
      const { email, instagram, whatsapp } = res;

      setFormData((prev) => ({ ...prev, email, instagram, whatsapp }));
    }
  };

  useEffect(() => {
    fetch_contact_info();
  }, []);

  return (
    <View style={styles(theme).block}>
      <Text style={styles(theme).blockTitle}>How May We Help You?</Text>

      <Text style={styles(theme).blockDesc}>
        We are here to assist you with any inquiries or concerns. Please select
        from the available contact options below to reach our support team. We
        look forward to assisting you promptly.
      </Text>

      {/**contact options */}
      <View style={styles(theme).optionsList}>
        {isLoading ||
        Boolean(
          formData?.email === "" &&
            formData?.instagram === "" &&
            formData?.whatsapp === ""
        ) ? (
          <NotFoundComponent
            text={"Unable to load contact options"}
            isLoading={isLoading}
          />
        ) : (
          <>
            {Boolean(formData?.email != "") && (
              <SocialTab name={"email"} theme={theme} data={formData?.email} />
            )}
            {Boolean(formData?.whatsapp != "") && (
              <SocialTab
                name={"whatsapp"}
                theme={theme}
                data={formData?.whatsapp}
              />
            )}
            {Boolean(formData?.instagram != "") && (
              <SocialTab
                name={"instagram"}
                theme={theme}
                data={formData?.instagram}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
};

const FaqsBlock = ({ theme }) => {
  const [faqs, setFaqs] = useState();
  const [meta, setMeta] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchFaqs = async (page) => {
    //send request
    const result = await FAQS_HOOKS.fetch_faqs(setIsLoading, page);

    if (result) {
      setMeta(result?.meta);

      if (page > 1 && result?.faqs) {
        setFaqs((prev) => [...prev, ...result?.faqs]);
      } else {
        setFaqs(result?.faqs);
      }
    }
  };

  useEffect(() => {
    fetchFaqs(1);
  }, []);

  const seeMore = () => {
    fetchFaqs(Number(meta?.page + 1));
  };

  return (
    <View style={styles(theme).block}>
      <Text style={styles(theme).blockTitle}>
        Frequently Asked Questions (FAQs)
      </Text>

      <Text style={styles(theme).blockDesc}>
        Here are answers to common enquiries about our services, policies, and
        features. Browse through the questions below to quickly find the
        information you need. However, if you require further assistance, feel
        free to contact us directly.
      </Text>

      {/**faqs list */}
      <View style={styles(theme).faqsList}>
        {faqs && faqs?.length > 0 ? (
          faqs?.map((item, index) => (
            <FaqsTab key={index} faq={item} theme={theme} />
          ))
        ) : (
          <NotFoundComponent
            text={"Unable to load FAQs"}
            isLoading={isLoading}
          />
        )}
      </View>

      {/**see more button logic */}
      {faqs?.length > 0 && meta?.has_next_page && (
        <SeeMoreBtn onPress={() => seeMore()} isLoading={isLoading} />
      )}
    </View>
  );
};

const SocialTab = ({ name, theme, data = "" }) => {
  const icon = {
    email: "mail-outline",
    whatsapp: "logo-whatsapp",
    instagram: "logo-instagram",
  };

  const _openUrl = async () => {
    if (!data) {
      return;
    }

    if (name === "email") {
      await Linking.openURL(`mailto:${data}`);
    } else if (name === "whatsapp") {
      await Linking.openURL(`https://wa.me/${data}`);
    } else {
      await Linking.openURL(`${data}`);
    }
  };

  return (
    <TouchableOpacity style={styles(theme).socialBtn} onPress={_openUrl}>
      <View style={styles(theme).socialIcon}>
        <Ionicons
          name={icon[name]}
          size={18}
          color={COLOR_THEME[theme].gray100}
        />
      </View>
      <Text style={styles(theme).socialName}>
        {String(name)?.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

const FaqsTab = memo(({ faq, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <TouchableOpacity style={styles(theme).faqTab} onPress={toggle}>
      {/**top bar */}
      <View style={styles(theme).faqTop}>
        <Text style={styles(theme).faqQuestion}>
          {String(faq?.question)?.toUpperCase()}
        </Text>
        <Octicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={FONT_SIZE.s}
          color={COLOR_THEME[theme].gray200}
        />
      </View>

      {/**bottom bar */}
      {isOpen && (
        <View style={styles(theme).faqBottom}>
          <Text style={styles(theme).faqAnswer}>{String(faq?.answer)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
});

const styles = (theme) =>
  StyleSheet.create({
    page: {
      width: "100%",
      minHeight: "100%",
      backgroundColor: COLOR_THEME[theme].white,
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
      color: COLOR_THEME[theme].black,
    },
    blockDesc: {
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray200,
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
      borderColor: COLOR_THEME[theme].gray50,
    },
    socialIcon: {
      width: 48,
      height: 48,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: COLOR_THEME[theme].gray50,
      alignItems: "center",
      justifyContent: "center",
    },
    socialName: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].gray100,
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
      borderColor: COLOR_THEME[theme].gray50,
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
      color: COLOR_THEME[theme].gray200,
    },
    faqBottom: {
      width: "100%",
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: COLOR_THEME[theme].gray50,
    },
    faqAnswer: {
      fontSize: FONT_SIZE.s,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray100,
    },
  });
