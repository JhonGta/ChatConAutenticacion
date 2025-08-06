const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email es requerido"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor ingresa un email válido",
      ],
    },
    password: {
      type: String,
      required: function() {
        // Password solo es requerido si no es usuario de Google
        return !this.isGoogleUser;
      },
      minlength: [6, "Password debe tener al menos 6 caracteres"],
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Permite que algunos usuarios no tengan googleId
    },
    displayName: {
      type: String,
      trim: true,
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware para hashear password antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para obtener datos públicos del usuario
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);
