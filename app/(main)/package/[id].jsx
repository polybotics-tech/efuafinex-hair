import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaWrapper from "../../../components/ui/safeAreaWrapper";
import ScrollViewWrapper from "../../../components/ui/ScrollViewWrapper";
import DefaultHeaderComponent from "../../../components/DefaultHeaderComponent";
import { router, useLocalSearchParams } from "expo-router";
import {
  fetch_package_data,
  PACKAGE_HOOKS,
} from "../../../helpers/hooks/package";
import PackageCard from "../../../components/reuseables/PackageCard";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  NAIRA_CURRENCY,
  SCREEN_DIMENSION,
} from "../../../constants";
import NotFoundComponent from "../../../components/reuseables/NotFoundComponent";
import ProgressBarComponent from "../../../components/reuseables/ProgressBarComponent";
import { format_number } from "../../../helpers/utils/numbers";
import PrimaryButton from "../../../components/reuseables/PrimaryButton";
import { Octicons } from "@expo/vector-icons";
import { DEPOSIT_HOOKS } from "../../../helpers/hooks/deposit";
import DepositRecord from "../../../components/reuseables/DepositRecord";
import SeeMoreBtn from "../../../components/reuseables/SeeMoreBtn";
import PopupModalWrapper from "../../../components/ui/PopupModalWrapper";
import ImageComponent from "../../../components/reuseables/ImageComponent";
import { IMAGE_LOADER } from "../../../helpers/utils/image-loader";
import { BORDER_RADIUS } from "../../../constants/theme";

export default function Package() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  //fetch package details
  const fetchPackage = async (id) => {
    const result = await PACKAGE_HOOKS.fetch_single_package(setIsLoading, id);

    if (result) {
      setData(result);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPackage(id);
    }
  }, [id]);

  return (
    <SafeAreaWrapper>
      <DefaultHeaderComponent directory={"package"} />

      <ScrollViewWrapper
        style={styles.page}
        refreshFunc={() => {
          setData();
          fetchPackage(id);
        }}
      >
        {/**package details */}
        {!data ? (
          <NotFoundComponent text={"Package not found"} isLoading={isLoading} />
        ) : (
          <>
            {/**screenshot photo */}
            {Boolean(data?.has_photo) && data?.photo && (
              <ScreenshotComp data={data} />
            )}

            {/**primary details */}
            <PackageCard type={data?.package_type} data={data} />

            {/**description */}
            {Boolean(data?.description != "") && (
              <DescriptionComp description={data?.description} />
            )}

            {/**amount summary */}
            <AmountSummComp data={data} />

            {/**action buttons */}
            <ActionButtonsComp
              id={data?.package_id}
              status={data?.status}
              onCloseSuccessful={() => fetchPackage(data?.package_id)}
            />

            {/**deposit history */}
            <DepositHistoryComp id={data?.package_id} />
          </>
        )}
      </ScrollViewWrapper>
    </SafeAreaWrapper>
  );
}

const ScreenshotComp = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.screenshotComp}
        activeOpacity={0.8}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <ImageComponent
          uri={IMAGE_LOADER.user_thumbnail(data?.photo)}
          blur={data?.photo_blur}
          scale={false}
        />
      </TouchableOpacity>

      {/**show full image */}
      <PopupModalWrapper
        title={"View Photo"}
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
      >
        <View style={styles.photoViewer}>
          <ImageComponent
            uri={IMAGE_LOADER.user_thumbnail(data?.photo)}
            blur={data?.photo_blur}
            scale={true}
          />
        </View>
      </PopupModalWrapper>
    </>
  );
};

const DescriptionComp = ({ description }) => {
  return (
    <View style={styles.sectionComp}>
      <View style={styles.sectionTopBar}>
        <Text style={styles.sectionTitle}>Description</Text>
      </View>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const AmountSummComp = ({ data }) => {
  const { target_amount, available_amount, package_type } = data;
  const balance =
    package_type === "free" ? 0 : Number(target_amount - available_amount);

  return (
    <>
      {package_type === "defined" && (
        <View style={styles.sectionComp}>
          <View style={styles.sectionTopBar}>
            <Text style={styles.sectionTitle}>Amount Summary</Text>
          </View>

          {/**target goal */}
          {package_type === "defined" && (
            <View style={styles.split}>
              <Text style={styles.subTitle}>Target Goal:</Text>
              <Text style={styles.target}>
                {NAIRA_CURRENCY} {format_number(target_amount)}
              </Text>
            </View>
          )}

          {/**progress bar */}
          <ProgressBarComponent
            type={"regular"}
            current_value={available_amount}
            maximum_value={target_amount}
          />

          {/**summary */}
          <View style={styles.split}>
            {/**available amount */}
            <View style={{ gap: 2, maxWidth: "45%" }}>
              <Text style={styles.summaryTitle("left")}>Amount Deposited:</Text>
              <Text style={styles.summaryValue("left")}>
                {NAIRA_CURRENCY} {format_number(available_amount)}
              </Text>
            </View>

            {/**remaining balance */}
            <View style={{ gap: 2, maxWidth: "45%" }}>
              <Text style={styles.summaryTitle("right")}>
                Remaining Balance:
              </Text>
              <Text style={styles.summaryValue("right")}>
                {NAIRA_CURRENCY} {format_number(balance)}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const ActionButtonsComp = ({ id, status, onCloseSuccessful = () => {} }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //handle closing package
  const closePackage = async () => {
    let closed = await PACKAGE_HOOKS.close_package(setIsLoading, id);

    setModalVisible(false);
    if (closed) {
      return onCloseSuccessful();
    }
  };

  //make deposit
  const makeDeposit = () => {
    router.navigate(`/package/deposit/${id}`);
  };

  return (
    <>
      {String(status)?.toLowerCase() === "in-progress" && (
        <View>
          {/**action bar */}
          <View style={styles.split}>
            <View style={{ width: SCREEN_DIMENSION.divisionWidth(16, 32, 2) }}>
              <PrimaryButton
                title={"Close package"}
                type={"secondary"}
                icon={
                  <Octicons
                    name="check"
                    size={18}
                    color={COLOR_THEME.primary}
                  />
                }
                onPress={() => {
                  setModalVisible(true);
                }}
              />
            </View>

            <View style={{ width: SCREEN_DIMENSION.divisionWidth(16, 32, 2) }}>
              <PrimaryButton
                title={"Make deposit"}
                icon={
                  <Octicons
                    name="arrow-right"
                    size={18}
                    color={COLOR_THEME.white}
                  />
                }
                onPress={() => {
                  makeDeposit();
                }}
              />
            </View>
          </View>
        </View>
      )}

      {/**popup modal */}
      <PopupModalWrapper
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        title={"Close Package"}
      >
        <Text style={styles.closeWarn}>
          You are about to perform an irreversible action. Once a package is
          closed, it's status is automatically updated to completed. Thus, it
          can not be reactivated. This will prompt the admin to reach out to you
          for further process. Do you wish to continue?
        </Text>

        <View style={styles.closeBtnCont}>
          <PrimaryButton
            title={"Yes, close package"}
            isLoading={isLoading}
            onPress={() => closePackage()}
          />

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeCancel}>No, cancel</Text>
          </TouchableOpacity>
        </View>
      </PopupModalWrapper>
    </>
  );
};

const DepositHistoryComp = ({ id }) => {
  const [deposits, setDeposits] = useState();
  const [meta, setMeta] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchDeposits = async (page) => {
    //send request
    const result = await DEPOSIT_HOOKS.fetch_package_deposits(
      setIsLoading,
      id,
      page
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
    if (id) {
      fetchDeposits(1);
    }
  }, [id]);

  const seeMore = () => {
    if (id) {
      fetchDeposits(Number(meta?.page + 1));
    }
  };

  return (
    <View style={styles.historyComp}>
      <View style={styles.historyBlock}>
        <Text style={styles.historyTitle}>Complete Deposit Records</Text>
      </View>

      {/**show list of deposits */}
      <ScrollView
        contentContainerStyle={styles.historyList}
        showsVerticalScrollIndicator={false}
      >
        {deposits?.length > 0 ? (
          deposits?.map((item, index) => (
            <DepositRecord key={index} data={item} />
          ))
        ) : (
          <NotFoundComponent text={"No deposits recorded"} />
        )}

        {/**see more button logic */}
        {deposits?.length > 0 && meta?.has_next_page && (
          <SeeMoreBtn onPress={() => seeMore()} isLoading={isLoading} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width: "100%",
    minHeight: "100%",
    padding: 16,
    backgroundColor: COLOR_THEME.gray50,
    gap: 16,
  },
  sectionComp: {
    width: "100%",
    padding: 16,
    borderRadius: BORDER_RADIUS.m,
    backgroundColor: COLOR_THEME.white,
    gap: 16,
  },
  sectionTopBar: {
    width: "100%",
    paddingBottom: 8,
    borderBottomWidth: 0.8,
    borderBottomColor: COLOR_THEME.gray50,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
  },
  description: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
  },
  split: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  subTitle: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
  },
  target: {
    fontSize: FONT_SIZE.b,
    fontWeight: FONT_WEIGHT.bold,
    color: COLOR_THEME.black,
  },
  summaryTitle: (align) => ({
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
    textAlign: align || "left",
  }),
  summaryValue: (align) => ({
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
    textAlign: align || "left",
  }),
  historyComp: {
    width: "100%",
    gap: 16,
    paddingTop: 16,
    maxHeight: SCREEN_DIMENSION.heightRatio(1 / 1.5),
    overflow: "hidden",
  },
  historyBlock: {
    width: "100%",
    padding: 16,
    backgroundColor: COLOR_THEME.white,
    borderTopLeftRadius: BORDER_RADIUS.m,
    borderTopRightRadius: BORDER_RADIUS.m,
    borderBottomWidth: 0.8,
    borderBottomColor: COLOR_THEME.gray100,
  },
  historyTitle: {
    fontSize: FONT_SIZE.b,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.gray200,
  },
  historyList: {
    minHeight: "100%",
    paddingBottom: 32,
    gap: 16,
  },
  closeWarn: {
    fontSize: FONT_SIZE.m,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
    textAlign: "center",
  },
  closeCancel: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.error,
    textAlign: "center",
  },
  closeBtnCont: {
    marginTop: 64,
    marginBottom: 48,
    gap: 32,
  },
  screenshotComp: {
    width: "100%",
    height: SCREEN_DIMENSION.heightRatio(1 / 4.5),
    borderRadius: BORDER_RADIUS.m,
    backgroundColor: COLOR_THEME.black,
    overflow: "hidden",
  },
  photoViewer: {
    width: "100%",
    height: "auto",
    maxHeight: SCREEN_DIMENSION.heightRatio(1 / 1.4),
  },
});
