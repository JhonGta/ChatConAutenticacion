const { verifyWebSocketToken } = require("../middlewares/auth.middleware");
const saveMessageUseCase = require("../../domain/use-cases/save-message.use-case");
const getMessagesUseCase = require("../../domain/use-cases/get-messages.use-case");
const { UserRepository } = require("../repositories/user.repository");

const userRepository = new UserRepository();
const connectedUsers = new Map();

const initializeWebSockets = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      console.log('Token recibido en WebSocket:', token ? token.substring(0, 50) + '...' : 'No token');

      if (!token) {
        console.log('❌ No se recibió token en WebSocket');
        return next(new Error("Token de autenticación requerido"));
      }

      console.log('🔍 Verificando token...');
      const { decoded, user } = await verifyWebSocketToken(token);

      if (!user) {
        console.log('❌ Usuario no encontrado en WebSocket');
        return next(new Error("Usuario no encontrado"));
      }

      console.log('✅ Usuario autenticado en WebSocket:', {
        id: user._id,
        email: user.email,
        displayName: user.displayName
      });

      socket.userId = user._id.toString();
      socket.userEmail = user.email;
      socket.userName = user.displayName || user.email; // Usar displayName si existe
      next();
    } catch (error) {
      console.error("❌ Error en autenticación WebSocket:", error.message);
      next(new Error("Token inválido"));
    }
  });

  io.on("connection", async (socket) => {
    console.log(`Usuario conectado: ${socket.userEmail} (${socket.id})`);

    // Agregar usuario a la lista de conectados
    connectedUsers.set(socket.userId, {
      socketId: socket.id,
      email: socket.userEmail,
      name: socket.userName,
      connectedAt: new Date(),
    });

    // Enviar mensajes recientes al usuario recién conectado
    try {
      const recentMessages = await getMessagesUseCase.execute({ limit: 50 });
      socket.emit("recentMessages", recentMessages);
    } catch (error) {
      console.error("Error obteniendo mensajes recientes:", error);
    }

    // Notificar a todos los usuarios sobre el nuevo usuario conectado
    socket.broadcast.emit("userConnected", {
      userId: socket.userId,
      email: socket.userEmail,
      name: socket.userName,
      connectedAt: new Date(),
    });

    // Enviar lista de usuarios conectados
    const connectedUsersList = Array.from(connectedUsers.values()).map(
      (user) => ({
        email: user.email,
        name: user.name,
        connectedAt: user.connectedAt,
      })
    );

    io.emit("connectedUsers", connectedUsersList);

    // Manejar envío de mensajes
    socket.on("sendMessage", async (data) => {
      try {
        console.log('📝 Mensaje recibido de:', socket.userEmail, 'Contenido:', data);

        if (!data.text || typeof data.text !== "string") {
          console.log('❌ Texto del mensaje inválido');
          socket.emit("error", { message: "Texto del mensaje es requerido" });
          return;
        }

        const messageData = {
          text: data.text.trim(),
          userId: socket.userId,
        };

        console.log('💾 Guardando mensaje:', messageData);

        // Guardar mensaje en la base de datos
        const savedMessage = await saveMessageUseCase.execute(messageData);

        console.log('✅ Mensaje guardado:', savedMessage);

        // Enviar mensaje a todos los usuarios conectados
        io.emit("newMessage", savedMessage);

        console.log('📤 Mensaje enviado a todos los usuarios');

        console.log(
          `Mensaje enviado por ${socket.userEmail}: ${savedMessage.text}`
        );
      } catch (error) {
        console.error("Error enviando mensaje:", error);
        socket.emit("error", {
          message: error.message || "Error enviando mensaje",
        });
      }
    });

    // Manejar solicitud de mensajes históricos
    socket.on("getMessages", async (data) => {
      try {
        const messages = await getMessagesUseCase.execute(data);
        socket.emit("messages", messages);
      } catch (error) {
        console.error("Error obteniendo mensajes:", error);
        socket.emit("error", {
          message: "Error obteniendo mensajes",
        });
      }
    });

    // Manejar indicador de "escribiendo"
    socket.on("typing", (data) => {
      socket.broadcast.emit("userTyping", {
        userId: socket.userId,
        email: socket.userEmail,
        name: socket.userName,
        isTyping: data.isTyping,
      });
    });

    // Manejar desconexión
    socket.on("disconnect", () => {
      console.log(`Usuario desconectado: ${socket.userEmail} (${socket.id})`);

      // Remover usuario de la lista de conectados
      connectedUsers.delete(socket.userId);

      // Notificar a todos los usuarios sobre la desconexión
      socket.broadcast.emit("userDisconnected", {
        userId: socket.userId,
        email: socket.userEmail,
        name: socket.userName,
        disconnectedAt: new Date(),
      });

      // Enviar lista actualizada de usuarios conectados
      const connectedUsersList = Array.from(connectedUsers.values()).map(
        (user) => ({
          email: user.email,
          name: user.name,
          connectedAt: user.connectedAt,
        })
      );

      socket.broadcast.emit("connectedUsers", connectedUsersList);
    });

    // Manejar errores del socket
    socket.on("error", (error) => {
      console.error("Error del socket:", error);
    });
  });
};

const getConnectedUsers = () => {
  return Array.from(connectedUsers.values());
};

module.exports = {
  initializeWebSockets,
  getConnectedUsers,
};
