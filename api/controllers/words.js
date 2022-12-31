'use strict'

const COLLECTIONS = require('../constants/collections.js')
const { ObjectId } = require('mongodb')

async function addWord(request, reply) {
  const { word } = request.body
  const { arabic, english } = word
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)

  //check that translatedWord is not empty
  const translatedWordEnglishContainsEmptyValues = Object.values(english).includes('')
  const translatedWordArabicContainsEmptyValues = Object.values(arabic).includes('')

  if (translatedWordEnglishContainsEmptyValues || translatedWordArabicContainsEmptyValues) {
    return reply.code(400).send({ message: 'Arabic or English word is empty!', state: 'error' })
  }

  // if the arabic word already exists then push the english translation to the array else create a new word

  const wordExists = await words.findOne({ arabic })

  // eslint-disable-next-line padded-blocks, putout/nonblock-statement-body-newline
  if (wordExists) {
    // add the english word to the array

    //check if the english word already exists
    const englishWordExists = wordExists.english.includes(english)

    if (englishWordExists) {
      return reply.code(400).send({ message: 'Word already exists!', state: 'error' })
    }

    const updatedWord = {
      ...wordExists,
      english: [...wordExists.english, english]
    }

    try {
      await words.updateOne({ arabic }, { $set: updatedWord })
      return reply.code(201).send({ message: 'Word added successfully!', state: 'success' })
    } catch (error) {
      return reply.code(500).send({ message: `Something went wrong with error ${error}`, state: 'error' })
    }
  }

  //Add Word to database
  try {
    //before adding the word to the database, change the english property to an array
    word.english = [english]
    await words.insertOne(word)

    return reply.code(201).send({ message: 'Word added successfully!', state: 'success' })
  } catch (error) {
    return reply.code(500).send({ message: `Something went wrong with error ${error}`, state: 'error' })
  }
}

async function getWord(request, reply) {
  const { id } = request.params

  const words = this.mongo.db.collection(COLLECTIONS.WORDS)
  const word = await words.findOne({ arabic: id })

  if (word) {
    return reply.code(200).send(word)
  }
}

async function getWordTranslation(request, reply) {
  const { id } = request.params
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)
  const word = await words.findOne({ arabic: id })

  if (word) {
    return reply.code(200).send(word.english)
  }

  return reply.code(404).send({ message: 'Word not found!', state: 'error' })
}

async function getWords(request, reply) {
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)
  const allWords = await words.find({}).toArray()

  const allWordsWithAlternative = allWords.map((word) => {
    const randomIndex1 = Math.floor(Math.random() * allWords.length)
    const randomIndex2 = Math.floor(Math.random() * allWords.length)
    const alternative1 = allWords[randomIndex1].english
    const alternative2 = allWords[randomIndex2].english

    return { ...word, alternative1, alternative2 }
  })

  // eslint-disable-next-line putout/putout
  console.log('Returning:', allWordsWithAlternative)

  if (allWordsWithAlternative) {
    return reply.code(200).send(allWordsWithAlternative)
  }

  return reply.code(404).send({ message: 'No words found!', state: 'error' })
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
  const { arabic, english, sentence } = word
  const updateDocument = {
    $set: {
      arabic,
      english,
      sentence
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
