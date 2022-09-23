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
describe('truncate', () => {
  it('should truncate', () => {
    // Arrange
    // eslint-disable-next-line operator-linebreak
    const longtText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rutrum bibendum lacus, ut semper neque mattis ut. In metus quam, sollicitudin eget magna non, consectetur tincidunt quam. Ut eget consectetur massa, sit amet porta sapien. Ut eleifend non risus et suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mattis nulla sed neque bibendum dapibus. Duis gravida sagittis iaculis. Maecenas libero magna, eleifend posuere arcu sit amet, cursus cursus nisl. Aenean vel augue nec neque tincidunt porta. Vivamus pulvinar blandit turpis, vitae euismod nisi imperdiet et. Nunc maximus augue a placerat ullamcorper. Fusce vel blandit lectus. Etiam velit turpis, hendrerit eget semper gravida, fringilla non enim. Mauris scelerisque augue aliquet mauris sodales dapibus. Duis egestas, dui ut fringilla iaculis, ligula sem mattis augue, quis luctus eros nibh vel turpis.'

    // Act
    const truncated = util.truncate(longtText, 150)

    // Assert
    expect(truncated.length).toBe(152)
  })

  it('should not truncate', () => {
    // Arrange
    const shorterText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

    // Act
    const notTruncated = util.truncate(shorterText, 150)

    // Assert
    expect(notTruncated.length).toBe(56)
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

describe('remove enpty elements from array', () => {
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
