import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { useAuth } from "@/context/authContext";
import Button from "@/components/Button";
import { testSocket } from "@/socket/socketEvents";

const HomeScreen = () => {
  const { signOut } = useAuth();

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
