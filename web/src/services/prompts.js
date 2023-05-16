const requirements = `
--- Requirements:
- Only use Arabic letters in: Headings, Arabic Original Sentence and when explaining root letters, otherwise use transliterations.
- For Arabic words and phrases, use transliteration instead of Arabic letters in the explanation and do not include the word with arabic letters, except when explaining root letters or presenting the Arabic Original Sentence.
- Use the Arabic terms for grammar (transliterated into English characters) in addition to the English terms.
- Only use the following grammatical terms: Subject (Fa'il), Object (Maf'ool Bihi), Verb (Fi'l), Preposition (Harf), Pronoun (Dameer), Noun (Ism), Adjective (Sifah), Adverb (Zarf)
- Do not explain irab (case) or (inflection).
- Put the transliteration and the English translation of the derived Arabic word on a new line below.
- Avoid repeating the same information if it is already explained previously.
- Refer to the Arabic Original Sentence as "sentence" and the Full Arabic Text for Reference as "text"
- When explaining an Arabic Word, never surround it with "", i.e. do not write "عَنْ" but write عَنْ 
- Always add a ﷺ after the name of the Prophet Muhammad (peace and blessings be upon him).
- Always add a Alayhis Salam after a Prophet or an Angel; add Radhi Allahu Anhu after a male companion; add Rahimahullah after a scholar; add Radhi Allahu Anhum after  the companions; add Radhi Allahu Anha after a female companion or wife of the Prophet ﷺ.
- The Full Arabic Text for Reference is a Sunni Islamic text.
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

export const getExplanationOfVerb = (english, arabic, arabicSentence, englishSentence, arabicText) => {
  const result = `

--- Full Arabic Text for Reference:
${arabicText}
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
Act as an experienced teacher in Classical Arabic (al-fusha) and explain the Arabic Word to a beginner student according to the following list:

- Root system: Identifying the root of the verb, explaining the meaning of the root, and providing five examples of other derived words from the root.
- Deconstruction to Root: Explain how the verb can be broken down to its root by removing all the letters that are not a part of the root.
- Number: Determining if the verb is Singular (mufrad), Plural (jama'), or Dual (muthanna).
- Tense: Identifying if the verb is in Past Tense (al-mādi), Present Tense (al-mudāri'), or Future Tense (al-mustaqbil).
- Person: Determining if the verb is first person (mutakallim), second person (mukhātab), or third (ghā'ib).
- Pronouns: Recognizing Detached Pronouns (ad-damāʾir al-munfasila), Attached Pronouns (ad-damāʾir al-mutasāla), or Hidden Pronoun (ad-damīr al-mustatir).
- Relation to Other Words: Understanding how the verb relates to other words in the sentence (Arabic Original Sentence) and the whole text (Full Arabic Text for Reference), such as the noun, the object, and the subject, using story telling to make the explanation engaging and relevant to the Full Arabic Text from a Sunni Islamic perspective.
- Add a ⇉ before every English heading.
- Add a ⟶ before every example of a derived Arabic word from the root.
- Add a ↠ before the transliteration of the Arabic Word on a new line below.
- Add a ⟶ before the Arabic Original Sentence when referring to it under the heading "Relation to Other Words".
- Put grammatical information about number, tense, person and gender under the heading "Grammar" and condense it using story telling, i.e. no bullet points.

---

--- Example of Output:

⇉ Root system
The word kānat has the root:

⟶ ك و ن 
↠ k-w-n

... which conveys the meaning of being or existence.

From this root, we can derive other words with related meanings such as:

⟶ كَانَ
↠ kāna
He was

⟶ يَكُونُ
↠ yakūnu
He is

⟶ كَائِن
↠ kā'in
Being, creature

⇉ Deconstruction to Root
To break down the word kānat to its root, remove the suffix ـتْ (-t). This leaves us with the root letters:

⟶ ك و ن 
↠ k-w-n

⇉ Grammar
Kānat is a singular (mufrad) verb in the past tense (al-madi) and refers to the third person (gha'ib) feminine.

In English, this means that the speaker is talking about a female who is not present, and that the action has already happened.

⇉ Pronouns
The attached pronoun ـتْ (-t) represents the third person singular feminine (gha'ib) and is an example of Attached Pronouns (ad-damāʾir al-mutasāla).

These pronouns are directly connected to the verb and provide information about the subject, such as who performed the action and whether it was done by a single person, a pair, or a group.

In this case, the attached pronoun indicates that the action of being or existing was performed by a female who is not present.

⇉ Relation to Other Words
⟶ فَمَنْ كَانَتْ هِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ
Translation: "So whoever's migration was to Allah and His Messenger,"

Here, kānat is used to describe the past state or condition of someone's migration (hijratuhu). The word kānat is in the third person feminine because it agrees with hijratuhu, which is a feminine noun.

---

${requirements}

`
  return result.trimStart()
}

export const getExplanationOfNoun = (english, arabic, arabicSentence, englishSentence, arabicText) => {
  const result = `

--- Full Arabic Text for Reference:
${arabicText}
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
Act as a experienced teacher in Classical Arabic (al-fusha) and explain the Arabic Word to a beginner student according to the following list:

- Root system: Identifying the root of the noun (ism), explaining the meaning of the root, and providing five example derivations from the root, as well as explaining alternative meanings of the root.
- Deconstruction to Root: Explain how the noun can be broken down to its root by by mentioning all the letters that are removed that are not a part of the root.
- Gender: Identifying if the noun is Masculine (mudhakar) or Feminine (muannath).
- Number: Determining if the noun is Singular (mufrad), Plural (jama'), or Dual (muthanna).
- Definiteness: Understanding whether the noun is Definite (ma'arifa) or Indefinite (nakira) and the rationale behind it.
- Pronouns: Recognizing Detached Pronouns (ad-damāʾir al-munfasila), Attached Pronouns (ad-damāʾir al-mutasāla), or Hidden Pronoun (ad-damīr al-mustatir) in relation to the word and explain who or what the pronoun refers to in the sentence.
- Genitive Construction: Understanding the Genitive construction (idafa and mudaf ilayhi) and how it affects the definiteness of the noun.
- Attached Particles: Identifying if the noun is attached to a Particle (harf) such as bi-, li- ka- and how it affects the meaning of the noun.
- Relation to Other Words: Understanding how the noun relates to other words in the sentence (Arabic Original Sentence) and the whole text (Full Arabic Text for Reference), such as the verb, the object, and the subject, using story telling to make the explanation engaging and relevant to the Full Arabic Text from a sunni islamic perspective.
- Add a ⇉ before every English heading.
- Add a ⟶ before every example of a derived Arabic word from the root.
- Add a ↠ before the transliteration of the Arabic Word on a new line below.
- Add a ⟶ before the Arabic Original Sentence when referring to it under the heading "Relation to Other Words".
- Put Gender, Number, and Definiteness under the heading "Grammar" and condense it using story telling, i.e. no bullet points.
---

--- Example of Output:

⇉ Root system:
The noun rasūla has the root:

⟶ ر س ل 
↠ r-s-l

... which conveys the meaning of sending or conveying a message. 

From this root, we can derive other words with related meanings such as:

⟶ رَسَلَ
↠ rasala
He sent

⟶ رِسَالَة
↠ risālah
Message, letter

⟶ مُرْسَل
↠ mursal
Sender

⇉ Deconstruction to Root
To break down the noun rasūla to its root, remove the ending ـَ (-a) which is a case ending. 

This leaves us with the root letters:

⟶ ر س ل 
↠ r-s-l

⇉ Grammar
The noun rasūla is masculine (mudhakar), singular (mufrad), and definite (ma'arifa). 

In the sentence, it refers to the Messenger of Allah ﷺ, so it carries a definite meaning.

⇉ Pronouns
There are no pronouns directly attached to the noun rasūla in this sentence.

⇉ Genitive Construction
Rasūla is part of a genitive construction (idafa) with اللَّهِ (Allahi) following it. 

In this construction, the first noun (rasūla) is called mudaf and the second noun (Allahi) is called mudaf ilayhi. 

The idafa construction denotes possession or relationship between the two nouns, and in this case, it means "the Messenger of Allah."

⇉ Attached Particles
There are no attached particles to the noun rasūla in this sentence.

⇉ Relation to Other Words

⟶ سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ
Translation: "I heard the Messenger of Allah (ﷺ) say:"

Here, rasūla serves as the object of the verb samiʿtu, which means "I heard." 

The speaker is stating that they heard the Messenger of Allah ﷺ say something. 

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
Act as a experienced teacher in Classical Arabic (al-fusha) and explain the Arabic Word to a beginner student according to the following list:

- Function: Identifying the function of the particle in a sentence, such as indicating a specific grammatical relationship, expressing emphasis or contrast, or providing a conjunction between two clauses.
- Compound Particle: Identifying if the particle is a compound particle and explaining how it is formed. 
- Relation to Other Words: Briefly understanding how the particle relates to other words in the sentence (Arabic Original Sentence) and the whole text (Full Arabic Text for Reference), such as the verb, the object, and the subject, using story telling to make the explanation and relevant to the Full Arabic Text.
- Add a ⇉ before every English heading.
- Add a ⟶ before the Arabic Original Sentence when referring to it under the heading "Relation to Other Words".
- Refer to the Arabic word as "the particle" in the explanation.
- Transliterate the Arabic Words in the explanation.
- Common Alternate Usages: Add examples of common alternate usages of the particle with a ⟶ before the arabic word, the the transliteration on a line below it with a ↠ before it and below that the english translation of the example sentence.
- The Alternate Usage should  other possible usages and translations of the particle.
---

--- Example of Output:
⇉ Function:
The particle عَلَى (ala) is a preposition (Harf) that indicates a specific grammatical relationship in a sentence. It usually conveys the meaning of "on," "over," or "upon," denoting the location, position, or direction of one thing in relation to another.

⇉ Compound Particle:
The particle عَلَى (ala) is not a compound particle. It is a simple preposition that stands alone.

⇉ Relation to Other Words:
⟶ وَوَضَعَ كَفَّيْهِ عَلَى فَخِذَيْهِ وَقَالَ
Translation: "And he placed his palms on his thighs and said:"

The particle عَلَى (ala) relates to the verb "وَضَعَ" (wada'a), which means "to place" or "to put." The subject (Fa'il) of this verb is the pronoun "هُ" (hu), referring to the man who appeared to the companions while they were sitting with the Prophet ﷺ. The object (Maf'ool Bihi) of the verb is "كَفَّيْهِ" (kaffayhi), which means "his palms." The preposition "عَلَى" (ala) indicates the location where the man placed his palms, which is "فَخِذَيْهِ" (fakithayhi), meaning "his thighs."

⇉ Common Alternate Usages:

⟶ الْكِتَابُ عَلَى الطَّاوِلَةِ 
↠ al-kitabu ala al-tawilati
The book is "on" the table.

⟶ عَلَى رَأْسِهِ تَاجٌ 
↠ ala ra'sihi tajun
"Upon" his head is a crown.

⟶ الْجِسْرُ عَلَى النَّهْرِ 
↠ al-jisru ala al-nahri
The bridge is "over" the river.
----

${requirements}

`
  return result.trimStart()
}

export const getExplainSentence = (englishSentence, arabicSentence, arabicText) => {
  const result = `

-- Full Arabic Text for Reference:
${arabicText}
---

--- Arabic Original Sentence:
${arabicSentence}
---

--- English Translation of Arabic Original Sentence:
${englishSentence}
---

--- Instruction:
 
Act as an experienced teacher in Classical Arabic (al-fusha) and explain the Arabic Original Sentence to a beginner student according to the following list:

- Begin explaining the sentence (Let's study the sentence more closely to identify Arabic root words and grammatical elements:)
- Add a ⟶ before every Arabic Word in the Arabic Original Sentence that is explained and use Arabic letters
- Add a ↠ before the translation of the Arabic Word in the Arabic Original Sentence on a new line below
- Put the english explanation on a new line below
- Begin the english explanation of each word with "The noun (ism) ... means, the verb (fil) ... means, the particle (harf) ... means, etc." 
- Only use transliterated arabic in the explanation (excpet for the root letters, suffixes and prefixes)
- Explain if the word is derived from a root word
- Explain the meaning of the root word in detail using story telling that relates to the Full Arabic Text for Reference
- Explain grammatical concepts in Arabic using story telling and avoid difficult words
- Explain how the individual word relate to each other in the Arabic Original Sentence or the Full Arabic Text for Reference
- Explain grammatical suffixes and prefixes that are added to root words on words such as but not limited to: bi-, al-, an-, wa-, fi-, li-, min-, ila-, il-, -tu, -na, -kum, -hum, -hum, -ha, -ha, etc.
- Make the explanation of suffixes and prefixes pedagogical and engaging for a beginner that does not know arabic grammar (nahw)
- End with a Summary of the Arabic Original Sentence and English Translation of Arabic Original Sentence that begins: "Now, let's combine all the words and examine the entire clause once more:"
- And before the english translation: "Which in English could be translated as: "
- When referencing the Arabic Original Sentence in the Summary, put it on its own line with a ⟶ before it and then the english translation and the explanation on a line below
- Transliterate the Arabic clause in the Summary and put a ↠ before the transliteration
---

${requirements}

--- Example Output:
Let's study the sentence more closely to identify Arabic root words and grammatical elements:

⟶ وَتُقِيمَ
↠ wa-tuqeema
The particle "wa-" means "and" and it is a conjunction used to link two sentences or ideas.
The verb "tuqeema" means "you establish" or "you perform." It is derived from the root word ق و م (q-w-m), which has the general meaning of standing, establishing, or performing something.

In the context of the full text, the action refers to performing salah (ritual prayer) which is one of the essential pillars of Islam.

⟶ الصَّلَاةَ
↠ as-salata
The noun "as-salata" means "the prayer" or "the salah." It is derived from the root word ص ل و (s-l-w), which has the general meaning of praying, supplicating, or invoking God.

In the context of the full text, "as-salata" refers to the ritual prayer (salah) which is performed by Muslims at specific times throughout the day.

Now, let's combine all the words and examine the entire clause once more:

⟶ وَتُقِيمَ الصَّلَاةَ
↠ wa-tuqeema as-salata

Which in English could be translated as:
"and that you should perform salah (ritual prayer)"
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
Act as a critical grammatical reviewer of classical Arabic grammar and Islamic texts
---

--- Requirements:
- Verify that the explanation is correct according to Sunni Islam
- Verify that the grammar explanation is accurate according to Standard Arabic rules
- Verify that the grammar explanation is consistent with the context of the Arabic text
- Verify that the Root Word is identified and analyzed correctly
- Verify that the English in the grammar explanation is clear and accurate
- Verify that the grammatical terms used are appropriate for the specific Arabic sentence structure
- Verify that any idiomatic expressions are explained and translated accurately
- Verify that any potential ambiguities in the text are addressed
---
`

  return result.trimStart()
}
export const verifyExplanation = (explanation, arabicSentence, englishSentence) => {
  const result = `
--- Arabic Original Sentence:
${arabicSentence}
---

--- English Translation of Arabic Original Sentence:
${englishSentence}
---

--- Explanation:
${explanation}
---

--- Instruction:
Act as a critical grammatical reviewer of classical Arabic grammar and Islamic texts
---

--- Requirements:
- Verify that the explanation is correct according to Sunni Islam
- Verify that the grammar explanation is accurate according to Standard Arabic rules
- Verify that the grammar explanation is consistent with the context of the Arabic text
- Verify that the Root Word is identified and analyzed correctly
- Verify that the English in the grammar explanation is clear and accurate
- Verify that the grammatical terms used are appropriate for the specific Arabic sentence structure
- Verify that any idiomatic expressions are explained and translated accurately
- Verify that any potential ambiguities in the text are addressed
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
