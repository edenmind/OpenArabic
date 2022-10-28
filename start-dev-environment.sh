#!/bin/bash

set -e -o pipefail -u

MONGO_VERSION=mongo:5-focal
MONGO_CONTAINER_NAME=mongo
MONGO_MOCK_DIR=./database/mock/

function usage {
  echo ''
  echo '━━━━━━━━ OpenArabic Dev Xperience - 0.1.0 ━━━━━━━━'
  echo ''
  echo "Usage: $(basename "$0") [-hmatsweixr]" 2>&1
  echo ''
  echo '   -h   display usage information'
  echo '   -m   start MongoDB database'
  echo '   -a   start API Server using Fastify and Node.js'
  echo '   -t   start Tashkeel Microservice using Python'
  echo '   -s   start Static Content Server using Vercel Serve'
  echo '   -w   start Frontend React.js'
  echo '   -e   start Expo Mobile'
  echo '   -x   extract current data from MongoDB'
  echo '   -i   import seed data into MongoDB'
  echo '   -r   release mobile app'
  exit 0
}

if [[ ${#} -eq 0 ]]; then
  usage
fi

# list of arguments expected in the input
optstring=":hmatsweixr"

while getopts ${optstring} arg; do
  case ${arg} in
  h)
    echo "Showing usage..."
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
  r)
    RELEASE=true
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
      docker start $MONGO_CONTAINER_NAME
      exit 0
    fi
    echo "Starting MongoDB using $MONGO_VERSION..."
    docker run --name $MONGO_CONTAINER_NAME -d -p 27017:27017 --mount source=v1,target=/data/db --mount source=v2,target=/data/configdb $MONGO_VERSION
    exit 0
  fi
  echo "MongoDB is already running..."
fi

if [[ ${IMPORT} ]]; then
  echo "Importing seed data to container: $MONGO_CONTAINER_NAME from file: $MONGO_IMPORT..."
  docker exec -i $MONGO_CONTAINER_NAME sh -c 'mongoimport --collection categories --db openarabic --drop' <"$MONGO_MOCK_DIR/categories.json"
  docker exec -i $MONGO_CONTAINER_NAME sh -c 'mongoimport --collection authors --db openarabic --drop' <"$MONGO_MOCK_DIR/authors.json"
  docker exec -i $MONGO_CONTAINER_NAME sh -c 'mongoimport --collection texts --db openarabic --drop' <"$MONGO_MOCK_DIR/texts.json"
fi

if [[ ${EXPORT} ]]; then
  echo "Export data from container: $MONGO_CONTAINER_NAME to file: $MONGO_EXPORT..."
  docker exec -i $MONGO_CONTAINER_NAME sh -c 'mongoexport --collection categories --db openarabic' >"$MONGO_MOCK_DIR/categories.json"
  docker exec -i $MONGO_CONTAINER_NAME sh -c 'mongoexport --collection authors --db openarabic' >"$MONGO_MOCK_DIR/authors.json"
  docker exec -i $MONGO_CONTAINER_NAME sh -c 'mongoexport --collection texts --db openarabic' >"$MONGO_MOCK_DIR/texts.json"
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

if [[ ${RELEASE} ]]; then
  echo "Starting release of Mobile"
  cp ./mobile/constants/urls.publish.js ./mobile/constants/urls.js
  echo "Releasing..."
  cp ./mobile/constants/urls.development.js ./mobile/constants/urls.js
fi

if [[ ${EXPO} ]]; then
  echo "Starting Expo mobile app in ./mobile"
  yarn --cwd ./mobile start
fi
