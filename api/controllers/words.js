/* eslint-disable putout/keyword-spacing */
/* eslint-disable putout/putout */

'use strict'

const COLLECTIONS = require('../constants/collections.js')
const { ObjectId } = require('mongodb')

async function addWord(request, reply) {
  const { word } = request.body
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)

  //check that translatedWord is not empty
  const translatedWordEnglishContainsEmptyValues = Object.values(word.english).includes('')
  const translatedWordArabicContainsEmptyValues = Object.values(word.arabic).includes('')

  if (translatedWordEnglishContainsEmptyValues || translatedWordArabicContainsEmptyValues) {
    reply.code(400).send({ message: 'Arabic or English word is empty!', state: 'error' })
  }

  // Check that the word does not already exist
  const wordAlreadyExists = await words.findOne({ arabic: word.arabic })

  if (wordAlreadyExists) {
    reply.code(409).send({ message: 'Word already exists!', state: 'error' })
  }

  //ad an id to the word
  const wordWithId = {
    ...word,
    id: new ObjectId()
  }

  //Add Word to database
  try {
    await words.insertOne(wordWithId)
    reply.code(201).send({ message: 'Word added successfully!', state: 'success' })
  } catch (error) {
    reply.code(500).send({ message: `Something went wrong with error ${error}`, state: 'error' })
  }
}

async function getWord(request, reply) {
  const { id } = request.params
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)
  const word = await words.findOne({ id: new ObjectId(id) })

  if (word) {
    reply.code(200).send(word)
  } else {
    reply.code(404).send({ message: 'Word not found!', state: 'error' })
  }
}

async function getWordTranslation(request, reply) {
  const { id } = request.params
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)
  const word = await words.findOne({ arabic: id })

  if (word) {
    reply.code(200).send(word.english)
  } else {
    reply.code(404).send({ message: 'Word not found!', state: 'error' })
  }
}

async function getWords(request, reply) {
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)
  const allWords = await words.find({}).toArray()

  if (allWords) {
    reply.code(200).send(allWords)
  } else {
    reply.code(404).send({ message: 'No words found!', state: 'error' })
  }
}

async function deleteWord(request, reply) {
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)
  const result = await words.deleteOne({ id: new ObjectId(request.params.id) })

  if (result.deletedCount) {
    return reply.send('Deleted')
  }

  reply.internalServerError('Could not delete word!')
}

async function updateWord(request, reply) {
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)
  const { word } = request.body
  const { arabic, english } = word
  const updateDocument = {
    $set: {
      arabic,
      english
    }
  }
  const result = await words.updateOne({ id: new ObjectId(request.params.id) }, updateDocument, { upsert: true })

  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  })
}

module.exports = {
  addWord,
  getWord,
  getWordTranslation,
  getWords,
  deleteWord,
  updateWord
}
