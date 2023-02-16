'use strict'
const {getOpenAiReply} = require("../service/openAI");
const {success, error} = require("../lib/response");

exports.question = async (req, res) => {
  try {
    const content = req.body.content
    if (content) {
      const result = await getOpenAiReply(content)
      res.send(success(result))
    } else {
      res.send(error(201, 'Content is not null'))
    }
  } catch (e) {
    res.send(error(e.code, e.message))
  }
}