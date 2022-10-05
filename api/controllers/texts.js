/* eslint-disable putout/putout */
/* eslint-disable security/detect-object-injection */
/* eslint-disable prettier/prettier */
/* eslint-disable newline-per-chained-call */

'use strict'

const axios = require('axios').default
const COLLECTIONS = require('../constants/collections.js')
const { produceVocabularyCollection } = require('../services/utils')
const { ObjectId } = require('mongodb')

async function listTexts(request, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const textList = await texts.find({}).toArray()
  const textListSortedByCreatedAt = textList.sort((a, b) => a.publishAt - b.publishAt)

  reply.code(200).send(textListSortedByCreatedAt)
}

async function listTextsWithId(request, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const textList = await texts.find({ category: request.params.id }).toArray()
  const textListSortedByCreatedAt = textList.sort((a, b) => a.publishAt - b.publishAt)

  reply.code(200).send(textListSortedByCreatedAt)
}

async function addText(request, reply) {
  const { headers, body } = request
  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const id = new ObjectId()
  const createdAt = new Date()
  const { title, author, category, source, sentences, texts, publishAt, status, image } = body
  const { auth } = headers

  if (auth !== process.env.API_KEY) {
    throw 'Error: Not authorized with' + auth
  }

  const data = {
    title,
    author,
    image,
    createdAt,
    publishAt,
    category,
    source,
    id,
    sentences,
    texts,
    status
  }

  let checkForEmptySuccess = true
  let checkForEmptyMessage = ''

  for (const key in data) {
    if (data[key].length === 0) {
      checkForEmptySuccess = false
      checkForEmptyMessage = `${key} must have a value!`
    }
  }

  if (checkForEmptySuccess) {
    const result = await textsCollection.insertOne(data)
    reply.code(201).send(result.insertedId)
  } else {
    reply.internalServerError(checkForEmptyMessage)
  }
}

async function getText(request, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const text = await texts.findOne({ id: new ObjectId(request.params.id) })
  const vocabularyCollection = produceVocabularyCollection(text)

  text.vocabularyCollection = vocabularyCollection

  text ? reply.send(text) : reply.notFound('The text was not found')
}

async function getTashkeel(request, reply) {
  const { encodedText } = request.body
  const url = `${process.env.API_TASHKEEL_URL}/tashkeel?unvoweled=${encodedText}`
  const response = await axios.get(url)

  reply.send(response.data)
}

async function updateText(request, reply) {
  const { body, headers } = request
  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const updatedAt = new Date()
  const { auth } = headers

  if (auth !== process.env.API_KEY) {
    throw 'Error'
  }

  const { title, author, category, sentences, source, texts, publishAt, status, image } = body
  const { arabic, english } = texts
  const data = {
    $set: {
      title,
      category,
      status,
      image,
      publishAt,
      updatedAt,
      texts: {
        arabic,
        english
      },
      author,
      source,
      sentences
    }
  }

  let checkForEmptySuccess = true
  let checkForEmptyMessage = ''

  for (const key in data.$set) {
    if (data.$set[key].length === 0) {
      checkForEmptySuccess = false
      checkForEmptyMessage = `${key} must have a value!`
    }
  }

  if (checkForEmptySuccess) {
    const result = await textsCollection.updateOne({ id: new ObjectId(request.params.id) }, data, {
      upsert: true
    })
    reply.send({
      message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    })
  } else {
    reply.internalServerError(checkForEmptyMessage)
  }
}

async function deleteText(request, reply) {
  const { auth } = request.headers

  if (auth !== process.env.API_KEY) {
    throw 'Error: Not authorized with' + auth
  }

  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const result = await texts.deleteOne({ id: new ObjectId(request.params.id) })
  result.deletedCount ? reply.send('Deleted') : reply.internalServerError('Could not delete Text.')
}

// Helper functions

module.exports = {
  listTexts,
  listTextsWithId,
  addText,
  getText,
  getTashkeel,
  updateText,
  deleteText
}
