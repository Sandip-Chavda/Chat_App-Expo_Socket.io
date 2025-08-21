import { getSocket } from "./socket";

export function testSocket(payload: any, off: boolean = false) {
  const socket = getSocket();
  if (!socket) {
    console.log("Socket is not sonnected frontend,");
    return;
  }

  if (off) {
    socket.off("testSocket", payload);
  } else if (typeof payload == "function") {
    socket.on("testSocket", payload);
  } else {
    socket.emit("testSocket", payload);
  }
}

export function updateProfile(payload: any, off: boolean = false) {
  const socket = getSocket();
  if (!socket) {
    console.log("Socket is not connected frontend,");
    return;
  }

  if (off) {
    socket.off("updateProfile", payload);
  } else if (typeof payload == "function") {
    socket.on("updateProfile", payload);
  } else {
    socket.emit("updateProfile", payload);
  }
}

export function getContacts(payload: any, off: boolean = false) {
  const socket = getSocket();
  if (!socket) {
    console.log("Socket is not connected frontend,");
    return;
  }

  if (off) {
    socket.off("getContacts", payload);
  } else if (typeof payload == "function") {
    socket.on("getContacts", payload);
  } else {
    socket.emit("getContacts", payload);
  }
}
