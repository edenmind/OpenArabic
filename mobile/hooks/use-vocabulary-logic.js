/* eslint-disable react-hooks/exhaustive-deps */
import * as Haptics from 'expo-haptics'
import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useAudioPlayer } from './use-audio-player.js'
import { HOST } from '../constants/urls.js'
import { generateUniqueRandomNumbers } from '../services/utility-service.js'

const wordsSelector = (state) => state.words
const audioSelector = (state) => state.audio

const useVocabularyLogic = (currentWord, handleSetCurrentWord, handleSetCurrentWordIndex) => {
  const { words } = useSelector(wordsSelector)
  const { playSound } = useAudioPlayer()
  const [isLastWordInVocabulary, setIsLastWordInVocabulary] = useState(false)
  const [isVocabularyComplete, setIsVocabularyComplete] = useState(false)
  const { shouldPlayVocabulary } = useSelector(audioSelector)

  const [buttonPositions, setButtonPositions] = useState(generateUniqueRandomNumbers())

  const dispatch = useDispatch()

  const [localWords, setLocalWords] = useState(words)

  useEffect(() => {
    setLocalWords(words)
  }, [])

  useEffect(() => {
    if (localWords[currentWord] && shouldPlayVocabulary) {
      const audioURL = `${HOST.audio}${localWords[currentWord].filename}`
      playSound(audioURL)
    }
  }, [currentWord, shouldPlayVocabulary])

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
    playSound,
    setIsVocabularyComplete
  }
}

export { useVocabularyLogic }
