'use strict'
const { OpenAI } = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let data = []
const getOpenAiReply = async (messages) => {
  // const response = await openai.createChatCompletion({
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages
  })
  return response.data.choices[0].message
}

module.exports = { getOpenAiReply }
