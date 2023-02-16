'use strict'
const express = require('express')
const {question} = require('../controller/chat')

const router = express.Router();

/**
 * Chat
 */
router.post('/chat/question', question);

/**
 * Session
 */

module.exports = router
