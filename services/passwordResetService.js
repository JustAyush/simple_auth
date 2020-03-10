// Imports
const bcrypt = require("bcryptjs");

// Local imports
const {passwordResetModel} = require("../models");

// for POST: resetting the password
const reset = async (userId, resetToken, newPassword) => {

    try {
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        return await passwordResetModel.reset(userId, resetToken, newHashedPassword);
    } catch (e) {
        throw new Error(e.message);
    }
}


// for GET: to check if the userId and resetToken are valid for password reset
const checkReset = async (userId, resetToken) => {
    try {
        return await passwordResetModel.checkReset(userId, resetToken);
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {
    reset, 
    checkReset
}

