
// Local imports
const {emailVerifyModel} = require("../models");

const verify = async (token, userId) => {

    try {
        return await emailVerifyModel.verify(token, userId);
    } catch (e) {
        throw new Error(e.message);
    }

}

module.exports = {
    verify
}