import React from "react";
import { Slot } from "expo-router";
import ScrollViewWrapper from "../../../components/ui/ScrollViewWrapper";
import DefaultHeaderComponent from "../../../components/DefaultHeaderComponent";
import SafeAreaWrapper from "../../../components/ui/safeAreaWrapper";

export default function AccountLayout() {
  return (
    <SafeAreaWrapper>
      <DefaultHeaderComponent directory={"account"} />

      <ScrollViewWrapper>
        {/*stack*/}
        <Slot />
      </ScrollViewWrapper>
    </SafeAreaWrapper>
  );
}
