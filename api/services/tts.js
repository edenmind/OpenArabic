/* eslint-disable putout/putout */

'use strict'

const textToSpeech = require('@google-cloud/text-to-speech')
const { copyFileToS3 } = require('./utils.js')

const client = new textToSpeech.TextToSpeechClient()

async function synthesize(text, languageCode, fileName) {
  // Construct the request
  const request = {
    input: { text },
    voice: { languageCode, ssmlGender: 'MALE', name: 'ar-XA-Wavenet-C' },
    audioConfig: { audioEncoding: 'MP3', speakingRate: 0.6, pitch: -4, effectsProfileId: ['headphone-class-device'] }
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
