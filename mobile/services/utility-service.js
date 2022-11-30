/* eslint-disable quote-props */
export const truncate = (stringToTruncate, truncateLength) => {
  const cleanString = stringToTruncate.replace(' \n', '')
  return cleanString.length > truncateLength
    ? `${cleanString.slice(0, Math.max(0, truncateLength - 1))}...`
    : cleanString
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

//replace every letter in a string based on a map defined in the function
export const transliterateArabicToEnglish = (string) => {
  let transliteratedArabicToEnglish = ''

  // replace all fatha with the letter a
  string = string.replace(/َ/g, 'a')

  // replace all kasra with the letter i
  string = string.replace(/ِ/g, 'i')

  // replace all damma with the letter u
  string = string.replace(/ُ/g, 'u')

  // replace all alif lam with the letter al
  string = string.replace(/ﻻ/g, 'al-')

  //remove all shadda
  string = string.replace(/ّ/g, '')

  //remove all sukon
  string = string.replace(/ْ/g, '')

  const letterMap = {
    ٱ: 'a',
    ء: '',
    ا: 'ā',
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
    ع: 'ʿ',
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
    ـً: 'an',
    ـٍ: 'in',
    ـٌ: 'un',
    ' ': ' '
  }

  for (const letter of string) {
    const newLetter = letterMap[letter] || letter
    transliteratedArabicToEnglish += newLetter
  }

  //replace aā with a
  transliteratedArabicToEnglish = transliteratedArabicToEnglish.replaceAll('aā', 'ā')

  //replace iī with ī
  transliteratedArabicToEnglish = transliteratedArabicToEnglish.replaceAll('iī', 'ī')

  //replace uū with ū
  transliteratedArabicToEnglish = transliteratedArabicToEnglish.replaceAll('uū', 'ū')

  //replace iy with ī
  transliteratedArabicToEnglish = transliteratedArabicToEnglish.replaceAll('iy', 'ī')

  //replace aٰ with ā
  transliteratedArabicToEnglish = transliteratedArabicToEnglish.replaceAll('aٰ', 'ā')

  return transliteratedArabicToEnglish
}
