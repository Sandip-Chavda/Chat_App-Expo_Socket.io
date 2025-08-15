import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors, spacingX, spacingY } from "@/constants/theme";
import Avatar from "./Avatar";
import Typo from "./Typo";
import moment from "moment";

const ConversationItem = ({ item, showDivider, router }: any) => {
  const openConversation = async () => {};

  const lastMessage: any = item?.lastMessage;
  const isDirect = item?.type === "direct";

  const getLastMessageDate = () => {
    if (!lastMessage?.createdAt) return null;

    const messagesDate = moment(lastMessage?.createdAt);
    const today = moment();

    if (messagesDate.isSame(today, "day")) {
      return messagesDate.format("h:mm A");
    }
    if (messagesDate.isSame(today, "year")) {
      return messagesDate.format("MMM D");
    }

    return messagesDate.format("MMM D, YYYY");
  };

  const getLastMessageContent = () => {
    if (!lastMessage) return "Say Hello 👋🏻";

    return lastMessage?.attachement ? "Image" : lastMessage?.content;
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.conversationItem}
        onPress={openConversation}
      >
        <View>
          <Avatar uri={null} size={47} isGroup={item.type === "group"} />
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.row}>
            <Typo size={17} fontWeight={"600"}>
              {item?.name}
            </Typo>
            {item.lastMessage && <Typo>{getLastMessageDate()}</Typo>}
          </View>
          <Typo
            size={15}
            color={colors.neutral600}
            textProps={{ numberOfLines: 1 }}
          >
            {getLastMessageContent()}
          </Typo>
        </View>
      </TouchableOpacity>

      {showDivider && <View style={styles.divider} />}
    </View>
  );
};

export default ConversationItem;

const styles = StyleSheet.create({
  conversationItem: {
    gap: spacingX._10,
    marginVertical: spacingY._12,
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    height: 1,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.07)",
  },
});
