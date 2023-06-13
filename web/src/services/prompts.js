const requirements = `
--- Requirements:
- Use the Arabic terms for grammar (transliterated into latin) in addition to the English terms.
- Only use the following grammatical terms: Noun (Ism), Verb (Fi'l), Preposition (Harf), Pronoun (Dameer),  Past Tense (Maadi), Present Tense (Mudari'), Future Tense (Mustaqbil), Singular (Mufrad), Dual (Muthanna), Plural (Jam'), Definite (Ma'arifa), Indefinite (Nakira), Masdar.
- Do not use any other grammatical terms.
- Always give a brief explanation suitable for a beginner of the grammatical term using analogies and examples.
- Only explain irab (case or inflection) if it is possible to do in very simple terms.
- Refer to the individual Arabic Original Sentence as "sentence" and the Full Arabic Text for Reference as "text"
- Always add a ﷺ after the name of the Prophet Muhammad (peace and blessings be upon him).
- Always add a Alayhis Salam after a Prophet or an Angel; add Radhi Allahu Anhu after a male companion; add Rahimahullah after a scholar; add Radhi Allahu Anhum after the companions; add Radhi Allahu Anha after a female companion or wife of the Prophet ﷺ.
- Do not use complicated words since the target audience does not have english as the first language.
- Add a ⇉ before every English heading.
- Do not add a blank line after a heading.
- Do not mix arabic letters with latin letters in sentences.
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

Act as a teacher in Classical Arabic and explain the Arabic Word (that is a verb) to a beginner student according to the following criteria:

HEADING: Identifying the Root

- Begin by removing any non-root parts from the word.
- Note that we won't handle roots consisting of two or four letters.
- Introduce each non-root part that's to be removed with a ← on a new line.
- Elucidate the role each non-root part plays in constructing the word.
- If multiple parts need removal, repeat the procedure for each.
- Once all non-root parts are removed, indicate: "What remains is the original three-letter root of the word:"
- Use ⟶ to mark the Arabic root (masdar) on a new line.
- Follow with its Transliteration, denoted by ↠.
- Explain the three-letter root's meaning.

HEADING: Exploring Derivatives from the Same Root

- Furnish examples of words derived from the root, pertaining to the pronouns I, You (singular), He, She, We, You (plural), They in the past tense (al-madi).
- List the Arabic Word, its Transliteration, and English Translation sequentially.
- Use ⟶ to denote each derived Arabic Word from the Root.
- Ensure that the root is in its three-letter form, specifically in the past tense (al-madi).
- Transliterate each derived word, prefixed by ↠.
- Write the English Translation of the derived word on the next line.

HEADING: Clarifying the Word's Meaning

- When about to discuss the word's meaning, preface it with a ⟶.
- Follow the Arabic Word with its Transliteration, signified by ↠.
- Offer a concise explanation of the word's meaning, its alternative translations, and contextual usage.
- If a verb matches the conjugation of its referred noun, or an adjective aligns with the noun it describes, simplify this concept.
- The focus should remain on the word, avoiding theological digressions.
- If the word appears in an original Arabic sentence, indicate the sentence using ⟶.
- Translate the sentence into English, and prefix this translation with ↠.

HEADING: Collating Arabic Words

- Compose a list of Arabic words discussed in the lesson, without tashkeel (vowels).
---

${requirements}

-- Example Output

⇉ Identifying the Root
The word we're studying today is "sami'tu".

This word has some extra elements which aren't part of the root.

You can imagine the root as the heart of the word, and we need to peel off these extra layers to get to it.

Let's start:
← ْتُ
This additional part "tu" is a form of pronoun (Dameer in Arabic) that tells us that "I" am the one who did the action, and it was in the past.

Think of it like in English, when we say "I listened", the "-ed" part shows us that the action is in the past.

Once we take off this extra part, we get the three-letter root of the word:
⟶ سَمِع
↠ Sami'a
This root, "sami'a", translates to "to hear" in Arabic.

⇉ Exploring Derivatives from the Same Root
The beauty of Arabic is that we can make many words from one root.

These words can refer to different times, people, and more.

Let's see some words derived from this root, in the past tense (Maadi):
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

⇉ Clarifying the Word's Meaning
Now, we come to the word "sami'tu".

This translates to "I heard".

It's a verb (or Fi'l in Arabic), which means it describes an action or a state.

Here, it's describing a past action.

In the sentence from our text:
⟶ سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ
↠ I heard the Messenger of Allah (ﷺ) say...
Here, "sami'tu" shows that the speaker himself heard the Prophet Muhammad (ﷺ) say something.

The context in which the word is used gives it more meaning and depth.

⇉ Arabic Words
Here are the Arabic words that we have used in this explanation:
ت
سمع
سمعت
سمعت
سمعنا
سمعوا
سمعت رسول الله يقول

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
Act as a teacher in Classical Arabic and explain the Arabic Word (that is a noun) to a beginner student according to the following criteria:

HEADING: Identifying the Root

- Start with "First, let's isolate the root by removing non-root parts:"
- We'll only work with three-letter roots, not two or four-letter ones.
- Display each part to be removed on a new line, marked by a ←.
- Detail the role of each removed part in the context of the word.
- If multiple parts are to be removed, repeat the steps for each.
- Follow with: "The remaining part is the three-letter root of the word:"
- Mark the remaining Arabic root (masdar) with a ⟶ on a new line.
- Transliterate the root on a new line, denoted by ↠.
- Explain the meaning of the three-letter root.

HEADING: Exploring Derivatives from the Same Root

- Present simple examples of words derived from the root for different pronouns (I, You, He, etc.).
- Line up the Arabic word, its transliteration, and English translation sequentially.
- Mark each Arabic word derived from the root with a ⟶.
- Transliterate the derived word on a new line, prefixed by ↠.
- Write the English translation of the derived word on a line below the transliteration.

HEADING: Clarifying the Word's Meaning

- Preface the Arabic word with a ⟶ when about to elucidate its meaning.
- Transliterate the word on a new line, signified by ↠.
- Offer a succinct explanation of the word's meaning, alternatives, and context-specific usage.
- If the word aligns in conjugation with another in the sentence, provide a simple explanation.
- Keep the explanation focused on the word, avoiding theological discussions.
- Refer to the Arabic original sentence with a ⟶.
- Give the English translation of the original sentence on a new line.
- Preface the English translation with a ↠.

HEADING: Arabic Word List

- Compile a list of Arabic words used in the explanation, devoid of tashkeel (vowels).
---

--- Example Output
⇉ Identifying the Root
The word "bi-nniyyāt" has additional elements attached to its root form. To discover the root, we must remove these additional parts:
← بِ
This part at the beginning of the word is a preposition (Harf) that means "with" or "by" in English.

← ال
This is the definite article, similar to "the" in English.

← يَّاتِ 
This part at the end of the word is a morphological device to indicate the plural form.

The part that now remains is the root of the word:
⟶ نوى
↠ Nawa

The root "nawa" means "he intended" in Arabic.

⇉ Exploring Derivatives from the Same Root
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

⇉ Clarifying the Word's Meaning
The word "bi-nniyyāt" generally means "with the intentions" or "by the intentions". In other words, it refers to the motivation behind an action.

In the sentence:
⟶ إنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ 
↠ Verily, actions are (judged) by intentions.

The word "bi-nniyyāt" is used to express that actions are judged based on the intentions behind them. It reflects the principle in Islam that the merit or sin of an action is determined not only by its outward form, but also by the intention of the person performing it.

⇉ Arabic Words
Here are the Arabic words that we have used in this explanation:
ب
ال
يات
نوى
نية
أنوية
الأنوية
إنما الأعمال بالنيات

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
- Do not use complicated grammatical terms and when using terms, you must explain them for a beginner.

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

HEADING: Arabic Words
- List all the Arabic Words that have been used in the previous sections.
---

--- Example of Output:
⇉ Role in a Sentence
The particle "innama" is a type of emphasizing word used to add stress or importance to the sentence. Think of it as the word "only" or "indeed" in English. Its role is to give a sense of exclusivity to what comes after it in the sentence, like saying "it is only this and nothing else". 

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

⇉ Arabic Words
Here are the Arabic words that we have used in this explanation:
إنَّ
مَا
 إنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ
إنَّمَا الْمُؤْمِنُونَ إخْوَةٌ
إنَّمَا الْعِلْمُ بِالتَّعَلُّمِ


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
