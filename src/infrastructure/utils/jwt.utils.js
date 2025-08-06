const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    userId: user._id.toString(), // Siempre usar userId para consistencia
    id: user._id.toString(),     // También agregar id para compatibilidad
    email: user.email,
    displayName: user.displayName,
    isGoogleUser: user.isGoogleUser || false
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h"
  });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Garantizar que siempre tengamos userId
    if (!decoded.userId && decoded.id) {
      decoded.userId = decoded.id;
    }
    return decoded;
  } catch (error) {
    throw new Error('Token inválido: ' + error.message);
  }
};

module.exports = {
  generateToken,
  verifyToken
};
