import { getArabicAndEnglishText, getArabicAndEnglishSentence } from './prompts.js'

describe('getArabicAndEnglishText', () => {
  it('should not return null and should include the words', () => {
    const sentence = {
      arabic: 'الحمد لله',
      english: 'Praise be to Allah'
    }

    const result = getArabicAndEnglishText(sentence)

    expect(result).not.toBeNull()
    expect(result).toContain(sentence.arabic)
    expect(result).toContain(sentence.english)
  })
})
describe('getArabicAndEnglishSentence', () => {
  it('should include Arabic and English words in the response', () => {
    const sentence = {
      arabic: 'بسم الله',
      english: 'In the name of Allah'
    }

    const text = {
      texts: {
        arabic: 'الحمد لله رب العالمين',
        english: 'All praise is due to Allah, Lord of the worlds'
      }
    }

    const response = getArabicAndEnglishSentence(sentence, text)
    expect(response).not.toBeNull()
    expect(response).toContain(sentence.arabic)
    expect(response).toContain(sentence.english)
    expect(response).toContain(text.texts.arabic)
    expect(response).toContain(text.texts.english)
  })
})
