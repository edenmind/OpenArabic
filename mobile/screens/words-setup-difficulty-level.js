/* eslint-disable react-native/no-color-literals */
/* eslint-disable unicorn/no-nested-ternary */
import React from 'react'
import { View, Image } from 'react-native'
import { Divider, Surface, Text, useTheme } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'

const WordsSetupDifficultyLevel = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  let source
  let goal

  switch (props.difficultyLevel) {
    case 10: {
      source = require('../assets/beginner.jpeg')
      goal =
        'Learn the words in the Shahada (testimony of faith) and short Surahs (Al-Fatiha, Al-Ikhlas, Al-Falaq, and An-Nas).'

      break
    }
    case 20: {
      source = require('../assets/mid-level.jpeg')
      goal = 'Learn the words in the five daily prayers and additional short Surahs from Juz Amma in the Quran.'

      break
    }
    case 30: {
      //Not in use yet.
      source = require('../assets/advanced.jpeg')
      goal = 'Read the Forty Hadith of Imām Nawawī (may Allah preserve him) directly from the Arabic source.'

      break
    }
    default: {
      return
    }
  }

  return (
    <Surface style={{ borderRadius: 10, minHeight: 310 }}>
      <Image source={source} style={{ width: '100%', height: 190 }} />
      <View style={{ padding: 10 }}>
        <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
        <Text variant="titleSmall">Goal</Text>
        <Text style={{ ...sharedStyle.englishBody }}>{goal}</Text>
      </View>
    </Surface>
  )
}

export default WordsSetupDifficultyLevel

WordsSetupDifficultyLevel.propTypes = {
  difficultyLevel: PropTypes.number.isRequired
}
