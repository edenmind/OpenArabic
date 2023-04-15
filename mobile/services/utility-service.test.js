import * as util from './utility-service.js'
import { expect, describe, it } from '@jest/globals'
import { paperDarkTheme } from '../constants/paper-theme.js'
import {
  getHijriDateLatin,
  prepareIngress,
  removeLineBreak,
  addSpaceAfterDot,
  getThreeRandomWords,
  vibrateBetweenTwoColors,
  generateRandomPositions
} from './utility-service.js'

describe('vibrateBetweenTwoColors', () => {
  jest.mock('expo-haptics', () => ({
    impactAsync: jest.fn()
  }))

  test('should set the color to paperDarkTheme.colors.errorContainer first', () => {
    const setColor = jest.fn()

    vibrateBetweenTwoColors(setColor)

    expect(setColor).toHaveBeenCalledWith(paperDarkTheme.colors.errorContainer)
  })

  test('should set the color to paperDarkTheme.colors.elevation.level3 after 150ms', () => {
    const setColor = jest.fn()

    jest.useFakeTimers()

    vibrateBetweenTwoColors(setColor)

    jest.advanceTimersByTime(150)

    expect(setColor).toHaveBeenCalledWith(paperDarkTheme.colors.elevation.level1)

    jest.useRealTimers()
  })
})

describe('space', () => {
  it('should add space after dot', () => {
    // Arrange
    // eslint-disable-next-line operator-linebreak
    const noSpaced = 'This is a test.Space should be added.'
    const spaced = 'This is a test. Space should be added.'

    // Act
    const spacedActual = util.addSpaceAfterDot(noSpaced)

    // Assert
    expect(spacedActual).toEqual(spaced)
  })
})

describe('prepareIngress', () => {
  describe('prepareIngress', () => {
    it('should return truncated text with removed line breaks and spaces added after dots', () => {
      const text = 'This is a test.\nWith line breaks,\nand extra spaces.!'
      const length = 20
      const expectedOutput = 'This is a test....'

      expect(prepareIngress(text, length)).toEqual(expectedOutput)
    })
  })

  describe('removeLineBreak', () => {
    it('should remove line breaks from a given string', () => {
      const stringWithLineBreaks = 'This\nis\na\ntest.'
      const expectedOutput = 'Thisisatest.'

      expect(removeLineBreak(stringWithLineBreaks)).toEqual(expectedOutput)
    })
  })

  describe('addSpaceAfterDot', () => {
    it('should add a space after dots in a given string', () => {
      const text = 'This is a test. With punctuation, like: this one. And, this one!'
      const expectedOutput = 'This is a test. With punctuation, like: this one. And, this one!'

      expect(addSpaceAfterDot(text)).toEqual(expectedOutput)
    })
  })
})
describe('remove linebreaks', () => {
  it('should not contain linebreaks', () => {
    // Arrange
    // eslint-disable-next-line operator-linebreak
    const stringWithLineBreaks =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      '\r\n' +
      'Suspendisse rutrum bibendum lacus, ut semper neque mattis ut.'

    // Act
    const stringWithOutLineBreaks = util.removeLineBreak(stringWithLineBreaks)

    // Assert
    expect(stringWithOutLineBreaks).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rutrum bibendum lacus, ut semper neque mattis ut.'
    )
  })
})

//test the transliterateArabicToEnglish function
describe('remove empty elements from array', () => {
  it('should not contain empty elements in array', () => {
    // Arrange
    // eslint-disable-next-line putout/objects-braces-inside-array
    const arrayWithEmptyElemetProperties = [
      {
        english: 'alienation',
        arabic: 'وحشة'
      },
      {
        english: 'his Lord',
        arabic: 'ربه'
      },
      {
        english: '', //empty element
        arabic: 'وبين'
      }
    ]

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const filterFunction = function (element) {
      return element.english !== '' && element.arabic !== ''
    }

    // Assert
    const filteredArray = util.filterArrayFromEmptyElements(arrayWithEmptyElemetProperties, filterFunction)

    // Act
    expect(filteredArray.length).toBe(2)
  })
})

//test the transliterateArabicToEnglish function
describe('transliterateArabicToEnglish', () => {
  describe('transliterateArabicToEnglish', () => {
    test('should handle words with shadda correctly', () => {
      const arabicText = 'رَمَضَّان'
      const expectedResult = 'ramaḍḍān'

      expect(util.transliterateArabicToEnglish(arabicText)).toEqual(expectedResult)
    })

    test('should handle words with hamza correctly', () => {
      const arabicText = 'مُؤْمِنٌ'
      const expectedResult = 'muʾminun'

      expect(util.transliterateArabicToEnglish(arabicText)).toEqual(expectedResult)
    })

    test('should handle words with alif madda correctly', () => {
      const arabicText = 'آمَنَ'
      const expectedResult = 'ʾāmana'

      expect(util.transliterateArabicToEnglish(arabicText)).toEqual(expectedResult)
    })

    test('should handle words with special replacement rules correctly', () => {
      const arabicText = 'رَسُولُ اللَّهِ'
      const expectedResult = 'rasūlullāhi'

      expect(util.transliterateArabicToEnglish(arabicText)).toEqual(expectedResult)
    })

    test('should return an empty string for an empty input', () => {
      const arabicText = ''
      const expectedResult = ''

      expect(util.transliterateArabicToEnglish(arabicText)).toEqual(expectedResult)
    })
  })
})
describe('getHijriDateLatin', () => {
  test('returns the hijri date in the format: 1444 Shawwal 1', () => {
    // Mock the Date object to return a fixed date
    const fixedDate = new Date('2023-04-22T00:00:00')
    jest.spyOn(global, 'Date').mockImplementation(() => fixedDate)

    const hijriDate = getHijriDateLatin()
    expect(hijriDate).toMatch('1444 Shawwal 1')

    // Clean up the Date mock
    jest.restoreAllMocks()
  })
})

// test so that getThreeRandomWords returns an array with three words

describe('getThreeRandomWords', () => {
  let arabicWords, currentEnglishWordId, sentencesInText

  beforeEach(() => {
    arabicWords = [
      { arabic: 'مرحبا', id: 0 },
      { arabic: 'صباح', id: 1 },
      { arabic: 'جميل', id: 2 },
      { arabic: 'مساء', id: 3 },
      { arabic: 'سعيد', id: 4 }
    ]

    currentEnglishWordId = 1

    sentencesInText = [
      {
        arabicWords: [
          { arabic: 'مرحبا', id: 0 },
          { arabic: 'بكم', id: 1 }
        ]
      },
      {
        arabicWords: [
          {
            arabic: 'صباح',
            id: 2
          },
          {
            arabic: 'الخير',
            id: 3
          }
        ]
      },
      {
        arabicWords: [
          {
            arabic: 'مساء',
            id: 4
          },
          {
            arabic: 'النور',
            id: 5
          }
        ]
      }
    ]
  })

  test('returns an array with exactly three elements', () => {
    const result = getThreeRandomWords(arabicWords, currentEnglishWordId, sentencesInText)
    expect(result).toHaveLength(3)
  })

  test('returns an array containing objects with "arabic" and "id" properties', () => {
    const result = getThreeRandomWords(arabicWords, currentEnglishWordId, sentencesInText)

    for (const word of result) {
      expect(word).toHaveProperty('arabic')
      expect(word).toHaveProperty('id')
    }
  })

  test('returns an array with unique words', () => {
    const result = getThreeRandomWords(arabicWords, currentEnglishWordId, sentencesInText)
    const ids = result.map((word) => word.id)

    expect(new Set(ids).size).toEqual(3)
  })
})

describe('generateRandomPositions', () => {
  it('should return an array of length 3', () => {
    const positions = generateRandomPositions()
    expect(positions.length).toBe(3)
  })

  it('should return an array of unique values', () => {
    const positions = generateRandomPositions()
    const set = new Set(positions)

    expect(set.size).toBe(3)
  })

  it('should return an array of numbers between 1 and 100', () => {
    const positions = generateRandomPositions()
    const isInRange = positions.every((position) => position >= 1 && position <= 100)

    expect(isInRange).toBe(true)
  })
})
