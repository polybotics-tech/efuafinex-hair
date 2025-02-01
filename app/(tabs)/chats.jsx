import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScrollViewWrapper from "../../components/ui/ScrollViewWrapper";
import { COLOR_THEME, FONT_SIZE, FONT_WEIGHT } from "../../constants";
import MessageSearchBarComponent from "../../components/MessageSearchBarComponent";
import PopupModalWrapper from "../../components/ui/PopupModalWrapper";
import { Octicons } from "@expo/vector-icons";
import ChatThread from "../../components/ChatThread";
import NotFoundComponent from "../../components/reuseables/NotFoundComponent";

export default function Chats() {
  //fetch search products
  const [searchResults, setSearchResults] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  //handle inputs
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  //chat threads
  const chat_threads = ["1", "2", "3"];

  return (
    <ScrollViewWrapper style={styles.scrollArea}>
      {/**search component */}
      <MessageSearchBarComponent
        input={query}
        setInput={setQuery}
        placeholder={"Search messages..."}
        filter={activeFilter}
        setFilter={setActiveFilter}
      />

      {/**chat thread */}
      <View style={{ width: "100%", gap: 8 }}>
        {chat_threads?.length > 0 ? (
          chat_threads?.map((item, index) => <ChatThread key={index} />)
        ) : (
          <NotFoundComponent text={"No chats found"} />
        )}
      </View>
    </ScrollViewWrapper>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    padding: 16,
    gap: 16,
  },

  loadMore: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    backgroundColor: COLOR_THEME.white,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadText: {
    fontSize: FONT_SIZE.s,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLOR_THEME.gray200,
  },
});
