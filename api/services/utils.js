/* eslint-disable putout/putout */

'use strict'

const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3')

//return true if all objects are not empty
const validateThatNoObjectsAreEmpty = (data) => {
  //console log the values that are empty
  Object.entries(data).forEach(([key, value]) => {
    if (value === '') {
      console.log(key + ' is empty')
    }
  })
  return Object.values(data).every((value) => value !== '')
}

const validateAPIKey = (auth) => {
  return auth === process.env.API_KEY
}

//function to remove host from url
const removeHost = (url) => {
  //only keep the part in url after the last /
  return url.slice(Math.max(0, url.lastIndexOf('/') + 1))
}

//function to add guid to array of objects
const addGuidToArray = (sentences) => {
  return sentences.map((sentence) => {
    const id = uuidv4().slice(0, 8)
    return { ...sentence, id }
  })
}

const addGuidToInnerArray = (sentencesWithGuid) => {
  return sentencesWithGuid.map((sentence) => {
    const wordsWithGuid = sentence.words.map((word) => {
      const id = uuidv4().slice(0, 8)
      return { ...word, id }
    })
    return { ...sentence, words: wordsWithGuid }
  })
}
const validateThatCorrectNumberOfWordsHasQuizSet = (sentences, threshold) => {
  const sentencesWords = sentences.map((sentence) => sentence.words)
  const sentencesWordsFlat = sentencesWords.flat()
  const sentencesWordsFlatQuizTrue = sentencesWordsFlat.filter((word) => word.quiz)

  //return true if number of words with quiz set is higher than threshold
  return sentencesWordsFlatQuizTrue.length > threshold
}

//function to copy files from a local directory to a Amazon S3 bucket
const copyFileToS3 = async (fileContent, fileName) => {
  const s3Client = new S3Client({
    endpoint: 'https://ams3.digitaloceanspaces.com',
    forcePathStyle: false,
    region: 'ams3',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  })

  const parameters = {
    Bucket: 'openarabic',
    Body: fileContent,
    Key: 'audio/' + fileName,
    ACL: 'public-read',
    ContentType: 'audio/mpeg'
  }

  try {
    await s3Client.send(new PutObjectCommand(parameters))
    console.log('Successfully uploaded object: ' + parameters.Bucket + '/' + parameters.Key)
  } catch (error) {
    throw new Error('Error', error)
  }
}

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

//return a mp3 filename separated by dashes with text, sentence,, language and word
const mp3Filename = (text, sentence, language, word) => {
  const textSlug = text
    .toLowerCase()
    .replace(/[^\da-z]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  const sentenceSlug = sentence
    .toLowerCase()
    .replace(/[^\da-z]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  const languageSlug = language
    .toLowerCase()
    .replace(/[^\da-z]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  const wordSlug = word
    .toLowerCase()
    .replace(/[^\da-z]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  return `${textSlug}-${sentenceSlug}-${languageSlug}-${wordSlug}.mp3`
}

module.exports = {
  produceVocabularyCollection,
  shuffleArray,
  timeAgo,
  readingTime,
  slugifyWithAuthor,
  mp3Filename,
  copyFileToS3,
  removeHost,
  validateThatNoObjectsAreEmpty,
  validateAPIKey,
  validateThatCorrectNumberOfWordsHasQuizSet,
  addGuidToArray,
  addGuidToInnerArray
}
