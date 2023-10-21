/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { useTheme, ProgressBar } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { PracticeListening } from './text-practice-listening.js'
import { PracticeReading } from './text-practice-reading.js'
import { PracticeVocabulary } from './text-practice-vocabulary.js'
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
    addAllWordsFromCurrentSentence,
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
      handleStartVocabularyPractice()
    }
  }, [sentenceIsComplete])

  useEffect(() => {
    if (isLastSentence) {
      handlePracticeComplete()
    }
  }, [isLastSentence])

  const handlePracticeComplete = () => {
    setExerciseType()
    handleContinue()
  }

  const handleStartReadingPractice = () => {
    setExerciseType('reading')
    addAllWordsFromCurrentSentence()
  }

  const handleStartVocabularyPractice = () => {
    setExerciseType('vocabulary')
  }

  const handleStartListeningPractice = () => {
    setExerciseType('listening')
  }

  const onWordPressed = (wordId, wordArabic) => {
    handlePress(wordId, wordArabic)
  }

  return textLoading ? (
    <View style={{ flex: 1 }}>
      <ProgressBar
        color={theme.colors.tertiary}
        progress={currentSentence / (sentencesInText.length - 1)}
        style={sharedStyle.progressBar}
      />

      {exerciseType === 'listening' && (
        <PracticeListening
          currentSentence={currentSentence}
          dispatch={dispatch}
          handleContinue={handleStartReadingPractice}
          handleReset={handleReset}
          isLastSentence={isLastSentence}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setSentenceIsComplete={setSentenceIsComplete}
          setShowRepeat={setShowRepeat}
          showRepeat={showRepeat}
          text={text}
        />
      )}

      {exerciseType === 'reading' && (
        <PracticeReading
          currentArabicWord={currentArabicWord}
          currentSentence={currentSentence}
          currentWord={currentWord}
          currentWordsInSentence={currentWordsInSentence}
          onWordPressed={onWordPressed}
          sentencesInText={sentencesInText}
        />
      )}

      {exerciseType === 'vocabulary' && <PracticeVocabulary handleContinue={handleStartListeningPractice} />}
    </View>
  ) : (
    <Spinner />
  )
}

export default TextPractice
