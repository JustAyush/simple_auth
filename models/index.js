const registerModel = require('./registerModel');
const loginModel = require('./loginModel');
const emailVerifyModel = require('./emailVerifyModel');
const passwordResetModel = require('./passwordResetModel');
const requestPwResetModel = require('./requestPwResetModel');

module.exports = {
    registerModel,
    loginModel,
    emailVerifyModel,
    passwordResetModel,
    requestPwResetModel
}