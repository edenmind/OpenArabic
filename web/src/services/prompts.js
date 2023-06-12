const requirements = `
--- Requirements:
- Use the Arabic terms for grammar (transliterated into latin) in addition to the English terms.
- Only use the following grammatical terms: Noun (Ism), Verb (Fi'l), Preposition (Harf), Pronoun (Dameer),  Past Tense (Maadi), Present Tense (Mudari'), Future Tense (Mustaqbil), Singular (Mufrad), Dual (Muthanna), Plural (Jam'), Definite (Ma'arifa), Indefinite (Nakira)
- Always give a brief explanation suitable for a beginner of the grammatical term using analogies and examples.
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

HEADING: Uncovering the Root
- If the word has parts added to the root, then explain how they are removed in simple terms.
- Put the part to remove on a new line with a ← before it.
- Explain the function of the part removed from the word to find the root.
- If there are more than one part to remove, then repeat the above steps for each tag.
- Add a text explaining: "The part that now remains is the original root of the word:"
- Add a ⟶ before the Arabic Word (the root) that remains after pruning on a new line below.
- Add a ↠ before the Transliteration on a new line below.
- Explain the meaning of the root that remains after removing the tag or tags.

HEADING: Exploring Words from the Same Root
- Provide easy examples of other derived words from the root for different persons such as I, You, He, She, We, They, etc.
- Add the Arabic Word, a Transliteration and the English Translation on separate lines below each other.
- Add a ⟶ before every example of a derived Arabic Word from the Root.
- The root should consist of three letters and nothing else in the al-madi (past tense) form.
- Add a ↠ before every Transliteration of the Arabic Word on a new line below.
- Add the English Translation of the Arabic Word on a new line below the Transliteration.

HEADING: Making the Words Meaning Clear
- Add a ⟶ before the Arabic Word when referencing it before explaining its meaning.
- Add a ↠ before the Transliteration of the Arabic Word on a new line below.
- Briefly and concisely explain the meaning of the word; its general meaning, alternative translations and usage in the current context.
- If the word is conjugated together with another word in the sentence, then explain that in very simple terms.
- Keep it simple with focus on the word and avoid technical theological discussions.
- Add a ⟶ before the Arabic Original Sentence when referencing it.
- Add the English Translation of the Arabic Original Sentence on a new line below.
- Add a ↠ before the English Translation.
---

${requirements}

-- Example Output

⇉ Uncovering the Root
The Arabic word سَمِعْتُ (sami'tu) contains more than just its root. Think of the root as the core of the word, with extra parts or 'tags' attached to it. To identify the root, we first need to remove these tags:
← ْتُ
This tag ْتُ is a kind of label that tells us that "I" performed an action in the past.

It's similar to how in English we say "I listened", where the "-ed" at the end tells us that the action happened in the past.

The part that now remains is the original root of the word:
⟶ سَمِع
↠ Sami'a
This root, سَمِع (Sami'a), translates to "to hear" in Arabic.

⇉ Exploring Words from the Same Root
Using the same root, we can create different words to refer to different people or actions.

Let's check out some other words from the same root:
⟶ سَمِعَ 
↠ Sami'a
He heard

⟶ سَمِعْتَ
↠ Sami'ta
You (male, singular) heard

⟶ سَمِعْتِ
↠ Sami'ti
You (female, singular) heard

⟶ سَمِعْنَا
↠ Sami'na
We heard

⟶ سَمِعُوا
↠ Sami'u
They heard

⇉ Making the Words Meaning Clear
When we look at the word سَمِعْتُ (sami'tu), it translates to "I heard". It's a kind of word called a verb (or in Arabic, Fi'l), which describes an action. In this case, the action happened in the past.

In the original sentence:
⟶ سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ
↠ I heard the Messenger of Allah (ﷺ) say...
Here, "sami'tu" signifies that the speaker personally heard the Prophet Muhammad (ﷺ) say something.

The context here is crucial to understanding the exact meaning of the word.
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

HEADING: Uncovering the Root
- When revealing the root and placing it in al-madi (past tense), begin with: "First, let's remove the part that doesn't constitute the root:"
- Put the part to remove on a new line with a ← before it.
- Explain the function of the part removed from the word to find the root.
- If there are more than one part to remove, then repeat the above steps for each tag.
- Add a text explaining: "The part that now remains is the root of the word:"
- Add a ⟶ before the Arabic Word (the root in al-madi) that remains after pruning on a new line below.
- The root should consist of three letters and nothing else in the al-madi (past tense) form.
- Add a ↠ before the Transliteration on a new line below.
- Explain the meaning of the root that remains.

HEADING: Exploring Words from the Same Root
- Provide easy examples of other derived words from the root for different cases such as Definite (Ma'arifa), Indefinite (Nakira), Singular (Mufrad), Plural (Jam') and some past tense verb forms.
- Add the Arabic Word, a Transliteration, and the English Translation on separate lines below each other.
- Add a ⟶ before every example of a derived Arabic Word from the Root.
- Add a ↠ before every Transliteration of the Arabic Word on a new line below.
- Add the English Translation of the Arabic Word on a new line below the Transliteration.

HEADING: Making the Words Meaning Clear
- Add a ⟶ before the Arabic Word when referencing it before explaining its meaning.
- Add a ↠ before the Transliteration of the Arabic Word on a new line below.
- Briefly and concisely explain the meaning of the word; its general meaning, alternative translations and usage in the current context.
- If the word is conjugated together with another word in the sentence, then explain that in very simple terms.
- Keep it simple with focus on the word and avoid technical theological discussions.
- Add a ⟶ before the Arabic Original Sentence when referencing it.
- Add the English Translation of the Arabic Original Sentence on a new line below.
- Add a ↠ before the English Translation.
---

--- Example Output
⇉ Uncovering the Root
The word "بِالنِّيَّاتِ" (bi-nniyyāt) has additional elements attached to its root form. To discover the root, we must remove these additional parts:
← بِ
This part at the beginning of the word is a preposition (Harf) that means "with" or "by" in English.

← ال
This is the definite article, similar to "the" in English.

← يَّاتِ 
This part at the end of the word is a morphological device to indicate the plural form.

The part that now remains is the root of the word:
⟶ نوى
↠ Nawa

The root نوى (Nawa) in the past tense (Maadi) means "he intended" in Arabic.

⇉ Exploring Words from the Same Root
Let's check out some other words from the same root:
⟶ نِيَّة
↠ Niyyah
Intention (Definite, Singular)

⟶ أَنْوِيَة
↠ Anwiyyah
Intentions (Indefinite, Plural)

⟶ الأَنْوِيَة
↠ Al-Anwiyyah
The intentions (Definite, Plural)

⇉ Making the Words Meaning Clear
The noun "بِالنِّيَّاتِ" (bi-nniyyāt) generally means "with the intentions" or "by the intentions". In other words, it refers to the motivation behind an action.

In the sentence:
⟶ إنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ 
↠ Verily, actions are (judged) by intentions.

The word "بِالنِّيَّاتِ" is used to express that actions are judged based on the intentions behind them. It reflects the principle in Islam that the merit or sin of an action is determined not only by its outward form, but also by the intention of the person performing it.

---

${requirements}

`
  return result.trimStart()
}

export const getExplanationOfParticle = (english, arabic, arabicSentence, englishSentence, arabicText) => {
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

HEADING: Role in a Sentence
- Briefly and concisely identify the function of the particle in a sentence.
- Avoid using complicated grammatical terms and when using terms, explain them in simple terms.

HEADING: Single or Compound Particle?
- Briefly and concisely identify if the particle is a compound particle and explain how it is formed.
- If it is a compound then add a ⟶ before the Arabic Word and on a new line below ↠ before the Transliteration of the Arabic Word.
- Do this for both or the part of the compound particle.

HEADING: Interaction with Other Words
- Briefly and concisely explain how the particle relates to other words in the sentence (Arabic Original Sentence) and the whole text (Full Arabic Text for Reference), such as the verb, the object, and the subject, using story telling to make the explanation and relevant to the Full Arabic Text.
- Add a ⟶ before the Arabic Original Sentence when referring to it under the heading "Relation to Other Words".
- Add the English Translation of the Arabic Original Sentence on a new line below.
- Add a ↠ before the English Translation.
- Refer to the Arabic word as "the particle" in the explanation.
- Transliterate the Arabic Words in the explanation.

HEADING: Various Usages
- Give examples in sentences of how the particle is used in other contexts with Arabic Sentence, Transliteration, and English Translation on separate lines below each other.
- Add a ⟶ before the Arabic Sentence
- Add a ↠ before the Transliteration of the Arabic Sentence.
---

--- Example of Output:
⇉ Role in a Sentence
The Arabic particle "innama" is a type of emphasizing word used to add stress or importance to the sentence. Think of it as the word "only" or "indeed" in English. Its role is to give a sense of exclusivity to what comes after it in the sentence, like saying "it is only this and nothing else". 

⇉ Single or Compound Particle?
The particle "innama" is actually a compound particle, formed from the joining of two smaller particles "inna" and "ma". Here are the two parts of "innama":
⟶ إنَّ 
↠ inna 
This means "indeed" or "verily".

⟶ مَا 
↠ ma 
This is usually used to mean "what" or "that which".

Together as "innama", they bring an emphasis that can be translated as "indeed only".

⇉ Interaction with Other Words
⟶ إنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ 
↠ Verily, actions are (judged) by intentions.

In the sentence, the particle "innama" gives emphasis to the statement that follows it. It connects to the word "actions" (a'mal), emphasizing that these actions are solely or exclusively judged by their intentions (niyyat). In other words, it gives the sense that it is only the intention that truly matters when it comes to actions.

In the context of the full text, Prophet Muhammad ﷺ is emphasizing the central importance of intentions in Islam. The particle "innama" here helps to underline this principle, making it clear that it's not just one of many factors, but the decisive factor in judging actions.

⇉ Various Usages
The particle "innama" is often used in Arabic to add emphasis or restriction to statements. Here are a couple examples:

⟶ إنَّمَا الْمُؤْمِنُونَ إخْوَةٌ
↠ Innama al-mu'minoona ikhwa
Indeed, the believers are brothers.

⟶ إنَّمَا الْعِلْمُ بِالتَّعَلُّمِ
↠ Innama al-'ilmu bi-ta'allum
Indeed, knowledge is [attained] by learning.

In these examples, "innama" is used to emphasize the exclusive nature of the relationships and the process of gaining knowledge. It highlights the fact that these are the only ways these things can be truly understood or achieved.
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
