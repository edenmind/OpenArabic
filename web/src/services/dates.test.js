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

  // should return expected time ago from string
  it('should return expected time ago from string', () => {
    // Arrange
    const expectedTimeAgo = 'a few seconds ago'
    const time = Date.now()

    // Act
    const timeAgo = dates.getTimeAgoFromString(time)

    // Assert
    expect(timeAgo).toBe(expectedTimeAgo)
  })
})
