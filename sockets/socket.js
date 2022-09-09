const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

module.exports.createSocket = (httpServer, authConfig) => {

  const io = new Server(httpServer, {
    cors: {
      origin: [
        "https://admin.socket.io",
      ],
      credentials: true
    }
  });

  instrument(io, authConfig); // Socket Io admin dashboadr https://admin.socket.io

  io.on("connection", (socket) => {
    console.log(`a user ${socket.id} connected`);

    socket.on("message", msg => {
      io.emit("message", "hello " + msg);
    });

    socket.on("disconnect", () => {
      console.log(`user ${socket.id} disconnected`);
    });

  });

  return io;
}