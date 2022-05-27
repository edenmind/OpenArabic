#!/bin/bash
# Start a local development environment with a seeded MongoDB.

MONGO_VERSION=mongo:5-focal
MONGO_CONTAINER_NAME=mongo
MONGO_EXPORT=./database/mock/devdata-export.json
MONGO_IMPORT=./database/mock/devdata-import.json

function usage {
        echo ''
        echo '━━━━━━━━ OpenArabic Dev eXperience - 0.1.0 ━━━━━━━━'
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
        echo '   -x   extract seed data from MongoDB'
        echo '   -i   import seed data into MongoDB'
        exit 0
}

if [[ ${#} -eq 0 ]]; then
   usage
fi

# list of arguments expected in the input
optstring=":hmatswexi"

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
    x)
      EXPORT=true
      ;;
    i)
      IMPORT=true
      ;;
    ?)
      echo "Invalid option: -${OPTARG}."
      exit 2
      ;;
  esac
done

echo "Setting up local development environment..."
 
if [[ ${MONGO} ]]; then
  if [ ! "$(docker ps -q -f name=$MONGO_CONTAINER_NAME)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=$MONGO_CONTAINER_NAME)" ]; then
        docker rm $MONGO_CONTAINER_NAME
    fi
    echo "Starting MongoDB..."
    docker run --name $MONGO_CONTAINER_NAME -d -p 27017:27017 $MONGO_VERSION
  fi
  echo "MongoDB is already running..."
fi

if [[ ${IMPORT} ]]; then
  echo "Importing seed data to MongoDB..."
  docker exec -i $MONGO_CONTAINER_NAME sh -c 'mongoimport -c openarabic -d openarabic --drop' < $MONGO_IMPORT
fi

if [[ ${EXPORT} ]]; then
  echo "Export data to MongoDB..."
  docker exec -i $MONGO_CONTAINER_NAME sh -c 'mongoexport -c openarabic -d openarabic' > $MONGO_EXPORT
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