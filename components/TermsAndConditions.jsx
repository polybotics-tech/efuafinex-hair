import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../constants";

const TermsAndConditions = () => {
  const theme = useSelector((s) => s.app.theme);

  return (
    <View style={styles(theme).component}>
      <SectionComp>
        <HeadComp>1. Payment Policy</HeadComp>
        <BodyComp>
          {`- All payments made on this platform are strictly for the collection of hair. No other items or services will be provided in exchange for payment. \n\n- Payments are non-refundable under any circumstances, except as specified in Section 3 (Refund Policy).`}
        </BodyComp>
      </SectionComp>

      <SectionComp>
        <HeadComp>
          2. Price Adjustments Due to Exchange Rate Fluctuations
        </HeadComp>
        <BodyComp>
          {`- If you select a hair and the price increases due to fluctuations in the exchange rate (USD), you will be required to pay the additional cost to complete your purchase.\n\n- There will be no refunds for payments already made due to price changes.
`}
        </BodyComp>
      </SectionComp>

      <SectionComp>
        <HeadComp>3. Refund Policy</HeadComp>
        <BodyComp>
          {`- Refunds are only applicable if your payment remains unused for more than two years from the date of package creation. \n\n- In such cases, a 30% deduction will be applied to the total refund amount. \n\n- Refunds will be processed instantly once the two-year period has elapsed.
`}
        </BodyComp>
      </SectionComp>

      <SectionComp>
        <HeadComp>4. Agreement</HeadComp>
        <BodyComp>
          {`- By proceeding with payment, you acknowledge that you have read, understood, and agreed to these terms and conditions. \n\n- These terms represent the entire agreement between you and our company regarding your use of this platform.`}
        </BodyComp>
      </SectionComp>
    </View>
  );
};

export default memo(TermsAndConditions);

const HeadComp = ({ children }) => {
  const theme = useSelector((s) => s.app.theme);

  return <Text style={styles(theme).heading}>{children}</Text>;
};

const BodyComp = ({ children }) => {
  const theme = useSelector((s) => s.app.theme);

  return <Text style={styles(theme).body}>{children}</Text>;
};

const SectionComp = ({ children }) => {
  const theme = useSelector((s) => s.app.theme);

  return <View style={styles(theme).section}>{children}</View>;
};

const styles = (theme) =>
  StyleSheet.create({
    component: {
      width: "100%",
      gap: 24,
    },
    section: {
      width: "100%",
      gap: 8,
    },
    heading: {
      width: "100%",
      fontSize: FONT_SIZE.b,
      fontWeight: FONT_WEIGHT.semibold,
      color: COLOR_THEME[theme].gray200,
      textTransform: "capitalize",
    },
    body: {
      fontSize: FONT_SIZE.m,
      fontWeight: FONT_WEIGHT.regular,
      color: COLOR_THEME[theme].gray100,
    },
  });
