const { verifyToken } = require("../utils/jwt.utils");
const { UserRepository } = require("../repositories/user.repository");

const userRepository = new UserRepository();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        error: "Token de acceso requerido",
      });
    }

    const decoded = verifyToken(token);
    // Ahora siempre tendremos userId gracias al helper
    const user = await userRepository.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        error: "Token inválido",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Token expirado",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Token inválido",
      });
    }

    return res.status(500).json({
      error: "Error en la autenticación",
    });
  }
};

const verifyWebSocketToken = async (token) => {
  try {
    if (!token) {
      throw new Error("Token requerido");
    }

    const decoded = verifyToken(token);
    // Ahora siempre tendremos userId gracias al helper
    const user = await userRepository.findById(decoded.userId);
    
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    
    return { decoded, user };
  } catch (error) {
    throw new Error("Token inválido: " + error.message);
  }
};

module.exports = {
  authMiddleware,
  verifyWebSocketToken,
};
