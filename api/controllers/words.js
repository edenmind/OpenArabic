/* eslint-disable putout/keyword-spacing */
/* eslint-disable putout/putout */

'use strict'

const COLLECTIONS = require('../constants/collections.js')

async function addWord(request, reply) {
  const { translatedWord } = request.body
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)

  //check that translatedWord is not empty
  const translatedWordEnglishContainsEmptyValues = Object.values(translatedWord.english).includes('')
  const translatedWordArabicContainsEmptyValues = Object.values(translatedWord.arabic).includes('')

  if (translatedWordEnglishContainsEmptyValues || translatedWordArabicContainsEmptyValues) {
    reply.code(400).send({ message: 'Arabic or English word is empty!', state: 'error' })
  }

  // Check that the word does not already exist
  const wordAlreadyExists = await words.findOne({ arabic: translatedWord.arabic })

  if (wordAlreadyExists) {
    reply.code(409).send({ message: 'Word already exists!', state: 'error' })
  }

  //Add Word to database
  try {
    await words.insertOne(translatedWord)
    reply.code(201).send({ message: 'Word added successfully!', state: 'success' })
  } catch (error) {
    reply.code(500).send({ message: `Something went wrong with error ${error}`, state: 'error' })
  }
}

async function getWord(request, reply) {
  const { id } = request.params
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)
  const word = await words.findOne({ arabic: id })

  if (word) {
    reply.code(200).send(word.english)
  } else {
    reply.code(404).send({ message: 'Word not found!', state: 'error' })
  }
}
module.exports = {
  addWord,
  getWord
}
