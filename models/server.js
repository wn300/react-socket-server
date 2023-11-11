// Servidor express
const express = require("express");
// Servido de sockets
const http = require("http");
// Configuraciondel socketserver
const socketio = require("socket.io");
// path
const path = require("path");
// Service sockets
const Sockets = require("./sockets");
// cors
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de socket
    this.io = socketio(this.server, {
      /*configuraciones*/
    });
  }

  middlewares() {
    // Desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // cors
    this.app.use(cors());
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Iniciaizar middleware
    this.middlewares();

    // inicializa configuracion de sockets
    this.configSockets();

    // Inicializar server
    this.server.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${this.port} 🚀`);
    });
  }
}

module.exports = Server;
