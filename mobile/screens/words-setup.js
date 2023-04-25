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
      <Text variant="labelMedium">Select Number of Words</Text>
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />

      <SegmentedButtons
        value={props.numberOfWordsToPractice}
        onValueChange={(value) => {
          props.setNumberOfWordsToPractice(value)
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
            value: 40,
            label: '40'
          }
        ]}
      />

      <Divider style={{ ...sharedStyle.divider, opacity: 0, paddingBottom: 15 }} />
      <Text variant="labelMedium">Select Difficulty Level</Text>
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />

      <SegmentedButtons
        value={props.difficultyLevel}
        onValueChange={(value) => {
          props.handleSetDifficultyLevel(value)
        }}
        buttons={[
          {
            value: 10,
            label: 'Easy',
            icon: 'alpha-a-box'
          },
          {
            value: 20,
            label: 'Medium',
            icon: 'alpha-b-box'
          },
          {
            value: 30,
            label: 'Hard',
            icon: 'alpha-c-box'
          }
        ]}
      />

      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <WordsSetupDifficultyLevel difficultyLevel={props.difficultyLevel} />
      <Divider style={{ ...sharedStyle.divider, opacity: 0, paddingBottom: 15 }} />

      <Button
        mode="contained"
        icon={'play'}
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
