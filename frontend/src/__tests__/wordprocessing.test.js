import * as wordProcessing from '../services/wordProcessing'

describe('test wordProcessing', () => {
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
})
