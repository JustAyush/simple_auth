const registerController = require("./registerController");
const loginController = require("./loginController");
const emailVerifyController = require("./emailVerifyController");
const passwordResetController = require("./passwordResetController");
const requestPwResetController = require("./requestPwResetController");

module.exports = {
  registerController,
  loginController,
  emailVerifyController,
  passwordResetController,
  requestPwResetController
};
