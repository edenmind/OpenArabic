'use strict'

/* eslint-disable padding-line-between-statements */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */

const COLLECTIONS = require('../constants/collections.js')
const { capitalizeFirstLetter, shuffleArray, convertToLowerCase, getNumberFromString } = require('../services/texts')

async function getWordId(request, reply) {
  const { wordId, sentenceId, textId } = request.params

  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const textDocument = await texts.findOne({ textGuid: textId })
  // eslint-disable-next-line putout/nonblock-statement-body-newline
  if (textDocument) {
    const sentence = textDocument.sentences.find((s) => s.id === sentenceId)
    // eslint-disable-next-line putout/nonblock-statement-body-newline
    if (sentence) {
      const word = sentence.words.find((w) => w.id === wordId)

      const updatedWord = {
        ...word,
        englishSentence: sentence.english,
        arabicSentence: sentence.arabic
      }

      return reply.code(200).send(updatedWord)
    }
  }

  return reply.code(404).send('Word not found.')
}

async function getWordTranslation(request, reply) {
  const { id } = request.params
  const words = this.mongo.db.collection(COLLECTIONS.WORDS)
  const word = await words.findOne({ _id: id })

  if (word) {
    return reply.code(200).send(word.english)
  }

  return reply.code(404).send({ message: 'Word not found!', state: 'error' })
}

async function getWords(request, reply) {
  const { query } = request
  const { numberOfWordsToPractice, difficultyLevel } = query

  // loop through all texts in COLLECTIONS.TEXT and add all words in all sentences to an array
  const allWords = []
  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)
  const allTexts = await texts.find({}).toArray()
  for (const text of allTexts) {
    for (const sentence of text.sentences) {
      for (const word of sentence.words) {
        const updatedWord = {
          id: word.id,
          ...word,
          textId: text.textGuid,
          sentenceId: sentence.id,
          wordId: word.id,
          arabicSentence: sentence.arabic,
          englishSentence: sentence.english,
          categoryLevel: getNumberFromString(text.category)
        }
        allWords.push(updatedWord)
      }
    }
  }

  // if numberOfWordsToPractice and difficultyLevel are not provided then return all words
  if (!numberOfWordsToPractice && !difficultyLevel) {
    return reply.code(200).send(allWords)
  }
  //set difficultyLevel to number
  const difficultyLevelNumber = Number(difficultyLevel)

  //get all words where categoryLevel is equal to the difficultyLevel
  const wordsFilteredByDifficultyLevel = allWords.filter((word) => word.categoryLevel === difficultyLevelNumber)
  const randomWords = wordsFilteredByDifficultyLevel.sort(() => Math.random() - 0.5).slice(0, numberOfWordsToPractice)

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

      // if alternative1 is not an array, make it an array
      if (!Array.isArray(alternative1)) {
        alternative1 = [alternative1]
      }

      // if alternative1 or alternative2 is not an array, make it an array
      if (!Array.isArray(alternative2)) {
        alternative2 = [alternative2]
      }

      // check so that no elements in the arrays are longer than 11 characters, if so, then continue
      if (alternative1[0].length > 11 || alternative2[0].length > 11) {
        continue
      }

      // check so that no elements in the array contains a [ or ,
      if (alternative1[0].includes('[') || alternative1[0].includes(',')) {
        continue
      }

      // check so that no elements in the array contains a [ or ,
      if (alternative2[0].includes('[') || alternative2[0].includes(',')) {
        continue
      }

      //if word.english not is an array, make it an array
      if (!Array.isArray(word.english)) {
        word.english = [word.english]
      }

      alternative1 = convertToLowerCase(alternative1[0])
      alternative2 = convertToLowerCase(alternative2[0])
      word.english = convertToLowerCase(word.english[0])
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

async function updateWord(request, reply) {
  const { word } = request.body

  const texts = this.mongo.db.collection(COLLECTIONS.TEXTS)

  // Set the new values for the fields to be updated
  const updatedWord = {
    id: word.wordId,
    arabic: word.arabic,
    english: word.english,
    arabicSentence: word.arabicSentence,
    englishSentence: word.englishSentence,
    grammar: word.grammar
  }

  // Update the word in the database
  const result = await texts.updateOne(
    {
      // eslint-disable-next-line prettier/prettier, quote-props
      textGuid: word.textId,
      'sentences.id': word.sentenceId,
      'sentences.words.id': word.wordId
    },
    { $set: { 'sentences.$[sentence].words.$[word]': updatedWord } },
    {
      arrayFilters: [{ 'sentence.id': word.sentenceId }, { 'word.id': word.wordId }]
    }
  )

  reply
    .code(204)
    .send(
      `${result.matchedCount} document(s) matched the filter, ${result.modifiedCount} document(s) was/were updated.`
    )
}

module.exports = {
  getWordTranslation,
  getWords,
  updateWord,
  getWordId
}
