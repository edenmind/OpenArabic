import * as dates from './dates.js'

describe('test dates', () => {
  it('should return the current hijri year', () => {
    // Arrange
    const expectedHijriYear = '١٤٤٤ هـ'

    // Act
    const hijriYear = dates.getHijriYear()

    // Assert
    expect(hijriYear).toBe(expectedHijriYear)
  })

  it('should return time ago in words', () => {
    // Arrange
    const expectedTimeAgo = 'a few seconds ago'

    // Act
    const timeAgo = dates.timeAgo(new Date())

    // Assert
    expect(timeAgo).toBe(expectedTimeAgo)
  })
})
