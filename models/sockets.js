class Sockets {
  constructor(io) {
    this.io = io
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      // OnConection 
      console.log(`💫 Cliente conectado!! 💫 ${socket.id}`);

      // Escuchar mensaje-to-server
      socket.on("mensaje-to-server", (data) => {
        this.io.emit("mensaje-from-server", data);
      });
    });
  }
}

module.exports = Sockets;
