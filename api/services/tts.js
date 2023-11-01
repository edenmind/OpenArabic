'use strict';

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { copyFileToS3 } = require('./utils.js');

async function synthesize(text, fileName) {
  // Access the environment variable for the API key
  const apiKey = process.env.ELEVENLABS_API_KEY;

  // Ensure the API key is available
  if (!apiKey) {
    throw new Error('Missing ELEVENLABS_API_KEY environment variable');
  }

  // Generate a temporary path for the audio file
  const tmpFilePath = path.join(__dirname, `${fileName}.mp3`);

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
      }' \
      --output '${tmpFilePath}'
  `;

  return new Promise((resolve, reject) => {
    // Execute the curl command
    exec(cmd, { maxBuffer: 50 * 1024 * 1024 }, async (error) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        return;
      }

      // Read the audio data from the temporary file
      const audioContent = fs.readFileSync(tmpFilePath);

      // Write the binary audio content to S3 compatible storage
      await copyFileToS3(audioContent, fileName);
      
      // Remove the temporary file after copying to S3
      fs.unlinkSync(tmpFilePath);

      resolve();
    });
  });
}

module.exports = {
  synthesize
}
