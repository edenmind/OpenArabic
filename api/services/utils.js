// do not lint this file
/* eslint-disable no-console */

//disable putout/putout in this file for eslint
/* eslint-disable putout/putout */

'use strict'

const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3')
const moment = require('moment')

const getRandomIndices = (n, max) => {
  const indices = new Set()

  while (indices.size < n) {
    indices.add(Math.floor(Math.random() * max))
  }

  return [...indices]
}

//return true if all objects are not empty
const validateThatNoObjectsAreEmpty = (data) => {
  return Object.values(data).every((value) => value !== '')
}

const validateAPIKey = (auth) => {
  return auth === process.env.API_KEY
}

//function to remove host from url
const removeHost = (url) => {
  //only keep the part in url after the last /
  return url.slice(Math.max(0, url.lastIndexOf('/') + 1))
}

//function to copy files from a local directory to a Amazon S3 bucket
const copyFileToS3 = async (fileContent, fileName) => {
  const s3Client = new S3Client({
    endpoint: 'https://ams3.digitaloceanspaces.com',
    forcePathStyle: false,
    region: 'ams3',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  })

  const parameters = {
    Bucket: 'openarabic',
    Body: fileContent,
    Key: 'audio/' + fileName,
    ACL: 'public-read',
    ContentType: 'audio/mpeg'
  }

  try {
    await s3Client.send(new PutObjectCommand(parameters))
    console.log('Successfully uploaded object: ' + parameters.Bucket + '/' + parameters.Key)
  } catch (error) {
    throw new Error('Error', error)
  }
}

//return time ago from date using moment
const timeAgo = (date) => moment(date).fromNow()

//shuffles an array
const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

module.exports = {
  shuffleArray,
  timeAgo,
  copyFileToS3,
  removeHost,
  validateThatNoObjectsAreEmpty,
  validateAPIKey,
  getRandomIndices
}
