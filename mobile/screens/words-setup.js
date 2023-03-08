/* eslint-disable react-native/no-color-literals */
/* eslint-disable unicorn/no-nested-ternary */
import React from 'react'
import { View, Image, ScrollView } from 'react-native'
import { Button, Divider, Surface, Text, SegmentedButtons } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import { getWords } from '../services/api-service.js'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

const WordsSetup = (props) => {
  const sharedStyle = useSharedStyles()
  const dispatch = useDispatch()

  return (
    <ScrollView style={sharedStyle.scrollViewLTR}>
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <Text variant="titleMedium">Number of Words</Text>
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <SegmentedButtons
        value={props.numberOfWordsToPractice}
        style={{ width: '100%' }}
        onValueChange={(value) => {
          props.setNumberOfWordsToPractice(value)
        }}
        buttons={[
          {
            value: 10,
            label: '10',
            style: { width: '33%' }
          },
          {
            value: 20,
            label: '20',
            style: { width: '33%' }
          },
          {
            value: 40,
            label: '40',
            style: { width: '33%' }
          }
        ]}
      />

      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />

      <Text variant="titleMedium">Difficulty Level</Text>
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <SegmentedButtons
        value={props.difficultyLevel}
        onValueChange={(value) => {
          props.handleSetDifficultyLevel(value)
        }}
        buttons={[
          {
            value: 10,
            label: 'Beginner',
            style: { width: '50%' }
          },
          {
            value: 20,
            label: 'Mid-level',
            style: { width: '50%' }
          }
        ]}
      />
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      {
        //return the difficulty level description
        props.difficultyLevel === 10 ? (
          <Surface elevation={2} style={{ borderRadius: 10 }}>
            <Image
              source={require('../assets/beginner.jpeg')}
              style={{ width: '100%', height: 150, borderRadius: 10 }}
            />
            <View style={{ padding: 10 }}>
              <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
              <Text variant="titleSmall">Goal </Text>
              <Text style={sharedStyle.englishBody}>Learn the words in the prayer by heart.</Text>
              <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
              <Text variant="titleSmall">Examples </Text>
              <Text style={sharedStyle.englishBody}>
                Say (قل), Path (صِرَٰطَ), And not (وَلَا), He (هُوَ), The Dawn (ٱلْفَلَقِ), He created (خَلَقَ).
              </Text>
            </View>
          </Surface>
        ) : props.difficultyLevel === 20 ? (
          <Surface elevation={4} style={{ borderRadius: 10 }}>
            <Image
              source={require('../assets/mid-level.jpeg')}
              style={{ width: '100%', height: 150, borderRadius: 10 }}
            />
            <View style={{ padding: 10 }}>
              <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
              <Text variant="titleSmall">Goal </Text>
              <Text style={sharedStyle.englishBody}>Read the 40 Hadith of Imām Nawawī.</Text>
              <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
              <Text variant="titleSmall">Examples </Text>
              <Text style={sharedStyle.englishBody}>
                Man (رَجُلٌ), Hair (الشَّعْرِ), Inform me (أَخْبِرْنِي), Astonished us (فَعَجِبْنَا), About (عَنْ).
              </Text>
            </View>
          </Surface>
        ) : props.difficultyLevel === 30 ? ( //Not in use yet.
          <Surface elevation={4} style={{ borderRadius: 10 }}>
            <Image
              source={require('../assets/advanced.jpeg')}
              style={{ width: '100%', height: 150, borderRadius: 10 }}
            />
            <View style={{ padding: 10 }}>
              <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
              <Text variant="titleSmall">Goal </Text>
              <Text style={sharedStyle.englishBody}>Read short texts about Aqīdah and Fiqh.</Text>
              <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
              <Text variant="titleSmall">Examples </Text>
              <Text style={sharedStyle.englishBody}>
                Man (رَجُلٌ), Hair (الشَّعْرِ), Inform me (أَخْبِرْنِي), Astonished us (فَعَجِبْنَا), About (عَنْ).
              </Text>
            </View>
          </Surface>
        ) : (
          ''
        )
      }

      <Divider style={{ ...sharedStyle.divider, opacity: 0, paddingBottom: 30 }} />
      <Button
        mode="contained"
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          props.resetStateForNewWords()
          dispatch(getWords(props.difficultyLevel, props.numberOfWordsToPractice))
          dispatch({
            type: 'SET_PRACTICING_WORDS',
            payload: true
          })
        }}
      >
        <Text style={{ color: 'black', fontWeight: '500' }}>START PRACTICE</Text>
      </Button>
      <Divider style={{ ...sharedStyle.divider, opacity: 0, paddingBottom: 50 }} />
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
