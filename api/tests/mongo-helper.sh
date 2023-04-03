#!/bin/bash
# Start a local development environment with a seeded MongoDB.

MONGO_DEV_CONTAINER_NAME=mongo
MONGO_TEST_CONTAINER_NAME=mongo-test
MONGO_VERSION=mongo:6-jammy

function usage {
    echo ''
    echo '━━━━━━━━ Mongo Test Helper - 0.1.0 ━━━━━━━━'
    echo ''
    echo "Usage: $(basename "$0") [-hst]" 2>&1
    echo ''
    echo '   -s   start test container'
    echo '   -t   stop test container'
    exit 0
}

# list of arguments expected in the input
optstring=":hmatsweixrnp"

while getopts ${optstring} arg; do
    case ${arg} in
    h)
        echo "showing usage!"
        usage
        ;;
    s)
        START=true
        ;;
    t)
        STOP=true
        ;;
    ?)
        echo "Invalid option: -${OPTARG}."
        exit 2
        ;;
    esac
done

if [[ ${START} ]]; then
    if [ "$(docker ps -q -f name=$MONGO_DEV_CONTAINER_NAME)" ]; then
        echo "Stopping MongoDB dev container..."
        docker stop $MONGO_DEV_CONTAINER_NAME
    fi

    if [ "$(docker ps -q -f name=$MONGO_TEST_CONTAINER_NAME)" ]; then
        echo "Stopping MongoDB test container..."
        docker stop $MONGO_TEST_CONTAINER_NAME
        echo "Removing MongoDB test container..."
        docker rm $MONGO_TEST_CONTAINER_NAME
    fi

    if [ "$(docker ps -aq -f status=exited -f name=$MONGO_TEST_CONTAINER_NAME)" ]; then
        echo "Starting MongoDB test container..."
        docker start $MONGO_TEST_CONTAINER_NAME
        exit 0
    fi

    echo "Starting MongoDB test container..."
    docker run --name $MONGO_TEST_CONTAINER_NAME -d -p 27017:27017 $MONGO_VERSION
    exit 0
fi

if [[ ${STOP} ]]; then

    if [ "$(docker ps -q -f name=$MONGO_TEST_CONTAINER_NAME)" ]; then
        echo "Stopping MongoDB test container..."
        docker stop $MONGO_TEST_CONTAINER_NAME
        echo "Removing MongoDB test container..."
        docker rm $MONGO_TEST_CONTAINER_NAME
    fi

    if [ "$(docker ps -aq -f status=exited -f name=$MONGO_DEV_CONTAINER_NAME)" ]; then
        docker start $MONGO_DEV_CONTAINER_NAME
        exit 0
    fi

    echo "Starting MongoDB dev container..."
    docker run --name $MONGO_DEV_CONTAINER_NAME -d -p 27017:27017 --mount source=v1,target=/data/db --mount source=v2,target=/data/configdb $MONGO_VERSION
    exit 0
fi
