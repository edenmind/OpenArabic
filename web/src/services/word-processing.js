export const splitTextToSentences = (text) => text.split('\n')
export const removeEmptyAndNull = (words) => words.filter((word) => word !== '').filter((word) => word != undefined)
export const splitSentencesToWords = (sentence) => sentence.split(' ')
export const cleanWordFromInvalidCharacters = (wordToClean) => {
  return wordToClean.replace(/[\d!"#$%&()*+,./:;<>?@[\]|،؟“]/g, '')
}

export const truncateString = (sentences, number_ = 135) => {
  if (sentences.length === 0) {
    return 'No text to display...'
  }

  let ingress = ''

  for (const sentence of sentences) {
    ingress += sentence.arabic
  }

  return `${ingress.slice(0, number_)}...`
}
