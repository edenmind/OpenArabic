/* eslint-disable unicorn/number-literal-case */
/* eslint-disable quote-props */
import { moonPhaseEmoji } from './ui-services.js'

export const generateRandomPositions = () => {
  const positions = []

  while (positions.length < 3) {
    const position = Math.floor(Math.random() * 100) + 1

    if (!positions.includes(position)) {
      positions.push(position)
    }
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

export const vibrateBetweenTwoColors = (setColor, color, baseColor) => {
  setColor(color)

  setTimeout(() => {
    setColor(baseColor)
  }, 500)
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

export const filterArrayFromEmptyElements = (arrayToFilter, filterFunction) =>
  arrayToFilter.filter((element) => filterFunction(element))

// return arabic date with year in numbers and month in text and day in text using moment.js using arabic location
export const getHijriDate = () => {
  return new Date().toLocaleDateString('ar-SA-u-ca-islamic', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const getHijriYear = () => {
  return new Date().toLocaleDateString('ar-SA-u-ca-islamic', {
    year: 'numeric'
  })
}

export const getHijriDateLatin = () => {
  const hijriDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    calendar: 'islamic'
  }).format(new Date())

  const [day, month, year] = hijriDate.split(' ')

  return `${year} ${day} ${month} ${moonPhaseEmoji(month)}`.replace(/,$/, '').trim()
}
//replace every letter in a string based on a map defined in the function
//the service is kept in the mobile codebase to lower the load on the backend
//the transliterations are not saved since they will regenerate if the code changes
export const transliterateArabicToEnglish = (string) => {
  let transliteratedArabicToEnglish = ''

  // remove all ,.(){}[]!?:; from string
  string = string.replaceAll(/[!"(),-;?[\]{}]/g, '')

  // replace لَا anywhere in a word with lâ
  string = string.replaceAll('لَا', 'lâ')

  //replace  tanwin with an
  string = string.replaceAll('ً', 'an')

  // replace alif with a
  string = string.replaceAll('َ', 'a')

  //replace إلَّا with "illa"
  string = string.replaceAll('إلَّا', 'illa')

  //replace لًا with "la"
  string = string.replaceAll('يلًا', 'lan')

  // replace alif lam (definite article) with al- when no non-whitespace character is before 'ا'
  string = string.replaceAll(/(?<!\S)ال/g, 'al-')

  // replace 'وَال' at the beginning of the string with 'wal-'
  string = string.replace(/^وَال/, 'wal-')

  // if a damma us followed by a waw, then i want to replace with û AND the next letter is not shadda or sukon or waw or damma or fatha or kesra
  string = string.replaceAll(/ُو(?!ّ|ْ|و|َ|ُ|ِ)/g, 'ū')

  // if a kesra is followed by ya, then i want to replace with î AND the next letter is not shadda or sukon or alif or damma or fatha or kesra
  string = string.replaceAll(/ِي(?!ّ|ْ|َ|ُ|ِ|ي)/g, 'ī')

  // if a fatha is followed by a yam, then i want to replace with â AND ht next letter is not shadda or sukon or alif or damma or fatha or kesra
  string = string.replaceAll(/َي(?!ّ|ْ|َ|ُ|ِ|ي)/g, 'ā')

  // replace bial wit bil- when no non-whitespace character is before 'ب'
  string = string.replaceAll(/(?<!\S)بِال/g, 'bil-')

  // eslint-disable-next-line prettier/prettier
  string = string.replaceAll('أَ', '`a')
  //replace all ئٍ with ´i
  string = string.replaceAll('ئ', 'ʾ')
  // replace all إِ with i
  string = string.replaceAll('إِ', 'ʾi')
  //replace all hamza on wav with a
  string = string.replaceAll('ؤْ', 'ʾ')
  // replace أ with a
  string = string.replaceAll('أ', 'ʾ')

  // replace all kasra with the letter i
  string = string.replaceAll('ِ', 'i')

  // replace all damma with the letter u
  string = string.replaceAll('ُ', 'u')

  //replace all sukun with nothing
  string = string.replaceAll('ْ', '')

  //replace all al-° with al-
  string = string.replaceAll('° ', ' ')

  // replace all fathatan (tanwiin) with the letters an
  string = string.replaceAll('ً', 'an')

  // replace all kasratan (tanwiin) with the letters in
  string = string.replaceAll('ٍ', 'in')

  // replace all dammatan (tanwiin) with the letters un
  string = string.replaceAll('ٌ', 'un')

  // replace all alif madda with the letter a
  string = string.replaceAll('آ', 'ʾā')

  string = string.replaceAll('َا', 'ā')
  const letterMap = {
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

  // eslint-disable-next-line unicorn/no-array-reduce
  transliteratedArabicToEnglish = [...string].reduce((acc, letter, index, arr) => {
    if (letter === 'ّ') {
      const prevLetter = arr[index - 2]

      if (prevLetter && letterMap[prevLetter]) {
        const doubledConsonant = letterMap[prevLetter]
        return acc.slice(0, -2) + doubledConsonant + doubledConsonant + acc.slice(-1)
      }
    }

    return acc + (letterMap[letter] || letter)
  }, '')

  // Apply replacement rules
  transliteratedArabicToEnglish = transliteratedArabicToEnglish
    .replaceAll('aā', 'ā')
    .replaceAll('ii', 'ī')
    .replaceAll('uu', 'ū')
    .replaceAll('iī', 'ī')
    .replaceAll('iy ', 'ī ')
    .replaceAll('uū', 'ū')
    .replaceAll('aay', 'ay')
    .replaceAll('aٰ', 'ā')
    .replaceAll('bni', 'ibn')
    .replaceAll('´aa', '`a')
    .replaceAll('aa', 'ā')
    .replaceAll('ʻu', 'ʾ')
    .replaceAll('ʾiy', 'ī')
    .replaceAll('ʾu', 'ū')
    .replaceAll('ʾa', 'ā')
    .replaceAll('ūa', 'ū')
    .replaceAll('al-tt', 'at-t')
    .replaceAll('al-ṯṯ', 'aṯ-ṯ')
    .replaceAll('al-dd', 'ad-d')
    .replaceAll('al-ḏḏ', 'aḏ-ḏ')
    .replaceAll('al-rr', 'ar-r')
    .replaceAll('al-zz', 'az-z')
    .replaceAll('al-ss', 'as-s')
    .replaceAll('al-šš', 'aš-š')
    .replaceAll('al-ṣṣ', 'aṣ-ṣ')
    .replaceAll('al-ḍḍ', 'aḍ-ḍ')
    .replaceAll('al-ṭṭ', 'aṭ-ṭ')
    .replaceAll('al-ẓẓ', 'aẓ-ẓ')
    .replaceAll('al-ll', 'al-')
    .replaceAll('al-nn', 'an-n')
    .replaceAll('al-ahu', 'allāhu')
    .replaceAll('al-aha', 'allāha')
    .replaceAll('al-ahi', 'allāhi')
    .replaceAll('al-lhu', 'allahu')
    .replaceAll('al-llahi', 'allahi')
    .replaceAll('biālllahi', 'billāhi')
    .replaceAll('rasūli allāhi', 'rasūlillāhi')
    .replaceAll('rasūlu allāhi', 'rasūlullāhi')
    .replaceAll('muḥammadana', 'muḥammadan')
  // Remove all Arabic letters and return
  return [...transliteratedArabicToEnglish]
    .filter((char) => {
      const codePoint = char.codePointAt(0)
      return codePoint < 0x06_00 || codePoint > 0x06_ff
    })
    .join('')
}
