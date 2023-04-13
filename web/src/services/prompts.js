//function that takes the current arabic and english sentence and returns them
export const getArabicAndEnglishText = (sentence) => {
  const result = `
--- Arabic Original Sentence:
${sentence.arabic}
---

--- English Translation of Sentence:
${sentence.english}
---

--- Instruction:
- The Arabic original is an Islamic text
- Verify the English Translation of Sentence based on the Arabic Original Sentence
- Suggest an improved version that is as close to the Arabic original Word-for-word as possible
- The suggestion should abide by Sunni Islam
- Explain the rationale behind your suggestion
---
`

  return result.trimStart()
}

export const getExplanationOfWord = (english, arabic, arabicSentence, englishSentence, arabicText, englishText) => {
  const result = `

--- Full Arabic Text for Reference:
${arabicText}
---

--- Full English Text for Reference:
${englishText}
---

--- Arabic Original Sentence:
${arabicSentence}
---

--- English Translation of Arabic Original Sentence:
${englishSentence}
---

--- Arabic Word:
${arabic}
---

--- English Translation of Arabic Word:
${english}
---

--- Instruction:
Act as a teacher and explain the Arabic Word to a student
---

--- Requirements:
- Explain the Arabic Word's most interesting relations to the other words in the Arabic Original Sentence.
- Do not repeat the Original Sentence.
- Always use the Arabic letters for the Arabic words together with latin transliteration.
- Explain briefly and concise grammatical concepts such as if the word is a Noun (ism), Verb (fil), Particle (harf); Singular (mufrad), Plural (jama'), Dual (muthanna); Definite (ma'arifa), Indefinite (nakira); Past Tense (al-madi), Present Tense (al-mudari'), Future Tense (al-mustaqbil); al-mutakallim (the one speaking) al-mukhatib (the one that the speech is directed towards), al-ghā’ib (a thing/person) that is not present.
- Do not explain other concepts, such as إِعْرَاب, irab.
- Use the arabic terms for the grammar in addition to the english terms.
- In the Grammar, explain the components of the word, such as the root, prefixes, suffixes and internal letters.
- Simplify english grammatical terms.
- Explain which root the word is derived from and the root words meaning.
- Give examples of other words that are derived from the same root with both arabic and latin letters.
- Use paragraphs to separate different explanations, but not bullet points or lists.
- Explain how the word is derived from the root.
- If what looks like one word in arabic needs to be broken down into multiple words in english, then describe that process under the Grammar heading. Example: الْمَسْجِدُ - the mosque; سَمِعْتُ - I heard.
- Use the following headings to organize your explanation: Root, Derived Words, Relation to Other Words, Grammar and Summary.
- Add a ⟶ before every heading.
- Make the explanation concise.
- Make the explanation easy to understand.
- Make the explanation interesting for a student of arabic.
---

--- Example output for a verb:
⟶ Root
The Arabic word سَمِعْتُ (sami'tu) is derived from the root س-م-ع (s-m-'a), which carries the meaning of hearing, listening or obeying.

⟶ Derived Words
Some other words that come from the same root include:

سَمَع (sama'a) - he heard
يَسْمَعُ (yasma'u) - he hears
السَّمْع (as-sam') - hearing
مُسْتَمِعٌ (mustami'un) - listener

⟶ Relation to Other Words
 سَمِعْتُ (sami'tu) is followed by رَسُولَ اللَّهِ (rasoola Allah), which means "the Messenger of Allah". سَمِعْتُ (sami'tu) is the verb that explains the action of hearing performed by the speaker, and رَسُولَ اللَّهِ (rasoola Allah) is the object being heard.

⟶ Grammar
سَمِعْتُ (sami'tu) is a verb (fil) in the past tense (al-madi) and is in the first person singular form (al-mutakallim), meaning "I heard". The verb is composed of the root س-م-ع (s-m-'a) with the suffix ـتُ (-tu) added to indicate the first person singular form.

⟶ Summary
سَمِعْتُ (sami'tu) is a past tense verb derived from the root س-م-ع (s-m-'a), meaning "I heard". It is related to other words like سَمَع (sama'a) and السَّمْع (as-sam'), which also carry meanings connected to hearing. In the Arabic Original Sentence, سَمِعْتُ (sami'tu) is the action performed by the speaker, and it is followed by the object being heard, رَسُولَ اللَّهِ (rasoola Allah), the Messenger of Allah.
---

`

  return result.trimStart()
}

export const verifyGrammar = (english, arabic, arabicSentence, englishSentence, grammar) => {
  const result = `
--- Arabic Original Sentence:
${arabicSentence}
---

--- English Translation of Arabic Original Sentence:
${englishSentence}
---

--- Arabic Word:
${arabic}
---

--- English Translation of Arabic Word:
${english}
---

--- Grammatical Explanation:
${grammar}
---

--- Instruction:
- Verify that the grammar explanation is correct according to Sunni Islam
- Verify that the grammar explanation is correct according to the Arabic Word
- Verify that the grammar explanation is correct according to the Arabic Original Sentence
- Verify that the English in the grammar explanation is correct
---
`

  return result.trimStart()
}

export const getArabicAndEnglishSentence = (sentence, text) => {
  const result = `
--- Full Arabic Text - for context
${text.texts.arabic}
---

--- Full English Text - for context
${text.texts.english}
---

--- Arabic Sentence from Full Arabic Text to Translate:
${sentence.arabic}
---

--- English Example Translation of the Arabic Sentence:
${sentence.english}
---

--- Task:  
- Act as a translator and do a Word-for-Word Translation of the Arabic sentence to English
---

---Requirements:
- Put the Arabic Word first, then the English Word
- Add a new line after every word
- The translation should be in the same order as the words in the Arabic sentence
- Add words surrounded by square brackets [] to make the translation fluent, readable and understandable
- The translation must be readable as a complete sentence and not only as a list of words
- Verify that the translation is correct according to Sunni Islam
- Verify that the translation is correct according to the Arabic Sentence
- Add alternative translations in the comments
- Prefer simpler words over complex words
- Always put additional words in square brackets []
---

--- Example output of the above task and requirements:
إنَّمَا - Indeed
الْأَعْمَالُ - the actions [are judged]
بِالنِّيَّاتِ - by the intentions

The word X is translated as Y because Z... It is not translated as W because Q...

Alternative translations:
إنَّمَا - Only
الْأَعْمَالُ - the actions [are by]
---
`
  return result.trimStart()
}

export const getSentenceVerification = (sentence) => {
  // loop through sentence and add all properties of word.english to a string
  const englishTranslation = sentence.words.map((word) => word.english).join(' ')

  const result = `
--- Arabic Original Sentence:
${sentence.arabic}
---

--- English Original Translation of Sentence:
${sentence.english}
---

--- English Word for Word Translation of Sentence:
${englishTranslation}
---

--- Instruction:
- The Arabic original is an Islamic hadith from the Forty Hadith of Imam Nawawi
- Verify the English Word for Word Translation of Sentence is correct according to the Arabic Original Sentence
- Check for spelling mistakes, grammar mistakes, punctuation mistakes, etc.
- Check that the translation is correct according to Sunni Islam
- Check so that additional words are surrounded by square brackets [] and that they are correct
- Suggest improvements to "English Word for Word Translation of Sentence", if you see any
- Do not suggest improvements to "English Original Translation of Sentence"
---
`

  return result.trimStart()
}
