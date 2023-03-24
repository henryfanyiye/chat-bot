'use strict'
const {getOpenAiReply} = require("../service/openAI");
const {success, error} = require("../lib/response");

exports.question = async (req, res) => {
  try {
    const content = req.body.content
    if (content) {
      console.log('ID：', req.sessionID)
      console.log('Q：', content)
      if (!req.session.message) req.session.message = []
      req.session.message.push({"role": "user", content})
      const result = await getOpenAiReply(req.session.message)
      req.session.message.push(result)
      console.log('A：', result.content)
      res.send(success(result.content))
    } else {
      res.send(error(201, 'Content is not null'))
    }
  } catch (e) {
    res.send(error(e.code, e.message))
  }
}