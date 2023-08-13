import 'react-native-gesture-handler'
import { Platform, View } from 'react-native'
import { Text, Button, useTheme } from 'react-native-paper'
import React from 'react'
import * as util from '../services/utility-service.js'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'
import { Audio } from 'expo-av'
import { formatGrammar } from '../services/ui-services.js'

// eslint-disable-next-line putout/destructuring-as-function-argument
export default function TextArabicWords({ text, setEnglishTranslation, setExplanation, setArabicWord }) {
  const [sound, setSound] = React.useState()
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [selectedWordIndex, setSelectedWordIndex] = React.useState()
  const [selectedSentenceIndex, setSelectedSentenceIndex] = React.useState()

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

    // This will override the silent switch on iOS
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true
    })

    await sound.playAsync()
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <View style={{ flex: 1 }}>
      {text.sentences.map((sentence, sentenceIndex) => (
        <View
          key={sentenceIndex}
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 10
          }}
        >
          {sentence.words.map((word, wordIndex) => {
            const isSelected = selectedWordIndex === wordIndex && selectedSentenceIndex === sentenceIndex
            const backgroundColor = isSelected ? theme.colors.tertiary : theme.colors.elevation.level0
            const backgroundColorText = isSelected ? theme.colors.tertiary : theme.colors.onBackground

            return (
              <Button
                key={wordIndex}
                textColor={theme.colors.tertiary}
                style={{
                  marginHorizontal: -8,
                  marginBottom: -10
                }}
                onPress={() => {
                  const transliterated = util.transliterateArabicToEnglish(word.arabic)
                  const english = `${util.capitalizeFirstLetter(word.english)} (${transliterated})`

                  setEnglishTranslation(english)

                  setArabicWord(word.arabic)
                  setExplanation(formatGrammar(word.grammar, sharedStyle))
                  setSelectedWordIndex(wordIndex)
                  setSelectedSentenceIndex(sentenceIndex)
                  playSound(word.filename)
                }}
              >
                <View
                  style={{
                    borderBottomColor: backgroundColor,
                    borderBottomWidth: 3
                  }}
                >
                  <Text
                    style={{
                      ...sharedStyle.arabicBody,
                      color: backgroundColorText,
                      lineHeight: Platform.OS === 'android' ? 90 : 50
                    }}
                  >
                    {word.arabic.trim()}
                  </Text>
                </View>
              </Button>
            )
          })}
        </View>
      ))}
    </View>
  )
}

TextArabicWords.propTypes = {
  text: PropTypes.object.isRequired,
  setEnglishTranslation: PropTypes.func.isRequired,
  setExplanation: PropTypes.func.isRequired,
  setArabicWord: PropTypes.func.isRequired
}
