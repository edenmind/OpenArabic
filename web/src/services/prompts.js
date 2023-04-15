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
- Simplify english grammatical terms and rather explain the function of the grammatical term.
- Explain which root the word is derived from and the root words meaning.
- Some words such as particles and conjunctions do not have a root, so explain the meaning of the word.
- Give examples of other words that are derived from the same root with both arabic and latin letters.
- Use paragraphs to separate different explanations, but not bullet points or lists.
- Explain how the word is derived from the root.
- If what looks like one word in arabic needs to be broken down into multiple words in english, then describe that process under the Grammar heading. Example: الْمَسْجِدُ - the mosque; سَمِعْتُ - I heard.
- Use the following headings to organize your explanation: Root, Other Derived Words, Relation to Other Words in The Sentence, Grammar and Summary.
- Add a ⟶ before every heading.
- Add a new line after every sentence.
- Make the explanation concise.
- Make the explanation easy to understand and highly pedagogical.
---

--- Example output for a verb:
⟶ Root
The Arabic word سَمِعْتُ (sami'tu) is derived from the root س-م-ع (s-m-'a), which carries the meaning of hearing, listening or obeying.

⟶ Other Derived Words
Some other words that come from the same root include:

سَمَع (sama'a) - he heard
يَسْمَعُ (yasma'u) - he hears
السَّمْع (as-sam') - hearing
مُسْتَمِعٌ (mustami'un) - listener

⟶ Relation to Other Words in The Sentence
 سَمِعْتُ (sami'tu) is followed by رَسُولَ اللَّهِ (rasoola Allah), which means "the Messenger of Allah".

 سَمِعْتُ (sami'tu) is the verb that explains the action of hearing performed by the speaker, and رَسُولَ اللَّهِ (rasoola Allah) is the object being heard.

⟶ Grammar
سَمِعْتُ (sami'tu) is a verb (fil) in the past tense (al-madi) and is in the first person singular form (al-mutakallim), meaning "I heard". 

The verb is composed of the root س-م-ع (s-m-'a) with the suffix ـتُ (-tu) added to indicate the first person singular form.

⟶ Summary
سَمِعْتُ (sami'tu) is a past tense verb derived from the root س-م-ع (s-m-'a), meaning "I heard". 

It is related to other words like سَمَع (sama'a) and السَّمْع (as-sam'), which also carry meanings connected to hearing. 

In the Arabic Original Sentence, سَمِعْتُ (sami'tu) is the action performed by the speaker, and it is followed by the object being heard, رَسُولَ اللَّهِ (rasoola Allah), the Messenger of Allah.
---

`

  return result.trimStart()
}

export const getExplainSentence = (englishSentence, arabicSentence, arabicText, englishText) => {
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

--- Instruction:
Act as a teacher in Arabic Words and Grammar and explain the Arabic Original Sentence to a beginner student
---

--- Requirements:
- begin explaining the sentence (Now, let's analyze the sentence more closely to identify Arabic root words and grammatical elements:)
- put the Arabic word on its own line preceded by a →
- put the sentence on its own line preceded by a →
- put the explanation on the line below the Arabic word/sentence
- explain if the word is derived from a three-letter root word or not
- explain the meaning of the root word in detail
- avoid difficult English grammatical terms and instead explain the function of the grammatical term
- do not explain the English words
- add a new line for every concept you explain
- add a new line after every sentence
- explain how the individual words relate to each other in the sentence
- use terms such as: Subject, Object, Action (Verb), Preposition, Pronoun
- explain grammatical suffixes and prefixes that are added to root words on words such as: bi-, al-, an-, wa-, fi-, li-, min-, ila-, il-, -tu, -na, -kum, -hum, -hum, -ha, -ha, etc.
- make the the explanation of suffixes and prefixes pedagogical for a beginner that does not know arabic grammar (nahw)
---

--- Example output:
Now, let's analyze the sentence more closely to identify Arabic root words and grammatical elements:

→ سَمِعْتُ
This word is derived from the three-letter root word س-م-ع (s-m-'a), which means "to hear" or "to listen." 

In this case, the word is in the past tense and has the suffix -تُ (-tu) added to the root to indicate the first person singular (I), so it means "I heard."

→ رَسُولَ
This word comes from the three-letter root ر-س-ل (r-s-l), which means "to send" or "to deliver a message." 

In this context, it refers to a messenger, specifically the Messenger of Allah.

→ اللَّهِ
This word is the name of God in Arabic, "Allah." The prefix الـ (al-) is added to the word, which is used to denote "the" in English, making it "the Allah" or "the God."

→ ﷺ
This symbol is an abbreviation for the Arabic phrase "صلى الله عليه وسلم" (salla Allah 'alayh wa sallam) which means "peace and blessings be upon him." 

It is commonly used after mentioning the name of the Prophet Muhammad.

→ يَقُولُ
This word is derived from the three-letter root ق-و-ل (q-w-l), which means "to say" or "to speak." 

In this case, the word is in the present tense and is used to indicate the third person masculine singular (he), so it means "he says" or "he speaks."

Now, let's see how the words relate to each other in the sentence:

→ سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ
The subject is the speaker (I), represented by the verb سَمِعْتُ (I heard), the object is the Messenger of Allah, رَسُولَ اللَّهِ (rasool Allah), and the action is يَقُولُ (he says or speaks).

The overall meaning is "I heard the Messenger of Allah (ﷺ) say."
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
Act as a grammatical reviewer of classical Arabic grammar and Islamic texts
---

--- Requirements:
- Verify that the grammar explanation is correct according to Sunni Islam
- Verify that the grammar explanation is correct according to the Arabic Word
- Verify that the grammar explanation is correct according to the Arabic Original Sentence
- Verify that the Root Word is absolutely correct
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
