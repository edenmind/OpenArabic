/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import React, { useCallback, useState, useEffect } from 'react'
import { View } from 'react-native'
import { useTheme, ProgressBar } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { PracticeListening } from './text-practice-listening.js'
import { PracticeReading } from './text-practice-reading.js'
import { TextPracticeReview } from './text-practice-review.js'
import { PracticeVocabulary } from './text-practice-vocabulary.js'
import { EXERCISE_STATES } from '../constants/exercise.js'
import useTextPracticeLogic from '../hooks/use-practice-logic.js'
import { useVocabularyLogic } from '../hooks/use-vocabulary-logic.js'
import { useSharedStyles } from '../styles/common.js'

const TextPractice = ({ isListeningEnabled, isReadingEnabled, isVocabularyEnabled }) => {
  const progressionOrder = [
    ...(isListeningEnabled ? [EXERCISE_STATES.LISTENING] : []),
    ...(isReadingEnabled ? [EXERCISE_STATES.READING] : []),
    ...(isVocabularyEnabled ? [EXERCISE_STATES.VOCABULARY] : [])
  ]

  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const { isVocabularyComplete, setIsVocabularyComplete } = useVocabularyLogic()

  const dispatch = useDispatch()

  const [isReviewActive, setIsReviewActive] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)
  const [progressionIndex, setProgressionIndex] = useState(0)

  const currentExerciseType = isReviewActive ? EXERCISE_STATES.REVIEW : progressionOrder[progressionIndex]

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
    // Check if there are more exercises in the current sentence
    const nextExerciseIndex = progressionIndex + 1
    const hasNextExercise = nextExerciseIndex < progressionOrder.length

    if (hasNextExercise) {
      setProgressionIndex(nextExerciseIndex)
      return
    }

    // Reset exercise index for the next sentence or review
    setProgressionIndex(0)

    // Check if there are more sentences to practice
    const nextSentenceIndex = currentSentence + 1
    const hasNextSentence = nextSentenceIndex < sentencesInText.length

    if (hasNextSentence) {
      setCurrentSentence(nextSentenceIndex)
    } else {
      setIsReviewActive(true) // No more sentences, move to review
    }

    // Reset specific exercise type completions
    setIsListeningComplete(false)
    setIsReadingComplete(false)
    setIsVocabularyComplete(false)
  }, [progressionIndex, progressionOrder.length, currentSentence, sentencesInText.length])

  const progress = sentencesInText.length > 1 ? currentSentence / (sentencesInText.length - 1) : 0

  useEffect(() => {
    addAllWordsFromCurrentSentence()

    // Determine if listening should play
    function shouldPlayListening() {
      return isListeningEnabled && !isListeningComplete && (!isReadingEnabled || isReadingComplete)
    }

    // Determine if practice words should play
    function shouldPlayReadingWords() {
      return isReadingEnabled && !isReadingComplete && (!isListeningEnabled || isListeningComplete)
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

      {currentExerciseType === EXERCISE_STATES.LISTENING && (
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

      {currentExerciseType === EXERCISE_STATES.READING && (
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

      {currentExerciseType === EXERCISE_STATES.VOCABULARY && (
        <PracticeVocabulary key={currentSentence} handleContinue={finishVocabulary} />
      )}

      {isReviewActive && (
        <TextPracticeReview
          showCelebration={true}
          text={text}
          showPlay={false}
          showRepeat={false}
          setShowRepeat={setShowRepeat}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
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
