import dotenv from "dotenv";
import { Server as SocketIOServer, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { registerUserEvents } from "./userEvents";
import { registerChatEvents } from "./chatEvents";
import Conversation from "../models/Conversation";

dotenv.config();

export function initializeSocket(server: any): SocketIOServer {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*", // allow all regions
    },
  });

  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error: no token provided."));
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          return next(new Error("Authentication error: invalid token."));
        }

        let userData = decoded.user;
        socket.data = userData;
        socket.data.userId = userData.id;

        next();
      }
    );
  });

  io.on("connection", async (socket: Socket) => {
    const userId = socket.data.userId;
    console.log(`user connected to socket. userId:- ${userId}`);

    registerChatEvents(io, socket);
    registerUserEvents(io, socket);

    try {
      const conversations = await Conversation.find({
        participants: userId,
      }).select("_id");

      conversations.forEach((conversation) => {
        socket.join(conversation._id.toString());
      });
    } catch (error) {
      console.error("Error joining conversation:", error);
    }

    socket.on("disconnect", () => {
      console.log("User Logged out.");
    });
  });

  return io;
}
