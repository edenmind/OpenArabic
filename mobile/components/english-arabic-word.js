import 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Platform, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { useAudioPlayer } from '../hooks/use-audio-player.js'
import { getAdaptiveFontSize } from '../services/ui-services.js'
import { useSharedStyles } from '../styles/common.js'

export default function EnglishArabicWord({
  sentence: { words },
  currentPlayingWordIndex,
  setCurrentPlayingWordIndex
}) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [selectedWordIndex, setSelectedWordIndex] = useState()
  const [singleWordPressed, setSingleWordPressed] = useState(false)
  const [shownWords, setShownWords] = useState([])

  const selectionTimerRef = useRef(null)

  const dispatch = useDispatch()

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

      dispatch({ payload: true, type: 'SET_AUDIO' })

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
        dispatch({ payload: false, type: 'SET_AUDIO' })
        setSelectedWordIndex()
        setSingleWordPressed(false)
        setCurrentPlayingWordIndex()
      }, 3000)
    },
    [dispatch, playSound, setCurrentPlayingWordIndex, shownWords]
  )

  return (
    <View style={styles.container}>
      {words.map((word, wordIndex) => {
        const isSelected =
          (currentPlayingWordIndex === wordIndex && !singleWordPressed) || selectedWordIndex === wordIndex
        const textColor = isSelected ? theme.colors.tertiary : theme.colors.onSurface
        const lineHeight = Platform.OS === 'android' ? 125 : 95

        const textStyles = [
          sharedStyle.arabicBody,
          styles.text,
          {
            color: textColor,
            fontSize: 50,
            lineHeight,
            paddingHorizontal: 5
          }
        ]

        const englishFontSize = getAdaptiveFontSize(word.english)

        const textStylesEnglish = [
          {
            bottom: 0,
            color: theme.colors.tertiary,
            fontSize: englishFontSize,
            marginHorizontal: -6,
            paddingHorizontal: 5,
            position: 'absolute'
          }
        ]

        return (
          <TouchableOpacity
            style={{ ...styles.button }}
            onPress={() => handleWordSelect(word.filename, wordIndex)}
            key={wordIndex}
            activeOpacity={0.8}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={textStyles}>{word.arabic}</Text>
              {isSelected && word.english ? <Text style={[textStylesEnglish, {}]}>{word.english}</Text> : undefined}
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flexWrap: 'wrap',
    marginHorizontal: 0,
    marginVertical: -5
  },
  container: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap'
  }
})

EnglishArabicWord.propTypes = {
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
  }),
  setCurrentPlayingWordIndex: PropTypes.func.isRequired
}
