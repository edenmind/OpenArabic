/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import React, { useCallback, useState, useEffect } from 'react'
import { View } from 'react-native'
import { useTheme, ProgressBar } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { PracticeListening } from './text-practice-listening.js'
import { PracticeReading } from './text-practice-reading.js'
import { PracticeVocabulary } from './text-practice-vocabulary.js'
import { EXERCISE_TYPES } from '../constants/exercise.js'
import useTextPracticeLogic from '../hooks/use-practice-logic.js'
import { useVocabularyLogic } from '../hooks/use-vocabulary-logic.js'
import { useSharedStyles } from '../styles/common.js'

const TextPractice = ({ isListeningEnabled, isReadingEnabled, isVocabularyEnabled }) => {
  const progressionOrder = [
    ...(isListeningEnabled ? [EXERCISE_TYPES.LISTENING] : []),
    ...(isReadingEnabled ? [EXERCISE_TYPES.READING] : []),
    ...(isVocabularyEnabled ? [EXERCISE_TYPES.VOCABULARY] : [])
  ]

  const [progressionIndex, setProgressionIndex] = useState(0)
  const currentExerciseType = progressionOrder[progressionIndex]

  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const [showRepeat, setShowRepeat] = useState(false)
  const dispatch = useDispatch()

  const { isVocabularyComplete, setIsVocabularyComplete } = useVocabularyLogic()

  const {
    addAllWordsFromCurrentSentence,
    currentArabicWord,
    currentSentence,
    currentWord,
    currentWordsInSentence,
    handlePress,
    handleReset,
    isListeningComplete,
    isReadingComplete,
    sentencesInText,
    setCurrentSentence,
    setIsReadingComplete,
    setIsListeningComplete,
    text
  } = useTextPracticeLogic()

  const progressToNextExercise = useCallback(() => {
    if (progressionIndex < progressionOrder.length - 1) {
      // Progress to the next exercise type
      setProgressionIndex((prevIndex) => prevIndex + 1)
      return
    }

    // Reset to the first exercise type
    setProgressionIndex(0)

    // Move to the next sentence
    if (currentSentence < sentencesInText.length - 1) {
      setCurrentSentence((prevSentence) => prevSentence + 1)
    } else {
      // Handle finished text
    }

    // Reset specific exercise type completions
    setIsListeningComplete(false)
    setIsReadingComplete(false)
    setIsVocabularyComplete(false)
  }, [progressionIndex, progressionOrder, currentSentence, sentencesInText.length])

  const progress = sentencesInText.length > 1 ? currentSentence / (sentencesInText.length - 1) : 0

  useEffect(() => {
    addAllWordsFromCurrentSentence()

    // Determine if listening should play
    function shouldPlayListening() {
      const isListeningSelectedAndIncomplete = isListeningEnabled && !isListeningComplete
      const isReadingNotAConcern = !isReadingEnabled || isReadingComplete

      return isListeningSelectedAndIncomplete && isReadingNotAConcern
    }

    // Determine if practice words should play
    function shouldPlayReadingWords() {
      const isReadingSelectedAndIncomplete = isReadingEnabled && !isReadingComplete
      const isListeningNotAConcern = !isListeningEnabled || isListeningComplete

      return isReadingSelectedAndIncomplete && isListeningNotAConcern
    }

    // Determine if vocabulary should play
    function shouldPlayVocabularyAudio() {
      return isVocabularyEnabled && !isVocabularyComplete
    }

    // Dispatch actions based on the audio that should be played
    dispatch({ payload: shouldPlayListening(), type: 'SET_AUDIO_SHOULD_PLAY_LISTENING' })
    dispatch({ payload: shouldPlayReadingWords(), type: 'SET_AUDIO_SHOULD_PLAY_READING' })
    dispatch({ payload: shouldPlayVocabularyAudio(), type: 'SET_AUDIO_SHOULD_PLAY_VOCABULARY' })

    // Progresses to the next exercise if any of the exercises are complete
    if (isListeningComplete || isReadingComplete || isVocabularyComplete) {
      progressToNextExercise()
    }
  }, [
    isListeningComplete,
    isReadingComplete,
    isVocabularyComplete,
    isReadingEnabled,
    isVocabularyEnabled,
    isListeningEnabled
  ])

  const onWordPressed = useCallback(
    (wordId, wordArabic) => {
      handlePress(wordId, wordArabic)
    },
    [handlePress]
  )

  const finishVocabulary = useCallback(() => {
    setIsVocabularyComplete(true)
  })

  return (
    <View style={{ flex: 1 }}>
      <ProgressBar color={theme.colors.tertiary} progress={progress} style={sharedStyle.progressBar} />

      {currentExerciseType === EXERCISE_TYPES.LISTENING && (
        <PracticeListening
          key={currentSentence}
          currentSentence={currentSentence}
          dispatch={dispatch}
          handleReset={handleReset}
          setIsListeningComplete={setIsListeningComplete}
          setShowRepeat={setShowRepeat}
          showRepeat={showRepeat}
          text={text}
        />
      )}

      {currentExerciseType === EXERCISE_TYPES.READING && (
        <PracticeReading
          key={currentSentence}
          currentArabicWord={currentArabicWord}
          currentSentence={currentSentence}
          currentWord={currentWord}
          currentWordsInSentence={currentWordsInSentence}
          onWordPressed={onWordPressed}
          sentencesInText={sentencesInText}
        />
      )}

      {currentExerciseType === EXERCISE_TYPES.VOCABULARY && (
        <PracticeVocabulary key={currentSentence} handleContinue={finishVocabulary} />
      )}
    </View>
  )
}

export default TextPractice

TextPractice.propTypes = {
  isListeningEnabled: PropTypes.bool.isRequired,
  isReadingEnabled: PropTypes.bool.isRequired,
  isVocabularyEnabled: PropTypes.bool.isRequired
}
