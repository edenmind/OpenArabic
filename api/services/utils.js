//replace every letter in a string based on a map defined in the function

'use strict'

/* eslint-disable quote-props */

const { v4: uuidv4 } = require('uuid')
const moment = require('moment')

//return time to read based on length of text
const readingTime = (text) => {
  const wordsPerMinute = 50
  const numberOfWords = text.split(/\s/g).length
  const minutes = numberOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)

  return readTime === 1 ? `${readTime} min read` : `${readTime} mins read`
}

//return time ago from date using moment
const timeAgo = (date) => moment(date).fromNow()

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

const produceVocabularyCollection = (text) => {
  const arabicVocabulary = [[]]
  const englishVocabulary = [[]]

  const maxWordsInBatch = 5
  let currentBatchNumber = 0
  let wordsInCurrentBatch = 0

  let numberOfWords = 0

  // This code counts the number of words in a text
  // It loops through all the sentences in the text
  // Then it loops through all the words in each sentence
  // If the word is a quiz word, it increments numberOfWords

  for (const sentence of text.sentences) {
    for (const word of sentence.words) {
      if (word.quiz) {
        ++numberOfWords
      }
    }
  }

  // This code gets the maximum number of batches that can be created
  // from the number of words in the dataset. It does so by dividing
  // the number of words by the maximum number of words in each batch.
  // The Math.floor() function is used to round the result down to the
  // nearest integer.

  const maxNumberOfBatches = Math.floor(numberOfWords / maxWordsInBatch)

  for (const sentence of text.sentences) {
    // Loop through all the sentences in the text
    for (const word of sentence.words) {
      // Loop through all the words in each sentence
      if (!word.quiz) {
        // don't add words not suitable for the quiz
        continue
      }

      // If the current batch is full, create a new batch
      const maxNumberOfBatchesReached = currentBatchNumber === maxNumberOfBatches

      if (maxNumberOfBatchesReached) {
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

      // do not add the word if it already exists in the batch based on word.arabic
      const arabicWordAlreadyExistsInBatch = arabicVocabulary[currentBatchNumber].some(
        (word) => word.word === arabicWord.word
      )

      const englishWordAlreadyExistsInBatch = englishVocabulary[currentBatchNumber].some(
        (word) => word.word === englishWord.word
      )

      if (arabicWordAlreadyExistsInBatch || englishWordAlreadyExistsInBatch) {
        continue
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

//generate a slug from an english title string and author name
const slugifyWithAuthor = (title, author) => {
  const titleSlug = title
    .toLowerCase()
    .replace(/[^\da-z]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  const authorSlug = author
    .toLowerCase()
    .replace(/[^\da-z]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  return `${titleSlug}-${authorSlug}`
}

module.exports = {
  produceVocabularyCollection,
  shuffleArray,
  timeAgo,
  readingTime,
  slugifyWithAuthor
}
