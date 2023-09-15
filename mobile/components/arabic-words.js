import 'react-native-gesture-handler'
import { Audio } from 'expo-av'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

import { ArabicWordButton } from './arabic-words-button.js'
import { useSharedStyles } from '../styles/common.js'

export default function ArabicWords({ sentence: { words }, currentPlayingWordIndex }) {
  const [sound, setSound] = useState()
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [selectedWordIndex, setSelectedWordIndex] = useState()

  const playSound = useCallback(async (filename) => {
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: filename },
      {
        isLooping: false,
        isMuted: false,
        rate: 1,
        shouldCorrectPitch: false,
        shouldPlay: true,
        volume: 1
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
          isSelected={currentPlayingWordIndex === wordIndex || selectedWordIndex === wordIndex}
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
    paddingTop: 15
  }
})

ArabicWords.propTypes = {
  currentPlayingWordIndex: PropTypes.number,
  sentence: PropTypes.shape({
    arabic: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    filename: PropTypes.string,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        arabic: PropTypes.string,
        filename: PropTypes.string
      })
    ).isRequired
  })
}
