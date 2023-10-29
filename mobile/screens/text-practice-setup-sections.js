import * as Haptics from 'expo-haptics'
import { LinearGradient } from 'expo-linear-gradient'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, View, StyleSheet, Text } from 'react-native'
import { useTheme } from 'react-native-paper'

import { PracticeCheckbox } from '../components/practice-checkbox.js'
import { useSharedStyles } from '../styles/common.js'

export default function TextPracticeSetupSections({
  heading: { image },
  checkedListening,
  checkedReading,
  checkedVocabulary,
  setCheckedListening,
  setCheckedReading,
  setCheckedVocabulary
}) {
  const theme = useTheme()
  const style = useSharedStyles(theme)

  const totalChecked = [checkedListening, checkedReading, checkedVocabulary].filter(Boolean).length

  const checkboxes = [
    {
      isChecked: checkedListening,
      label: 'Listening',
      note: 'Audio lessons for clear understanding.',
      onToggle: () => {
        if (checkedListening && totalChecked === 1) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
        } else if (!checkedListening || totalChecked > 1) {
          setCheckedListening(!checkedListening)
        }
      }
    },
    {
      isChecked: checkedReading,
      label: 'Reading',
      note: 'Exercises to boost comprehension.',
      onToggle: () => {
        if (checkedReading && totalChecked === 1) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
        } else if (!checkedReading || totalChecked > 1) {
          setCheckedReading(!checkedReading)
        }
      }
    },
    {
      isChecked: checkedVocabulary,
      label: 'Vocabulary',
      note: 'Curated word lists and flashcards.',
      onToggle: () => {
        if (checkedVocabulary && totalChecked === 1) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
        } else if (!checkedVocabulary || totalChecked > 1) {
          setCheckedVocabulary(!checkedVocabulary)
        }
      }
    }
  ]

  return (
    <>
      <View>
        <Image source={{ uri: image }} style={style.image} />
        <LinearGradient
          colors={['transparent', theme.colors.background]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <Text
        variant="labelLarge"
        style={{ color: theme.colors.onBackground, paddingLeft: 15, paddingTop: 10, textAlign: 'left' }}
      >
        Setup Practice Sessions
      </Text>

      {checkboxes.map((checkbox, index) => (
        <PracticeCheckbox
          key={index}
          label={checkbox.label}
          note={checkbox.note}
          isChecked={checkbox.isChecked}
          onToggle={checkbox.onToggle}
        />
      ))}
    </>
  )
}

TextPracticeSetupSections.propTypes = {
  checkedListening: PropTypes.bool.isRequired,
  checkedReading: PropTypes.bool.isRequired,
  checkedVocabulary: PropTypes.bool.isRequired,
  heading: PropTypes.shape({
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    readingTime: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    timeAgo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired,
    words: PropTypes.string.isRequired
  }),
  setCheckedListening: PropTypes.func.isRequired,
  setCheckedReading: PropTypes.func.isRequired,
  setCheckedVocabulary: PropTypes.func.isRequired
}
