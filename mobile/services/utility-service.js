/* eslint-disable prettier/prettier */
/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable sort-keys */
/* eslint-disable unicorn/number-literal-case */
/* eslint-disable quote-props */
import { moonPhaseEmoji } from './ui-services.js'

export const generateUniqueRandomNumbers = (count = 3, max = 100) => {
  if (count > max) {
    throw new Error('The required count of unique numbers is greater than the maximum value.')
  }

  const numbers = Array.from({ length: max }, (_, i) => i + 1)
  const positions = []

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length)
    positions.push(numbers[randomIndex])
    numbers.splice(randomIndex, 1)
  }

  return positions
}

// check if today is the same as the createdAt date
export const checkIfWithinLast36Hours = (createdAt) => {
  // Get current date
  const currentDate = new Date()

  // Subtract 36 hours from the current date
  const thirtySixHoursAgo = new Date(currentDate.getTime() - 36 * 60 * 60 * 1000)

  // Convert createdAt to a Date object
  const createdAtDate = new Date(createdAt)

  // Check if createdAt is after 36 hours ago and before or equal to the current date
  if (createdAtDate >= thirtySixHoursAgo && createdAtDate <= currentDate) {
    return true
  }

  return false
}

export const capitalizeFirstLetter = (string) => {
  // Trim the string first
  const trimmedString = string.trim()

  // Find the first Latin letter and capitalize it
  return trimmedString.replace(/([A-Za-z])/, (match) => match.toUpperCase())
}

const truncate = (stringToTruncate, truncateLength) => {
  const cleanString = stringToTruncate.replace(' \n', '')

  if (cleanString.length > truncateLength) {
    const lastWord = cleanString.slice(0, Math.max(0, Math.max(0, truncateLength - 1)))
    // find the last space in the truncated string
    const lastSpaceIndex = lastWord.lastIndexOf(' ')

    // if there is no space, just return the truncated string
    if (lastSpaceIndex === -1) {
      return `${cleanString.slice(0, Math.max(0, truncateLength - 1))}...`
      // otherwise return the truncated string up to the last space
    }

    return `${cleanString.slice(0, Math.max(0, lastSpaceIndex))}...`
  }

  return cleanString
}

export const getThreeRandomWords = (englishWords, currentArabicWordId, sentencesInText) => {
  const randomWords = new Set()

  // Find the matching Arabic word based on the currentWord and add it to the randomWords set
  const matchingEnglishWord = englishWords.find((englishWord) => englishWord.id === currentArabicWordId)

  randomWords.add(matchingEnglishWord)

  // Helper function to get a random element from an array
  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)]

  // Keep generating random words until we have exactly three unique ones
  while (randomWords.size < 3) {
    const randomSentence = getRandomElement(sentencesInText)
    const randomWordFromSentence = getRandomElement(randomSentence.englishWords)

    // Check if the random word is already in the randomWords set based on id and spelling
    const alreadyExists = [...randomWords].some(
      (word) => word.id === randomWordFromSentence.id || word.english === randomWordFromSentence.english
    )

    // Add the random word to the set only if it doesn't have the same id or spelling as the words already in the set
    if (!alreadyExists) {
      randomWords.add(randomWordFromSentence)
    }
  }

  // Set the state for currentArabicWordsInSentence
  return [...randomWords].sort(() => Math.random() - 0.5)
}

export const prepareIngress = (text, length) => {
  const noLineBreaks = removeLineBreak(text)
  const spaceAfterDot = addSpaceAfterDot(noLineBreaks)

  return truncate(spaceAfterDot, length)
}

export const removeLineBreak = (stringWithLineBreaks) => stringWithLineBreaks.replaceAll(/(\r\n|\n|\r)/gm, ' ')

export const addSpaceAfterDot = (text) => {
  return text.replaceAll(/\s*([!,.:;?]+)(?!\s*$)\s*/g, '$1 ')
}

// return arabic date with year in numbers and month in text and day in text using moment.js using arabic location
export const getHijriDate = () => {
  return new Date().toLocaleDateString('ar-SA-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export const getHijriYear = () => {
  return new Date().toLocaleDateString('ar-SA-u-ca-islamic', {
    year: 'numeric'
  })
}

const arabicWeekdaysTransliteration = {
  Sunday: 'al-Ahad',
  Monday: 'al-Ithnayn',
  Tuesday: 'al-Thulāthāʼ',
  Wednesday: 'al-Arbaʻāʼ',
  Thursday: 'al-Khamīs',
  Friday: 'al-Jumʻah',
  Saturday: 'al-Sabt'
}

export const getHijriDateLatin = () => {
  const hijriDate = new Intl.DateTimeFormat('en-US', {
    calendar: 'islamic',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  }).format(new Date())

  // Split by both spaces and commas and filter out any empty results
  const parts = hijriDate.split(/[\s,]+/).filter(Boolean)

  let weekday
  let day
  let month
  let year
  switch (parts.length) {
    case 4: {
      ;[weekday, day, month, year] = parts

      break
    }
    case 5: {
      ;[weekday, day, month, year] = [parts[0], parts[1], `${parts[2]} ${parts[3]}`, parts[4]]
      break
    }
    case 6: {
      ;[weekday, day, month, year] = [parts[0], parts[1], `${parts[3]} ${parts[4]}`, parts[5]]

      break
    }
    default: {
      console.error('Unexpected date format:', hijriDate)
      return ''
    }
  }

  // Transliterate the weekday to its Latin equivalent
  const transliteratedWeekday = arabicWeekdaysTransliteration[weekday] || weekday

  return `${transliteratedWeekday}, ${year} ${day} ${month} ${moonPhaseEmoji(month)}`.replace(/,$/, '').trim()
}

const ARABIC_LETTER_MAP = {
  ٱ: '`a',
  إ: '`i',
  ء: '',
  ا: 'a',
  ب: 'b',
  ت: 't',
  ث: 'ṯ',
  ج: 'j',
  ح: 'ḥ',
  خ: 'ḵ',
  د: 'd',
  ذ: 'ḏ',
  ر: 'r',
  ز: 'z',
  س: 's',
  ش: 'š',
  ص: 'ṣ',
  ض: 'ḍ',
  ط: 'ṭ',
  ظ: 'ẓ',
  ع: '3',
  غ: 'ġ',
  ف: 'f',
  ق: 'q',
  ك: 'k',
  ل: 'l',
  م: 'm',
  ن: 'n',
  ه: 'h',
  و: 'w',
  ي: 'y',
  آ: 'ā',
  ة: 't',
  ى: 'ā',
  ـَا: 'ā',
  ـِي: 'ī',
  ـُو: 'ū',
  ـًا: 'ay',
  ـَو: 'aw',
  ' ': ' '
}

function initialReplacements(str) {
  const patterns = [
    // Specific replacements
    ['إلَّا', 'illa'],
    ['لَا', 'lâ'],
    ['يلًا', 'lan'],
    [/^وَال/g, 'wal-'],
    [/(?<!\S)بِال/g, 'bil-'],
    [/(?<!\S)ال/g, 'al-'],
    [/ُو(?!ّ|ْ|و|َ|ُ|ِ)/g, 'ū'],
    [/ِي(?!ّ|ْ|َ|ُ|ِ|ي)/g, 'ī'],
    [/َي(?!ّ|ْ|َ|ُ|ِ|ي)/g, 'ā'],

    // General replacements
    [/[!"(),-;?[\]{}]/g, ''],
    ['أَ', '`a'],
    ['ئ', 'ʾ'],
    ['إِ', 'ʾi'],
    ['ؤْ', 'ʾ'],
    ['أ', 'ʾ'],
    ['ِ', 'i'],
    ['ُ', 'u'],
    ['ْ', ''],
    ['° ', ' '],
    ['ً', 'an'],
    ['ٍ', 'in'],
    ['ٌ', 'un'],
    ['آ', 'ʾā'],
    ['َ', 'a'],
    ['َا', 'ā']
  ]

  for (const [pattern, replacement] of patterns) {
    str = str.replaceAll(pattern, replacement)
  }

  return str
}

function transliterate(str) {
  return [...str].reduce((acc, letter, index, arr) => {
    if (letter === 'ّ') {
      const prevLetter = arr[index - 2]
      if (prevLetter && ARABIC_LETTER_MAP[prevLetter]) {
        const doubledConsonant = ARABIC_LETTER_MAP[prevLetter]
        return acc.slice(0, -2) + doubledConsonant + doubledConsonant + acc.slice(-1)
      }
    }
    return acc + (ARABIC_LETTER_MAP[letter] || letter)
  }, '')
}

export const transliterateArabicToEnglish = (str) => {
  str = initialReplacements(str)
  let transliteratedStr = transliterate(str)

  // Post transliteration replacements
  const postPatterns = [
    ['iy ', 'ī '],
    ['´aa', '`a'],
    ['bni', 'ibn'],
    ['aay', 'ay'],
    ['aٰ', 'ā'],
    ['ūa ', 'ū '],

    // Ligature patterns
    ['al-ahu', 'allāhu'],
    ['al-aha', 'allāha'],
    ['al-ahi', 'allāhi'],
    ['biālllahi', 'billāhi'],
    ['rasūli allāhi', 'rasūlillāhi'],
    ['rasūlu allāhi', 'rasūlullāhi'],
    ['muḥammadana', 'muḥammadan'],

    // Sun letters (post "al-")
    ['al-([tṯdḏrzsšṣḍṭẓl])', 'a$1-$1'],

    // Convert all "aa" sequences to "ā"
    ['aa', 'ā'],

    // Hamza Variations
    ['ئ', 'ʾi'],
    ['ؤ', 'ʾu'],

    // Shadda (doubling the consonant)
    ['(.)ّ', '$1$1'],

    // Long vowels following short ones
    ['aā', 'ā'],
    ['iī', 'ī'],
    ['uū', 'ū'],

    // Lam/Ba/wa assimilation with Sun letters
    ['li-([tṯdḏrzsšṣḍṭẓl])', 'i$1-$1'],
    ['bi-([tṯdḏrzsšṣḍṭẓl])', 'i$1-$1'],
    ['wa-([tṯdḏrzsšṣḍṭẓl])', 'u$1-$1'],

    // Vowel patterns
    ['aʾ', 'ā'],
    ['iʾ', 'ī'],
    ['uʾ', 'ū'],

    // Silent "taa marbuta"
    ['ah$', 'a'],

    // "taa marbuta" followed by "al-"
    ['at al-', 'aṭ-ṭ'],

    // Silent alif
    ['wa$', 'wā'],
    ['ya$', 'yā'],

    // Triple lam
    ['lll', 'll']
  ]

  // Rest of the function remains the same.

  for (const [pattern, replacement] of postPatterns) {
    transliteratedStr = transliteratedStr.replaceAll(pattern, replacement)
  }

  // Remove all Arabic letters and return
  return [...transliteratedStr]
    .filter((char) => {
      const codePoint = char.codePointAt(0)
      return codePoint < 0x06_00 || codePoint > 0x06_ff
    })
    .join('')
}
