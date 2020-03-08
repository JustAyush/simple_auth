// Imports
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs'); 

function init ( passport, userFound ) {

    const authenticateUser = async (email, password, done) => {
        
        try {
            if(await bcrypt.compare(password, userFound.password)) {
                return done(null, userFound, { status: "success", message: "Successfully logged in"})
            } else {
                return done(null, false, { status: "error", message: 'Incorrect Password'})
            }
        } catch (err) {
            return done(err);
        }
    }

    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
}



module.exports = init