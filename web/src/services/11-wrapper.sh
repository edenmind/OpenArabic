#!/bin/sh

# curl -X 'GET' \
#   'https://api.elevenlabs.io/v1/voices' \
#   --header 'accept: application/json' \
#   --header 'xi-api-key: bce3efe706498f0e5f1c70130ed6b852'

# curl -X 'GET' \
#   'https://api.elevenlabs.io/v1/models' \
#   --header 'accept: application/json' \
#   --header 'xi-api-key: bce3efe706498f0e5f1c70130ed6b852'

curl -X 'POST' \
  'https://api.elevenlabs.io/v1/text-to-speech/ErXwobaYiN019PkySvjV' \
  --header 'accept: audio/mpeg' \
  --header 'xi-api-key: bce3efe706498f0e5f1c70130ed6b852' \
  --header 'Content-Type: application/json' \
  --data '{
    "text": "الْأَعْمَالُ",
    "model_id": "eleven_multilingual_v2",
    "voice_settings": {
      "stability": 0.5,
      "similarity_boost": 0.5
    }
  }' --output "voice.mp3"
