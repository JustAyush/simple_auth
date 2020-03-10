const registerService = require('./registerService');
const loginService = require('./loginService');
const emailVerifyService = require('./emailVerifyService');
const passwordResetService = require('./passwordResetService');
const requestPwResetService = require('./requestPwResetService');

module.exports = {
    registerService,
    loginService,
    emailVerifyService,
    passwordResetService,
    requestPwResetService
}