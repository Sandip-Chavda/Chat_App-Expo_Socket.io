import { Server as SocketIOServer, Socket } from "socket.io";
import Conversation from "../models/Conversation";
import e from "express";

export function registerChatEvents(io: SocketIOServer, socket: Socket) {
  socket.on("newConversation", async (data) => {
    console.log("New conversation event received:", data);

    try {
      if (data.type == "direct") {
        const existingConversation = await Conversation.findOne({
          type: "direct",
          participants: { $all: data.participants[0], $size: 2 },
        })
          .populate({
            path: "participants",
            select: "name avatar email",
          })
          .lean();

        if (existingConversation) {
          socket.emit("newConversationError", {
            success: true,
            data: { ...existingConversation, isNew: false },
            msg: "Conversation already exists.",
          });
          return;
        }
      }

      const conversation = await Conversation.create({
        type: data.type,
        participants: data.participants,
        name: data.name || "",
        avatar: data.avatar || "",
        createdBy: socket.data.userId,
      });

      const connectedSockets = Array.from(io.sockets.sockets.values()).filter(
        (s) => data.participants.includes(s.data.userId)
      );

      connectedSockets.forEach((participantSocket) => {
        participantSocket.join(conversation._id.toString());
      });

      const populatedConversation = await Conversation.findById(
        conversation._id
      )
        .populate({
          path: "participants",
          select: "name avatar email",
        })
        .lean();

      if (!populatedConversation) {
        throw new Error("Conversation not found after creation.");
      }

      io.to(conversation._id.toString()).emit("newConversation", {
        success: true,
        data: { ...populatedConversation, isNew: true },
        msg: "New conversation created successfully.",
      });
    } catch (error) {
      console.error("Error handling new conversation:", error);
      socket.emit("newConversationError", {
        success: false,
        msg: "Failed to create new conversation.",
      });
    }
  });
}
