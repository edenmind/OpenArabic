/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WordsContent from './words-content.js'
import WordsSetup from './words-setup.js'
import FadeInView from '../components/fade-in-view.js'

const practicingWordsSelector = (state) => state.practicingWords

const Words = () => {
  const dispatch = useDispatch()

  const [currentWord, setCurrentWord] = useState(0)
  const [difficultyLevel, setDifficultyLevel] = useState(10)
  const [numberOfWordsToPractice, setNumberOfWordsToPractice] = useState(10)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const { practicingWords } = useSelector(practicingWordsSelector)
  const [celebrationSnackBarVisibility, setCelebrationSnackBarVisibility] = React.useState(false)

  const resetStateForNewWords = () => {
    setCurrentWord(0)
    setCurrentWordIndex(0)
    setCelebrationSnackBarVisibility(false)
    dispatch({
      type: 'RESET_WORDS'
    })
  }

  const handleSetDifficultyLevel = (value) => {
    setDifficultyLevel(value)
  }

  const handleSetNumberOfWordsToPractice = (value) => {
    setNumberOfWordsToPractice(value)
  }

  const handleSetCurrentWord = (index) => {
    setCurrentWord(index)
  }

  const handleSetCurrentWordIndex = (index) => {
    setCurrentWordIndex(index)
  }

  const handleSetCelebrationSnackBarVisibility = (value) => {
    setCelebrationSnackBarVisibility(value)
  }

  return practicingWords ? (
    <WordsContent
      numberOfWordsToPractice={numberOfWordsToPractice}
      currentWord={currentWord}
      handleSetCurrentWord={handleSetCurrentWord}
      currentWordIndex={currentWordIndex}
      handleSetCurrentWordIndex={handleSetCurrentWordIndex}
      celebrationSnackBarVisibility={celebrationSnackBarVisibility}
      handleSetCelebrationSnackBarVisibility={handleSetCelebrationSnackBarVisibility}
    />
  ) : (
    <FadeInView style={{ flex: 1 }}>
      <WordsSetup
        numberOfWordsToPractice={numberOfWordsToPractice}
        setNumberOfWordsToPractice={setNumberOfWordsToPractice}
        difficultyLevel={difficultyLevel}
        handleSetDifficultyLevel={handleSetDifficultyLevel}
        handleSetNumberOfWordsToPractice={handleSetNumberOfWordsToPractice}
        resetStateForNewWords={resetStateForNewWords}
      />
    </FadeInView>
  )
}

export default Words
