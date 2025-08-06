const messageRepository = require("../../infrastructure/repositories/message.repository");

class GetMessagesUseCase {
  async execute(options = {}) {
    const { limit = 50, page = 1 } = options;

    try {
      // Obtener mensajes recientes
      const messages = await messageRepository.findRecent(limit);

      // Formatear respuesta
      return messages.map((message) => ({
        id: message._id,
        text: message.text,
        message: message.text, // Compatibilidad con frontend
        user: message.user ? message.user.email || message.user.displayName : 'Usuario Anónimo',
        userName: message.user ? message.user.email || message.user.displayName : 'Usuario Anónimo',
        userId: message.user ? message.user._id : null,
        timestamp: message.createdAt,
        createdAt: message.createdAt,
      })).filter(msg => msg.text); // Filtrar mensajes sin texto
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new GetMessagesUseCase();
