const express = require('express')
const passport = require('passport')
// const flash = require('express-flash')
const session = require('express-session')
const method_override = require('method-override')

const global_routes = require('./routes/global-routes')
const user_routes = require('./routes/user-routes')(passport)
const deck_routes = require('./routes/deck-routes')

// Instantiate server application
const app = express()

// Set up possible body codifications
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set up http method override
app.use(method_override('_method'))

// Set up passport
require('./config/passport-config')(passport)

// Set up session informations
// app.use(flash()) // TODO: See flash after
app.use(session({
    secret: 'secret', // TODO: Move it to .env file
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Set up routes
app.use(user_routes)
app.use(global_routes)
app.use(deck_routes)

// Make server listen on port 8080
app.listen(8080)