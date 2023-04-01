import 'react-native-gesture-handler'
import { Platform } from 'react-native'
import { Text, Button } from 'react-native-paper'
import React from 'react'
import * as util from '../services/utility-service.js'
import * as Haptics from 'expo-haptics'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'

export default function TextArabicWords({ text, setEnglishTranslation }) {
  const sharedStyle = useSharedStyles()
  return text.sentences.map((sentence) => {
    return sentence.words.map((word, wordIndex) => {
      return (
        <Button
          key={wordIndex}
          mode="text"
          onPress={() => {
            setEnglishTranslation(word.english + ' (' + util.transliterateArabicToEnglish(word.arabic) + ')')
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }}
        >
          <Text style={{ ...sharedStyle.arabicBody, lineHeight: Platform.OS === 'android' ? 90 : 50 }}>
            {word.arabic}
          </Text>
        </Button>
      )
    })
  })
}

TextArabicWords.propTypes = {
  text: PropTypes.array.isRequired,
  setEnglishTranslation: PropTypes.func.isRequired
}
