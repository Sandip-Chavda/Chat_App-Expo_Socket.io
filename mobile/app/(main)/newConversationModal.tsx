import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Avatar from "@/components/Avatar";
import * as ImagePicker from "expo-image-picker";
import Input from "@/components/Input";
import Typo from "@/components/Typo";
import { useAuth } from "@/context/authContext";
import Button from "@/components/Button";
import { verticalScale } from "@/utils/styling";

const CONTACTS = [
  {
    id: "1",
    name: "Sandip",
    avatar:
      "https://png.pngtree.com/recommend-works/png-clipart/20240723/ourmid/pngtree-15-august-happy-independence-day-india-design-png-image_13165912.png",
  },
  {
    id: "2",
    name: "Miral",
    avatar: "https://icon2.cleanpng.com/lnd/20240503/qlp/aa4hyi3tj.webp",
  },
  {
    id: "3",
    name: "Mummy",
    avatar:
      "https://w7.pngwing.com/pngs/788/902/png-transparent-krishna-and-radha-krishna-janmashtami-radha-krishna-desktop-krishna-religion-tradition-holi-thumbnail.png",
  },
  {
    id: "4",
    name: "Papa",
    avatar:
      "https://w7.pngwing.com/pngs/966/404/png-transparent-lord-shiva-and-hanuman-s-parvati-shiva-ganesha-shakti-lingam-shiva-desktop-wallpaper-religion-tradition-thumbnail.png",
  },
  {
    id: "5",
    name: "Neighbor",
    avatar:
      "https://e7.pngegg.com/pngimages/871/704/png-clipart-ghibli-museum-apple-iphone-7-plus-studio-ghibli-my-neighbor-totoro-animated-film-animadora-dibujo-mammal-food-thumbnail.png",
  },
  {
    id: "6",
    name: "Professor",
    avatar:
      "https://e7.pngegg.com/pngimages/281/873/png-clipart-cartoon-professor-miscellaneous-mammal-thumbnail.png",
  },
  {
    id: "7",
    name: "Friend",
    avatar:
      "https://w7.pngwing.com/pngs/317/848/png-transparent-happy-sunshine-cartoon-smile-sun-thumbnail.png",
  },
  {
    id: "8",
    name: "Help",
    avatar:
      "https://e7.pngegg.com/pngimages/381/746/png-clipart-customer-service-technical-support-help-desk-customer-support-management-miscellaneous-service-thumbnail.png",
  },
  {
    id: "9",
    name: "Trouble Maker",
    avatar:
      "https://e7.pngegg.com/pngimages/626/501/png-clipart-cute-halloween-candy-to-children-happy-halloween-mammal-thumbnail.png",
  },
  {
    id: "10",
    name: "Stranger",
    avatar:
      "https://e7.pngegg.com/pngimages/153/673/png-clipart-uncle-sam-index-finger-we-want-you-love-white-thumbnail.png",
  },
];

const NewConversationModal = () => {
  const { user: currentUser } = useAuth();
  const router = useRouter();
  const { isGroup } = useLocalSearchParams();
  const isGroupMode = isGroup == "1";

  const [groupAvatar, setGroupAvatar] = useState<{ uri: string } | null>(null);
  const [groupName, setGroupName] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 6],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setGroupAvatar(result.assets[0]);
    }
  };

  const toggleParticipant = (user: any) => {
    setSelectedParticipants((prev: any) => {
      if (prev.includes(user.id)) {
        return prev.filter((id: string) => id != user.id);
      }

      return [...prev, user.id];
    });
  };

  const onSelectUser = (user: any) => {
    if (!currentUser) {
      Alert.alert("Authentication", "Please login to start a conversation.");
      return;
    }

    if (isGroupMode) {
      toggleParticipant(user);
    } else {
    }
  };

  const createGroup = async () => {
    if (!groupName.trim() || !currentUser || selectedParticipants.length < 2)
      return;
  };

  return (
    <ScreenWrapper isModal>
      <View style={styles.container}>
        <Header
          title={isGroupMode ? "New Group" : "New Chat"}
          leftIcon={<BackButton color="black" />}
        />

        {isGroupMode && (
          <View style={styles.groupInfoContainer}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={onPickImage}>
                <Avatar uri={groupAvatar?.uri || null} isGroup size={100} />
              </TouchableOpacity>
            </View>

            <View style={styles.groupNameContainer}>
              <Input
                placeholder="Group Name"
                value={groupName}
                onChangeText={setGroupName}
              />
            </View>
          </View>
        )}

        <ScrollView
          contentContainerStyle={styles.contactList}
          showsVerticalScrollIndicator={false}
        >
          {CONTACTS.map((user: any, index) => {
            const isSelected = selectedParticipants.includes(user.id);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.contactRow,
                  isSelected && styles.selectedContact,
                ]}
                onPress={() => onSelectUser(user)}
              >
                <Avatar size={45} uri={user.avatar} />
                <Typo fontWeight={"500"}>{user?.name}</Typo>

                {isGroupMode && (
                  <View style={styles.selectionIndicator}>
                    <View
                      style={[styles.checkbox, isSelected && styles.checked]}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {isGroupMode && selectedParticipants.length >= 2 && (
          <View style={styles.createGroupButton}>
            <Button
              onPress={createGroup}
              disabled={!groupName.trim()}
              loading={isLoading}
            >
              <Typo fontWeight={"bold"} size={17}>
                Create Group
              </Typo>
            </Button>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default NewConversationModal;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacingX._15,
    flex: 1,
  },
  groupInfoContainer: {
    alignItems: "center",
    marginTop: spacingY._10,
  },
  avatarContainer: {
    marginBottom: spacingY._10,
  },
  groupNameContainer: {
    width: "100%",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
    paddingVertical: spacingY._5,
  },
  selectedContact: {
    backgroundColor: colors.neutral100,
    borderRadius: radius._15,
  },
  contactList: {
    gap: spacingY._12,
    marginTop: spacingY._10,
    paddingTop: spacingY._10,
    paddingBottom: verticalScale(130),
    // paddingBottom: spacingY._20,
  },
  selectionIndicator: {
    marginLeft: "auto",
    marginRight: spacingX._10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  checked: {
    backgroundColor: colors.primary,
  },
  createGroupButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacingX._15,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
  },
});
