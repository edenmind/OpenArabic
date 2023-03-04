/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react'
import { View, ScrollView, Animated, StyleSheet } from 'react-native'
import { Divider, Surface, Text, ProgressBar, Button } from 'react-native-paper'
import { paperDarkTheme } from '../constants/paper-theme.js'
import SnackButton from '../components/snack-button.js'
import { useDispatch, useSelector } from 'react-redux'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import HighlightedWordInText from '../components/highlighted-word-in-text.js'

const styles = StyleSheet.create({
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
    fontSize: 23,
    fontWeight: 'bold',
    lineHeight: 55,
    textAlign: 'center'
  }
})

const wordsSelector = (state) => state.words

const WordsContent = (props) => {
  const sharedStyle = useSharedStyles()
  const { words } = useSelector(wordsSelector)

  const [color, setColor] = useState(paperDarkTheme.colors.elevation.level3)
  const [button1position, setButton1position] = useState(1)
  const [button2position, setButton2position] = useState(2)
  const [button3position, setButton3position] = useState(3)
  const [fadeAnim] = useState(new Animated.Value(0)) // Initial value for opacity: 0
  const dispatch = useDispatch()

  React.useEffect(() => {
    startAnimation(fadeAnim)
  }, [fadeAnim])

  const onDismissSnackBar = () => props.handleSetCelebrationSnackBarVisibility(false)

  const vibrateBetweenTwoColors = () => {
    setColor(paperDarkTheme.colors.errorContainer)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)

    setTimeout(() => {
      setColor(paperDarkTheme.colors.elevation.level3)
    }, 100)
  }

  const startAnimation = (fadeAnim) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start()
  }

  const resetStateForNewWords = () => {
    props.handleSetCurrentWord(0)
    props.handleSetCurrentWordIndex(0)
    props.handleSetCelebrationSnackBarVisibility(false)
    dispatch({
      type: 'RESET_WORDS'
    })
  }

  const correctAnswer = () => {
    //give a random number between 1 and 100
    const randomNumber1 = Math.floor(Math.random() * 100) + 1
    const randomNumber2 = Math.floor(Math.random() * 100) + 1
    const randomNumber3 = Math.floor(Math.random() * 100) + 1

    setButton1position(randomNumber1)
    setButton2position(randomNumber2)
    setButton3position(randomNumber3)

    props.handleSetCurrentWord(props.currentWord + 1)

    props.handleSetCurrentWordIndex(props.currentWordIndex + 1)
  }

  const button1 = (
    <Button
      mode="elevated"
      style={sharedStyle.buttonAnswer}
      onPress={() => {
        if (props.currentWord === words.length - 1) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
          props.handleSetCelebrationSnackBarVisibility(true)

          //set a timeout for 1 second before resetting the words
          setTimeout(() => {
            resetStateForNewWords()
            dispatch({
              type: 'SET_PRACTICING_WORDS',
              payload: false
            })
          }, 2500)
        } else {
          correctAnswer()
          startAnimation(fadeAnim)
        }
      }}
    >
      <Text style={styles.text}>{words.length > 1 && words[props.currentWord].english}</Text>
    </Button>
  )

  const button2 = (
    <Button
      mode="elevated"
      style={{ ...sharedStyle.buttonAnswer }}
      onPress={() => {
        vibrateBetweenTwoColors()
      }}
    >
      <Text style={{ ...styles.text }}>{words.length > 1 && words[props.currentWord].alternative1}</Text>
    </Button>
  )

  const button3 = (
    <Button
      mode="elevated"
      style={sharedStyle.buttonAnswer}
      onPress={() => {
        vibrateBetweenTwoColors()
      }}
    >
      <Text style={styles.text}>{words.length > 1 && words[props.currentWord].alternative2}</Text>
    </Button>
  )

  const buttons = [
    { button: button1, position: button1position },
    { button: button2, position: button2position },
    { button: button3, position: button3position }
  ]
    .sort((a, b) => a.position - b.position)
    .map((item) => item.button)

  return (
    //only show it if there are words
    <ScrollView style={styles.container}>
      <ProgressBar
        progress={props.currentWordIndex / (props.numberOfWordsToPractice - 1)}
        color={paperDarkTheme.colors.primary}
      />

      <Surface style={{ ...styles.surface, backgroundColor: color, marginVertical: 10 }} elevation={2}>
        <Text style={{ ...styles.arabicBody, width: '95%', padding: 15 }}>
          {words[props.currentWord] != undefined && (
            <HighlightedWordInText
              text={words[props.currentWord].arabicSentence}
              word={words[props.currentWord].arabic}
            />
          )}
        </Text>
        <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      </Surface>

      <SnackButton
        visible={props.celebrationSnackBarVisibility}
        onDismissSnackBar={onDismissSnackBar}
        duration={2500}
        text="Congratulations! You have completed the practice! 🎉"
      />

      {buttons.map((button, index) => (
        <View key={index}>{button}</View>
      ))}
    </ScrollView>
  )
}

export default WordsContent

WordsContent.propTypes = {
  currentWord: PropTypes.number.isRequired,
  numberOfWordsToPractice: PropTypes.number.isRequired,
  handleSetCurrentWord: PropTypes.func.isRequired,
  currentWordIndex: PropTypes.number.isRequired,
  handleSetCurrentWordIndex: PropTypes.func.isRequired,
  celebrationSnackBarVisibility: PropTypes.bool.isRequired,
  handleSetCelebrationSnackBarVisibility: PropTypes.func.isRequired
}
