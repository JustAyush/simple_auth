
const localStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs'); 

function init ( passport, getUserByEmail ) {

    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if(user == null) {
            return done(null, false, {message: "No user found with that email"});
        }

        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user, {message: "Successfully logged in"})
            } else {
                return done(null, false, {message: 'Incorrect Password'})
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