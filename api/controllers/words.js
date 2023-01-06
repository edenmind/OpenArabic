'use strict'

const COLLECTIONS = require('../constants/collections.js')
const { ObjectId } = require('mongodb')
const { capitalizeFirstLetter, shuffleArray } = require('../services/texts')

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

    //add an id to the word
    const id = new ObjectId()

    word.id = id

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

  const { query } = request
  const { numberOfWordsToPractice, difficultyLevel } = query

  // eslint-disable-next-line putout/putout
  console.log(numberOfWordsToPractice, difficultyLevel)

  //set difficultyLevel to number
  const difficultyLevelNumber = Number(difficultyLevel)

  //get all words where categoryLevel is equal to the difficultyLevel
  const wordsFilteredByDifficultyLevel = await words
    .find({ categoryLevel: difficultyLevelNumber, quiz: true })
    .toArray()
  // eslint-disable-next-line putout/putout
  console.log('first', wordsFilteredByDifficultyLevel)

  //get random words from the wordsFilteredByDifficultyLevel but not more than numberOfWordsToPractice
  const randomWords = wordsFilteredByDifficultyLevel.slice(0, numberOfWordsToPractice)
  const allWordsWithAlternative = randomWords.map((word) => {
    let alternative1 = ['']
    let alternative2 = ['']
    let alternative1IsSame = true
    let alternative2IsSame = true

    while (alternative1IsSame || alternative2IsSame) {
      // get random index
      const randomIndex1 = Math.floor(Math.random() * randomWords.length)
      const randomIndex2 = Math.floor(Math.random() * randomWords.length)

      // get random word
      alternative1 = randomWords[randomIndex1].english
      alternative2 = randomWords[randomIndex2].english

      //if alternative1 not is an array, make it an array
      if (!Array.isArray(alternative1)) {
        alternative1 = [alternative1]
      }

      //if alternative2 not is an array, make it an array
      if (!Array.isArray(alternative2)) {
        alternative2 = [alternative2]
      }

      //if word.english not is an array, make it an array
      if (!Array.isArray(word.english)) {
        word.english = [word.english]
      }

      // lowercase the words
      alternative1 = alternative1[0].toLowerCase()
      alternative2 = alternative2[0].toLowerCase()
      word.english = word.english[0].toLowerCase()

      // make sure the alternatives are not the same
      alternative1IsSame = alternative1 === word.english || alternative1 === alternative2
      alternative2IsSame = alternative2 === word.english || alternative2 === alternative1
    }

    //uppercase the first letter using capitalizeFirstLetter function
    alternative1 = capitalizeFirstLetter(alternative1)
    alternative2 = capitalizeFirstLetter(alternative2)
    word.english = capitalizeFirstLetter(word.english)

    return { ...word, alternative1, alternative2 }
  })

  const shuffledWords = shuffleArray(allWordsWithAlternative)

  if (shuffledWords) {
    return reply.code(200).send(shuffledWords)
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
