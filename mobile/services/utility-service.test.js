import * as util from './utility-service.js'
import { expect, describe, it } from '@jest/globals'
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

describe('shoud return correct hijridate', () => {
  it('should return correct hijridate', () => {
    // Arrange

    const expectedDate = new Date().toLocaleDateString('ar-SA-u-ca-islamic-civil', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Act
    const hijriDate = util.getHijriDate()

    // Assert
    expect(hijriDate).toBe(expectedDate)
  })
})
