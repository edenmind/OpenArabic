export const splitTextToSentences = (text) => text.split('\n')
export const removeEmptyAndNull = (words) => words.filter((word) => word !== '').filter((word) => word != null)
export const splitSentencesToWords = (sentence) => sentence.split(' ')
export const cleanWordFromInvalidCharacters = (wordToClean) => {
  const invalidCharacters = [
    ',',
    '.',
    ',',
    '،',
    '”',
    '  ',
    ':',
    ';',
    '*',
    '؛',
    '(',
    ')',
    '-',
    '“',
    '/',
    '؟',
    '–',
    '‘',
    '’',
    '...',
    '[',
    ']',
    '،',
    '،',
    '-'
  ]
  invalidCharacters.forEach((character) => {
    wordToClean = wordToClean.replaceAll(character, '')
  })

  return wordToClean
}

export const truncateString = (sentences, num = 135) => {
  if (sentences.length === 0) {
    return 'No text to display...'
  }

  let ingress = ''
  sentences.forEach((sentence) => {
    ingress += sentence.arabic
  })

  return `${ingress.slice(0, num)}...`
}
