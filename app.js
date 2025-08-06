const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();

// Configurar Passport
require("./src/config/passport-setup");

const authRoutes = require("./src/api/routes/auth.routes");
const { connectDatabase } = require("./src/config/database");
const {
  initializeWebSockets,
} = require("./src/infrastructure/websockets/chat.handler");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      process.env.CLIENT_URL || "http://localhost:3000",
      "http://127.0.0.1:5500",
      "http://localhost:5500", // Agregamos localhost:5500
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
});

// Middleware
app.use(cors({
  origin: [
    process.env.CLIENT_URL || "http://localhost:3000",
    "http://127.0.0.1:5500",
    "http://localhost:5500"
  ],
  credentials: true
}));
app.use(express.json());

// Inicializar Passport
app.use(passport.initialize());

// Conectar a la base de datos
connectDatabase();

// Rutas
app.use("/api/auth", authRoutes);

// Inicializar WebSockets
initializeWebSockets(io);

// Ruta de salud
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Chat server is running" });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal!" });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
