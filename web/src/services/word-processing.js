import { getDictionary } from './dictionary.js'

export const splitTextToSentences = (text) => text.split('\n')
export const removeEmptyAndNull = (words) => words.filter((word) => word !== '').filter((word) => word != undefined)
export const splitSentencesToWords = (sentence) => sentence.split(' ')
export const cleanWordFromInvalidCharacters = (wordToClean) => {
  return wordToClean.replace(/[\d!"#$%&()*+,./:;<>?@[\]|،؟“]/g, '')
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
