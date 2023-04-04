/* eslint-disable react-native/no-color-literals */
/* eslint-disable unicorn/no-nested-ternary */
import React from 'react'
import { View, Image } from 'react-native'
import { Divider, Surface, Text } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'

const WordsSetupDifficultyLevel = (props) => {
  const sharedStyle = useSharedStyles()
  let source
  let goal
  let examples

  switch (props.difficultyLevel) {
    case 10: {
      source = require('../assets/beginner.jpeg')
      goal = 'Learn vocabulary in The Shahada and short Surahs.'
      examples = 'Say (قل), Path (صِرَٰطَ), And not (وَلَا), He (هُوَ), The Dawn (ٱلْفَلَقِ), He created (خَلَقَ).'

      break
    }
    case 20: {
      source = require('../assets/mid-level.jpeg')
      goal = 'Learn vocabulary in the prayer and more Surahs.'
      examples = 'Man (رَجُلٌ), Hair (الشَّعْرِ), Inform me (أَخْبِرْنِي), Astonished us (فَعَجِبْنَا), About (عَنْ).'

      break
    }
    case 30: {
      //Not in use yet.
      source = require('../assets/advanced.jpeg')
      goal = 'Read the 40 Hadith of Imām Nawawī.'
      examples = 'Man (رَجُلٌ), Hair (الشَّعْرِ), Inform me (أَخْبِرْنِي), Astonished us (فَعَجِبْنَا), About (عَنْ).'

      break
    }
    default: {
      return
    }
  }

  return (
    <Surface style={{ borderRadius: 10, minHeight: 370 }}>
      <Image source={source} style={{ width: '100%', height: 190 }} />
      <View style={{ padding: 10 }}>
        <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
        <Text variant="titleSmall">Goal </Text>
        <Text style={{ ...sharedStyle.englishBody }}>{goal}</Text>
        <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
        <Text variant="titleSmall">Examples </Text>
        <Text style={sharedStyle.englishBody}>{examples}</Text>
      </View>
    </Surface>
  )
}

export default WordsSetupDifficultyLevel

WordsSetupDifficultyLevel.propTypes = {
  difficultyLevel: PropTypes.number.isRequired
}
