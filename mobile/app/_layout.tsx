import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/authContext";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(main)/profileModal"
        options={{ presentation: "formSheet" }} //modal
      />
      <Stack.Screen
        name="(main)/newConversationModal"
        options={{ presentation: "formSheet" }} //modal
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
