import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { BackButtonProps } from "@/types";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { CaretLeftIcon } from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";

const BackButton = ({
  color = colors.white,
  iconSize = 20,
  style,
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={[styles.button, style]}
    >
      <CaretLeftIcon
        size={verticalScale(iconSize)}
        color={color}
        weight="bold"
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {},
});
