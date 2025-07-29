import { API_URL } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export async function connectSocket(): Promise<Socket> {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("No token found, user must login.");
  }

  if (!socket) {
    socket = io(API_URL, {
      auth: { token },
    });

    await new Promise((resolve) => {
      socket?.on("connect", () => {
        console.log("Scoket Connected frontend.", socket?.id);
        resolve(true);
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket Diswconnected frontend.", socket?.id);
    });
  }

  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
