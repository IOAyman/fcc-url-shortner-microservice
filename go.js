const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')
const routes = require('./routes')
mongoose.Promise = global.Promise


// load env
try {
  fs.accessSync(`${__dirname}/.env`, fs.constants.R_OK)
  require('dotenv').config()
} catch (error) { console.warn(error) }


// setup app
const app = express()
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_USER_PASS } = process.env


// setup db
mongoose.connect(`mongodb://${DB_USER}:${DB_USER_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)
mongoose.connection.on('connected', () => console.info('DB connected!'))
mongoose.connection.on('error', console.error)


// setup routes
app.use('/', routes)


// go!
app.on('error', console.error)
app.listen(process.env.NODE_PORT || process.env.PORT || 8000)
