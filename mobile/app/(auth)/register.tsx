import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";

const RegisterScreen = () => {
  return (
    <ScreenWrapper>
      <Typo color={colors.white}>RegisterScreen</Typo>
    </ScreenWrapper>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
