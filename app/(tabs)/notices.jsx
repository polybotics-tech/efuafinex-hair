import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import ScrollViewWrapper from "../../components/ui/ScrollViewWrapper";
import { useSelector } from "react-redux";
import { USER_HOOKS } from "../../helpers/hooks/user";
import {
  COLOR_THEME,
  FONT_SIZE,
  FONT_WEIGHT,
  SCREEN_DIMENSION,
} from "../../constants";
import { router } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import NotFoundComponent from "../../components/reuseables/NotFoundComponent";
import { NOTICE_TITLE } from "../../helpers/json";
import { format_date_time_readable } from "../../helpers/utils/datetime";

export default function Notifications() {
  const has_unread = useSelector((state) => state.notification.has_unread);
  const notifications = useSelector(
    (state) => state.notification.notifications
  );

  useEffect(() => {
    if (has_unread) {
      USER_HOOKS.mark_notifications_read();
    }
  }, [has_unread]);

  return (
    <ScrollViewWrapper style={styles.noticeList}>
      {notifications && notifications?.length > 0 ? (
        notifications?.map((item, index) => (
          <NoticeTab key={index} notice={item} />
        ))
      ) : (
        <NotFoundComponent text={"No notifications found"} />
      )}
    </ScrollViewWrapper>
  );
}

const NoticeTab = ({ notice }) => {
  const { notification_type, extra, created_time } = notice;

  const path = {
    package: (id) => `/package/${id}`,
    reciept: (ref) => `/reciept/${ref}`,
  };

  const navigatToPath = (type, id) => {
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

const styles = StyleSheet.create({
  noticeList: {
    width: "100%",
    minHeight: SCREEN_DIMENSION.heightRatio(1 / 1.4),
    gap: 8,
    backgroundColor: COLOR_THEME.gray50,
    padding: 16,
  },
  noticeBlock: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderColor: COLOR_THEME.gray50,
    borderRadius: 8,
    backgroundColor: COLOR_THEME.white,
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
    width: SCREEN_DIMENSION.subtractWidth(8, 48 + 16, 44),
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
