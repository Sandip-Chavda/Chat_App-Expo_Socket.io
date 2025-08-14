import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { spacingX, spacingY } from "@/constants/theme";

const ConversationItem = () => {
  return (
    <View>
      <Text>ConversationItem</Text>
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
