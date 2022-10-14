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
    const urlActual = url.textsWithCategory(33)

    // Assert
    expect(urlExpected).toEqual(urlActual)
  })

  it('should get category without id', () => {
    // Arrange
    const urlExpected = 'http://localhost:3030/texts/categories/'

    // Act
    const urlActual = url.textsWithCategory()

    // Assert
    expect(urlExpected).toEqual(urlActual)
  })
})
