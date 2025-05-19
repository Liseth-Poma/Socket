const express = require("express"); // Express framework
const path = require("path"); // Path module
const { createServer } = require("http"); // HTTP server
const { Server } = require("socket.io"); // Socket.IO

const app = express(); // Create an Express application
const httpServer = createServer(app); // Create an HTTP server
const io = new Server(httpServer); // Create a Socket.IO server

app.use(express.static(path.join(__dirname, "views")));

const socketOnline = []; // Array to store online sockets
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html"); // Serve the index.html file
}); // Define a route for the root URL

io.on("connection", (socket) => {
  socketOnline.push(socket.id); // Add the socket ID to the array
  // Emisión básica
  socket.emit("Bienvenido", "Ahora estás conectado 🥸"); // Send a message to the client
  socket.on("server", (data) => {
    console.log(data); // Log the message received from the client
  }); // Listen for messages from the client

  // Emisión a todos los clientes
  io.emit("everyone", socket.id + " se ha conectado!!"); // Send a message to all connected clients

  // Emisión a un cliente específico
  socket.on("last", (massage) => {
    const lastSocket = socketOnline[socketOnline.length - 1]; // Get the last socket ID
    io.to(lastSocket).emit("saludoUnico", massage); // Send a message to the last socket
  }); // Listen for messages from the client

  socket.emit("on", "Hola AD");
  socket.emit("on", "Hola AD");
});
httpServer.listen(3000); // Start the HTTP server on port 3000
