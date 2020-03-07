
if (process.env.NODE_ENV !== 'production') {
  require ('dotenv').config();
}

// Imports
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

// Local imports
const router = require('./routes');

// make a express app
const app = express();

// define port to use
const port = 3000;


// Add middlewares to the express middleware stack

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// passport
app.use(passport.initialize())
app.use(passport.session())


// Run the express app
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


// Route
app.use('/api', router);


// const users = [];

// const initPassport = require("./config/passport.js");
// initPassport(
//   passport, 
//   email =>  users.find(user => user.email === email)
// );



// app.get("/", (req, res) => res.send("Hello World!"));


// app.get("/login", (req, res) => {
//   res.send('login page');
// })


// app.post('/login', function(req, res, next) {

//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     else {
//       return res.send(info);
//     }
//   })(req, res, next);
// });



// app.get("/register", (req, res) => {
//   res.send('sign up page');
// })

// app.post("/register", async (req, res) => {
  
//   let hashedPassword;

//   try {
//     hashedPassword = await bcrypt.hash(req.body.password, 10);

//     users.push({
//       id: Date.now(),
//       email: req.body.email,
//       password: hashedPassword
//     })  

//     res.send({message: "Successfully signed up"});

//   } catch {
//     res.send({message: "Could not sign up"});
//   }

// })
















