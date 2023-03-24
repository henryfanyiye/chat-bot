'use strict'
const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let data = []
const getOpenAiReply = async (messages) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages
  })
  return response.data.choices[0].message
}

module.exports = {getOpenAiReply}