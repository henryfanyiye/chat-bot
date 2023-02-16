'use strict'
const {Configuration, OpenAIApi} = require('openai')
const {markdownToTxt} = require('markdown-to-txt')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const getOpenAiReply = async (prompt) => {
  console.log('Q：', prompt)
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt.trim(),
    temperature: 0.9, // 每次返回的答案的相似度0-1（0：每次都一样，1：每次都不一样）
    max_tokens: 4000,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [' Human:', ' AI:'],
  }, {
    timeout: 60 * 1000
  })

  const reply = markdownToTxt(response.data.choices[0].text)
  console.log('A：', reply)
  return reply
}

// function markdownToText(markdown) {
//   return remark()
//     .use(stripMarkdown)
//     .processSync(markdown ?? '')
//     .toString()
// }

module.exports = {getOpenAiReply}