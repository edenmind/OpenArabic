/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from 'react'
import { View } from 'react-native'
import { useTheme, ProgressBar } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { PracticeListening } from './text-practice-listening.js'
import { PracticeReading } from './text-practice-reading.js'
import { PracticeVocabulary } from './text-practice-vocabulary.js'
import Spinner from '../components/spinner.js'
import useTextPracticeLogic from '../hooks/use-practice-logic.js'
import { useVocabularyLogic } from '../hooks/use-vocabulary-logic.js'
import { useSharedStyles } from '../styles/common.js'

const TextPractice = () => {
  const EXERCISE_TYPES = {
    LISTENING: 'listening',
    READING: 'reading',
    VOCABULARY: 'vocabulary'
  }

  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [currentExerciseType, setCurrentExerciseType] = useState(EXERCISE_TYPES.LISTENING)

  const [isPlaying, setIsPlaying] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)
  const dispatch = useDispatch()

  const { isVocabularyComplete } = useVocabularyLogic()

  const {
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
  } = useTextPracticeLogic()

  const progress = sentencesInText.length > 1 ? currentSentence / (sentencesInText.length - 1) : 0

  useEffect(() => {
    if (isListeningComplete) {
      handleListeningComplete()
    }
  }, [isListeningComplete])

  useEffect(() => {
    if (isReadingComplete) {
      handleReadingComplete()
    }
  }, [isReadingComplete])

  useEffect(() => {
    if (isVocabularyComplete) {
      handleProgressToNextSentence()
    }
  }, [isVocabularyComplete])

  const handleListeningComplete = () => {
    handleProgressToNextSentence()
  }

  const handleStartListeningPractice = () => {
    handleProgressToNextSentence()
    setCurrentExerciseType(EXERCISE_TYPES.LISTENING)
  }

  const handleStartReadingPractice = () => {
    addAllWordsFromCurrentSentence()
    setCurrentExerciseType(EXERCISE_TYPES.READING)
  }

  const handleReadingComplete = () => {
    setCurrentExerciseType(EXERCISE_TYPES.VOCABULARY)
  }

  const onWordPressed = useCallback(
    (wordId, wordArabic) => {
      handlePress(wordId, wordArabic)
    },
    [handlePress]
  )

  if (!textLoading) {
    return <Spinner />
  }

  return (
    <View style={{ flex: 1 }}>
      <ProgressBar color={theme.colors.tertiary} progress={progress} style={sharedStyle.progressBar} />

      {currentExerciseType === EXERCISE_TYPES.LISTENING && (
        <PracticeListening
          currentSentence={currentSentence}
          dispatch={dispatch}
          handleContinue={handleStartReadingPractice}
          handleReset={handleReset}
          isListeningComplete={isListeningComplete}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setIsReadingComplete={setIsReadingComplete}
          setShowRepeat={setShowRepeat}
          showRepeat={showRepeat}
          text={text}
        />
      )}

      {currentExerciseType === EXERCISE_TYPES.READING && (
        <PracticeReading
          currentArabicWord={currentArabicWord}
          currentSentence={currentSentence}
          currentWord={currentWord}
          currentWordsInSentence={currentWordsInSentence}
          onWordPressed={onWordPressed}
          sentencesInText={sentencesInText}
        />
      )}

      {currentExerciseType === EXERCISE_TYPES.VOCABULARY && (
        <PracticeVocabulary handleContinue={handleStartListeningPractice} />
      )}
    </View>
  )
}

export default TextPractice
