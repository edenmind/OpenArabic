/* eslint-disable react-hooks/exhaustive-deps */
import * as Haptics from 'expo-haptics'
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { HOST } from '../constants/urls.js'
import { useAudioPlayer } from '../hooks/use-audio-player.js'
import { getThreeRandomWords } from '../services/utility-service.js'

function useTextPracticeLogic() {
  const getText = (state) => state.text
  const { text } = useSelector(getText)
  const getTextLoading = (state) => state.textLoading
  const { textLoading } = useSelector(getTextLoading)

  const [currentWord, setCurrentWord] = useState(0)
  const [currentSentence, setCurrentSentence] = useState(0)
  const [currentWordsInSentence, setCurrentWordsInSentence] = useState([])

  const [isLastWordInSentence, setIsLastWordInSentence] = useState(false)
  const [isLastSentence, setIsLastSentence] = useState(false)

  const [currentArabicWord, setCurrentArabicWord] = useState(0)
  const [sentenceIsComplete, setSentenceIsComplete] = useState(false)
  const [celebrationSnackBarVisibility, setCelebrationSnackBarVisibility] = useState(false)
  const { playSound } = useAudioPlayer()

  // Check if the current word is the last word in the sentence
  useEffect(() => {
    if (currentWord > 0 && currentWord === sentencesInText?.[currentSentence].englishWords.length - 1) {
      setIsLastWordInSentence(true)
    } else {
      setIsLastWordInSentence(false)
    }
  }, [currentWord, currentSentence, sentencesInText])

  // Check if the current sentence is the last sentence in the text
  useEffect(() => {
    if (currentSentence > 0 && currentSentence === sentencesInText?.length - 1) {
      setIsLastSentence(true)
    } else {
      setIsLastSentence(false)
    }
  }, [currentSentence, sentencesInText])

  // Play the audio for the current word
  useEffect(() => {
    const wordFilename = sentencesInText?.[currentSentence]?.wordFilename[currentWord]
    if (!wordFilename) return

    const audioURL = HOST.audio + wordFilename
    playSound(audioURL)
  }, [currentWord])

  // Update the current sentence and word when the text is loaded
  useEffect(() => {
    if (!textLoading) return

    const currentSentenceData = sentencesInText?.[currentSentence]
    if (!currentSentenceData) return

    const currentArabicWordData = currentSentenceData.arabicWords[currentWord]
    if (!currentArabicWordData) return

    const englishWords = currentSentenceData.englishWords
    const arabicWordId = currentArabicWordData.id

    const randomWords = getThreeRandomWords(englishWords, arabicWordId, sentencesInText)

    const enhancedEnglishWords = randomWords.map((word) => ({
      ...word,
      correct: word.id === currentWord
    }))

    setCurrentWordsInSentence(enhancedEnglishWords)
    setCurrentArabicWord(currentArabicWordData)
  }, [currentSentence, currentWord, sentencesInText, textLoading])

  const onDismissSnackBar = useCallback(() => {
    setCelebrationSnackBarVisibility(false)
  }, [setCelebrationSnackBarVisibility])

  const handleReset = () => {
    setCurrentSentence(0)
    setCurrentWord(0)
    setSentenceIsComplete(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleContinue = () => {
    setSentenceIsComplete(false)

    if (currentSentence === sentencesInText?.length) {
      setCelebrationSnackBarVisibility(true)

      return
    }

    setCurrentSentence((prev) => prev + 1)
    setCurrentWord(0)
  }

  // When a word is pressed in the sentence, check if it is the correct word
  const handlePress = useCallback(
    async (id) => {
      if (id !== currentWord) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
        return
      }

      if (isLastWordInSentence) {
        setSentenceIsComplete(true)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)

        if (isLastSentence) {
          setCelebrationSnackBarVisibility(true)
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        }

        return
      }
      setCurrentWord((prev) => prev + 1)

      if (currentSentence === sentencesInText?.length - 1) {
        setIsLastSentence(true)
      }
    },
    [currentWord, isLastWordInSentence, sentencesInText, currentSentence, isLastSentence]
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
    celebrationSnackBarVisibility,
    currentArabicWord,
    currentSentence,
    currentWord,
    currentWordsInSentence,
    handleContinue,
    handlePress,
    handleReset,
    isLastSentence,
    onDismissSnackBar,
    sentenceIsComplete,
    sentencesInText,
    text,
    textLoading
  }
}

export default useTextPracticeLogic
