'use strict';

const { exec } = require('child_process');
const { copyFileToS3 } = require('./utils.js');

async function synthesize(text, fileName) {
  // Access the environment variable for the API key
  const apiKey = process.env.ELEVENLABS_API_KEY;

  // Ensure the API key is available
  if (!apiKey) {
    throw new Error('Missing ELEVENLABS_API_KEY environment variable');
  }

  const cmd = `
    curl -X 'POST' \
      'https://api.elevenlabs.io/v1/text-to-speech/ErXwobaYiN019PkySvjV' \
      --header 'accept: audio/mpeg' \
      --header 'xi-api-key: ${apiKey}' \
      --header 'Content-Type: application/json' \
      --data '{
        "text": "${text}",
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
          "stability": 0.5,
          "similarity_boost": 0.5
        }
      }'
  `;

  return new Promise((resolve, reject) => {
    // Execute the curl command
    exec(cmd, { maxBuffer: 50 * 1024 * 1024 }, async (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        return;
      }

      // Use stdout directly as it contains the audio data
      const audioContent = Buffer.from(stdout, 'binary');

      // Write the binary audio content to S3 compatible storage
      await copyFileToS3(audioContent, fileName);
      
      resolve();
    });
  });
}

module.exports = {
  synthesize
}
