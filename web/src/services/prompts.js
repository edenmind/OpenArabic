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
Act as a teacher in Classical Arabic (al-fusha)  and explain the Arabic Word to a student according to the following list:
- Root system: Identifying the Triliteral root of the word, explaining the meaning of the root, and providing derivations from the root.
- Deconstruction to Root: Explain how the word can be broken down to its root by removing prefixes and suffixes.
- Parts of speech: Determining whether the word is a Noun (ism), Verb (fil), or Particle (harf).
- Gender (for nouns): Identifying if the word is Masculine (mudhakar) or Feminine (muannath).
- Number: Determining if the word is Singular (mufrad), Plural (jama'), or Dual (muthanna).
- Definiteness: Understanding whether the word is Definite (ma'arifa) or Indefinite (nakira).
- Tense (for verbs): Identifying if the verb is in Past Tense (al-madi), Present Tense (al-mudari'), or Future Tense (al-mustaqbil).
- Person (for verbs): Determining if the word is first person (mutakallim), second person (mukhatab), or third (gha'ib).
- Pronouns: Recognizing Detached Pronouns (ad-damāʾir al-munfasila), Attached Pronouns (ad-damāʾir al-mutasāla), or Hidden Pronoun (ad-damīr al-mustatir) in relation to the word.
- Genitive Construction: Understanding the Genitive construction (idafa and mudaf ilayhi) and how it affects the definiteness of the word.
- Attached Particles: Identifying if the root word is attached to a Particle (harf) such as bi-, li- ka- and how it affects the meaning of the word.
---

--- Requirements:
- Use examples from the Arabic Original Sentence to explain the word.
- Provide transliteration of Arabic words.
- Use the Arabic terms (only transliterated) for the grammar in addition to the English terms.
- Explain English grammatical terms and their Arabic equivalents since the student does not know English grammar either.
- Write out derivations from the derivation pattern of the root word under "Root system."
- Add a ⟶ before every heading.
- Add a new line after every explanation to improve readability.
- Add a ← before every example of a derived Arabic word from the root.
- Put the transliteration and the English translation of the derived words on the line below.
- Add explanations of the grammatical concepts so that it becomes pedagogical and engaging for a beginner that does not know Arabic grammar (nahw) or morphology (sarf).
- Merge headings for Person, Gender and Number.
- Avoid repeating the same information.
- End the explanations with an engaging summary of the main points.
- Abide to Orthodox Sunni Islam.
- Only write the word with Arabic letters the first time it is mentioned in the explanation.
- All instructions does not apply to all types of words. A harf (particle) does not have a root system. A noun does not have a tense. A verb does not have definiteness.
- Mention this in an educational way.
- Use the different Example outputs below as a guide for the explanation regarding the different types of words.
---

--- Example output (verb):
⟶ Root system:
The triliteral root of the word "سَمِعْتُ" (samiʿtu) is س-م-ع (s-m-ʿ), which carries the meaning of hearing or listening. Derivations from this root include:

← سَمَعَ 
samaʿa: He heard (verb, past tense)

← يَسْمَعُ 
yasmaʿu: He hears (verb, present tense)

← مُسْمِع 
musmiʿ: Listener, one who makes others hear (active participle)

← مَسْمُوع
masmuʿ: Heard, audible (passive participle)

← إِسْمَاع 
ismaaʿ: Listening, hearing (verbal noun)

⟶ Deconstruction to Root:
Samiʿtu can be broken down to its root س-م-ع (s-m-ʿ) by removing the suffix "تُ" (tu), which indicates the first person singular (I) in the past tense verb.

⟶ Parts of speech:
Samiʿtu is a Verb (fil) in the past tense (al-madi).

⟶ Person, Gender, and Number:
Samiʿtu is in the first person (mutakallim), singular (mufrad), and the verb form applies to both masculine (mudhakar) and feminine (muannath) speakers.

⟶ Definiteness:
As a verb, samiʿtu does not have the concept of definiteness (ma'arifa) or indefiniteness (nakira).

⟶ Tense (for verbs):
The verb is in the past tense (al-madi).

⟶ Pronouns:
The word samiʿtu contains a hidden pronoun (ad-damīr al-mustatir) in the suffix "تُ" (tu), which represents the first person singular (I).

⟶ Genitive Construction and Attached Particles:
There is no genitive construction (idafa or mudaf ilayhi) or attached particles (harf).

In summary, the word samiʿtu is a verb in the past tense (al-madi) meaning "I heard." It is derived from the triliteral root س-م-ع (s-m-ʿ) and contains a hidden pronoun (ad-damīr al-mustatir) representing the first person singular (I). The verb form is applicable to both masculine (mudhakar) and feminine (muannath) speakers, and there is no genitive construction or attached particles in this word.
---

--- Example Output (Compound Particle):

⟶ Compound Particle Formation:
The word "وَإِنَّمَا" (wa-innama) is a compound particle formed by the combination of two particles: "وَ" (wa) meaning "and" and "إِنَّمَا" (innama) meaning "indeed, only." It does not have a triliteral root since it is a compound of two particles.

⟶ Particle Types and Functions:
The particle "وَ" (wa) is a conjunction (harf 'atf) that serves to connect words, phrases, or sentences. The particle "إِنَّمَا" (innama) is a particle of restriction and emphasis (harf tawkeyd), which adds a sense of exclusivity and limitation to the word or phrase it precedes.

⟶ Compound Particle Effect on Sentence Structure:
The combination of these two particles creates the compound particle "وَإِنَّمَا" (wa-innama), which means "and indeed" or "and indeed only." In the context of the sentence, wa-innama emphasizes the exclusivity of the principle being stated: that each person will have only what they intended. The compound particle wa-innama highlights the importance of intention and adds weight to the statement.

⟶ Summary
In summary, the word wa-innama is a compound particle formed by the combination of two particles: "وَ" (wa) meaning "and" and "إِنَّمَا" (innama) meaning "indeed, only." It serves as a conjunction and a particle of restriction and emphasis, affecting the sentence structure and meaning by emphasizing the exclusivity of the principle being stated.
---

--- Example Output (Particle/Preposition):
⟶ Particle Types and Functions:
The Arabic word "مَا" (ma) is a Particle (harf) that can function in various ways depending on its context. In this specific context, it serves as a relative pronoun, meaning "what" or "that which."

⟶ Examples in Arabic Original Sentence:
In the Arabic original sentence "وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى" (wa-innama li-kulli imri'in ma nawa), "مَا" (ma) is used as a relative pronoun connecting the phrase "لِكُلِّ امْرِئٍ" (li-kulli imri'in) meaning "for every person" with the verb "نَوَى" (nawa) meaning "intended." The phrase can be translated as "And indeed, each person will have what he intended."

⟶ Comparison with Other Arabic Particles:
As a particle, "مَا" (ma) is different from other particles such as prepositions (e.g., "فِي" (fi) meaning "in"), conjunctions (e.g., "وَ" (wa) meaning "and"), and particles of emphasis or restriction (e.g., "إِنَّ" (inna) meaning "indeed"). Each type of particle serves a different purpose in constructing the meaning and structure of a sentence.

⟶ Importance of Particles in Arabic Grammar:
Particles are an essential component of Arabic grammar (nahw), as they help create connections and relationships between words and phrases in a sentence. They often provide information about the function, emphasis, or direction of a sentence, shaping its overall meaning.
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
The subject is the speaker (I), represented by the verb سَمِعْتُ (I heard). 

The object is the Messenger of Allah, رَسُولَ اللَّهِ (rasool Allah). 

The action is يَقُولُ (he says or speaks).

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
