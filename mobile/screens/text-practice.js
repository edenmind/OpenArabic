import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { useTheme, ProgressBar } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { PracticeListening } from './text-practice-listening.js'
import { PracticeReading } from './text-practice-reading.js'
import Spinner from '../components/spinner.js'
import useTextPracticeLogic from '../hooks/use-practice-logic.js'
import { useSharedStyles } from '../styles/common.js'

const TextPractice = () => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [exerciseType, setExerciseType] = useState('listening')

  const [isPlaying, setIsPlaying] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)
  const dispatch = useDispatch()

  const {
    isLastSentence,
    currentArabicWord,
    currentSentence,
    sentenceIsComplete,
    setSentenceIsComplete,
    currentWordsInSentence,
    textLoading,
    sentencesInText,
    currentWord,
    text,
    handleReset,
    handleContinue,
    handlePress
  } = useTextPracticeLogic()

  useEffect(() => {
    if (sentenceIsComplete) {
      setExerciseType()
    }
  }, [sentenceIsComplete])

  const handlePracticeComplete = () => {
    setExerciseType()
    handleContinue()
  }

  const handleStartReadingPractice = () => {
    setExerciseType('reading')
  }

  const onWordPressed = (wordId, wordArabic) => {
    handlePress(wordId, wordArabic)
    if (sentenceIsComplete) handlePracticeComplete()
  }

  return textLoading ? (
    <View style={{ flex: 1 }}>
      <ProgressBar
        color={theme.colors.tertiary}
        progress={currentSentence / (sentencesInText.length - 1)}
        style={sharedStyle.progressBar}
      />

      {exerciseType === 'reading' ? (
        <PracticeReading
          {...{
            currentArabicWord,
            currentSentence,
            currentWord,
            currentWordsInSentence,
            onWordPressed,
            sentencesInText
          }}
        />
      ) : (
        <PracticeListening
          {...{
            currentSentence,
            dispatch,
            handleContinue: handleStartReadingPractice,
            handleReset,
            isLastSentence,
            isPlaying,
            setIsPlaying,
            setSentenceIsComplete,
            setShowRepeat,
            showRepeat,
            text
          }}
        />
      )}
    </View>
  ) : (
    <Spinner />
  )
}

export default TextPractice
