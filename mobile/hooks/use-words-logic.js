/* eslint-disable react-hooks/exhaustive-deps */
import * as Haptics from 'expo-haptics'
import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HOST } from '../constants/urls.js'
import { useAudioPlayer } from '../hooks/use-audio-player.js'
import { generateUniqueRandomNumbers } from '../services/utility-service.js'

const wordsSelector = (state) => state.words

const useWordsLogic = (currentWord, handleSetCurrentWord, handleSetCurrentWordIndex) => {
  const { words } = useSelector(wordsSelector)
  const { playSound } = useAudioPlayer()
  const [isLastWordInVocabulary, setIsLastWordInVocabulary] = useState(false)
  const [isVocabularyComplete, setIsVocabularyComplete] = useState(false)

  const [buttonPositions, setButtonPositions] = useState(generateUniqueRandomNumbers())

  const dispatch = useDispatch()

  const [localWords, setLocalWords] = useState(words)

  useEffect(() => {
    setLocalWords(words)
  }, []) // Empty dependency array ensures this runs once when the component is mounted.

  useEffect(() => {
    if (localWords[currentWord]) {
      const audioURL = `${HOST.audio}${localWords[currentWord].filename}`
      playSound(audioURL)
    }
  }, [currentWord])

  useEffect(() => {
    if (isLastWordInVocabulary) {
      setIsVocabularyComplete(true)
    }
  }, [isLastWordInVocabulary])

  const handleCorrectAnswer = () => {
    if (!localWords[currentWord]) {
      return
    }
    handleSetCurrentWordIndex((currentIndex) => currentIndex + 1)
    dispatch({
      payload: localWords[currentWord].arabic,
      type: 'REMOVE_WORD'
    })

    if (currentWord === localWords.length - 1) {
      setIsLastWordInVocabulary(true)
      setIsVocabularyComplete(true)
      return
    }

    setButtonPositions(generateUniqueRandomNumbers())
    handleSetCurrentWord((currentWord) => currentWord + 1)
  }

  const handlePressOnWord = useCallback(() => {
    if (localWords[currentWord]) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      playSound(`${HOST.audio}${localWords[currentWord].filename}`)
    }
  }, [localWords, currentWord, playSound])

  return {
    arabic: localWords[currentWord] ? localWords[currentWord].arabic : '',
    buttonPositions,
    filename: localWords[currentWord] ? localWords[currentWord].filename : '',
    handleCorrectAnswer,
    handlePressOnWord,
    isVocabularyComplete,
    localWords,
    playSound
  }
}

export { useWordsLogic }
