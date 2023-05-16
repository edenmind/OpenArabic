import 'react-native-gesture-handler'
import { Platform } from 'react-native'
import { Text, Button, useTheme } from 'react-native-paper'
import React from 'react'
import * as util from '../services/utility-service.js'
import * as Haptics from 'expo-haptics'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'
import { Audio } from 'expo-av'

export default function TextArabicWords({ text, setEnglishTranslation }) {
  const [sound, setSound] = React.useState()
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const playSound = async (filename) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: filename },
      {
        shouldPlay: true,
        rate: 1,
        shouldCorrectPitch: false,
        volume: 1,
        isMuted: false,
        isLooping: false
      }
    )

    setSound(sound)
    await sound.playAsync()
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])
  return text.sentences.map((sentence) => {
    return sentence.words.map((word, wordIndex) => {
      return (
        <Button
          key={wordIndex}
          onPress={() => {
            setEnglishTranslation(
              `${util.capitalizeFirstLetter(word.english)} (${util.transliterateArabicToEnglish(word.arabic)})`
            )
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            playSound(word.filename)
          }}
        >
          <Text
            style={{
              ...sharedStyle.arabicBody,
              lineHeight: Platform.OS === 'android' ? 90 : 50
            }}
          >
            {word.arabic}
          </Text>
        </Button>
      )
    })
  })
}

TextArabicWords.propTypes = {
  text: PropTypes.object.isRequired,
  setEnglishTranslation: PropTypes.func.isRequired
}
