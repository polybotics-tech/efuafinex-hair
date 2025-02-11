import React from "react";
import { router, Slot, usePathname } from "expo-router";
import ScrollViewWrapper from "../../../components/ui/ScrollViewWrapper";
import DefaultHeaderComponent from "../../../components/DefaultHeaderComponent";
import SafeAreaWrapper from "../../../components/ui/safeAreaWrapper";

export default function AccountLayout() {
  const path = usePathname();

  const refreshPage = () => {
    router.replace(path);
  };

  return (
    <SafeAreaWrapper>
      <DefaultHeaderComponent directory={"account"} />

      <ScrollViewWrapper refreshFunc={() => refreshPage()}>
        {/*stack*/}
        <Slot />
      </ScrollViewWrapper>
    </SafeAreaWrapper>
  );
}
