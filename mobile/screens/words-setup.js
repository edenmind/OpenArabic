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
    title: 'Number of Words',
    value: 'numberOfWordsToPractice',
    buttons: [
      { value: 10, label: '10' },
      { value: 20, label: '20' },
      { value: 30, label: '30' }
    ]
  },
  {
    title: 'Difficulty Level',
    value: 'difficultyLevel',
    buttons: [
      { value: 10, label: 'Beginner' },
      { value: 20, label: 'Intermediate' },
      { value: 30, label: 'Advanced' }
    ]
  }
]

// eslint-disable-next-line putout/destructuring-as-function-argument
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
      type: 'SET_PRACTICING_WORDS',
      payload: true
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
  numberOfWordsToPractice: PropTypes.number.isRequired,
  setNumberOfWordsToPractice: PropTypes.func.isRequired,
  difficultyLevel: PropTypes.number.isRequired,
  resetStateForNewWords: PropTypes.func.isRequired,
  handleSetDifficultyLevel: PropTypes.func.isRequired
}
