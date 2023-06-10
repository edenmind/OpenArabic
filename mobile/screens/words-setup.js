/* eslint-disable react-native/no-color-literals */
/* eslint-disable unicorn/no-nested-ternary */
import React from 'react'
import { ScrollView } from 'react-native'
import { Button, Divider, Text, SegmentedButtons, useTheme } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import { getWords } from '../services/api-service.js'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import WordsSetupDifficultyLevel from './words-setup-difficulty-level.js'

const WordsSetup = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const dispatch = useDispatch()

  return (
    <ScrollView style={sharedStyle.scrollViewLTR}>
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <Text variant="titleSmall">Number of Words</Text>
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />

      <SegmentedButtons
        value={props.numberOfWordsToPractice}
        onValueChange={(value) => {
          props.setNumberOfWordsToPractice(value)
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        }}
        buttons={[
          {
            value: 10,
            label: '10'
          },
          {
            value: 20,
            label: '20'
          },
          {
            value: 30,
            label: '30'
          }
        ]}
      />

      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <Text variant="titleSmall">Level</Text>
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />

      <SegmentedButtons
        value={props.difficultyLevel}
        onValueChange={(value) => {
          props.handleSetDifficultyLevel(value)
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        }}
        buttons={[
          {
            value: 10,
            label: 'Beginner'
          },
          {
            value: 20,
            label: 'Intermediate'
          },
          {
            value: 30,
            label: 'Advanced'
          }
        ]}
      />

      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <WordsSetupDifficultyLevel difficultyLevel={props.difficultyLevel} />
      <Divider style={{ ...sharedStyle.divider, opacity: 0, paddingBottom: 5 }} />

      <Button
        mode="contained"
        onPress={() => {
          props.resetStateForNewWords()
          dispatch(getWords(props.difficultyLevel, props.numberOfWordsToPractice))
          dispatch({
            type: 'SET_PRACTICING_WORDS',
            payload: true
          })
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        }}
      >
        <Text style={{ color: theme.colors.onPrimary, fontWeight: 700, fontSize: 17 }}>START PRACTICE</Text>
      </Button>
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
