
// Imports
const express = require('express');
const router = express.Router();

// Local imports

// controllers
const {registerController, loginController} = require('../controllers');
// middlewares
const {joiValidator} = require('../middlewares');
// schemas
const {bodySchema} = require("../schemas");


// Routes

// register
router.post('/register', joiValidator.validate(bodySchema.schemas.register, 'body'), registerController.register);

// login
router.post('/login', joiValidator.validate(bodySchema.schemas.register, 'body'), loginController.login);


module.exports = router