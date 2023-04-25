const requirements = `--- Requirements:
- Use examples from the Arabic Original Sentence to explain the word.
- Explain how the word is used in the Arabic Original Sentence.
- When referencing the Arabic Original Sentence, put it on its own line with a ⟶ before it and then the english translation and the explanation on a line below.
- Only use Arabic letters in: Headings, Arabic Original Sentence and when explaining root lettes.
- Use transliterations when referring to the Arabic word.
- Use the Arabic terms (only transliterated) for the grammar in addition to the English terms.
- Explain English grammatical terms and their Arabic equivalents since the student does not know English grammar either.
- Add a ⇉ before every heading.
- Add a new line after every explanation to improve readability.
- Add a ⟶ before every example of a derived Arabic word from the root.
- Put the transliteration and the English translation of the derived Arabic word on a new line below.
- Add explanations of the grammatical concepts so that it becomes pedagogical and engaging for a beginner that does not know Arabic grammar (nahw) or morphology (sarf).
- Avoid repeating the same information.
- Put grammatical information about number, tense, person and gender under the heading "Grammatical Information" and condense it as much as possible, i.e. no bullet points.
- Make the "Grammatical Information" educational and engaging since the reader does not have a good understanding of grammar in general.
- Make all explanations as engaging as possible.
---`

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

export const getExplanationOfVerb = (english, arabic, arabicSentence, englishSentence, arabicText, englishText) => {
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
Act as a teacher in Classical Arabic (al-fusha) and explain the Arabic Word to a beginner student according to the following list:

- Root system: Identifying the root of the verb, explaining the meaning of the root, and providing numerous examples of other derivations from the root.
- Deconstruction to Root: Explain how the verb can be broken down to its root by removing prefixes and suffixes.
- Number: Determining if the verb is Singular (mufrad), Plural (jama'), or Dual (muthanna).
- Tense: Identifying if the verb is in Past Tense (al-madi), Present Tense (al-mudari'), or Future Tense (al-mustaqbil).
- Person: Determining if the verb is first person (mutakallim), second person (mukhatab), or third (gha'ib).
- Pronouns: Recognizing Detached Pronouns (ad-damāʾir al-munfasila), Attached Pronouns (ad-damāʾir al-mutasāla), or Hidden Pronoun (ad-damīr al-mustatir) in relation to the verb.

---

--- Example of Output:

⇉ Root system:
The word kānat has the root ك-و-ن (k-w-n), which conveys the meaning of being or existence.

From this root, we can derive other words with related meanings.

Here are some examples:

⟶ كَانَ
kāna - He was

⟶ يَكُونُ
yakūnu - He is

⟶ كَائِن
kā'in - Being, creature

⇉ Deconstruction to Root:
To break down the word kānat to its root, remove the suffix ـتْ (-t). This leaves us with the root letters ك-و-ن (k-w-n).

⇉ Grammatical Information:
Kānat is a singular (mufrad) verb in the past tense (al-madi) and refers to the third person (gha'ib) feminine.

In English, this means that the speaker is talking about a female who is not present, and that the action has already happened.

⇉ Pronouns:
The attached pronoun ـتْ (-t) represents the third person singular feminine (gha'ib) and is an example of Attached Pronouns (ad-damāʾir al-mutasāla).

These pronouns are directly connected to the verb and provide information about the subject, such as who performed the action and whether it was done by a single person, a pair, or a group.

In this case, the attached pronoun indicates that the action of being or existing was performed by a female who is not present.

Now let's examine the word kānat in the context of the Arabic Original Sentence:

⟶ فَمَنْ كَانَتْ هِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ
So whoever's migration was to Allah and His Messenger,

Here, kānat is used to describe the past state or condition of someone's migration (hijratuhu). The word kānat is in the third person feminine because it agrees with hijratuhu, which is a feminine noun.

---

${requirements}

`
  return result.trimStart()
}

export const getExplanationOfNoun = (english, arabic, arabicSentence, englishSentence, arabicText, englishText) => {
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
Act as a teacher in Classical Arabic (al-fusha) and explain the Arabic Word to a beginner student according to the following list:

- Root system: Identifying the root of the noun, explaining the meaning of the root, and providing numerous example derivations from the root.
- Deconstruction to Root: Explain how the noun can be broken down to its root by removing prefixes and suffixes.
- Gender: Identifying if the noun is Masculine (mudhakar) or Feminine (muannath).
- Number: Determining if the noun is Singular (mufrad), Plural (jama'), or Dual (muthanna).
- Definiteness: Understanding whether the noun is Definite (ma'arifa) or Indefinite (nakira).
- Pronouns: Recognizing Detached Pronouns (ad-damāʾir al-munfasila), Attached Pronouns (ad-damāʾir al-mutasāla), or Hidden Pronoun (ad-damīr al-mustatir) in relation to the word.
- Genitive Construction: Understanding the Genitive construction (idafa and mudaf ilayhi) and how it affects the definiteness of the noun.
- Attached Particles: Identifying if the noun is attached to a Particle (harf) such as bi-, li- ka- and how it affects the meaning of the noun.
- Relation to Other Words: Understanding how the noun relates to other words in the sentence, such as the verb, the object, and the subject.

---

--- Example of Output:

⇉ Original Sentence:
⟶ سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ
I heard the Messenger of Allah (ﷺ) say:

⇉ Root system:
The noun rasūla has the root ر-س-ل (r-s-l), which conveys the meaning of sending or conveying a message. 

From this root, we can derive other words with related meanings. 

Here are some examples:

⟶ رَسَلَ
rasala - He sent

⟶ رِسَالَة
risālah - Message, letter

⟶ مُرْسَل
mursal - Sender

⇉ Deconstruction to Root:
To break down the noun rasūla to its root, remove the ending ـَ (-a) which is a case ending. 

This leaves us with the root letters ر-س-ل (r-s-l).

⇉ Grammatical Information:
The noun rasūla is masculine (mudhakar), singular (mufrad), and definite (ma'arifa). 

In the sentence, it refers to the Messenger of Allah, so it carries a definite meaning.

⇉ Pronouns:
There are no pronouns directly attached to the noun rasūla in this sentence.

⇉ Genitive Construction:
Rasūla is part of a genitive construction (idafa) with اللَّهِ (Allahi) following it. 

In this construction, the first noun (rasūla) is called mudaf and the second noun (Allahi) is called mudaf ilayhi. 

The idafa construction denotes possession or relationship between the two nouns, and in this case, it means "the Messenger of Allah."

⇉ Attached Particles:
There are no attached particles to the noun rasūla in this sentence.

⇉ Relation to Other Words:
In the sentence, rasūla serves as the object of the verb samiʿtu, which means "I heard." 

The speaker is stating that they heard the Messenger of Allah say something. 

The noun rasūla is directly related to the verb and the subject, which is the speaker themselves.

${requirements}

`
  return result.trimStart()
}

export const getExplanationOfParticle = (english, arabic, arabicSentence, englishSentence, arabicText, englishText) => {
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
Act as a teacher in Classical Arabic (al-fusha) and explain the Arabic Word to a beginner student according to the following list:

- Function: Identifying the function of the particle in a sentence, such as indicating a specific grammatical relationship, expressing emphasis or contrast, or providing a conjunction between two clauses.
- Position: Identifying the position of the particle in the sentence, whether it appears at the beginning, middle, or end of a sentence.
- Contextual meaning: Understanding how the meaning of the particle is influenced by the context of the sentence in which it appears.
- Compound Particle: Identifying if the particle is a compound particle and explaining how it is formed. 

---

--- Example of Output:

⇉ Function:
The Arabic word innama is a particle that functions as an adverb of restriction or limitation. It is used to emphasize that a certain condition or action applies only to a specific situation or subject, excluding others. In the Arabic Original Sentence, innama is used to emphasize that actions are judged only by intentions, and not by any other factors.

⟶ إنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ
Verily, actions are (judged) by intentions.

⇉ Position:
Innama is positioned at the beginning of the sentence, providing emphasis and restricting the judgment of actions to intentions.

⇉ Contextual meaning:
The meaning of innama is influenced by the context of the sentence in which it appears. In the Arabic Original Sentence, innama is used to emphasize the importance of intentions (niyyat) in judging actions (a'amal).

⇉ Compound Particle:
Innama is a compound particle that is formed by combining the particles إنَّ (inna) and مَا (ma). إنَّ (inna) is a particle of emphasis, while مَا (ma) is a particle of negation. When combined, they create the particle إنَّمَا (innama), which emphasizes the exclusivity of the action or condition being described in the sentence.

⇉ Grammatical Information:
Innama is a particle and does not have any grammatical information regarding number, tense, person, or gender. However, it is important to understand how it affects the sentence structure and meaning. In this case, innama emphasizes the importance of intentions (niyyat) in judging actions (a'amal), restricting the judgment to intentions alone.

---

${requirements}

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
 
Act as a teacher in Classical Arabic (al-fusha) and explain the Arabic Original Sentence to a beginner student according to the following list:

- Explain all word one by one in the Arabic Original Sentence
- Add a ⟶ before every Arabic Word in the Arabic Original Sentence that is explained and use Arabic letters
- Put the explanation on a new line below
- Only use english/latin letter for the Arabic Word in the explanation
- Use arabic letters for root letters, prefixes and suffixes in the explanation
- begin explaining the sentence (Now, let's analyze the sentence more closely to identify Arabic root words and grammatical elements:)
- explain if the word is derived from a three-letter root word or not
- explain the meaning of the root word in detail
- avoid difficult English grammatical terms and instead explain the function of the grammatical term
- do not explain the English words
- explain how the individual words relate to each other in the sentence
- use terms such as: Subject, Object, Action (Verb), Preposition, Pronoun
- explain grammatical suffixes and prefixes that are added to root words on words such as: bi-, al-, an-, wa-, fi-, li-, min-, ila-, il-, -tu, -na, -kum, -hum, -hum, -ha, -ha, etc.
- make the explanation of suffixes and prefixes pedagogical for a beginner that does not know arabic grammar (nahw)
- Provide additional information about the cultural or historical context of the word, if relevant, to help the student understand its significance.
---

--- Example of Output:

Now, let's analyze the sentence more closely to identify Arabic root words and grammatical elements:

⟶ سَمِعْتُ
Samiʿtu is an action (verb) that comes from the root word س-م-ع (s-m-ʿ), which means "to hear" or "to listen." The suffix ـتُ (-tu) indicates that the subject (the one performing the action) is "I" or "me." So, samiʿtu means "I heard."

⟶ رَسُولَ
Rasūla is the object of the action, which means the thing or person the action is being done to. It comes from the root word ر-س-ل (r-s-l), which means "to send" or "to dispatch." rasūla means "messenger" or "prophet." In this context, it refers to the Prophet Muhammad.

⟶ اللَّهِ
Allāhi is a combination of two parts: الـ (al-), which means "the," and الله (Allāh), which means "God" or "Allah." The word Allāh is not derived from a three-letter root word, as it is a unique name for the Islamic God. The ending ـِ (i) indicates a possessive relationship between "the Messenger" and "Allah," making it "the Messenger of Allah."

⟶ ﷺ
This symbol is an abbreviation for the honorific ṣallā Allāhu ʿalayhi wa-sallam, which means "Peace be upon him" or "Blessings and peace be upon him." It is used after mentioning the name of the Prophet Muhammad out of respect and reverence.

⟶ يَقُولُ
Yaqūlu is an action (verb) that comes from the root word ق-و-ل (q-w-l), which means "to say" or "to speak." The prefix يـ (ya-) indicates that the subject (the one performing the action) is "he" or "him." So, yaqūlu means "he says" or "he speaks."

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
