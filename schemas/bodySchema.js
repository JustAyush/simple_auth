// Imports
const Joi = require('@hapi/joi');

const schemas = {
    
    register: Joi.object().keys({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().required().strict()
    }),

    requestPasswordReset: Joi.object().keys({
        email: Joi.string().email().lowercase().required()
    }),

    setNewPassword: Joi.object().keys({
        password: Joi.string().required().strict()
    }),

}


module.exports = {
    schemas
}