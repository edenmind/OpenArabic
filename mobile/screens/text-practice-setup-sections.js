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
  isListeningEnabled,
  isReadingEnabled,
  isVocabularyEnabled,
  setIsListeningEnabled,
  setIsReadingEnabled,
  setIsVocabularyEnabled
}) {
  const theme = useTheme()
  const style = useSharedStyles(theme)

  const totalChecked = [isListeningEnabled, isReadingEnabled, isVocabularyEnabled].filter(Boolean).length

  const checkboxes = [
    {
      isChecked: isListeningEnabled,
      label: 'Listening',
      note: 'Audio lessons for clear understanding',
      onToggle: () => {
        if (isListeningEnabled && totalChecked === 1) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
        } else if (!isListeningEnabled || totalChecked > 1) {
          setIsListeningEnabled(!isListeningEnabled)
        }
      }
    },
    {
      isChecked: isReadingEnabled,
      label: 'Reading',
      note: 'Reading exercises to boost comprehension',
      onToggle: () => {
        if (isReadingEnabled && totalChecked === 1) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
        } else if (!isReadingEnabled || totalChecked > 1) {
          setIsReadingEnabled(!isReadingEnabled)
        }
      }
    },
    {
      isChecked: isVocabularyEnabled,
      label: 'Vocabulary',
      note: 'Word lists to increase vocabulary',
      onToggle: () => {
        if (isVocabularyEnabled && totalChecked === 1) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
        } else if (!isVocabularyEnabled || totalChecked > 1) {
          setIsVocabularyEnabled(!isVocabularyEnabled)
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

      <Text variant="labelLarge" style={{ color: theme.colors.onBackground, paddingLeft: 15, paddingTop: 5 }}>
        Setup Practice Session
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
  isListeningEnabled: PropTypes.bool.isRequired,
  isReadingEnabled: PropTypes.bool.isRequired,
  isVocabularyEnabled: PropTypes.bool.isRequired,
  setIsListeningEnabled: PropTypes.func.isRequired,
  setIsReadingEnabled: PropTypes.func.isRequired,
  setIsVocabularyEnabled: PropTypes.func.isRequired
}
