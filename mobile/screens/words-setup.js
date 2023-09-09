import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { ScrollView, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import WordsSetupDifficultyLevel from './words-setup-difficulty-level.js'
import { ActionButton } from '../components/action-button.js'
import { SegmentButtonWithHeader } from '../components/segemented-button.js'
import { getWords } from '../services/api-service.js'
import { useSharedStyles } from '../styles/common.js'

const WORDS_CONFIG = [
  {
    buttons: [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '30', value: 30 }
    ],
    title: 'Number of Words',
    value: 'numberOfWordsToPractice'
  },
  {
    buttons: [
      { label: 'Beginner', value: 10 },
      { label: 'Intermediate', value: 20 },
      { label: 'Advanced', value: 30 }
    ],
    title: 'Difficulty Level',
    value: 'difficultyLevel'
  }
]

const WordsSetup = ({
  numberOfWordsToPractice,
  setNumberOfWordsToPractice,
  difficultyLevel,
  resetStateForNewWords,
  handleSetDifficultyLevel
}) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const dispatch = useDispatch()

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    resetStateForNewWords()
    dispatch(getWords(difficultyLevel, numberOfWordsToPractice))
    dispatch({
      payload: true,
      type: 'SET_PRACTICING_WORDS'
    })
  }, [difficultyLevel, numberOfWordsToPractice, resetStateForNewWords, dispatch])

  return (
    <ScrollView style={sharedStyle.scrollViewLTR}>
      {WORDS_CONFIG.map((config) => (
        <SegmentButtonWithHeader
          key={config.title}
          title={config.title}
          value={config.value === 'numberOfWordsToPractice' ? numberOfWordsToPractice : difficultyLevel}
          onValueChange={
            config.value === 'numberOfWordsToPractice' ? setNumberOfWordsToPractice : handleSetDifficultyLevel
          }
          buttons={config.buttons}
        />
      ))}

      <WordsSetupDifficultyLevel difficultyLevel={difficultyLevel} />

      <View style={{ marginTop: 10 }}>
        <ActionButton onPress={handlePress} text="START LEARNING" />
      </View>
    </ScrollView>
  )
}

export default WordsSetup

WordsSetup.propTypes = {
  difficultyLevel: PropTypes.number.isRequired,
  handleSetDifficultyLevel: PropTypes.func.isRequired,
  numberOfWordsToPractice: PropTypes.number.isRequired,
  resetStateForNewWords: PropTypes.func.isRequired,
  setNumberOfWordsToPractice: PropTypes.func.isRequired
}
