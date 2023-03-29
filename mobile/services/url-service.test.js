import * as url from './url-service.js'

describe('url', () => {
  it('should get category url', () => {
    // Arrange
    const urlExpected = 'http://localhost:3030/categories'

    // Act
    const urlActual = url.categories()

    // Assert
    expect(urlExpected).toEqual(urlActual)
  })

  it('should get text with id', () => {
    // Arrange
    const urlExpected = 'http://localhost:3030/texts/33'

    // Act
    const urlActual = url.textWithId(33)

    // Assert
    expect(urlExpected).toEqual(urlActual)
  })

  it('should get category with id', () => {
    // Arrange
    const urlExpected = 'http://localhost:3030/texts/categories/33'

    // Act
    const urlActual = url.categoryWithId(33)

    // Assert
    expect(urlExpected).toEqual(urlActual)
  })

  test('categoryWithId returns correct URL when category is empty', () => {
    const expected = 'http://localhost:3030/texts'
    const result = url.categoryWithId()

    expect(result).toEqual(expected)
  })

  test('categoryWithId returns correct URL when category is provided', () => {
    const category = 'science'
    const expected = 'http://localhost:3030/texts/categories/science'
    const result = url.categoryWithId(category)

    expect(result).toEqual(expected)
  })
})
