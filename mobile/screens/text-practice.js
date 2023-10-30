/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import React, { useCallback, useState, useEffect } from 'react'
import { View } from 'react-native'
import { useTheme, ProgressBar } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { PracticeListening } from './text-practice-listening.js'
import { PracticeReading } from './text-practice-reading.js'
import { PracticeVocabulary } from './text-practice-vocabulary.js'
import Spinner from '../components/spinner.js'
import { EXERCISE_TYPES } from '../constants/exercise.js'
import useTextPracticeLogic from '../hooks/use-practice-logic.js'
import { useVocabularyLogic } from '../hooks/use-vocabulary-logic.js'
import { useSharedStyles } from '../styles/common.js'

const TextPractice = ({ checkedListening, checkedReading, checkedVocabulary }) => {
  const progressionOrder = [
    ...(checkedListening ? [EXERCISE_TYPES.LISTENING] : []),
    ...(checkedReading ? [EXERCISE_TYPES.READING] : []),
    ...(checkedVocabulary ? [EXERCISE_TYPES.VOCABULARY] : [])
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
    text,
    textLoading
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
    if (isListeningComplete || isReadingComplete || isVocabularyComplete) {
      progressToNextExercise()
    }
  }, [isListeningComplete, isReadingComplete, isVocabularyComplete])

  useEffect(() => {
    // hack to make sure the audio plays if only reading is selected
    if (checkedReading && !checkedListening && !checkedVocabulary) {
      dispatch({ payload: true, type: 'SET_AUDIO_SHOULD_PLAY_PRACTICE_WORDS' })
    }

    // hack to make sure the audio doesn't play if only reading and listening are selected
    if (checkedReading && checkedListening && !checkedVocabulary) {
      dispatch({ payload: false, type: 'SET_AUDIO_SHOULD_PLAY_PRACTICE_WORDS' })
    }

    addAllWordsFromCurrentSentence()
  }, [currentSentence])

  const onWordPressed = useCallback(
    (wordId, wordArabic) => {
      handlePress(wordId, wordArabic)
    },
    [handlePress]
  )

  const finishVocabulary = useCallback(() => {
    setIsVocabularyComplete(true)
  })

  if (!textLoading) {
    return <Spinner />
  }

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
  checkedListening: PropTypes.bool.isRequired,
  checkedReading: PropTypes.bool.isRequired,
  checkedVocabulary: PropTypes.bool.isRequired
}
