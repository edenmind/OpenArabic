export const splitTextToSentences = (text) => text.split('\n')
export const removeEmptyAndNull = (words) => words.filter((word) => word !== '').filter((word) => word != null)
export const splitSentencesToWords = (sentence) => sentence.split(' ')
export const cleanWordFromInvalidCharacters = (wordToClean) => {
  const invalidCharacters = [',', '.', ',', '،', '”', '  ', ':', ';', '*', '؛', '(', ')', '-', '“', '/', '؟', '–', '‘', '’', '...', '[', ']', '،', '،', '-']
  invalidCharacters.forEach((character) => {
    wordToClean = wordToClean.replaceAll(character, '')
  })

  return wordToClean
}
