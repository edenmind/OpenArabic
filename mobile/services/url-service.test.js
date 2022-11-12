import * as url from './url-service.js'

describe('url', () => {
  it('should get category url', () => {
    // Arrange
    const urlExpected = 'https://backend.openarabic.io/categories'

    // Act
    const urlActual = url.categories()

    // Assert
    expect(urlExpected).toEqual(urlActual)
  })

  it('should get text with id', () => {
    // Arrange
    const urlExpected = 'https://backend.openarabic.io/texts/33'

    // Act
    const urlActual = url.textWithId(33)

    // Assert
    expect(urlExpected).toEqual(urlActual)
  })

  it('should get category with id', () => {
    // Arrange
    const urlExpected = 'https://backend.openarabic.io/texts/categories/33'

    // Act
    const urlActual = url.categoryWithId(33)

    // Assert
    expect(urlExpected).toEqual(urlActual)
  })
})
