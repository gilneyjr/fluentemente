const { urlencoded } = require('express')
const express = require('express')
const path = require('path')

const app = express()

// Possibilita ao express entender o corpo da requisição em formato json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set the routes of the system
const user_routes = require(path.resolve(__dirname, 'routes', 'user-routes'))
const global_routes = require(path.resolve(__dirname, 'routes', 'global-routes'))
app.use(user_routes)
app.use(global_routes)

// Make server listen at port 8080
app.listen(8080)