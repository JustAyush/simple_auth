// Imports
const express = require("express");
const router = express.Router();

// Local imports

// controllers
const {
  registerController,
  loginController,
  emailVerifyController,
  requestPwResetController,
  passwordResetController
} = require("../controllers");
// middlewares
const { joiValidator } = require("../middlewares");
// schemas
const { bodySchema } = require("../schemas");

// Routes

// register
router.post(
  "/register",
  joiValidator.validate(bodySchema.schemas.register, "body"),
  registerController.register
);

// login
router.post(
  "/login",
  joiValidator.validate(bodySchema.schemas.register, "body"),
  loginController.login
);

// email verification
router.get("/verify/:userId/:token", emailVerifyController.verify);

// request password reset
router.post(
  "/reqPwReset",
  joiValidator.validate(bodySchema.schemas.requestPasswordReset, "body"),
  requestPwResetController.requestReset
);
// password reset (for handling link provided in the email)
router.get("/reqPasswordReset/:id/:resetToken", passwordResetController.reset);
// password reset (setting the new password)
router.post("/reqPasswordReset/:id/:resetToken", joiValidator.validate(bodySchema.schemas.setNewPassword, "body"), passwordResetController.reset);

module.exports = router;
