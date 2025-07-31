import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/authContext";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(main)/profileModal"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
};

export default RootLayout;
