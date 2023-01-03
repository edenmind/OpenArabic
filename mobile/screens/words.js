/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Surface, Text } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import { paperDarkTheme } from '../constants/paper-theme.js'
import { getWords } from '../services/api-service.js'
import { useDispatch, useSelector } from 'react-redux'
import * as util from '../services/utility-service.js'
import Spinner from '../components/spinner.js'

const wordsSelector = (state) => state.words

const Words = () => {
  const sharedStyle = useSharedStyles()
  const dispatch = useDispatch()
  const { words } = useSelector(wordsSelector)
  const [currentWord, setCurrentWord] = useState(1)
  const [color, setColor] = useState(paperDarkTheme.colors.elevation.level3)

  const [button1position, setButton1position] = useState(1)
  const [button2position, setButton2position] = useState(2)
  const [button3position, setButton3position] = useState(3)

  useEffect(() => {
    dispatch(getWords())
  }, [dispatch])

  const vibrateBetweenTwoColors = () => {
    setColor(paperDarkTheme.colors.errorContainer)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)

    setTimeout(() => {
      setColor(paperDarkTheme.colors.elevation.level3)
    }, 100)
  }

  const correctAnswer = () => {
    //give a random number between 1 and 100
    const randomNumber1 = Math.floor(Math.random() * 100) + 1
    const randomNumber2 = Math.floor(Math.random() * 100) + 1
    const randomNumber3 = Math.floor(Math.random() * 100) + 1

    setButton1position(randomNumber1)
    setButton2position(randomNumber2)
    setButton3position(randomNumber3)

    setCurrentWord(currentWord + 1)
  }

  const button1 = (
    <Button
      mode="elevated"
      style={sharedStyle.button}
      onPress={() => {
        if (currentWord === words.length - 1) {
          setCurrentWord(0)
        } else {
          correctAnswer()
        }
      }}
    >
      <Text style={styles.text}>{words.length > 1 && words[currentWord].english}</Text>
    </Button>
  )

  const button2 = (
    <Button
      mode="elevated"
      style={sharedStyle.button}
      onPress={() => {
        vibrateBetweenTwoColors()
      }}
    >
      <Text style={styles.text}>{words.length > 1 && words[currentWord].alternative1}</Text>
    </Button>
  )

  const button3 = (
    <Button
      mode="elevated"
      style={sharedStyle.button}
      onPress={() => {
        vibrateBetweenTwoColors()
      }}
    >
      <Text style={styles.text}>{words.length > 1 && words[currentWord].alternative2}</Text>
    </Button>
  )

  const buttons = [
    { button: button1, position: button1position },
    { button: button2, position: button2position },
    { button: button3, position: button3position }
  ]
    .sort((a, b) => a.position - b.position)
    .map((item) => item.button)

  const getContent = (
    //only show it if there are words
    <View style={styles.container}>
      <Surface style={{ ...styles.surface, backgroundColor: color }} elevation={2}>
        <Text style={styles.arabicText}>{words.length > 1 && words[currentWord].arabic}</Text>
        <Text style={styles.transliterationText} variant="bodyLarge">
          {words.length > 1 && util.transliterateArabicToEnglish(words.length > 1 && words[currentWord].arabic)}
        </Text>
      </Surface>

      {buttons.map((button, index) => (
        <View key={index}>{button}</View>
      ))}
    </View>
  )

  return words.length > 1 ? getContent : <Spinner />
}

const styles = StyleSheet.create({
  arabicText: {
    color: paperDarkTheme.colors.secondary,
    fontFamily: 'uthman',
    fontSize: 75
  },
  container: {
    flex: 1,
    margin: 10
  },
  surface: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    minHeight: 300
  },
  text: {
    color: paperDarkTheme.colors.primary,
    fontSize: 17,
    textAlign: 'center'
  },
  topView: {
    flex: 1
  },
  transliterationText: {
    color: paperDarkTheme.colors.secondary
  }
})

export default Words
