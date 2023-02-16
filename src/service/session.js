'use strict'
const {nanoid} = require("nanoid");
const {get, set} = require('../lib/redis')

exports.getSession = async (key) => {
  return await get(key)
}

exports.setSession = async (req) => {
  req.headers['session-id'] = nanoid()
  return await set(req.headers['session-id'], req.headers['session-id'], 3600)
}