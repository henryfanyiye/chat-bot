'use strict'
const {getSession, setSession} = require('../service/session')

module.exports = async (req, res, next) => {
  const sessionId = req.headers['session-id']
  if (sessionId) {
    const res = await getSession(sessionId)
    if (!res) {
      await setSession(req)
    }
  } else {
    await setSession(req)
  }
  next()
}