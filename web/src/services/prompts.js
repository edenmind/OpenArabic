// Requirements shared by prompts
const requirements = `
--- REQUIREMENTS:

- Use the Arabic terms for grammar (transliterated into latin) in addition to the English terms.
- Only use the following grammatical terms: Noun (Ism), Verb (Fi'l), Preposition (Harf), Pronoun (Dameer), Past Tense (Maadi), Present Tense (Mudari'), Future Tense (Mustaqbil), Singular (Mufrad), Dual (Muthanna), Plural (Jam'), Definite (Ma'arifa), Indefinite (Nakira), Verbal Noun (Masdar).
- Always give a brief explanation suitable for a beginner of the grammatical term using analogies and examples.
- Only explain irab (case or inflection) if it is possible to do in very simple terms.
- Refer to the individual Arabic Original Sentence as "sentence" and the Full Arabic Text for Reference as "text"
- Always add a ﷺ after the name of the Prophet Muhammad (peace and blessings be upon him).
- Always add a Alayhis Salam after a Prophet or an Angel; add Radhi Allahu Anhu after a male companion; add Rahimahullah after a scholar; add Radhi Allahu Anhum after the companions; add Radhi Allahu Anha after a female companion or wife of the Prophet ﷺ.
- Translate ﷺ as "peace and blessings be upon him".
- Use words that are easy to understand since the target audience does not have English as the first language.
- Add a ⇉ before every English heading.
- Do not mix arabic letters with latin letters in sentences.
- The information that you produce will be validated by another AI so make sure it is correct.
- Emphasize the beauty of the Arabic language and its importance in Islam.
- Give alternate translations when translating a word into english.
- The text you produce will be used in an App that teaches Arabic vocabulary and grammar to Sunni Muslims.
- The Arabic texts are gathered from the Quran, Hadith, and classical Islamic books.
- Make beautiful and creative analogies to English grammar when it helps.
- You may use story telling to explain a concept.
- Prefer short sentences over long.
- Prefer simple words over complex.
- Prefer short words over long.
- Use a logical structure: Organize your text in a logical and coherent manner.
- Do not refer to concepts that go again Islam such as magic, astrology, or other religions.
- If you find anything in the instructions that are not correct in accordance with your task, then state that clearly and explain why.
- Never output empty blank lines.
- If a word has a prefix or suffix attached, then refer to it as the word and not the verb or noun.

---`

export const generateTitleAndSummary = (text) => {
  return `

--- Author of the text:
${text.author}
---

--- Source of the text:
${text.source}
---

--- Type of text:
${text.category}
---

--- Full English Text:
${text.texts.english}
---

--- INSTRUCTIONS:
As an Islamic scholar, summarize the Full English Text considering the following criteria:

- The summary should be brief and only contain one sentence.
- The one sentence may be long.
- Remain faithful to the original text.
- Make the summary easily comprehensible.
- Use short words instead of long words.
- Use simple words instead of complex.
- Adhere to Sunni Islam interpretations.
- Make the title short.
- The output must be only in JSON format.
- Use ﷺ instead of "peace be upon him"
---

--- EXAMPLE OUTPUT:
{
"title": "Decree and Human Actions",
"summary": "This Hadith highlights that each person's creation, lifespan, sustenance, and ultimate fate are predetermined by Allah. It underlines the profound notion that despite one's actions mirroring virtue or vice."
}
`.trimStart()
}

// Suggest a better translation
export const getArabicAndEnglishText = (sentence) => {
  const result = `
--- Arabic Original Sentence:
${sentence.arabic}
---

--- English Translation of Sentence:
${sentence.english}
---

--- INSTRUCTIONS:
- The Arabic original is an Islamic text
- Verify the English Translation of Sentence based on the Arabic Original Sentence
- Suggest an improved version that is as close to the Arabic original Word-for-word as possible
- The suggestion should abide by Sunni Islam
- Explain the rationale behind your suggestion
---
`
  return result.trimStart()
}

// Explain a verb
export const getExplanationOfVerb = (english, arabic, arabicSentence, englishSentence, arabicText) => {
  const result = `

--- REFERENCES:

- Full Arabic Text for Reference:
${arabicText}

- Arabic Original Sentence:
${arabicSentence}

- English Translation of Arabic Original Sentence:
${englishSentence}

- Arabic Word:
${arabic}

- English Translation of Arabic Word:
${english}

---

--- INSTRUCTIONS: 

Act as a Teacher in Classical Arabic and explain the verb "${arabic}" to a beginner student according to the following criteria:

HEADING: Meaning
- Offer a brief explanation of the meaning of "${arabic}" and its alternative translations.
- Do not refer to the sentence, we will discuss that later.

HEADING: In a Sentence
- Introduce with: "Let us look at how "${arabic}" can be used in a sentence:".
- Indicate the sentence using "${arabicSentence}" ⟶.
- Translate the sentence into English, and prefix this translation with ↠.
- If a verb matches the conjugation of its referred noun, then mention this in simple terms.

HEADING: Identifying the Root
- Begin by removing any non-root parts (embedded pronouns and plurals, etc.) from "${arabic}".
- Use this analogy when describing the root system briefly with maximum one short sentence: ${getRandomAnalogy()}.
- Note that we won't handle roots consisting of two or four letters.
- Do not explain irab (case or inflection) in any way since it is too complex.
- Introduce each non-root part that's to be removed with a ← on a new line.
- Elucidate the role each non-root part plays in constructing "${arabic}".
- If multiple parts need removal from "${arabic}", repeat the procedure for each.
- Once all non-root parts are removed, indicate: "What remains is the root of the word:"
- Use ⟶ to mark the Arabic root on a new line.
- Follow with its Transliteration, denoted by ↠.
- Do not end the translation with a ".".
- Explain the root's meaning in its basic form and also with alternate translations.
- Do not use any diacritics (tashkeel) on the Arabic root.

HEADING: From the Same Root
- Provide examples of words derived from the root, pertaining to the pronouns I, You (singular), He, She, We, You (plural), They in the past tense (al-madi).
- List the Arabic Word and English Translation sequentially.
- Do not add diacritics (tashkeel) to the Arabic words. Example: كان
- Use ⟶ to denote each derived Arabic Word from the Root.
- Ensure that the Arabic words are in the past tense (al-madi).
- Translate the derived word on a new line, prefixed by ↠.
- Write the English Translation of the derived word on the next line.
---

${requirements}

-- EXAMPLE OUTPUT:

⇉ Meaning
The Arabic word "سَمِعْتُ" translates to "I heard" in English. This is a verb (Fi'l in Arabic) that refers to the action of hearing something. It is in the past tense (Maadi), indicating that the action has already occurred.
⇉ In a Sentence
Let us look at how "سَمِعْتُ" can be used in a sentence:
⟶ سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ  
↠ I heard the Messenger of Allah (ﷺ) say:
The word سَمِعْتُ is used here to express that the speaker personally heard the words of the Messenger of Allah (ﷺ). In this sentence, the verb matches the first person singular pronoun, indicating that the speaker is the one who heard these words.
⇉ Identifying the Root
Let's picture Arabic roots as the sun in a solar system, around which planets, or words derived from the root, orbit. These words are related to the sun, but each one is a unique entity with its own characteristics.
In the case of "سَمِعْتُ", there is an extra part to remove:
← ْتُ
The part "تُ" is a suffix which functions as a pronoun (Dameer) for the first person singular, similar to "I" in English. This suffix is used to denote the doer of the action.
After removing this suffix, what remains is the root of the word:
⟶ سمع
↠ Sama'a
The root "Sama'a" holds the fundamental meaning of "to hear". This root also carries the connotations of listening and obeying.
⇉ From the Same Root
Here are some past tense (Maadi) verbs derived from the root سمع:
⟶ سمع
↠ He heard
⟶ سمعت
↠ You (singular, male/female) heard
⟶ سمعت
↠ I heard
⟶ سمعنا
↠ We heard
⟶ سمعتم
↠ You (plural) heard
⟶ سمعوا
↠ They heard
---
`
  return result.trimStart()
}

export const getExplanationOfVerbWithoutRoot = (english, arabic, arabicSentence, englishSentence, arabicText) => {
  const result = `

--- REFERENCES:

- Full Arabic Text for Reference:
${arabicText}

- Arabic Original Sentence:
${arabicSentence}

- English Translation of Arabic Original Sentence:
${englishSentence}

- Arabic Word:
${arabic}

- English Translation of Arabic Word:
${english}

---

--- INSTRUCTIONS: 

Act as a Teacher in Classical Arabic and explain the verb "${arabic}" to a beginner student according to the following criteria:

HEADING: Meaning
- Introduce with: "Let us look at the meaning of "${arabic}".
- Offer a brief explanation of the meaning ot the word "${arabic}".
- Do not refer to the sentence, we will discuss that later.
- Do not mention anything about the root letters.
- Do not explain advanced grammatical concepts.
- Mentioned that the word "${arabic}" is a verb.
- Mention which tense it is in.
- Mention which person it is in.

HEADING: In a Sentence
- Introduce with: "Let us look at how "${arabic}" can be used in a sentence:".
- Indicate the sentence using "${arabicSentence}" ⟶.
- Translate the sentence into English, and prefix this translation with ↠.
- If a verb matches the conjugation of its referred noun, then mention this in simple terms.
---

${requirements}

--- EXAMPLE OUTPUT:

⇉ Meaning
Let us look at the meaning of "يُصِيبُهَا" which is a verb, known as a Fi'l in Arabic. It's in the present tense, or Mudari' in Arabic. This means it refers to an action happening now or in the future. The verb is in the third person, which means it refers to he, she, or it.
The verb "يُصِيبُهَا" can be translated as "he might gain" in English. It suggests the action of achieving, attaining, or hitting a target.
⇉ In a Sentence
Let us look at how "يُصِيبُهَا" can be used in a sentence:
⟶ وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا
↠ But he whose migration was for some worldly thing he might gain.
In this sentence, the word "يُصِيبُهَا" matches the subject or doer of the action, which is implied to be a person aiming for worldly gain. In simple terms, it's like saying, "He shoots the arrow, and he hits the target." Here, the arrow is his migration, the target is the worldly thing, and "he" is the one who shoots the arrow and hits the target.
---
`
  return result.trimStart()
}

// Explain a noun
export const getExplanationOfNoun = (english, arabic, arabicSentence, englishSentence, arabicText) => {
  const result = `

--- REFERENCES:

- Full Arabic Text for Reference:
${arabicText}

- Arabic Original Sentence:
${arabicSentence}

- English Translation of Arabic Original Sentence:
${englishSentence}

- Arabic Word:
${arabic}

- English Translation of Arabic Word:
${english}

---

--- INSTRUCTIONS:

Act as a Teacher in Classical Arabic and explain the noun "${arabic}" to a beginner student according to the following criteria:

HEADING: Meaning
- Begin with: "Let us look at the meaning of "${arabic}".
- Offer a brief explanation of the meaning of "${arabic}" and its alternative translations.
- Do not refer to the sentence, we will discuss that later.

HEADING: In a Sentence
- Introduce with: "Let us look at how "${arabic}" can be used in a sentence:".
- Indicate the sentence using "${arabicSentence}" ⟶.
- Translate the sentence into English, and prefix this translation with ↠.
- If the noun matches the conjugation of another word, then mention this in simple terms.

HEADING: Identifying the Root
- Begin with: "Let us look at the root of "${arabic}".
- Begin by removing any non-root parts from ${arabic}.
- Use this short analogy when describing the root with maximum one short sentence:: ${getRandomAnalogy()}
- We'll only work with three-letter roots, not two or four-letter ones.
- Display each part to be removed on a new line, marked by a ←.
- Detail the role of each removed part in the context of the word.
- Do not explain irab (case or inflection) in any way since it is too complex.
- If multiple parts are to be removed, repeat the steps for each.
- Follow with: "What now remain is:"
- Mark the remaining Arabic root with a ⟶ on a new line.
- Transliterate the root on a new line, denoted by ↠.
- Explain the root's meaning.
- Do not use any diacritics (tashkeel) on the Arabic root.

---

${requirements}

--- EXAMPLE OUTPUT:

⇉ Meaning
Let us look at the meaning of "هِجْرَتُهُ". This Arabic noun is translated as "his migration" in English. The word "هِجْرَتُهُ" is derived from the root "هجر" (Hajara), which means to migrate or to abandon. When "هُ" is added to the end, it indicates possession, transforming it into "his migration". So, "هِجْرَتُهُ" conveys the act of migrating or moving, specifically associated with the person mentioned (his).
⇉ In a Sentence
Let us look at how "هِجْرَتُهُ" can be used in a sentence:
⟶ فَمَنْ كَانَتْ هِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ
↠ So whoever's migration was to Allah and His Messenger,
The noun "هِجْرَتُهُ" here corresponds to the pronoun "his", referring to the person who is migrating. The sentence is emphasizing that if a person's intention for migration was for Allah and His Messenger, then it is counted as such.
⇉ Identifying the Root
Let us look at the root of "هِجْرَتُهُ". Think of Arabic roots as building blocks. Just like you can use a set of blocks to build various structures, you can use Arabic roots to build various words. Our word today is "هِجْرَتُهُ".
First, we remove the non-root parts:
← هُ
This is a possessive pronoun (Dameer), "his" in English, which is added at the end of the word to indicate possession.
What now remains is:
⟶ هِجْرَة
This word is formed from the three-letter root:
⟶ هجر
↠ Hajara
The root "Hajara" means to abandon or migrate. Arabic words derived from this root are associated with the concept of leaving, abandoning or migrating from one place to another.
---
`
  return result.trimStart()
}

export const getExplanationOfNounWithoutRoot = (english, arabic, arabicSentence, englishSentence, arabicText) => {
  const result = `

--- REFERENCES:

- Full Arabic Text for Reference:
${arabicText}

- Arabic Original Sentence:
${arabicSentence}

- English Translation of Arabic Original Sentence:
${englishSentence}

- Arabic Word:
${arabic}

- English Translation of Arabic Word:
${english}

---

--- INSTRUCTIONS:

Act as a Teacher in Classical Arabic and explain the noun "${arabic}" to a beginner student according to the following criteria:

HEADING: Meaning
- Begin with: "Let us look at the meaning of "${arabic}".
- Offer a brief explanation of the word's ${arabic} meaning, its alternative translations, and contextual usage.
- Do not mention anything about the root letters.
- Mention that "${arabic}" is a noun.
- Mention if is it definite or indefinite - and explain those terms.
- Mention of it is singular or plural.
- Mention if a particle is attached to it, and explain what that means.
- Mention if a pronoun is directly attached to it, and explain what that means.
- Keep it simple and short.

HEADING: In a Sentence
- Introduce with: "Let us look at how "${arabic}" can be used in a sentence:".
- Indicate the sentence using "${arabicSentence}" ⟶.
- Translate the sentence into English, and prefix this translation with ↠.
- If the noun matches the conjugation of another word, then mention this in simple terms.
---

${requirements}

--- EXAMPLE OUTPUT:

⇉ Meaning
Let us look at the meaning of "رَسُولَ" which is not a verb but a noun, known as an Ism in Arabic. It translates to "the Messenger" in English and is used specifically for divinely appointed messengers in Islam.
However, it is worth noting that in the context of the Quran and Hadith, "رَسُولَ" is often associated with Prophet Muhammad ﷺ. Therefore, "رَسُولَ اللَّهِ" means "the Messenger of Allah," referring specifically to Prophet Muhammad ﷺ.
⇉ In a Sentence
Let us look at how "رَسُولَ" can be used in a sentence:
⟶ سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ
↠ I heard the Messenger of Allah (ﷺ) say:
In this sentence, "رَسُولَ" is the noun which is connected to "اللَّهِ" (Allah), giving it the meaning "the Messenger of Allah." The verb "سَمِعْتُ" which means "I heard" is in agreement with the noun "رَسُولَ" indicating that the speaker is the one who heard from the Messenger of Allah ﷺ.

---
`
  return result.trimStart()
}

// Explain a particle
export const getExplanationOfParticle = (english, arabic, arabicSentence, englishSentence, arabicText) => {
  const result = `

--- REFERENCES:

- Full Arabic Text for Reference:
${arabicText}

- Arabic Original Sentence:
${arabicSentence}

- English Translation of Arabic Original Sentence:
${englishSentence}

- Arabic Word:
${arabic}

- English Translation of Arabic Word:
${english}

---

--- INSTRUCTIONS:

Act as a teacher in Classical Arabic and explain the Arabic particle (harf) "${arabic}" to a beginner student according to the following criteria:

HEADING: General Role
- Briefly and concisely identify the function of "${arabic}".
- Do not refer to the sentence, we will discuss that later.
- Do not use complicated grammatical terms and when using grammatical terms, you must explain them for a beginner.
- Use this analogy when describing the role of the particle with maximum one short sentence:: ${getRandomParticleAnalogy()}

HEADING: One, Two or Three Words
- Briefly and concisely identify if the particle "${arabic}" is a compound particle and explain how it is formed.
- If "${arabic}" is a compound then add a ⟶ before the Arabic Word and on a new line below ↠ before the Transliteration of the Arabic Word.
- Do this for both or the part of the compound particle.

HEADING: In a Sentence
- Briefly and concisely explain how the particle "${arabic}" relates to other words in the sentence (Arabic Original Sentence) and the whole text (Full Arabic Text for Reference), such as the verb, the object, and the subject, using brief story telling to make the explanation relevant to the Full Arabic Text.
- Add a ⟶ before the Arabic Original Sentence when referring to it under the heading "Interaction with Other Words".
- Add the English Translation of the Arabic Original Sentence on a new line below.
- Add a ↠ before the English Translation.
- Refer to the Arabic Word ${arabic} as "the particle" in the explanation.

---

${requirements}

--- EXAMPLE OUTPUT:

⇉ General Role
"وَإِنَّمَا" is a type of Arabic particle known as a Harf in Arabic. It adds emphasis and exclusivity to the part of the sentence that follows it. Think of these particles as spices in a dish. They may not make up the bulk of the meal, but they add flavor and complexity, making the dish more enjoyable.
⇉ One, Two or Three Words
"وَإِنَّمَا" is actually a compound particle, meaning it is made up of more than one word combined together. It consists of three parts:
⟶ وَ
↠ "wa" which means "and".
⟶ إِنَّ
↠ "inna" which means "indeed" or "verily".
⟶ مَا
↠ "ma" which means "what" or "that which".
When combined, they form "وَإِنَّمَا", creating an emphasis that can be translated as "and indeed only".
⇉ In a Sentence
Now, let's see how this particle works in a sentence:
⟶ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى
↠ And indeed, each person will have what he intended.
In the sentence, "وَإِنَّمَا" precedes the phrase "لِكُلِّ امْرِئٍ مَا نَوَى". The particle emphasizes the principle that each person's outcomes are based solely on their intentions.
In the context of the whole text, the Prophet Muhammad ﷺ is highlighting the importance of intentions in our actions in Islam. The particle "وَإِنَّمَا" reinforces this idea, indicating that it is indeed the intention, and nothing but the intention, that determines the result of each person's actions.
Remember, just as the spice in a dish brings out the flavor, the particle "وَإِنَّمَا" in this sentence emphasizes the importance of intentions in our actions. It's like saying: "And indeed, it's only the intention that counts". This is the beauty of the Arabic language, every small particle plays a role in conveying a deeper meaning.

---
`
  return result.trimStart()
}

export const getArabicAndEnglishSentence = (sentence, text) => {
  const result = `
---
Full Arabic Text for Context:
${text.texts.arabic}

---
Arabic Sentence: 
${sentence.arabic}

---
English Reference Translation: 
${sentence.english}

---
Author: ${text.author}

---
Source: ${text.source}


--- INSTRUCTIONS:
Act as a Translator of Classic Arabic to English and provide a Word-for-Word Translation of the Arabic Sentence to English according to the following criteria:

- The text that you are translating is Sunni Islamic.
- A English reference translation is provided for inspiration but you should not copy it.
- Make sure that your translation is more accurate and true to the original Arabic sentence than the English reference translation.
- Return the result as valid JSON object with an array that contains the property "arabic" that contains the single Arabic word and the property "english" that contains the English translation.
- The JSON object should also contain the property "translation" that contains the the entire sentence fluent to read.
- Only use English words in the translation (JSON property: english).
- Do not use transliterated Arabic words in the translation (JSON property: english).
- Do not put pronouns in brackets [] such as you, he, them if they can be understood from the verb.
- Add words within brackets [] additional to the single word in isolation in the JSON property "english" to make it fit into the context with the other words.
- If every single word is added after each other, then it should be possible to read them as a fluent sentence and because of that words in brackets [] are necessary.
- Make sure that additional words always are added within brackets [] even the tiniest added word.
- If there is only one word, then it should not be between brackets [].
- Do not use brackets [] for the translation if the meaning of the word is present in the Arabic word.
- Nothing should be implicit, always use [] to add hidden meanings.
- Do no not add [the]
- If there are alternative ways of translating a word, then choose the one that best matches the Islamic context.
- When an Arabic word starts with "وَ," treat it as a prefix that joins with the next word.
- Choose the words that will make the single words in isolation fit into the context and so that they can be read as a sentence if joined.
- The translation of the entire sentence (JSON property: translation) should be based on the verbatim translation but words can be added within [] or adapted to make the sentence fluent to read.
- Translate ﷺ as "ﷺ" but do not add it if it is not in the original sentence.
- This translation will be reviewed by English and Arabic experts, so ensure its correctness.
- Make sure that pronouns are added if they are apart of the word but do not add within brackets []
- Ensure that names of Prophets and Companions are accompanied by respectful annotations such as ﷺ (Peace be upon him) for the Prophet and Radhi Allahu Anhu/Anha (May Allah be pleased with him/her) for Sahaba.
--- EXAMPLE OUTPUT:
{
  "words": [
    {
      "arabic": "أَنَّ",
      "english": "that"
    },
    {
      "arabic": "نَاسًا",
      "english": "people"
    },
    {
      "arabic": "مِنْ",
      "english": "from"
    },
    { 
      "arabic": "أَصْحَابِ", 
      "english": "[the] companions"
    }, 
    { 
      "arabic": "رَسُولِ",    
      "english": "[of the] messenger"
    }, 
    { 
      "arabic": "اللَّهِ",    
      "english": "[of] Allah"
    }, 
    { 
      "arabic": "ﷺ",    
      "english": "ﷺ"
    }, 
    { 
      "arabic": "قَالُوا",    
      "english": "they said"
    }, 
    { 
      "arabic": "لِلنَّبِيِّ",    
      "english": "to the Prophet"
    }, 
    { 
      "arabic": "ﷺ",    
      "english": "ﷺ"
    }
  ],
  "translation": "That people from [the] companions of [the] messenger [of] Allah ﷺ, they said to the Prophet ﷺ."
}
---
`
  return result.trimStart()
}

export const getExplanation = (translation, text) => {
  const result = `

--- Author of the text:
${text.author}
---

--- Source of the text:
${text.source}
---

--- Type of text:
${text.category}
---

--- Full Arabic Text for Reference:
${text.texts.arabic}
---

--- English Word for Word Translation of Sentence:
${translation}
---

--- INSTRUCTIONS:
Act as a Teacher in Classical Arabic and explain the English Word for Word Translation to a beginner student according to the following criteria:
- The text is a sunni islamic text.
- Return a JSON object containg properties for arabic, english and explanation.
- Then explain the word in simple terms according to:
- Is it a verb, noun, particle?
- Is it singular, dual, plural?
- Is it definite or indefinite?
- Is it past, present, future?
- Is it masculine or feminine?
- Is it a pronoun?
- Does the word consists of more than one word?
- Only use the following grammatical terms: Noun (Ism), Verb (Fi'l), Preposition (Harf), Pronoun (Dameer), Past Tense (Maadi), Present Tense (Mudari'), Future Tense (Mustaqbil), Singular (Mufrad), Dual (Muthanna), Plural (Jam'), Definite (Ma'arifa), Indefinite (Nakira), Verbal Noun (Masdar).
- If some grammatical concepts are not applicable, then do not mention them.
- Do not derive the root of the word.
- Make the text engaging to read and easy to understand by using story telling and analogies.
- Explain how the word is related to other words in the sentence.
- Explain the function of the word in the sentence.
- Provide alternate translations of the word.
- If an Arabic word translates to more than one English word, then explain why, how and what the different parts of the word means.
- Always add a Alayhis Salam after a Prophet or an Angel; add Radhi Allahu Anhu after a male companion; add Rahimahullah after a scholar; add Radhi Allahu Anhum after the companions; add Radhi Allahu Anha after a female companion or wife of the Prophet ﷺ.
---

--- EXAMPLE OUTPUT:
[
  {
    "arabic": "فَمَنْ",
    "english": "So whoever",
    "explanation": "A particle (Harf) combined with a relative pronoun (Dameer). The particle 'فَ' is a conjunction meaning 'so' or 'then', and 'مَنْ' is a relative pronoun meaning 'whoever'. This combination is used to introduce a conditional clause in the sentence, setting the condition for what follows."
  },
  {
    "arabic": "اتَّقَى",
    "english": "[he] avoids",
    "explanation": "A verb (Fi'l) in the past tense (Maadi). It is singular (Mufrad) and masculine. The verb 'اتَّقَى' means 'he avoided' or 'he was cautious of'. In this context, it refers to the action of avoiding or staying away from something."
  }
]
---
---
`
  return result.trimStart()
}

export const verifyTranslation = (arabic, translation, translationOfWords) => {
  const result = `

--- Arabic Sentence:
${arabic}
---

--- Translation to Verify:
${translation}
---

--- Single word translations to improve:
${translationOfWords}
---

--- INSTRUCTIONS:
Act as a critical expert in Arabic and English and verify the English Word-for-Word Translation of the Arabic Sentence according to the following criteria:

- The text you are verifying is a Sunni Islamic text.
- The English Translation is a Word-for-Word Translation of the Arabic Sentence.
- If the English Translation does not match good English, then it is because it is a Word-for-Word Translation of the Arabic Sentence and that is expected.
- Ensure that the Word-for-Word Translation of the Arabic Sentence is correct.
- Words between [] are added to make the Word-for-Word translation readable.
- It is much more important that you find mistakes than that you confirm that the translation is correct.
- Be extremely critical and be sure to find as many mistakes as possible.
- Confirm that the English Word-for-Word translation accurately represents the original Arabic Sentence.
- Ensure that the English Translation does not include any characters outside the Latin alphabet (A-Z, a-z), with the exception of square brackets ([]).
- Ensure that all English words are completely correctly spelled.
- Ensure that all English words are completely actual English words.
- Ensure that the English words are conjugated correctly.
- Ensure that the English words are in the correct order.
- Ensure that the translation is strictly correct according to Sunni Islam.
- Suggest an improved Word-for-Word translation of the Arabic sentence that is as close to the original Arabic Sentence as possible.
- Add as many words as necessary between [] to make the Word-for-Word translation readable.
- Suggest words to add in brackets [] to make the Sentence Translation and Single Word translation better than.
- Do your best to provide a better translation than the original of the sentence and the single words.
---

--- EXAMPLE OUTPUT:

Improved Sentence Translation:
"So [whoever] avoided [the] doubts"

Improved Single Word translations:
أُغْلِقَ: [was] closed
دَخَلُوا: [they] entered

---
`
  console.log(result.trimStart())

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

--- INSTRUCTIONS:
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

// Examples of analogies to use when explaining the concept of Arabic grammar
function getRandomAnalogy() {
  const analogies = [
    'Tree System: Arabic roots are like the trunk of a tree, while the words derived from them are the branches and leaves. The same way a tree grows branches from its trunk, Arabic grows words from its roots.',
    'Cooking Recipe: Think of Arabic roots as the basic ingredients in a cooking recipe. You start with some basic ingredients (roots), and depending on how you mix and cook them, you can end up with a variety of different dishes (words).',
    'Building Blocks: Arabic roots are like building blocks. Just like you can use a set of blocks to build various structures, you can use Arabic roots to build various words.',
    'Colors Palette: An artist starts with primary colors to create a palette. Arabic roots are the primary colors and the derived words are the variations you can create by mixing these colors.',
    'Jigsaw Puzzle: Each root in Arabic is like a piece of a jigsaw puzzle, and when put together in different configurations, they form different images or meanings, much like words.',
    'Seed Planting: Consider Arabic roots as seeds. Depending on the conditions of planting (the word pattern), you can grow different plants (words) from the same seed (root).',
    'DNA: Arabic roots are like DNA, they carry the basic instructions. The way those instructions are expressed can lead to a variety of outcomes, akin to the derived words in Arabic.',
    'Solar System: Arabic roots are like the sun in a solar system, and the words that derive from the roots are like the planets that orbit around the sun, each one a unique entity but all related to the same central body.',
    'Knitting Pattern: Think of Arabic roots as a knitting pattern. Depending on how you follow the pattern, you can create different pieces, much like the derived words from Arabic roots.'
  ]

  const randomIndex = Math.floor(Math.random() * analogies.length)
  return analogies[randomIndex]
}

function getRandomParticleAnalogy() {
  const particleAnalogies = [
    'Traffic Signs: Arabic particles are like traffic signs, they guide you on how to read and understand the sentence. Just like how the meaning of a road changes with traffic signs, the meaning of a sentence can change with particles.',
    'Spices in a Dish: Think of Arabic particles as spices in a dish. They may not make up the bulk of the meal, but they add flavor and complexity, making the dish more enjoyable.',
    'Paintbrush Strokes: Arabic particles are like the strokes made by a paintbrush. They do not constitute the whole painting but they help to bring out the beauty and the intended image of the painter.',
    'Glue Between Bricks: Arabic particles act as a glue between bricks (words). They bind the sentence together giving it structure and coherence.',
    'Thread in a Necklace: Arabic particles are like the thread in a necklace, connecting the beads (words) together to create a meaningful whole.',
    'Direction Arrows: Arabic particles are like direction arrows, they point the sentence towards its intended meaning.',
    'Seasons: Arabic particles are like seasons, they do not change the core elements of the environment (words), but they change its appearance and feel.'
  ]

  const randomIndex = Math.floor(Math.random() * particleAnalogies.length)
  return particleAnalogies[randomIndex]
}
