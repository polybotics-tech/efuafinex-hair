import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useEffect, useMemo, useState } from "react";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../constants";
import { router, usePathname } from "expo-router";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import PopupModalWrapper from "./ui/PopupModalWrapper";
import NotFoundComponent from "./reuseables/NotFoundComponent";
import { NOTICE_TITLE } from "../helpers/json";
import { format_date_time_readable } from "../helpers/utils/datetime";
import { USER_HOOKS } from "../helpers/hooks/user";
import { BORDER_RADIUS } from "../constants/theme";
import ImageComponent from "./reuseables/ImageComponent";
import { IMAGE_LOADER } from "../helpers/utils/image-loader";

const TabsHeaderComponent = () => {
  const path = usePathname();
  const [pageName, setPageName] = useState("");

  useMemo(() => {
    if (path) {
      switch (path) {
        case "/":
          setPageName("Home");
          break;
        case "/chats":
          setPageName("Chats");
          break;
        case "/records":
          setPageName("Activity Records");
          break;
        case "/account":
          setPageName("Account");
          break;

        default:
          setPageName("");
          break;
      }
    }
  }, [path]);

  return (
    <View style={styles.header(pageName?.toLowerCase())}>
      {pageName === "Home" ? (
        <View style={styles.logo}>
          <View style={styles.LogoImg}>
            <ImageComponent
              uri={IMAGE_LOADER.app_logo()}
              scale={true}
              blur={"i"}
            />
          </View>

          <Text style={styles.LogoName}>
            Efua<Text style={styles.LogoNameLink}>Finex</Text>Hair
          </Text>
        </View>
      ) : (
        <Text style={styles.pageTitle}>{pageName}</Text>
      )}

      {/**action buttons */}
      <View style={styles.actionBtnSplit}>
        <NotificationBtn />
      </View>
    </View>
  );
};

const NotificationBtn = ({}) => {
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const has_unread = useSelector((state) => state.notification.has_unread);

  const [modalVisible, setModalVisible] = useState(false);

  //mark all notice as read on visible
  useEffect(() => {
    if (modalVisible && has_unread) {
      USER_HOOKS.mark_notifications_read();
    }
  }, [modalVisible]);

  return (
    <>
      <Pressable
        style={styles.actionBtn}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <MaterialCommunityIcons
          name="bell-outline"
          size={18}
          color={COLOR_THEME.black}
        />

        {/**show indicator */}
        {has_unread && <View style={styles.actionIndicator}></View>}
      </Pressable>

      {/**show notification list in modal */}
      <PopupModalWrapper
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        title={"Notifications"}
      >
        <View style={styles.noticeList}>
          {notifications && notifications?.length > 0 ? (
            notifications?.map((item, index) => (
              <NoticeTab
                key={index}
                notice={item}
                closeModal={() => {
                  setModalVisible(false);
                }}
              />
            ))
          ) : (
            <NotFoundComponent text={"No notifications found"} />
          )}
        </View>
      </PopupModalWrapper>
    </>
  );
};

const NoticeTab = ({ notice, closeModal = () => {} }) => {
  const { notification_type, extra, created_time } = notice;

  const path = {
    package: (id) => `/package/${id}`,
    reciept: (ref) => `/reciept/${ref}`,
  };

  const navigatToPath = (type, id) => {
    setTimeout(() => {
      closeModal();
    }, 100);

    let goto = path[type];
    router.navigate(goto(id));
  };

  return (
    <View style={styles.noticeBlock}>
      <View style={styles.noticeTab}>
        <View style={styles.noticeIcon}>
          <Octicons
            name="info"
            size={FONT_SIZE.s}
            color={COLOR_THEME.gray100}
          />
        </View>

        <View style={styles.noticeDesc}>
          <Text style={styles.noticeTitle}>
            {NOTICE_TITLE[notification_type]}
          </Text>

          <Text style={styles.noticeTime}>
            {format_date_time_readable(created_time)}
          </Text>
        </View>
      </View>

      {/**action buttons */}
      {(Boolean(extra?.package_id) || Boolean(extra?.transaction_ref)) && (
        <View style={styles.noticeActionCont}>
          {Boolean(extra?.package_id) && (
            <TouchableOpacity
              onPress={() => navigatToPath("package", extra?.package_id)}
            >
              <Text style={styles.noticeAction}>View package</Text>
            </TouchableOpacity>
          )}

          {Boolean(extra?.transaction_ref) && (
            <TouchableOpacity
              onPress={() => navigatToPath("reciept", extra?.transaction_ref)}
            >
              <Text style={styles.noticeAction}>See reciept</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default memo(TabsHeaderComponent);

const styles = StyleSheet.create({
  header: (page) => ({
    width: "100%",
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: COLOR_THEME.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.8,
    borderBottomColor: page === "home" ? COLOR_THEME.gray50 : COLOR_THEME.white,
  }),
  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  LogoImg: {
    width: 36,
    height: 36,
    overflow: "hidden",
  },
  LogoName: {
    fontSize: FONT_SIZE.b,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.black,
  },
  LogoNameLink: {
    color: COLOR_THEME.primary,
  },
  pageTitle: {
    fontSize: FONT_SIZE.xb,
    fontWeight: FONT_WEIGHT.bold,
    color: COLOR_THEME.black,
  },
  actionBtnSplit: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.r,
    backgroundColor: COLOR_THEME.gray50,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  actionIndicator: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: COLOR_THEME.primary,
    position: "absolute",
    top: 0,
    right: 5,
  },
  noticeList: {
    width: "100%",
    minHeight: SCREEN_DIMENSION.heightRatio(1 / 1.4),
    gap: 4,
  },
  noticeBlock: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: COLOR_THEME.gray50,
    borderRadius: 8,
    gap: 8,
  },
  noticeTab: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  noticeIcon: {
    width: 44,
    height: 44,
    borderRadius: 4,
    backgroundColor: COLOR_THEME.gray50,
    alignItems: "center",
    justifyContent: "center",
  },
  noticeDesc: {
    width: SCREEN_DIMENSION.subtractWidth(8, 48 + 8, 44),
    gap: 4,
    paddingVertical: 8,
  },
  noticeTitle: {
    maxWidth: "100%",
    fontSize: FONT_SIZE.m,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray200,
  },
  noticeTime: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.regular,
    color: COLOR_THEME.gray100,
  },
  noticeActionCont: {
    width: "100%",
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: COLOR_THEME.gray50,
  },
  noticeAction: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.primary,
  },
});
