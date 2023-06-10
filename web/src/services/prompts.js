const requirements = `
--- Requirements:
- Use the Arabic terms for grammar (transliterated into latin) in addition to the English terms.
- Only use the following grammatical terms: Noun (Ism), Verb (Fi'l), Preposition (Harf), Pronoun (Dameer),  Past Tense (Maadi), Present Tense (Mudari'), Future Tense (Mustaqbil), Singular (Mufrad), Dual (Muthanna), Plural (Jam'), Definite (Ma'arifa), Indefinite (Nakira)
- Always give a brief explanation suitable for a beginner of the grammatical term.
- Do not explain irab (case) or (inflection).
- Refer to the Arabic Original Sentence as "sentence" and the Full Arabic Text for Reference as "text"
- Always add a ﷺ after the name of the Prophet Muhammad (peace and blessings be upon him).
- Always add a Alayhis Salam after a Prophet or an Angel; add Radhi Allahu Anhu after a male companion; add Rahimahullah after a scholar; add Radhi Allahu Anhum after the companions; add Radhi Allahu Anha after a female companion or wife of the Prophet ﷺ.
- Avoid using complicated words since the target audience does not have english as the first language.
- Add a ⇉ before every English heading.
- Do not add a blank line after a heading.
- Avoid using arabic letters mixed with latin letters.
- The information that you produce will be validated by another AI so make sure it is correct.
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

export const getSimpleGenericExplanation = (english, arabic, arabicSentence, englishSentence, arabicText) => {
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
Act as a teacher in Classical Arabic and explain the Arabic Word to a beginner student according to the following criteria:

HEADING: Type of Word
- Explain what type of word this is: Noun (Ism), Verb (Fi'l), Preposition (Harf), Pronoun (Dameer).

HEADING: Tense and Number
- Is it a Past Tense (Maadi), Present Tense (Mudari'), Future Tense (Mustaqbil)?

HEADING: Number
- Is it Singular (Mufrad), Dual (Muthanna), Plural (Jam')?

HEADING: Alternate Translations
- Are there any alternate translations?

---

${requirements}

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
Act as a teacher in Classical Arabic and explain the Arabic Word to a beginner student according to the following criteria:

HEADING: Root System
- If the word has tags added to the root, then explain how they are removed in simple terms.
- Put the tag or tags to remove on a new line with a ← before it.
- Explain the function of the tag removed from the word to find the root.
- Add a text explaining: "The part that now remains is the original root of the word:"
- Add a ⟶ before the Arabic Word (the root) that remains after pruning on a new line below.
- Add a ↠ before the Transliteration on a new line below.
- Explain the meaning of the root that remains after removing the tag or tags.

HEADING: Words From The Same Root
- Provide easy examples of other derived words from the root for different persons such as I, You, He, She, We, They, etc.
- Add the Arabic Word, a Transliteration and the English Translation on separate lines below each other.
- Add a ⟶ before every example of a derived Arabic Word from the Root.
- The root should consist of three letters and nothing else in the al-madi (past tense) form.
- Add a ↠ before every Transliteration of the Arabic Word on a new line below.
- Add the English Translation of the Arabic Word on a new line below the Transliteration.

HEADING: Meaning of the Word
- Add a ⟶ before the Arabic Word when referencing it before explaining its meaning.
- Add a ↠ before the Transliteration of the Arabic Word on a new line below.
- Briefly and concisely explain the meaning of the word; its general meaning, alternative translations and usage in the current context.
- Keep it simple with focus on the word and avoid technical theological discussions.
- Add a ⟶ before the Arabic Original Sentence when referencing it.
- Add the English Translation of the Arabic Original Sentence on a new line below.
- Add a ↠ before the English Translation.
---

${requirements}

-- Example Output

⇉ Root System
The word "sami'tu" has extra parts added to it. To find the original or root word, we need to take away the part that doesn't belong to the root. Let's do that now:
← ْتُ
The ْتُ at the end of the word express that "I" did something in the past. This is like a little tag that you attach to the root to show who did the action and when it happened. So if you have a root like "hear", you put "تُ" at the end to say "I heard".

The part that now remains is the root of the word:
⟶ سَ مِ ع
↠ Sami'a

The root سَمِع (Sami'a) means "to hear" in Arabic.

⇉ Words From The Same Root
Let's take a look at some simple examples of other words that come from the same original root "سَمِع", but are used to talk about different people.

⟶ سَمِعَ 
↠ Sami'a
He heard

⟶ سَمِعْتَ
↠ Sami'ta
You (singular, male) heard

⟶ سَمِعْتِ
↠ Sami'ti
You (singular, female) heard

⟶ سَمِعْنَا
↠ Sami'na
We heard

⟶ سَمِعُوا
↠ Sami'u
They heard

⇉ Meaning of the Word
"Sami'tu" is an Arabic word which means "I heard". It's a type of word called a verb, which tells you about an action. In this case, the action happened in the past. So "sami'tu" is like saying "I did the action of hearing in the past".

In the current sentence:

⟶ سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ
↠ I heard the Messenger of Allah (ﷺ) say...

The word "sami'tu" is used to indicate that the speaker personally heard the Prophet Muhammad (ﷺ) say something.
---

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
Act as a teacher in Classical Arabic and explain the Arabic Noun to a beginner student according to the following criteria:

HEADING: Root System
- When revealing the root and placing it in al-madi (past tense), begin with: "First, let's remove the part that doesn't constitute the root:"
- Put the part or parts to remove on a new line with a ← before it.
- Explain the function of the part or parts removed from the word to find the root.
- Add a text explaining: "The part that now remains is the root of the word:"
- Add a ⟶ before the Arabic Word (the root in al-madi) that remains after pruning on a new line below.
- The root should consist of three letters and nothing else in the al-madi (past tense) form.
- Add a ↠ before the Transliteration on a new line below.
- Explain the meaning of the root that remains after pruning.

HEADING: Words From The Same Root
- Provide easy examples of other derived words from the root for different cases such as Definite (Ma'arifa), Indefinite (Nakira), Singular (Mufrad), Dual (Muthanna), and Plural (Jam').
- Add the Arabic Word, a Transliteration, and the English Translation on separate lines below each other.
- Add a ⟶ before every example of a derived Arabic Word from the Root.
- Add a ↠ before every Transliteration of the Arabic Word on a new line below.
- Add the English Translation of the Arabic Word on a new line below the Transliteration.

HEADING: Meaning of the Word
- Add a ⟶ before the Arabic Word when referencing it before explaining its meaning.
- Add a ↠ before the Transliteration of the Arabic Word on a new line below.
- Briefly and concisely explain the meaning of the word; its general meaning, alternative translations and usage in the current context.
- Keep it simple with focus on the word and avoid technical theological discussions.
- Add a ⟶ before the Arabic Original Sentence when referencing it.
- Add the English Translation of the Arabic Original Sentence on a new line below.
- Add a ↠ before the English Translation.
---

--- Example Output

⇉ Root System
The word "hijratuhu" is not in its root form.

So, let's remove the part that doesn't constitute the root:
← هِجْرَ
← ُهُ
n Arabic, if you see "هِجْرَ" at the beginning of a word, it's a noun, or a thing rather than an action. The "ُهُ" at the end of the word is a way to say "his", like it belongs to him. So you use these parts to change the meaning of the word.

The part that now remains is the root of the word:
⟶ ه ج ر
↠ Hajara

The root هجر (Hajara) means "to migrate" or "to abandon" in Arabic.

⇉ Words From The Same Root
Let's check out some simple examples of other words that are made from the original Arabic word هجر:

⟶ هِجْرَة
↠ Hijrah
Migration (Definite, Singular)

⟶ هجرتين
↠ Hijratayn
Two migrations (Definite, Dual)

⟶ هِجَر
↠ Hijar
Migrations (Indefinite, Plural)

⟶ الهِجَر
↠ Al-Hijar
The migrations (Definite, Plural)

⇉ Meaning of the Word
The noun "hijratuhu" generally means "his migration".

In the way the sentence is being used right now:

⟶ وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا
↠ But he whose migration was for some worldly thing he might gain

The word "hijratuhu" is used to refer to a person's motive for migration, in this case, for worldly gains. The usage of the word underscores the concept that the intent behind actions, such as migration, significantly impacts their moral and spiritual value in Islam.

---

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
Act as a teacher in Classical Arabic and explain the Arabic Noun to a beginner student according to the following criteria:

HEADING: Function
- Briefly and concisely identify the function of the particle in a sentence.
- Avoid using complicated grammatical terms and when using terms, explain them in simple terms.

HEADING: Compound Particle
- Briefly and concisely identify if the particle is a compound particle and explain how it is formed.

HEADING: Relation to Other Words
- Briefly and concisely explain how the particle relates to other words in the sentence (Arabic Original Sentence) and the whole text (Full Arabic Text for Reference), such as the verb, the object, and the subject, using story telling to make the explanation and relevant to the Full Arabic Text.
- Add a ⟶ before the Arabic Original Sentence when referring to it under the heading "Relation to Other Words".
- Add the English Translation of the Arabic Original Sentence on a new line below.
- Add a ↠ before the English Translation.
- Refer to the Arabic word as "the particle" in the explanation.
- Transliterate the Arabic Words in the explanation.

HEADING: Common Alternate Usages
- Give examples in sentences of how the particle is used in other contexts with Arabic Sentence, Transliteration, and English Translation on separate lines below each other.
- Add a ⟶ before the Arabic Sentence
- Add a ↠ before the Transliteration of the Arabic Sentence.
---

--- Example of Output:
⇉ Function
In a sentence, the word "ila" is used to show where something is going or the direction it's moving in. Think of it like the word "to" or "towards" in English. It's a type of word that helps connect other words in the sentence.

It's used to show the direction or target of an action or movement.

⇉ Compound Particle
"Ila" is just one word by itself. It isn't two words that have been joined together.

In Arabic, "ila" is a word that stands on its own. It doesn't mix with other words to make a new one.

⇉ Relation to Other Words
⟶ فَمَنْ كَانَتْ هِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ
↠ So whoever's migration was to Allah and His Messenger,

In the sentence, the word "ila" is used to show the direction of the migration (hijratuhu), signifying that it is towards Allah and His Messenger.

It connects the action "was" (kaanat) with its complement, "Allah and His Messenger".

This indicates the destination or the intended goal of the action of migration.

In the context of the full text, the word "ila" is used to differentiate the motivations for migration (hijra).

It indicates the destination or intention of the migration, whether it be towards Allah and His Messenger, or towards worldly gain or marriage.

⇉ Common Alternate Usages
⟶ أنا أذهب إلى المدرسة
↠ Ana adhhab ila al-madrasa
I am going to the school.

⟶ القط يركض إلى الفأر
↠ Al-qittu yar'kudu ila al-fa'ir
The cat is running towards the mouse.

In these examples, the word "ila" is used to show the direction of the actions (going, running) towards their respective destinations (school, mouse).
---

${requirements}

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
