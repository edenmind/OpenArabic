import * as linkGenerator from './link-generator.js'

describe('generateLinkToPostOnTwitter', () => {
  it('returns the correct link for twitter', () => {
    const id = '123'
    const expectedLink = `https://twitter.com/intent/tweet?url=https://web.openarabic.io/texts/${id}`

    expect(linkGenerator.generateLinkToPostOnTwitter(id)).toEqual(expectedLink)
  })
})

describe('generateLinkToPostOnFacebook', () => {
  it('returns the correct link for facebook', () => {
    const id = '123'
    const expectedLink = `https://www.facebook.com/sharer/sharer.php?u=https://web.openarabic.io/texts/${id}`

    expect(linkGenerator.generateLinkToPostOnFacebook(id)).toEqual(expectedLink)
  })

  it('returns the correct link for facebook', () => {
    const id = 'abc'
    const expectedLink = `https://www.facebook.com/sharer/sharer.php?u=https://web.openarabic.io/texts/${id}`

    expect(linkGenerator.generateLinkToPostOnFacebook(id)).toEqual(expectedLink)
  })
})
