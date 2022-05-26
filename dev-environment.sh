#!/bin/bash
# Start a local development environment with a seeded MongoDB.

function usage {
        echo "Usage: $(basename "$0") [-hmaswd]" 2>&1
        echo '   -h   display usage information'
        echo '   -m   start MongoDB database'
        echo '   -a   start API Server using Fastify and Node.JS'
        echo '   -t   start Tashkeel Microservice using Python'
        echo '   -s   start Static Content Server using Vercel Serve'
        echo '   -w   start Frontend React.js'
        echo '   -e   start Expo Mobile'
        exit 1
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
    :)
      echo "$0: Must supply an argument to -$OPTARG." >&2
      exit 1
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
  docker run --name mongo -d -p 27017:27017 mongo
fi

if [[ ${TASHKEEL} ]]; then
  echo "Starting static content in ./static"
  # gunicorn...
fi
 
if [[ ${API} ]]; then
  echo "Starting backend API in ./api"
  yarn dev --prefix ./api
fi
 
if [[ ${STATIC} ]]; then
  echo "Starting static content in ./static"
  yarn start --prefix ./static
fi
 
if [[ ${WEB} ]]; then
  echo "Staring frontend web app in ./web"
  yarn start --prefix ./web
fi

if [[ ${EXPO} ]]; then
  echo "Starting Expo mobile app in ./mobile"
  yarn start --prefix ./mobile 
fi