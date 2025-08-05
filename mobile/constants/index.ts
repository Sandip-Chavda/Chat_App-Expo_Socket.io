import { Platform } from "react-native";

export const API_URL =
  Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_MY_IP_URL || "http://10.0.2.2:3000"
    : "http://localhost:3000";

export const CLOUDINARY_CLOUD_NAME =
  process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME!;

export const CLOUDINARY_UPLOAD_PRESET =
  process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
