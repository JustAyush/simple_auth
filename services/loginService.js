

// Local imports
const {loginModel} = require("../models");

const login = async (email, password) => {

    try {
        return await loginModel.login(email, password);
    } catch (e) {
        throw new Error(e.message);
    }

}

module.exports = {
    login
}