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

  const [buttonPositions, setButtonPositions] = useState(generateUniqueRandomNumbers())

  const dispatch = useDispatch()

  const [localWords, setLocalWords] = useState(words)

  useEffect(() => {
    setLocalWords(words)
  }, []) // Empty dependency array ensures this runs once when the component is mounted.

  useEffect(() => {
    const audioURL = `${HOST.audio}${localWords[currentWord].filename}`
    playSound(audioURL)
  }, [localWords[currentWord].filename])

  const handleCorrectAnswer = useCallback(() => {
    handleSetCurrentWordIndex((currentIndex) => currentIndex + 1)
    dispatch({
      payload: localWords[currentWord].arabic,
      type: 'REMOVE_WORD'
    })

    if (currentWord === localWords.length - 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
      return
    }
    setButtonPositions(generateUniqueRandomNumbers())
    handleSetCurrentWord((currentWord) => currentWord + 1)
  }, [currentWord])

  const handlePressOnWord = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    playSound(`${HOST.audio}${localWords[currentWord].filename}`)
  }, [localWords[currentWord].filename, playSound])

  return {
    arabic: localWords[currentWord].arabic,
    buttonPositions,
    filename: localWords[currentWord].filename,
    handleCorrectAnswer,
    handlePressOnWord,
    localWords,
    playSound
  }
}

export { useWordsLogic }
