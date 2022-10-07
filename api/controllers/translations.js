/* eslint-disable putout/putout */

'use strict'

const COLLECTIONS = require('../constants/collections.js')

async function addTranslation(request, reply) {
  const translations = this.mongo.db.collection(COLLECTIONS.TRANSLATIONS)
  const { translatedWord } = request.body

  // Make sure that the words are not empty
  if (translatedWord.english.length === 0 < 0 && translatedWord.arabic.length < 0) {
    return reply.code(400).send({ message: 'Arabic or English word is empty!', state: 'error' })
  }

  //Check if arabic translation already exists
  const translationExists = await translations.findOne({
    arabic: translatedWord.arabic
  })

  if (translationExists) {
    return reply.code(409).send({ message: 'Translation already exists', state: 'error' })
  }

  //Add translation to database
  const result = await translations.insertOne(translatedWord)

  reply.code(201).send({ message: `Translation inserted with id: ${result.insertedId}` })
}

async function getTranslation(request, reply) {
  const translations = this.mongo.db.collection(COLLECTIONS.TRANSLATIONS)
  const { arabicWord } = request.params

  const translation = await translations.findOne({ arabic: arabicWord })

  if (!translation) {
    return reply.code(404).send({ message: 'Translation not found' })
  }

  reply.code(200).send(translation)
}
module.exports = {
  addTranslation,
  getTranslation
}
