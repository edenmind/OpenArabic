/* eslint-disable security/detect-object-injection */
/* eslint-disable prettier/prettier */
/* eslint-disable newline-per-chained-call */

'use strict'

const { v4: uuidv4 } = require('uuid')
const axios = require('axios').default
const COLLECTIONS = require('../constants/collections.js')
const { ObjectId } = require('mongodb')

async function listTexts(request, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const textList = request.params.id
    ? await texts.find({ category: request.params.id }).toArray()
    : await texts.find({}).toArray()

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
  const result = await textsCollection.insertOne(data)

  reply.code(201).send(result.insertedId)
}

async function getText(request, reply) {
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)

  const text = await texts.findOne({ id: new ObjectId(request.params.id) })

  const vocabularyCollection = produceVocabularyCollection(text)
  text.vocabularyCollection = vocabularyCollection
  // eslint-disable-next-line putout/putout
  console.log('vocabularyCollection', vocabularyCollection)

  text ? reply.send(text) : reply.notFound('The Text was not found')
}

async function getTashkeel(request, reply) {
  const { encodedText } = request.body

  const url = `${process.env.API_TASHKEEL_URL}/tashkeel?unvoweled=${encodedText}`
  // deepcode ignore Ssrf: <review later>
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
  const updateDocument = {
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
  const result = await textsCollection.updateOne({ id: new ObjectId(request.params.id) }, updateDocument, {
    upsert: true
  })

  reply.send({
    message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
  })
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

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function produceVocabularyCollection(text) {
  const arabicVocabulary = [[]]
  const englishVocabulary = [[]]

  const maxWordsInBatch = 5
  let currentBatchNumber = 0
  let wordsInCurrentBatch = 0

  let numberOfWords = 0

  for (const sentence of text.sentences) {
    for (const word of sentence.words) {
      if (word.quiz) {
        ++numberOfWords
        // eslint-disable-next-line putout/putout
        console.log('sentence number:', numberOfWords)
      }
    }
  }

  const maxNumberOfBatches = Math.floor(numberOfWords / maxWordsInBatch)

  for (const sentence of text.sentences) {
    for (const word of sentence.words) {
      if (!word.quiz) {
        // don't add words not suitable for the quiz
        continue
      }

      // eslint-disable-next-line putout/putout
      console.log('max number:', maxNumberOfBatches)

      if (currentBatchNumber === maxNumberOfBatches) {
        break
      }

      // Prepare the word to add
      const wordId = uuidv4()

      const arabicWord = {
        word: word.arabic,
        wordId
      }

      const englishWord = {
        word: word.english,
        wordId
      }

      arabicVocabulary[currentBatchNumber].push(arabicWord)
      englishVocabulary[currentBatchNumber].push(englishWord)

      ++wordsInCurrentBatch

      // prepare the next batch
      if (wordsInCurrentBatch === maxWordsInBatch) {
        // Shuffle words in current batch so they don't appear next each other
        arabicVocabulary[currentBatchNumber] = shuffleArray(arabicVocabulary[currentBatchNumber])
        englishVocabulary[currentBatchNumber] = shuffleArray(englishVocabulary[currentBatchNumber])
        // Proceed to next batch
        ++currentBatchNumber
        // Initialize the new batches array
        arabicVocabulary[currentBatchNumber] = []
        englishVocabulary[currentBatchNumber] = []
        wordsInCurrentBatch = 0
      }
    }
  }

  return {
    numberOfBatches: currentBatchNumber,
    arabic: arabicVocabulary,
    english: englishVocabulary
  }
}

module.exports = {
  listTexts,
  addText,
  getText,
  getTashkeel,
  updateText,
  deleteText
}
