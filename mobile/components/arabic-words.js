import 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { useTheme, Text, Button } from 'react-native-paper'

import { useAudioPlayer } from '../hooks/use-audio-player.js'
import { getAdaptiveFontSize } from '../services/ui-services.js'
import { useSharedStyles } from '../styles/common.js'

export default function ArabicWords({ sentence: { words }, currentPlayingWordIndex }) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [selectedWordIndex, setSelectedWordIndex] = useState()
  const [singleWordPressed, setSingleWordPressed] = useState(false)
  const [shownWords, setShownWords] = useState([])

  const selectionTimerRef = useRef(null)

  const { playSound } = useAudioPlayer()

  useEffect(() => {
    setSelectedWordIndex()
    setSingleWordPressed(false)
  }, [currentPlayingWordIndex])

  useEffect(() => {
    return () => {
      if (selectionTimerRef.current) {
        clearTimeout(selectionTimerRef.current)
      }
    }
  }, [])

  const handleWordSelect = useCallback(
    (filename, wordIndex) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

      // Clear any existing timer
      if (selectionTimerRef.current) {
        clearTimeout(selectionTimerRef.current)
      }

      setSingleWordPressed(true)
      setSelectedWordIndex(wordIndex)
      playSound(filename)

      // Add wordIndex to shownWords if it's not there yet
      if (!shownWords.includes(wordIndex)) {
        setShownWords((prev) => [...prev, wordIndex])
      }

      // Start a new timer to reset selectedWordIndex after 1500ms
      selectionTimerRef.current = setTimeout(() => {
        setSelectedWordIndex()
        setSingleWordPressed(false)
      }, 3000)
    },
    [playSound, shownWords]
  )

  return (
    <View style={styles.container}>
      {words.map((word, wordIndex) => {
        const isSelected =
          (currentPlayingWordIndex === wordIndex && !singleWordPressed) || selectedWordIndex === wordIndex
        const textColor = isSelected ? theme.colors.tertiary : theme.colors.secondary
        const lineHeight = Platform.OS === 'android' ? 90 : 105

        const textStyles = [
          sharedStyle.arabicBody,
          styles.text,
          {
            color: textColor,
            fontSize: 55,
            lineHeight,
            paddingHorizontal: 5
          }
        ]

        const englishFontSize = getAdaptiveFontSize(word.english)

        const textStylesEnglish = [
          {
            bottom: -10,
            color: theme.colors.tertiary,
            fontSize: englishFontSize,
            paddingHorizontal: 5,
            position: 'absolute'
          }
        ]

        return (
          <Button
            style={{ ...styles.button }}
            onPress={() => handleWordSelect(word.filename, wordIndex)}
            key={wordIndex}
          >
            <View style={{ alignItems: 'center', position: 'relative' }}>
              <Text style={textStyles}>{word.arabic}</Text>
              <Text style={[textStylesEnglish, { marginHorizontal: -6 }]}>{isSelected && word.english}</Text>
            </View>
          </Button>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flexWrap: 'wrap',
    marginHorizontal: -4,
    marginVertical: -5
  },
  container: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap'
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
