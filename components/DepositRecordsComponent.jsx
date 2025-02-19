import { StyleSheet, Text, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
import DepositRecord from "./reuseables/DepositRecord";
import NotFoundComponent from "./reuseables/NotFoundComponent";
import SeeMoreBtn from "./reuseables/SeeMoreBtn";
import { DEPOSIT_HOOKS } from "../helpers/hooks/deposit";
import { DEBOUNCE } from "../helpers/utils/debounce";
import { useSelector } from "react-redux";

const DepositRecordsComponent = ({ filter }) => {
  const theme = useSelector((state) => state.app.theme);

  const [deposits, setDeposits] = useState();
  const [meta, setMeta] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchDeposits = async (page, sort) => {
    //send request
    const result = await DEPOSIT_HOOKS.fetch_user_deposits(
      setIsLoading,
      page,
      sort
    );

    if (result) {
      setMeta(result?.meta);

      if (page > 1 && result?.deposits) {
        setDeposits((prev) => [...prev, ...result?.deposits]);
      } else {
        setDeposits(result?.deposits);
      }
    }
  };

  useEffect(() => {
    fetchDeposits(1, filter);
  }, [filter]);

  const seeMore = DEBOUNCE(() => {
    fetchDeposits(Number(meta?.page + 1));
  });

  return (
    <View style={styles(theme).component}>
      {deposits?.length > 0 ? (
        deposits?.map((item, index) => (
          <DepositRecord key={index} data={item} />
        ))
      ) : (
        <NotFoundComponent
          text={
            filter === "all"
              ? "No deposits recorded"
              : `No ${filter} deposits recorded`
          }
          isLoading={isLoading}
        />
      )}

      {/**see more button logic */}
      {deposits?.length > 0 && meta?.has_next_page && (
        <SeeMoreBtn onPress={() => seeMore()} isLoading={isLoading} />
      )}
    </View>
  );
};

export default memo(DepositRecordsComponent);

const styles = (theme) =>
  StyleSheet.create({
    component: {
      width: "100%",
      padding: 16,
      gap: 16,
    },
  });
