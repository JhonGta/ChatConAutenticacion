const { UserRepository } = require("../../infrastructure/repositories/user.repository");
const { generateToken } = require("../../infrastructure/utils/jwt.utils");

const userRepository = new UserRepository();

class LoginUserUseCase {
  async execute(credentials) {
    const { email, password } = credentials;

    // Validar datos de entrada
    if (!email || !password) {
      throw new Error("Email y password son requeridos");
    }

    // Buscar usuario por email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    // Verificar password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    // Generar token JWT usando helper
    const token = generateToken(user);

    return {
      user: {
        _id: user._id,
        id: user._id,
        email: user.email,
        displayName: user.displayName || user.email,
        isGoogleUser: user.isGoogleUser || false,
        createdAt: user.createdAt,
      },
      token,
    };
  }
}

module.exports = new LoginUserUseCase();
