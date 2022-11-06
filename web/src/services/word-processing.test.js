import * as wordProcessing from './word-processing.js'

describe('test wordProcessing', () => {
  it('should return a capitalized title', () => {
    const title = 'this is a title'
    const capitalizedTitle = wordProcessing.capitalizeWords(title)

    expect(capitalizedTitle).toEqual('This Is A Title')
  })

  it('should return a capitalized title with some words lowercased', () => {
    const title = 'This Is A Title'
    const capitalizedTitle = wordProcessing.lowercaseWords(title)

    expect(capitalizedTitle).toEqual('This is a Title')
  })

  it('should clean invalid char from text', () => {
    // Arrange
    const textWithInvalidCharacters = 'This text contai*ns an invalid character.'

    // Act
    const cleanedText = wordProcessing.cleanWordFromInvalidCharacters(textWithInvalidCharacters)

    // Assert
    expect(cleanedText.includes('contains')).toBe(true)
  })

  it('should split sentences to 4 words', () => {
    // Arrange
    const sentence = 'This is a sentence.'

    // Act
    const words = wordProcessing.splitSentencesToWords(sentence)

    // Assert
    expect(words.length).toBe(4)
  })

  it('should split sentences to 1 word', () => {
    // Arrange
    const sentence = 'Word.'

    // Act
    const words = wordProcessing.splitSentencesToWords(sentence)

    // Assert
    expect(words.length).toBe(1)
  })

  it('should split text to sentences', () => {
    // Arrange
    const text = 'This is sentence 1.\n This is sentence 2.\n This is sentence 3.'

    // Act
    const sentences = wordProcessing.splitTextToSentences(text)

    // Assert
    expect(sentences.length).toBe(3)
  })

  it('should remove null values', () => {
    // Arrange
    const words = ['one', '', 'two', 'three']

    // Act
    const wordsWithoutNull = wordProcessing.removeEmptyAndNull(words)

    // Assert
    expect(wordsWithoutNull.length).toBe(3)
  })

  it('should capitalize', () => {
    // Arrange
    const word = 'word'

    // Act
    const capitalized = wordProcessing.capitalizeFirstLetter(word)

    // Assert
    expect(capitalized).toEqual('Word')
  })

  it('should lowercase', () => {
    // Arrange
    const word = 'Word'

    // Act
    const capitalized = wordProcessing.makeAllLetterLowercase(word)

    // Assert
    expect(capitalized).toEqual('word')
  })

  it('truncate should return the same string if it is shorter than truncate length', () => {
    // Arrange
    const word = 'word'

    // Act
    const truncated = wordProcessing.truncate(word, 5)

    // Assert
    expect(truncated).toEqual('word')
  })

  it('truncate should return the same string if it is equal to truncate length', () => {
    // Arrange
    const word = 'word'

    // Act
    const truncated = wordProcessing.truncate(word, 4)

    // Assert
    expect(truncated).toEqual('word')
  })

  it('word should be removed if it is found in dictionary', () => {
    // Arrange
    const word = ['أحمد', 'سارة']

    // Act
    const removed = wordProcessing.removeWordsFromDictionary(word)

    // Assert
    expect(removed).toEqual([])
  })

  it('should remove non arabic characters', () => {
    // Arrange
    const word = 'wordأحمد'

    // Act
    const removed = wordProcessing.removeNonArabicCharacters(word)

    // Assert
    expect(removed).toEqual('أحمد')
  })
})
