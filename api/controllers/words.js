/* eslint-disable putout/putout */

'use strict'

const COLLECTIONS = require('../constants/collections.js')

async function addWord(request, reply) {
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)
  const { translatedWord } = request.body

  // Make sure that the words are not empty
  if (translatedWord.english.length === 0 < 0 && translatedWord.arabic.length < 0) {
    return reply.code(400).send({ message: 'Arabic or English word is empty!', state: 'error' })
  }

  //Check if arabic Word already exists
  const wordExists = await words.findOne({
    arabic: translatedWord.arabic
  })

  if (wordExists) {
    return reply.code(409).send({ message: 'Word already exists', state: 'error' })
  }

  //Add Word to database
  const result = await words.insertOne(translatedWord)

  reply.code(201).send({ message: `Word inserted with id: ${result.insertedId}` })
}

async function getWord(request, reply) {
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)
  const { id } = request.params

  console.log('arabic word:', id)

  const word = await words.findOne({ arabic: id })

  if (word !== null) {
    console.log('found the word:', word.english)
    reply.send(word.english)
  }

  return reply.code(404).send({ message: 'Word not found' })
}
module.exports = {
  addWord,
  getWord
}
