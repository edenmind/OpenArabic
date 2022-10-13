/* eslint-disable putout/keyword-spacing */
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

  if (textListSortedByCreatedAt.length > 0) {
    reply.code(200).send(textListSortedByCreatedAt)
  } else {
    reply.code(404).send('No texts found!')
  }
}

async function listTextsWithId(request, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const textList = await texts.find({ category: request.params.id }).toArray()
  const textListSortedByCreatedAt = textList.sort((a, b) => a.publishAt - b.publishAt)

  if (textListSortedByCreatedAt.length > 0) {
    reply.code(200).send(textListSortedByCreatedAt)
  } else {
    reply.code(404).send('No texts found!')
  }
}

async function addText(request, reply) {
  const { headers, body } = request
  const { title, author, category, source, sentences, texts, publishAt, status, image } = body
  const { auth } = headers

  const id = new ObjectId()
  const createdAt = new Date()
  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)

  if (auth !== process.env.API_KEY) {
    reply.code(403).send('Not authorized!')
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

  //check that no values are empty
  const dataContainsEmptyValues = Object.values(data).some((value) => value.length === 0)

  if (dataContainsEmptyValues) {
    reply.internalServerError('One or more values are empty!')
  }

  //try to insert the data
  try {
    await textsCollection.insertOne(data)
    reply.code(201).send(id)
  } catch (error) {
    reply.internalServerError(error)
  }
}

async function getText(request, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const text = await texts.findOne({ id: new ObjectId(request.params.id) })

  // Produce vocabulary collection for text
  text.vocabularyCollection = produceVocabularyCollection(text)

  text ? reply.code(200).send(text) : reply.notFound('The text was not found')
}

async function getTashkeel(request, reply) {
  const { encodedText } = request.body
  const url = `${process.env.API_TASHKEEL_URL}/tashkeel?unvoweled=${encodedText}`
  const response = await axios.get(url)

  reply.send(response.data)
}

async function updateText(request, reply) {
  const { body, headers, params } = request
  const { auth } = headers
  const { id } = params

  if (auth !== process.env.API_KEY) {
    reply.code(403).send('Not authorized!')
  }

  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const updatedAt = new Date()

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

  const dataContainsEmptyValues = Object.values(data).some((value) => value.length === 0)

  if (dataContainsEmptyValues) {
    reply.internalServerError('One or more values are empty!')
  }

  const result = await textsCollection.updateOne({ id: new ObjectId(id) }, data, {
    upsert: true
  })

  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  })
}

async function deleteText(request, reply) {
  const { auth } = request.headers

  if (auth !== process.env.API_KEY) {
    reply.code(403).send('Not authorized!')
  }

  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const result = await texts.deleteOne({ id: new ObjectId(request.params.id) })
  result.deletedCount ? reply.code(204).send('Deleted') : reply.internalServerError('Could not delete text!')
}

module.exports = {
  listTexts,
  listTextsWithId,
  addText,
  getText,
  getTashkeel,
  updateText,
  deleteText
}
