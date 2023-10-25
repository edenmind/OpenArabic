/* eslint-disable react-hooks/exhaustive-deps */
import * as Haptics from 'expo-haptics'
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { HOST } from '../constants/urls.js'
import { useAudioPlayer } from '../hooks/use-audio-player.js'
import { getThreeRandomWords } from '../services/utility-service.js'

const audioSelector = (state) => state.audio

function useTextPracticeLogic() {
  const getText = (state) => state.text
  const { text } = useSelector(getText)
  const getTextLoading = (state) => state.textLoading
  const { textLoading } = useSelector(getTextLoading)

  const [currentWord, setCurrentWord] = useState(0)
  const [currentSentence, setCurrentSentence] = useState(0)
  const [currentWordsInSentence, setCurrentWordsInSentence] = useState([])

  const [isLastWordInSentence, setIsLastWordInSentence] = useState(false)
  const [isListeningComplete, setIsListeningComplete] = useState(false)

  const [currentArabicWord, setCurrentArabicWord] = useState(0)
  const [isReadingComplete, setIsReadingComplete] = useState(false)

  const { playSound } = useAudioPlayer()
  const { shouldPlayPracticeWord } = useSelector(audioSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    // Check if the current word is the last word in the sentence
    if (currentWord > 0 && currentWord === sentencesInText?.[currentSentence].englishWords.length - 1) {
      setIsLastWordInSentence(true)
    } else {
      setIsLastWordInSentence(false)
    }

    // Check if the current sentence is the last sentence in the text
    if (currentSentence > 0 && currentSentence === sentencesInText?.length - 1) {
      setIsListeningComplete(true)
    } else {
      setIsListeningComplete(false)
    }

    // Play the audio for the current word
    const wordFilename = sentencesInText?.[currentSentence]?.wordFilename[currentWord]
    if (wordFilename && shouldPlayPracticeWord) {
      const audioURL = HOST.audio + wordFilename
      playSound(audioURL)
    }

    // Update the current sentence and word when the text is loaded
    if (textLoading) {
      const currentSentenceData = sentencesInText?.[currentSentence]
      if (currentSentenceData) {
        const currentArabicWordData = currentSentenceData.arabicWords[currentWord]
        const englishWords = currentSentenceData.englishWords
        const arabicWordId = currentArabicWordData.id

        const randomWords = getThreeRandomWords(englishWords, arabicWordId, sentencesInText)
        const enhancedEnglishWords = randomWords.map((word) => ({
          ...word,
          correct: word.id === currentWord
        }))

        setCurrentWordsInSentence(enhancedEnglishWords)
        setCurrentArabicWord(currentArabicWordData)
      }
    }
  }, [currentWord, currentSentence, sentencesInText, textLoading, shouldPlayPracticeWord])

  const handleReset = () => {
    setCurrentSentence(0)
    setCurrentWord(0)
    setIsReadingComplete(false)
    setCurrentWordsInSentence([])
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleProgressToNextSentence = () => {
    setIsReadingComplete(true)

    setCurrentSentence((prev) => prev + 1)
  }

  // Add all words from the current sentence to the practice list
  const addAllWordsFromCurrentSentence = () => {
    const currentSentenceData = sentencesInText[currentSentence]

    if (!currentSentenceData) return

    dispatch({
      type: 'RESET_WORDS'
    })

    for (const wordData of currentSentenceData.englishWords) {
      const currentEnglishWord = wordData.english

      // Find the corresponding Arabic word and its filename
      const correspondingArabicData = currentSentenceData.arabicWords.find((aw) => aw.id === wordData.id)
      const correspondingArabicWord = correspondingArabicData ? correspondingArabicData.arabic : undefined
      const wordFilename = correspondingArabicData
        ? currentSentenceData.wordFilename[correspondingArabicData.id]
        : undefined

      // Get alternative English words
      const shuffledAlternatives = currentSentenceData.englishWords
        .filter((altWord) => altWord.english !== currentEnglishWord)
        .sort(() => Math.random() - 0.5)
      const alternatives = shuffledAlternatives.slice(0, 2).map((alt) => alt.english)

      const wordInDesiredFormat = {
        alternative1: alternatives[0],
        alternative2: alternatives[1],
        arabic: correspondingArabicWord,
        english: currentEnglishWord,
        filename: wordFilename
      }

      dispatch({
        payload: wordInDesiredFormat,
        type: 'ADD_WORD'
      })
    }
  }

  // When a word is pressed in the sentence, check if it is the correct word
  const handlePress = useCallback(
    async (id) => {
      if (id !== currentWord) {
        const currentEnglishWord = sentencesInText[currentSentence]?.englishWordsUnsorted[currentWord].english
        const correspondingArabicWord = sentencesInText[currentSentence]?.arabicWords[currentWord].arabic

        const alternatives = sentencesInText[currentSentence]?.englishWords
          .filter((altWord) => altWord.english !== currentEnglishWord)
          .slice(0, 2) // Take the first two alternatives.
          .map((alt) => alt.english)

        const wordInDesiredFormat = {
          alternative1: alternatives[0],
          alternative2: alternatives[1],
          arabic: correspondingArabicWord,
          english: currentEnglishWord,
          filename: sentencesInText[currentSentence]?.wordFilename[currentWord]
        }

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
        dispatch({
          payload: wordInDesiredFormat,
          type: 'ADD_WORD'
        })
        return
      }

      if (isLastWordInSentence) {
        dispatch({
          payload: false,
          type: 'SET_AUDIO_SHOULD_PLAY_PRACTICE_WORDS'
        })

        setIsReadingComplete(true)

        if (isListeningComplete) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        }

        // Progress to the next sentence
        setIsLastWordInSentence(false)
        setCurrentWord(0)
        return
      }
      setCurrentWord((prev) => prev + 1)

      if (currentSentence === sentencesInText?.length - 1) {
        setIsListeningComplete(true)
      }
    },
    [currentWord, isLastWordInSentence, sentencesInText, currentSentence, isListeningComplete]
  )

  // Create an array of sentences with the words in each sentence shuffled
  const sentencesInText = React.useMemo(() => {
    return text.sentences?.map((sentence) => {
      // Using destructuring to process words
      const processedWords = sentence?.words.map((word, wordIndex) => ({
        arabicWord: { arabic: word.arabic, id: wordIndex },
        englishWord: { english: word.english, id: wordIndex },
        explanation: word.explanation,
        filename: word.filename
      }))

      const arabicWords = processedWords.map(({ arabicWord }) => arabicWord)
      const englishWordsUnsorted = processedWords.map(({ englishWord }) => englishWord)

      // Copying array before sorting to prevent in-place modification
      const englishWords = [...englishWordsUnsorted].sort(() => Math.random() - 0.5)

      const explanations = processedWords.map(({ explanation }) => explanation)
      const wordFilename = processedWords.map(({ filename }) => filename)

      return {
        arabicWords,
        englishWords,
        englishWordsUnsorted,
        explanations,
        filename: sentence.filename,
        wordFilename
      }
    })
  }, [text])

  return {
    addAllWordsFromCurrentSentence,
    currentArabicWord,
    currentSentence,
    currentWord,
    currentWordsInSentence,
    handlePress,
    handleProgressToNextSentence,
    handleReset,
    isListeningComplete,
    isReadingComplete,
    sentencesInText,
    setIsReadingComplete,
    text,
    textLoading
  }
}

export default useTextPracticeLogic
