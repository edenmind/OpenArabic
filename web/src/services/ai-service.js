import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export async function getChatCompletionMessage(message) {
  const chatCompletion = await openai.createChatCompletion({
    messages: [{ role: 'user', content: message }],
    model: 'gpt-4', //gpt-4
    temperature: 0,
    max_tokens: 1024,
    top_p: 0.3,
    frequency_penalty: 0,
    presence_penalty: 0
  })

  console.log(chatCompletion.data.choices[0].message.content)

  return chatCompletion.data.choices[0].message.content
}
