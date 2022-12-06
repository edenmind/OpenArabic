/* eslint-disable putout/putout */
/* eslint-disable unicorn/throw-new-error */

'use strict'

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech')

// Import other required libraries
const fs = require('node:fs')
const util = require('node:util')
// Creates a client
const client = new textToSpeech.TextToSpeechClient()

async function synthesize(text, languageCode, fileName) {
  // Construct the request
  const request = {
    input: { text },
    voice: { languageCode, ssmlGender: 'MALE', name: 'ar-XA-Wavenet-C' },
    audioConfig: { audioEncoding: 'MP3' }
  }

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request)

  //verify that the response is not empty
  if (!response.audioContent) {
    throw new Error('Received empty audioContent')
  }

  // Write the binary audio content to a local file
  const directory = '/data'
  const filePath = `${directory}/${fileName}`
  const writeFile = util.promisify(fs.writeFile)
  await writeFile(filePath, response.audioContent, 'binary')
}

module.exports = {
  synthesize
}
