/* eslint-disable putout/putout */
/* eslint-disable unicorn/throw-new-error */

'use strict'

const textToSpeech = require('@google-cloud/text-to-speech')
const { copyFileToS3 } = require('./utils.js')

const client = new textToSpeech.TextToSpeechClient()

async function synthesize(text, languageCode, fileName) {
  // Construct the request
  const request = {
    input: { text },
    voice: { languageCode, ssmlGender: 'MALE', name: 'ar-XA-Wavenet-B' },
    audioConfig: { audioEncoding: 'OGG_OPUS' },
    speakingRate: 0.7
  }

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request)

  //verify that the response is not empty
  if (!response.audioContent) {
    throw new Error('Received empty audioContent')
  }

  // Write the binary audio content to S3 compatible storage
  await copyFileToS3(response.audioContent, fileName)
}

module.exports = {
  synthesize
}
