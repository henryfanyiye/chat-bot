'use strict'
const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv')
const path = require('path')

/**
 * Config
 */
dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV ? `{process.env.NODE_ENV}.env` : '.env')
})

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/chat', express.static('public/chat.html'));

const loggerMiddleware = require('./src/middleware/logger')
const session = require('./src/middleware/session')

/**
 * Middleware
 */
app.use(loggerMiddleware);
app.use(session);

const router = require('./src/routes')

/**
 * Router
 */
app.use('/api', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

app.listen(process.env.PORT, () => {
  console.log(`Chat Bot listening on port ${process.env.PORT}`)
})