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
import { useWordsLogic } from '../hooks/use-words-logic.js'
import { useSharedStyles } from '../styles/common.js'

const TextPractice = () => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [exerciseType, setExerciseType] = useState('listening')

  const [isPlaying, setIsPlaying] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)
  const dispatch = useDispatch()

  const { isVocabularyComplete } = useWordsLogic()

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
    setExerciseType()
  }

  const handleStartListeningPractice = () => {
    handleProgressToNextSentence()
    setExerciseType('listening')
  }

  const handleStartReadingPractice = () => {
    addAllWordsFromCurrentSentence()
    setExerciseType('reading')
  }

  const handleReadingComplete = () => {
    setExerciseType('vocabulary')
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
          isListeningComplete={isListeningComplete}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setIsReadingComplete={setIsReadingComplete}
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
