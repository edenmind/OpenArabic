/* eslint-disable newline-per-chained-call */

'use strict'

const { v4: uuidv4 } = require('uuid')
const COLLECTIONS = require('../constants/collections.js')

const { ObjectId } = require('mongodb')

async function listTexts(request, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const textList = request.params.id
    ? await texts.find({ category: request.params.id }).toArray()
    : await texts.find({}).toArray()

  const textListSortedByCreated = textList.sort((a, b) => a.createdAt - b.createdAt)
  reply.code(200).send(textListSortedByCreated)
}

async function addText(request, reply) {
  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const id = new ObjectId()
  const createdAt = new Date().toISOString().slice(0, 10)
  const { title, author, category, source, sentences, texts, status } = request.body
  const data = {
    title,
    author,
    createdAt,
    category,
    source,
    id,
    sentences,
    texts,
    status
  }
  const result = await textsCollection.insertOne(data)

  reply.code(201).send(result.insertedId)
}

async function getText(request, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)

  const text = await texts.findOne({ id: new ObjectId(request.params.id) })

  const vocabularyCollection = produceVocabularyCollection(text)
  text.vocabularyCollection = vocabularyCollection

  text ? reply.send(text) : reply.notFound('The Text was not found')
}

async function updateText(request, reply) {
  const textsCollection = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const updatedAt = new Date().toISOString().slice(0, 10)
  const { title, author, category, sentences, source, texts, status } = request.body
  const { arabic, english } = texts
  const updateDocument = {
    $set: {
      title,
      category,
      status,
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
  const result = await textsCollection.updateOne({ id: new ObjectId(request.params.id) }, updateDocument, {
    upsert: true
  })

  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  })
}

async function deleteText(request, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const result = await texts.deleteOne({ id: new ObjectId(request.params.id) })
  result.deletedCount ? reply.send('Deleted') : reply.internalServerError('Could not delete Text.')
}

// Helper functions

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function produceVocabularyCollection(text) {
  const arabicVocabulary = []
  const englishVocabulary = []

  for (const sentence of text.sentences) {
    if (arabicVocabulary.length === 5) {
      continue
    }

    for (const word of sentence.words) {
      if (arabicVocabulary.length === 5) {
        continue
      }

      const wordId = uuidv4()

      const arabicWord = {
        word: word.arabic,
        wordId
      }

      const englishWord = {
        word: word.english,
        wordId
      }

      arabicVocabulary.push(arabicWord)
      englishVocabulary.push(englishWord)
    }
  }

  return {
    arabic: shuffleArray(arabicVocabulary),
    english: shuffleArray(englishVocabulary)
  }
}

module.exports = {
  listTexts,
  addText,
  getText,
  updateText,
  deleteText
}
