import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { useAuth } from "@/context/authContext";
import Button from "@/components/Button";

const HomeScreen = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <ScreenWrapper>
      <Typo size={28} color={colors.white} fontWeight={"800"}>
        HomeScreen
      </Typo>

      <Button onPress={handleLogout}>
        <Typo>Loout</Typo>
      </Button>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
