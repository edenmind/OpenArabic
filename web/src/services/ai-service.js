import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY || '123',
  dangerouslyAllowBrowser: true
})

export async function getChatCompletionMessage(message) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: message }],
    model: 'gpt-4', //gpt-4
    temperature: 0,
    max_tokens: 1024,
    top_p: 0.7,
    frequency_penalty: 0,
    presence_penalty: 0
  })

  return chatCompletion.choices[0].message.content
}
