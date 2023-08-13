'use strict'

const mongoose = require('mongoose')
const { TwitterApi } = require('twitter-api-v2')

// Initialize Twitter client
const twitterClient = new TwitterApi({
  appKey: 'Z7Ro8Pj6K2jDOdh5d9Zvz2F8g',
  appSecret: 'w7YGdDkKyZ7Pxbn7MkqmQAqYlp8KNxwPWKKAiiXiaIWIKjVOZB',
  accessToken: '1327982041099595776-bO4l0SoW8QuYnCOxxw5EwlbWv5aEPy',
  accessSecret: 'wJBiPkcLQPdyBqC7gEXjZkzDmb88cPHQPHGhFc7q9IrMT'
})

// Mongoose model
// eslint-disable-next-line putout/putout
const Schema = mongoose.Schema

const DataSchema = new Schema({
  // Define your schema fields here...
  title: String,
  author: String,
  category: String
  // ... (and so on for all your fields)
})

const Data = mongoose.model('Data', DataSchema)

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://openarabic:Em439618ofKLAG27@memorizer-77b269d9.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=memorizer',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

async function fetchFromDatabaseById(id) {
  return await Data.findById(id)
}

async function postTweet(status, replyToId = null) {
  const tweetOptions = {
    status,
    ...(replyToId ? { in_reply_to_status_id: replyToId } : {})
  }

  const tweetResponse = await twitterClient.v1.tweet(tweetOptions)
  return tweetResponse.id_str
}

async function createThread(id) {
  const data = await fetchFromDatabaseById(id)

  const initialStatus = `${data.title} by ${data.author}\nCategory: ${data.category}`
  const media = await twitterClient.v1.uploadMediaByUrl(data.image)
  const mediaId = media.media_id_string

  let tweetId = await postTweet(`${initialStatus}\nMedia: ${mediaId}`)

  // Subsequent tweets from sentences in both English and Arabic
  for (const sentence of data.sentences) {
    const enTweetId = await postTweet(`EN: ${sentence.english}`, tweetId)
    tweetId = await postTweet(`AR: ${sentence.arabic}`, enTweetId)
  }
}

// Usage
createThread('YOUR_DOCUMENT_ID').catch((error) => {
  // eslint-disable-next-line putout/putout
  console.error('There was an error:', error)
})
