/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable putout/putout */

'use strict'

const tryToCatch = require('try-to-catch')
const { synthesize } = require('../services/tts')
const { v4: uuidv4 } = require('uuid')
const { shuffleArray } = require('../services/utils')

// generate a guid for each sentence and word
const generateGuidForSentencesAndWords = (sentences) => {
  const sentencesWithGuid = addGuidToArray(sentences)
  const sentencesWithGuidAndWordsWithGuid = addGuidToInnerArray(sentencesWithGuid)

  return sentencesWithGuidAndWordsWithGuid
}

// add guid to array of objects
const addGuidToArray = (sentences) => {
  return sentences.map((sentence) => {
    const id = uuidv4().slice(0, 8)
    return { ...sentence, id }
  })
}

//function to add guid to array of inner objects
const addGuidToInnerArray = (sentencesWithGuid) => {
  return sentencesWithGuid.map((sentence) => {
    const wordsWithGuid = sentence.words.map((word) => {
      const id = uuidv4().slice(0, 8)
      return { ...word, id }
    })
    return { ...sentence, words: wordsWithGuid }
  })
}

//generate audio for sentences and words
const batchGenerateAudio = async (data) => {
  //generate a hash table for every sentence
  const sentenceHashTable = new Map(data.sentences.map((sentence) => [sentence.id, sentence]))

  // synthesize all sentences concurrently
  const sentencePromises = generateAudio(data.sentences, data.textGuid, sentenceHashTable)

  //add the sentences with guid and words with guid to the data
  const wordPromises = data.sentences.map(({ words, id: sentenceGuid }) => {
    //generate a hash table for every word in the sentence
    const wordHashTable = new Map(words.map((word) => [word.id, word]))

    // return a promise that resolves when audio is generated
    return generateAudio(words, data.textGuid, wordHashTable, sentenceGuid)
  })

  // wait for all sentences to be synthesized
  await Promise.all([sentencePromises, wordPromises])
}

//generate audio for sentences and words
const generateAudio = async (words, textGuid, hashTable, sentenceGuid = 'sentence') => {
  return words.map(async ({ arabic, id }) => {
    // Build the MP3 filename
    const fileName = mp3Filename(textGuid, sentenceGuid, 'ar', id)

    // Get the sentence data from the hash table
    const sentence = hashTable.get(id)

    // Add the filename as a property to the sentence
    sentence.filename = fileName

    // Synthesize the sentence
    const [error] = await tryToCatch(synthesize, arabic, 'ar-XA', fileName)

    if (error) {
      throw new Error(error)
    }
  })
}

//return time to read based on length of text
const readingTime = (text) => {
  const wordsPerMinute = 50
  const numberOfWords = text.split(/\s/g).length
  const minutes = numberOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)

  return readTime === 1 ? `${readTime} min read` : `${readTime} mins read`
}

// produce a vocabulary collection for the quiz
const produceVocabularyCollection = (text) => {
  const arabicVocabulary = [[]]
  const englishVocabulary = [[]]

  const maxWordsInBatch = 5
  let currentBatchNumber = 0
  let wordsInCurrentBatch = 0

  // Get the number of words in the dataset that are suitable
  const numberOfWords = countNumberOfWords(text)

  // Get the maximum number of batches that can be created
  const maxNumberOfBatches = Math.floor(numberOfWords / maxWordsInBatch)

  for (const { words } of text.sentences) {
    for (const word of words) {
      // Loop through all the words in each sentence
      if (!word.quiz) {
        // don't add words not suitable for the quiz
        continue
      }

      // If the current batch is full, create a new batch
      if (currentBatchNumber === maxNumberOfBatches) {
        break
      }

      // Prepare the word to add
      const { arabicWord, englishWord } = getWordsPairedWithId(word)

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
  //replace î with i
  title = title.replace(/ī/g, 'i')

  // replace â with a
  title = title.replace(/ā/g, 'a')

  // replace û with u
  title = title.replace(/ū/g, 'u')

  const replaceCharacters = (string) =>
    string
      .toLowerCase()
      .replace(/[^\da-z]+/g, '-')
      .replace(/(^-|-$)+/g, '')

  const titleSlug = replaceCharacters(title)
  const authorSlug = replaceCharacters(author)

  return `${titleSlug}-${authorSlug}`
}

// validate that the correct number of words has quiz set to true
const validateThatCorrectNumberOfWordsHasQuizSet = (sentences, threshold) => {
  const sentencesWords = sentences.map((sentence) => sentence.words)
  const sentencesWordsFlat = sentencesWords.flat()
  const sentencesWordsFlatQuizTrue = sentencesWordsFlat.filter((word) => word.quiz)

  //return true if number of words with quiz set is higher than threshold
  return sentencesWordsFlatQuizTrue.length > threshold
}

//return a mp3 filename separated by dashes with text, sentence,, language and word
const mp3Filename = (text, sentence, language, word) => {
  console.log('slug: ' + text, sentence, language, word)
  const createSlug = (string) =>
    string
      .toLowerCase()
      .replace(/[^\da-z]+/g, '-')
      .replace(/(^-|-$)+/g, '')

  const textSlug = createSlug(text)
  const sentenceSlug = createSlug(sentence)
  const languageSlug = createSlug(language)
  const wordSlug = createSlug(word)

  return `${textSlug}-${sentenceSlug}-${languageSlug}-${wordSlug}.mp3`
}

module.exports = {
  generateAudio,
  batchGenerateAudio,
  generateGuidForSentencesAndWords,
  addGuidToArray,
  addGuidToInnerArray,
  validateThatCorrectNumberOfWordsHasQuizSet,
  produceVocabularyCollection,
  shuffleArray,
  readingTime,
  slugifyWithAuthor,
  mp3Filename
}

// Private
function countNumberOfWords(text) {
  let numberOfWords = 0

  for (const sentence of text.sentences) {
    numberOfWords += sentence.words.filter((word) => word.quiz).length
  }

  return numberOfWords
}

function getWordsPairedWithId(word) {
  const wordId = uuidv4()

  const arabicWord = {
    word: word.arabic,
    wordId
  }

  const englishWord = {
    word: word.english,
    wordId
  }
  return { arabicWord, englishWord }
}
