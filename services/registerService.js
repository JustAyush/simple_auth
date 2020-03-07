
// Imports
const bcrypt = require("bcryptjs");

// Local imports
const {registerModel} = require("../models");

const register = async (email, password) => {

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await registerModel.register(email, hashedPassword);
    } catch (e) {
        throw new Error(e.message);
    }

}

module.exports = {
    register
}