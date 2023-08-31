import 'react-native-gesture-handler'
import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import { Audio } from 'expo-av'
import { ArabicWordButton } from './arabic-words-button.js'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'

export default function TextArabicWords({ sentence: { words } }) {
  const [sound, setSound] = useState()
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [selectedWordIndex, setSelectedWordIndex] = useState()

  const playSound = useCallback(async (filename) => {
    const { sound: newSound } = await Audio.Sound.createAsync(
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

    setSound(newSound)
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true
    })
    await newSound.playAsync()
  }, [])

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <View style={styles.container}>
      {words.map((word, wordIndex) => (
        <ArabicWordButton
          key={wordIndex}
          word={word}
          isSelected={selectedWordIndex === wordIndex}
          theme={theme}
          sharedStyle={sharedStyle}
          onSelect={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            setSelectedWordIndex(wordIndex)
            playSound(word.filename)
          }}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginBottom: 10
  }
})

TextArabicWords.propTypes = {
  sentence: PropTypes.shape({
    arabic: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        arabic: PropTypes.string,
        filename: PropTypes.string
      })
    ).isRequired
  })
}
