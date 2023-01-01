/* eslint-disable operator-linebreak */
/* eslint-disable nonblock-statement-body-position */
import { getDictionary } from './dictionary.js'
import { getDictionaryOfLowerCaseWords } from './dictionary-lowercase-words.js'

export const splitTextToSentences = (text) => text.split('\n')
export const removeEmptyAndNull = (words) => words.filter((word) => word !== '').filter((word) => word != undefined)
export const splitSentencesToWords = (sentence) => sentence.split(' ')
export const cleanWordFromInvalidCharacters = (wordToClean) => {
  return wordToClean.replace(/[\d!"#$%&()*+,./:;<>?@[\]|،؛؟“]/g, '')
}
export const removeLastVowel = (word) => {
  const lastChar = word[word.length - 1]

  if (
    lastChar === 'َ' ||
    lastChar === 'ِ' ||
    lastChar === 'ُ' ||
    lastChar === 'ً' ||
    lastChar === 'ٍ' ||
    lastChar === 'ٌ'
  ) {
    return word.slice(0, -1)
  }

  return word
}

export const cleanWordFromInvalidCharactersForSentenceAndText = (wordToClean) => {
  return wordToClean.replace(/[\d!"#$%&()*+,/;<>?@[\]|،؛؟“]/g, '')
}

//function to remove host from url
export const removeHost = (url) => {
  //only keep the part in url after the last /
  return url.slice(Math.max(0, url.lastIndexOf('/') + 1))
}

// capitalize first letter of all words in sentence
export const capitalizeWords = (sentence) => {
  const words = splitSentencesToWords(sentence)
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  return capitalizedWords.join(' ')
}

// lowercase certain words in sentence
export const lowercaseWords = (sentence) => {
  const words = splitSentencesToWords(sentence)
  const lowercaseWords = words.map((word) => {
    const dictionary = getDictionaryOfLowerCaseWords()

    if (dictionary.includes(word.toLowerCase())) {
      return word.toLowerCase()
    }

    return word
  })

  return lowercaseWords.join(' ')
}

// use capitalizeWords and lowercaseWords to capitalize first letter of all words in a title
export const capitalizeTitle = (title) => {
  const sentences = splitTextToSentences(title)
  const capitalizedSentences = sentences.map((sentence) => capitalizeWords(sentence))
  const capitalizedTitle = capitalizedSentences.join(' ')

  const lowercaseTitle = lowercaseWords(capitalizedTitle)
  return capitalizeFirstLetter(lowercaseTitle)
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const makeAllLetterLowercase = (string) => {
  return string.toLowerCase()
}

//remove all non arabic characters
export const removeNonArabicCharacters = (string) => {
  return string.replace(/[^ء-ي]/g, '')
}
//check list against dictionary and remove words from the list that are in the dictionary
export const removeWordsFromDictionary = (words) => {
  const dictionary = getDictionary()
  return words.filter((word) => !dictionary.includes(word))
}

export const truncate = (stringToTruncate, truncateLength) => {
  const cleanString = stringToTruncate.replace(' \n', '')
  return cleanString.length > truncateLength
    ? `${cleanString.slice(0, Math.max(0, truncateLength - 1))}...`
    : cleanString
}
