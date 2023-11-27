const { TwitterApi } = require('twitter-api-v2')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

async function downloadImage(url, filepath) {
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'arraybuffer'
  })
  fs.writeFileSync(filepath, response.data)
}

async function fetchAndPostTwitterThread() {
  // Replace with your credentials
  const twitterClient = new TwitterApi({
    appKey: 'pmLdD4MkcmbhfqdnY5lFRg957',
    appSecret: 'es6koFAwU3XFlFS9t1MY8jk9fyUKNmPawtPGprOnBXf1HUyNT9',
    accessToken: '1327982041099595776-rygqzHGAs7ZjxVievNtCzbdnsfSbkH',
    accessSecret: 'WbtS8bM7Kn54resx5qiGgUAzO6MbfCmj5xaysCsYGHoTk'
  })

  try {
    // Fetching the data
    const response = await axios.get('https://backend.openarabic.io/texts/656395a1279b60af1fc67bd5')
    const data = response.data

    // Download the image
    const imagePath = path.join(__dirname, 'tempImage.jpg')
    await downloadImage(data.image, imagePath)

    // Upload the image to Twitter
    const mediaId = await twitterClient.v1.uploadMedia(imagePath, { type: 'jpg' })

    // Prepare tweets for the thread
    const tweets = []

    // Add the first tweet with title, author, and image
    tweets.push({
      text: `Title: ${data.title}\nAuthor: ${data.author}\nSource: ${data.source}`,
      media: { media_ids: [mediaId] }
    })
    // Iterate over the sentences and add them to the thread
    let postNumber = 1
    for (const sentence of data.sentences) {
      tweets.push(`${postNumber}/ ${sentence.english}`)
      tweets.push(sentence.arabic)
      postNumber++
    }

    tweets.push('📱 Download the OpenArabic app to enhance your Arabic vocabulary skills.')

    // Post the thread
    await twitterClient.v2.tweetThread(tweets)

    console.log('Twitter thread created successfully!')
  } catch (error) {
    console.error('Error occurred:', error)
  }
}

fetchAndPostTwitterThread()
