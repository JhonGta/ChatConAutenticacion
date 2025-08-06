const { UserRepository } = require("../../infrastructure/repositories/user.repository");
const { generateToken } = require("../../infrastructure/utils/jwt.utils");

const userRepository = new UserRepository();

class RegisterUserUseCase {
  async execute(userData) {
    const { email, password } = userData;

    // Validar datos de entrada
    if (!email || !password) {
      throw new Error("Email y password son requeridos");
    }

    if (password.length < 6) {
      throw new Error("Password debe tener al menos 6 caracteres");
    }

    // Verificar si el usuario ya existe
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Usuario con este email ya existe");
    }

    try {
      // Crear nuevo usuario
      const user = await userRepository.create({ email, password });

      // Generar token JWT usando helper
      const token = generateToken(user);

      return {
        user: {
          id: user._id,
          email: user.email,
          createdAt: user.createdAt,
        },
        token,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Usuario con este email ya existe");
      }
      throw error;
    }
  }
}

module.exports = new RegisterUserUseCase();
