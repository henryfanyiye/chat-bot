'use strict'
const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv')
const path = require('path')
const session = require("express-session");

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
app.use('/', express.static('public'));
app.use('/chat', express.static('public/chat.html'));

app.use(session({
  secret: 'this is string key',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
  name: 'session_id',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
  resave: false,   /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
  saveUninitialized: true,   //强制将未初始化的 session 存储。  默认值是true  建议设置成true
  cookie: {
    // maxAge: 3600    /*过期时间*/
  },
  rolling: true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
}))

const loggerMiddleware = require('./src/middleware/logger')

/**
 *
 * Middleware
 */
// app.use(loggerMiddleware);

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