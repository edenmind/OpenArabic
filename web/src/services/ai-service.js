const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export async function getChatCompletionMessage(message) {
  const chatCompletion = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: message }]
  })

  return chatCompletion.data.choices[0].message.content
}
