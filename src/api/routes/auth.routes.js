const express = require("express");
const authController = require("../controllers/auth.controller");
const {
  validate,
  authSchemas,
} = require("../../infrastructure/middlewares/validation.middleware");
const {
  authMiddleware,
} = require("../../infrastructure/middlewares/auth.middleware");

const router = express.Router();

// Rutas públicas
router.post(
  "/register",
  validate(authSchemas.register),
  authController.register
);
router.post("/login", validate(authSchemas.login), authController.login);

// Rutas protegidas
router.get("/profile", authMiddleware, authController.getProfile);

module.exports = router;
