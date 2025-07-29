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
