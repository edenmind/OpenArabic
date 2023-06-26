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

- The summary should be brief and concise.
- Remain faithful to the original text.
- Make the summary easily comprehensible.
- Maintain the beauty and grace of the original text.
- Adhere to Sunni Islam interpretations.
- Limit the summary to a maximum of 50 words.
- Provide 5 suggestions of a maximum 25 character title for the summary.
- Ensure the title's character count, including spaces, does not exceed 25.
---

--- EXAMPLE OUTPUT:
Decree and Human Actions

This Hadith conveys that our creation, lifespan, sustenance, deeds, and destiny are ordained by Allah. Regardless of our earthly deeds appearing righteous or sinful, our ultimate fate aligns with this divine decree, demonstrating the intertwining of human actions and divine will.
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
--- Full Arabic Text for context
${text.texts.arabic}
---

--- Full English Text for context
${text.texts.english}
---

--- Arabic Sentence from Full Arabic Text to Translate:
${sentence.arabic}
---

--- English Example Translation of the Arabic Sentence:
${sentence.english}
---

--- Author of the text:
${text.author}
---

--- Source of the text:
${text.source}
---

--- Type of text:
${text.category}
---


--- INSTRUCTIONS:
Act as a Translator of Classic Arabic to Modern English and do a Word-for-Word Translation of the Arabic Sentence to English

- The text that you are translating is a Sunni Islamic text.
- The Word-for-Word translation will be used in an app that teaches Classical Arabic to English speakers using quiz games and other interactive methods.
- Begin each translation line with the Arabic word, followed by the English equivalent.
- Start a new line for each translated word.
- Maintain the original word order from the Arabic sentence in your translation.
- Insert additional words as necessary for readability, enclosing them in square brackets [].
- Aim for a smooth, complete sentence in English that doesn't read merely as a list of translated words.
- Ensure the translation aligns with the principles of Sunni Islam. Avoid any interpretations that contradict established Sunni beliefs or the consensus of the major Sunni scholars.
- Stay true to the meaning and context of the original Arabic sentence.
- Be respectful when translating words related to Allah, Prophet Muhammad ﷺ, the Prophets, the Companions (Sahaba), and all Islamic religious terms.
- Ensure that names of Prophets and Sahaba are accompanied by respectful annotations such as Alayhis Salam (Peace be upon him) for Prophets and Radhi Allahu Anhu/Anha (May Allah be pleased with him/her) for Sahaba.
- Feel free to add alternative translations in comments for context or nuance, as long as they respect Sunni Islam's interpretations and teachings.
- The English Example Translation of the Arabic Sentence is provided as a guide that you can use it as a reference.
- You can use the English Example Translation it as a starting point for your translation, but you are not required to follow it exactly.
- Add an asterix * after every translation that is linguistic since we are going to use these translations to teach Arabic vocabulary and we only want to inlcude linguistic translations.
---

--- Example output of the above task and requirements:
إنَّمَا - Indeed
الْأَعْمَالُ - the actions [are judged]
بِالنِّيَّاتِ - by the intentions*

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

function getRandomWordSentenceAnalogy() {
  const wordSentenceAnalogies = [
    'Foundation Stone: An Arabic word in a sentence is like a foundation stone in a building. It may just be one part of the whole, but it carries weight and supports the entire structure.',
    'Key to a Lock: A single Arabic word can be like a key to a lock, where the lock is the sentence. The right word can unlock the full meaning of the sentence.',
    'Seed in a Garden: Consider an Arabic word as a seed in a garden. The garden is the sentence. Each seed has the potential to grow and contribute to the beauty of the entire garden.',
    'Pillar in a Mosque: An Arabic word can be compared to a pillar in a mosque. Just like a pillar supports and gives strength to the mosque, a word provides structure and meaning to a sentence.',
    'Thread in a Tapestry: An Arabic word in a sentence is like a single thread in a tapestry. It is integral to creating the complete picture, and without it, the whole tapestry might not come together.',
    'Compass on a Journey: An Arabic word can act like a compass for a sentence. It helps guide the direction and the meaning the sentence will take.'
  ]

  const randomIndex = Math.floor(Math.random() * wordSentenceAnalogies.length)
  return wordSentenceAnalogies[randomIndex]
}
