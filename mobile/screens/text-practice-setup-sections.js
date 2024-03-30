import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React from 'react'
import { useTheme, Text } from 'react-native-paper'

import { PracticeCheckbox } from '../components/practice-checkbox.js'
import { useSharedStyles } from '../styles/common.js'

export default function TextPracticeSetupSections({
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
      note: 'Arabic audio with English translation.',
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
      note: 'Follow along by choosing the correct word.',
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
      note: 'Practice individual vocabulary.',
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
      <Text style={{ ...style.englishHeading, paddingLeft: 15, paddingTop: 25 }}>Setup Practice Session</Text>
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
  isListeningEnabled: PropTypes.bool.isRequired,
  isReadingEnabled: PropTypes.bool.isRequired,
  isVocabularyEnabled: PropTypes.bool.isRequired,
  setIsListeningEnabled: PropTypes.func.isRequired,
  setIsReadingEnabled: PropTypes.func.isRequired,
  setIsVocabularyEnabled: PropTypes.func.isRequired
}
