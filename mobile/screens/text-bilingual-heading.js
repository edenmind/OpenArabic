import * as Haptics from 'expo-haptics'
import { LinearGradient } from 'expo-linear-gradient'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, useTheme, Checkbox } from 'react-native-paper'

import { useSharedStyles } from '../styles/common.js'

function PracticeCheckbox({ label, note, isChecked, onToggle }) {
  const theme = useTheme()
  const textColor = isChecked ? theme.colors.onBackground : theme.colors.outline

  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: 15,
          marginVertical: 10
        }}
      >
        <Checkbox status={isChecked ? 'checked' : 'unchecked'} />
        <View>
          <Text variant="headlineSmall" style={{ color: textColor }}>
            {label}
          </Text>
          <Text variant="labelLarge" style={{ color: textColor }}>
            {note}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

PracticeCheckbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired
}

export default function TextBilingualHeading({ heading: { image } }) {
  const theme = useTheme()
  const style = useSharedStyles(theme)
  const [checkedListening, setCheckedListening] = React.useState(true)
  const [checkedReading, setCheckedReading] = React.useState(true)
  const [checkedVocabulary, setCheckedVocabulary] = React.useState(true)

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

      <Text variant="labelLarge" style={{ paddingLeft: 15, paddingTop: 10, textAlign: 'left' }}>
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

TextBilingualHeading.propTypes = {
  heading: PropTypes.shape({
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    readingTime: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    timeAgo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired
  })
}
