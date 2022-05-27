#!/bin/bash
# Start a local development environment with a seeded MongoDB.

function usage {
        echo ''
        echo '━━━━━━━━ OpenArabic Developer Environment - 0.1.0 ━━━━━━━━'
        echo ''
        echo "Usage: $(basename "$0") [-hmatswe]" 2>&1
        echo ''
        echo '   -h   display usage information'
        echo '   -m   start MongoDB database with seeded data'
        echo '   -a   start API Server using Fastify and Node.js'
        echo '   -t   start Tashkeel Microservice using Python'
        echo '   -s   start Static Content Server using Vercel Serve'
        echo '   -w   start Frontend React.js'
        echo '   -e   start Expo Mobile'
        exit 0
}

if [[ ${#} -eq 0 ]]; then
   usage
fi

# list of arguments expected in the input
optstring=":hmatswe"

while getopts ${optstring} arg; do
  case ${arg} in
    h)
      echo "showing usage!"
      usage
      ;;
    m)
      MONGO=true
      ;;
    a)
      API=true
      ;;
    t)
      TASHKEEL=true
      ;;
    s)
      STATIC=true
      ;;
    w)
      WEB=true
      ;;
    e)
      EXPO=true
      ;;
    ?)
      echo "Invalid option: -${OPTARG}."
      exit 2
      ;;
  esac
done

echo "Setting up local development environment..."
 
if [[ ${MONGO} ]]; then
  echo "Starting MongoDB..."
  if [ ! "$(docker ps -q -f name=mongo)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=mongo)" ]; then
        docker rm mongo
    fi
    docker run --name mongo -d -p 27017:27017 mongo:focal-5
    docker exec -i mongo sh -c 'mongoimport -c mongo -d openarabic --drop' < ./database/seed/devdata.json

  fi
fi

if [[ ${TASHKEEL} ]]; then
  echo "Starting tashkeel service in ./static"
  # gunicorn...
fi
 
if [[ ${API} ]]; then
  echo "Starting backend API in ./api"
  yarn --cwd ./api dev
fi
 
if [[ ${STATIC} ]]; then
  echo "Starting static content in ./static"
  yarn --cwd ./static dev
fi
 
if [[ ${WEB} ]]; then
  echo "Staring frontend web app in ./web"
  yarn --cwd ./web start
fi

if [[ ${EXPO} ]]; then
  echo "Starting Expo mobile app in ./mobile"
  yarn --cwd ./mobile start
fi