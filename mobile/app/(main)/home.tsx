import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/context/authContext";
import Button from "@/components/Button";
import { testSocket } from "@/socket/socketEvents";
import { verticalScale } from "@/utils/styling";
import * as Icons from "phosphor-react-native";
import { useRouter } from "expo-router";
import ConversationItem from "@/components/ConversationItem";
import Loading from "@/components/Loading";

const CONVERSATIONS = [
  {
    name: "Alice",
    type: "direct",
    // lastMessage: {
    //   senderName: "Alice",
    //   content: "How, Are you there?",
    //   createdAt: "2025-06-22T18:45:02Z",
    // },
  },
  {
    name: "Project Team",
    type: "group",
    lastMessage: {
      senderName: "Sandip",
      content: "Boss is here...",
      createdAt: "2025-06-22T18:45:02Z",
    },
  },
  {
    name: "Tango",
    type: "direct",
    lastMessage: {
      senderName: "Tango",
      content: "Be aware of charlie.",
      createdAt: "2025-06-22T18:45:02Z",
    },
  },
  {
    name: "Family Group",
    type: "group",
    lastMessage: {
      senderName: "Mummy",
      content: "Happy Birthday",
      createdAt: "2025-06-22T18:45:02Z",
    },
  },
  {
    name: "Charlie",
    type: "direct",
    lastMessage: {
      senderName: "Charlie",
      content: "Thanks",
      createdAt: "2025-06-22T18:45:02Z",
    },
  },
];

const HomeScreen = () => {
  const { user: currentUser } = useAuth();
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);

  let directConversations = CONVERSATIONS.filter(
    (item: any) => item.type === "direct"
  ).sort((a: any, b: any) => {
    const aDate = a?.lastMessage?.createdAt || a.createdAt;
    const bDate = b?.lastMessage?.createdAt || b.createdAt;

    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  let groupConversations = CONVERSATIONS.filter(
    (item: any) => item.type === "group"
  ).sort((a: any, b: any) => {
    const aDate = a?.lastMessage?.createdAt || a.createdAt;
    const bDate = b?.lastMessage?.createdAt || b.createdAt;

    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  // useEffect(() => {
  //   testSocket(testSocketCallbackHandler);
  //   testSocket(null);

  //   return () => {
  //     testSocket(testSocketCallbackHandler, true);
  //   };
  // }, []);

  // const testSocketCallbackHandler = (data: any) => {
  //   console.log("Get response from the testSocket event", data);
  // };

  return (
    <ScreenWrapper showPattern bgOpacity={0.4}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Typo
              color={colors.neutral200}
              size={19}
              textProps={{ numberOfLines: 1 }}
            >
              Welcome,{" "}
              <Typo color={colors.white} size={20} fontWeight={"800"}>
                {currentUser?.name}{" "}
              </Typo>
              🙂
            </Typo>
          </View>
          <TouchableOpacity
            style={styles.settingIcon}
            onPress={() => router.push("/(main)/profileModal")}
          >
            <Icons.GearSixIcon
              color={colors.white}
              weight="fill"
              size={verticalScale(22)}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: spacingY._20 }}
          >
            <View style={styles.navbar}>
              <View style={styles.tabs}>
                <TouchableOpacity
                  style={[
                    styles.tabStyle,
                    selectedTab === 0 && styles.activeTabStyle,
                  ]}
                  onPress={() => setSelectedTab(0)}
                >
                  <Typo fontWeight={"500"}>Chats</Typo>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabStyle,
                    selectedTab === 1 && styles.activeTabStyle,
                  ]}
                  onPress={() => setSelectedTab(1)}
                >
                  <Typo fontWeight={"500"}>Groups</Typo>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.conversationList}>
              {selectedTab === 0 &&
                directConversations.map((item: any, index: number) => {
                  return (
                    <ConversationItem
                      key={index}
                      item={item}
                      router={router}
                      showDivider={directConversations.length != index + 1}
                    />
                  );
                })}

              {selectedTab === 1 &&
                groupConversations.map((item: any, index: number) => {
                  return (
                    <ConversationItem
                      key={index}
                      item={item}
                      router={router}
                      showDivider={directConversations.length != index + 1}
                    />
                  );
                })}

              {!loading &&
                selectedTab === 0 &&
                directConversations.length === 0 && (
                  <Typo style={{ textAlign: "center" }}>
                    You don&apos;t have any messages.
                  </Typo>
                )}

              {!loading &&
                selectedTab === 1 &&
                groupConversations.length === 0 && (
                  <Typo style={{ textAlign: "center" }}>
                    You haven&apos;t any groups yet.
                  </Typo>
                )}

              {loading && <Loading />}
            </View>
          </ScrollView>
        </View>
      </View>

      <Button
        style={styles.floatingButton}
        onPress={() =>
          router.push({
            pathname: "/(main)/newConversationModal",
            params: { isGroup: selectedTab },
          })
        }
      >
        <Icons.PlusIcon color="black" weight="bold" size={verticalScale(24)} />
      </Button>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacingX._20,
    gap: spacingY._15,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._50,
    borderTopRightRadius: radius._50,
    borderCurve: "continuous",
    overflow: "hidden",
    paddingHorizontal: spacingX._20,
  },
  navbar: {
    flexDirection: "row",
    gap: spacingX._15,
    alignItems: "center",
    paddingHorizontal: spacingX._10,
  },
  tabs: {
    flexDirection: "row",
    gap: spacingX._10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabStyle: {
    paddingVertical: spacingY._10,
    paddingHorizontal: spacingX._20,
    borderRadius: radius.full,
    backgroundColor: colors.neutral100,
  },
  activeTabStyle: {
    backgroundColor: colors.primaryLight,
  },
  conversationList: {
    paddingVertical: spacingY._20,
  },
  settingIcon: {
    padding: spacingY._10,
    backgroundColor: colors.neutral700,
    borderRadius: radius.full,
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30),
  },
});
