/* eslint-disable react-hooks/exhaustive-deps */
import * as Haptics from 'expo-haptics'
import { useState, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HOST } from '../constants/urls.js'
import { useAudioPlayer } from '../hooks/use-audio-player.js'
import { generateUniqueRandomNumbers } from '../services/utility-service.js'

const wordsSelector = (state) => state.words

const useWordsLogic = (
  currentWord,
  handleSetCurrentWord,
  handleSetCurrentWordIndex,
  handleSetCelebrationSnackBarVisibility
) => {
  const { words } = useSelector(wordsSelector)
  const { arabic = '', filename = '' } = words[currentWord] ?? {}
  const { playSound } = useAudioPlayer()

  const [buttonPositions, setButtonPositions] = useState(generateUniqueRandomNumbers())
  const [timeoutId, setTimeoutId] = useState()
  const [answeredWrongWords, setAnsweredWrongWords] = useState([])
  const [soundShouldPlay, setSoundShouldPlay] = useState(true) // Prevent sound from playing after finishing a session

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
    if (soundShouldPlay) {
      const audioURL = `${HOST.audio}${filename}`
      playSound(audioURL)
    }
  }, [filename])

  const onDismissSnackBar = useCallback(() => {
    handleSetCelebrationSnackBarVisibility(false)
  }, [handleSetCelebrationSnackBarVisibility])

  const resetStateForNewWords = useCallback(() => {
    handleSetCurrentWord(0)
    handleSetCurrentWordIndex(0)
    handleSetCelebrationSnackBarVisibility(false)
    setButtonPositions(generateUniqueRandomNumbers())

    dispatch({
      type: 'RESET_WORDS'
    })
    setSoundShouldPlay(true)
  }, [dispatch, handleSetCelebrationSnackBarVisibility, handleSetCurrentWord, handleSetCurrentWordIndex])

  const correctAnswer = useCallback(() => {
    setButtonPositions(generateUniqueRandomNumbers())
    handleSetCurrentWord((currentWord) => currentWord + 1)
    handleSetCurrentWordIndex((currentIndex) => currentIndex + 1)
  }, [handleSetCurrentWord, handleSetCurrentWordIndex])

  //  Use a timeout to keep the celebration snackbar visible for 3 seconds
  const initiateCelebrationTimeout = useCallback(() => {
    const id = setTimeout(() => {
      resetStateForNewWords()
      dispatch({
        payload: false,
        type: 'SET_PRACTICING_WORDS'
      })
    }, 3000)

    setTimeoutId(id)
  }, [dispatch, resetStateForNewWords])

  const handleCorrectAnswer = useCallback(() => {
    if (currentWord === words.length - 1) {
      setSoundShouldPlay(false)
      handleSetCurrentWordIndex((currentIndex) => currentIndex + 1)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
      handleSetCelebrationSnackBarVisibility(true)
      initiateCelebrationTimeout()
      return
    }

    correctAnswer()
  }, [
    correctAnswer,
    currentWord,
    handleSetCelebrationSnackBarVisibility,
    handleSetCurrentWordIndex,
    initiateCelebrationTimeout,
    words
  ])

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
    onDismissSnackBar,
    playSound,
    soundShouldPlay,
    timeoutId,
    words
  }
}

export { useWordsLogic }
