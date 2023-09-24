import 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useState, useCallback, useEffect } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { useTheme, Text, Button, Tooltip } from 'react-native-paper'

import { useAudioPlayer } from '../hooks/use-audio-player.js'
import { useSharedStyles } from '../styles/common.js'

export default function ArabicWords({ sentence: { words }, currentPlayingWordIndex }) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [selectedWordIndex, setSelectedWordIndex] = useState()
  const [singleWordPressed, setSingleWordPressed] = useState(false)

  const { playSound } = useAudioPlayer()

  useEffect(() => {
    setSelectedWordIndex()
    setSingleWordPressed(false)
  }, [currentPlayingWordIndex])

  const handleWordSelect = useCallback(
    (filename, wordIndex) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      setSingleWordPressed(true)
      setSelectedWordIndex((prevIndex) => (prevIndex === wordIndex ? undefined : wordIndex)) // Toggle selection on repeat press
      playSound(filename)
    },
    [playSound]
  )

  return (
    <View style={styles.container}>
      {words.map((word, wordIndex) => {
        const isSelected =
          (currentPlayingWordIndex === wordIndex && !singleWordPressed) || selectedWordIndex === wordIndex
        const backgroundColor = isSelected ? theme.colors.tertiary : theme.colors.elevation.level0
        const textColor = isSelected ? theme.colors.tertiary : theme.colors.secondary
        const lineHeight = Platform.OS === 'android' ? 90 : 55

        const textStyles = [
          sharedStyle.arabicBody,
          styles.text,
          {
            color: textColor,
            lineHeight
          }
        ]

        return (
          <Tooltip title={word.english} key={wordIndex}>
            <Button style={styles.button} onPress={() => handleWordSelect(word.filename, wordIndex)} key={wordIndex}>
              <View style={{ borderBottomColor: backgroundColor, borderBottomWidth: 3 }}>
                <Text style={textStyles}>{word.arabic}</Text>
              </View>
            </Button>
          </Tooltip>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginBottom: -10,
    marginHorizontal: -8
  },
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
