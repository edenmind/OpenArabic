/* eslint-disable react-hooks/exhaustive-deps */
import * as Haptics from 'expo-haptics'
import { useState, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HOST } from '../constants/urls.js'
import { useAudioPlayer } from '../hooks/use-audio-player.js'
import { generateUniqueRandomNumbers } from '../services/utility-service.js'

const wordsSelector = (state) => state.words

const useWordsLogic = (currentWord, handleSetCurrentWord, handleSetCurrentWordIndex) => {
  const { words } = useSelector(wordsSelector)
  const { arabic = '', filename = '' } = words[currentWord] ?? {}
  const { playSound } = useAudioPlayer()

  const [buttonPositions, setButtonPositions] = useState(generateUniqueRandomNumbers())
  const [answeredWrongWords, setAnsweredWrongWords] = useState([])

  const dispatch = useDispatch()

  const timeoutIdRef = useRef()

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const audioURL = `${HOST.audio}${filename}`
    playSound(audioURL)
  }, [filename])

  const correctAnswer = useCallback(() => {
    setButtonPositions(generateUniqueRandomNumbers())
    handleSetCurrentWord((currentWord) => currentWord + 1)
    handleSetCurrentWordIndex((currentIndex) => currentIndex + 1)
  }, [handleSetCurrentWord, handleSetCurrentWordIndex])

  const handleCorrectAnswer = useCallback(() => {
    if (currentWord === words.length - 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)

      return
    }

    correctAnswer()
  }, [correctAnswer, currentWord, handleSetCurrentWordIndex, words])

  const handleWrongAnswer = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)

    const currentWordArabic = words[currentWord].arabic

    if (answeredWrongWords.includes(currentWordArabic)) {
      return
    }

    //add the word to the wrongAnswerAlreadyAdded array so that we don't add it again
    setAnsweredWrongWords((prevWrongAnswerAlreadyAdded) => [...prevWrongAnswerAlreadyAdded, currentWordArabic])

    // add the wrong answer so that we can practice it again
    dispatch({
      payload: words[currentWord],
      type: 'ADD_WORD'
    })
  }, [answeredWrongWords, currentWord, dispatch, words])

  const handlePressOnWord = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    playSound(`${HOST.audio}${filename}`)
  }, [filename, playSound])

  return {
    answeredWrongWords,
    arabic,
    buttonPositions,
    filename,
    handleCorrectAnswer,
    handlePressOnWord,
    handleWrongAnswer,
    playSound,
    words
  }
}

export { useWordsLogic }
