/* eslint-disable unicorn/number-literal-case */
/* eslint-disable quote-props */
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

export const prepareIngress = (text, length) => {
  const noLineBreaks = removeLineBreak(text)
  const spaceAfterDot = addSpaceAfterDot(noLineBreaks)

  return truncate(spaceAfterDot, length)
}

export const removeLineBreak = (stringWithLineBreaks) => stringWithLineBreaks.replace(/(\r\n|\n|\r)/gm, '')

export const addSpaceAfterDot = (text) => {
  return text.replace(/\s*([!,.:;?]+)(?!\s*$)\s*/g, '$1 ')
}

export const filterArrayFromEmptyElements = (arrayToFilter, filterFunction) =>
  arrayToFilter.filter((element) => filterFunction(element))

// return arabic date with year in numbers and month in text and day in text using moment.js using arabic location
export const getHijriDate = () => {
  return new Date().toLocaleDateString('ar-SA-u-ca-islamic-civil', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const getHijriDateLatin = () => {
  return new Date().toLocaleDateString('en-US-u-ca-islamic-civil', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

//replace every letter in a string based on a map defined in the function
//the service is kept in the mobile codebase to lower the load on the backend
//the transliterations are not saved since they will regenerate if the code changes
export const transliterateArabicToEnglish = (string) => {
  let transliteratedArabicToEnglish = ''

  // remove all ,.(){}[]!?:; from string
  string = string.replace(/[!"(),-;?[\]{}]/g, '')

  //replace إلَّا with "illa"
  string = string.replace(/إلَّا/g, 'illa')

  //replace لًا with "la"
  string = string.replace(/يلًا/g, 'lan')

  // replace alif lam (definite article) with al- when no non-whitespace character is before 'ا'
  string = string.replace(/(?<!\S)ال/g, 'al-')

  // replace 'وَال' at the beginning of the string with 'wal-'
  string = string.replace(/^وَال/, 'wal-')

  // if a damma us followed by a waw, then i want to replace with û AND the next letter is not shadda or sukon or waw or damma or fatha or kesra
  string = string.replace(/ُو(?!ّ|ْ|و|َ|ُ|ِ)/g, 'ū')

  // if a kesra is followed by ya, then i want to replace with î AND the next letter is not shadda or sukon or alif or damma or fatha or kesra
  string = string.replace(/ِي(?!ّ|ْ|َ|ُ|ِ|ي)/g, 'ī')

  // if a fatha is followed by a yam, then i want to replace with â AND ht next letter is not shadda or sukon or alif or damma or fatha or kesra
  string = string.replace(/َي(?!ّ|ْ|َ|ُ|ِ|ي)/g, 'ā')

  // replace bial wit bil- when no non-whitespace character is before 'ب'
  string = string.replace(/(?<!\S)بِال/g, 'bil-')

  string = string.replace(/أَ/g, "'a")
  //replace all ئٍ with ´i
  string = string.replace(/ئ/g, 'ʾ')
  // replace all إِ with i
  string = string.replace(/إِ/g, 'ʾi')
  //replace all hamza on wav with a
  string = string.replace(/ؤْ/g, 'ʾ')
  // replace أ with a
  string = string.replace(/أ/g, 'ʾ')
  // replace all fatha with the letter a
  string = string.replace(/َ/g, 'a')

  // replace all kasra with the letter i
  string = string.replace(/ِ/g, 'i')

  // replace all damma with the letter u
  string = string.replace(/ُ/g, 'u')

  //replace all sukun with nothing
  string = string.replace(/ْ/g, '')

  //replace all al-° with al-
  string = string.replace(/° /g, ' ')

  // replace all fathatan (tanwiin) with the letters an
  string = string.replace(/ً/g, 'an')

  // replace all kasratan (tanwiin) with the letters in
  string = string.replace(/ٍ/g, 'in')

  // replace all dammatan (tanwiin) with the letters un
  string = string.replace(/ٌ/g, 'un')

  // replace all alif madda with the letter a
  string = string.replace(/آ/g, 'ʾā')
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

  //if iy is followed by a consonant, replace iy with i
  // transliteratedArabicToEnglish = transliteratedArabicToEnglish.replace(/iy(?=[^aeiou])/g, 'ī')

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
    .replaceAll('al-ahu', 'allahu')
    .replaceAll('al-aha', 'allaha')
    .replaceAll('al-ahi', 'allahi')
    .replaceAll('al-lhu', 'allahu')
    .replaceAll('al-llahi', 'allahi')
    .replaceAll('biālllahi', 'billāhi')
    .replaceAll('rasūli allahi', 'rasūlillahi')
    .replaceAll('rasūlu allahi', 'rasūlullahi')
    .replaceAll('muḥammadana', 'muḥammadan')
  // Remove all Arabic letters and return
  return [...transliteratedArabicToEnglish]
    .filter((char) => {
      const codePoint = char.codePointAt(0)
      return codePoint < 0x06_00 || codePoint > 0x06_ff
    })
    .join('')
}

// biāllahi should be transliterad to bilāhi
