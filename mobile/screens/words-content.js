/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react'
import { View, Animated, StyleSheet, FlatList } from 'react-native'
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
  footer: {
    fontFamily: 'philosopher',
    fontSize: 15,
    opacity: 0.8
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
    }, 150)
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
    const randomNumbers = [
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1,
      Math.floor(Math.random() * 100) + 1
    ]

    setButton1position(() => randomNumbers[0])
    setButton2position(() => randomNumbers[1])
    setButton3position(() => randomNumbers[2])

    props.handleSetCurrentWord((currentWord) => currentWord + 1)
    props.handleSetCurrentWordIndex((currentIndex) => currentIndex + 1)
  }
  const handleWrongAnswer = () => {
    vibrateBetweenTwoColors()
  }

  // correct answer button
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

          return
        }

        correctAnswer()
        startAnimation(fadeAnim)
      }}
    >
      <Text style={styles.text}>{words.length > 1 && words[props.currentWord].english}</Text>
    </Button>
  )

  const wrongAnswerButton = (text) => (
    <Button mode="elevated" style={sharedStyle.buttonAnswer} onPress={handleWrongAnswer}>
      <Text style={styles.text}>{words.length > 1 && text}</Text>
    </Button>
  )

  const button2 = wrongAnswerButton(words[props.currentWord]?.alternative1)
  const button3 = wrongAnswerButton(words[props.currentWord]?.alternative2)
  const buttons = [
    { button: button1, position: button1position },
    { button: button2, position: button2position },
    { button: button3, position: button3position }
  ].sort((a, b) => a.position - b.position)

  const renderItem = ({ item }) => <View>{item.button}</View>
  return (
    <FlatList
      style={styles.container}
      data={buttons}
      renderItem={renderItem}
      keyExtractor={(item) => item.position.toString()}
      ListHeaderComponent={
        <React.Fragment>
          <ProgressBar
            progress={props.currentWordIndex / (props.numberOfWordsToPractice - 1)}
            color={paperDarkTheme.colors.primary}
          />
          <Surface style={{ ...styles.surface, backgroundColor: color, marginVertical: 10 }} elevation={2}>
            <Text style={{ ...styles.arabicBody, width: '95%', padding: 15 }}>
              {words[props.currentWord]?.arabicSentence && (
                <HighlightedWordInText
                  text={words[props.currentWord].arabicSentence}
                  word={words[props.currentWord].arabic}
                />
              )}
            </Text>
            <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
            <Text
              style={{ ...styles.footer, width: '95%', padding: 15 }}
            >{`Source: ${props.source} - ${props.author}`}</Text>
          </Surface>
          <SnackButton
            visible={props.celebrationSnackBarVisibility}
            onDismissSnackBar={onDismissSnackBar}
            duration={2500}
            text="Congratulations! You've successfully completed the practice! 🎉"
          />
        </React.Fragment>
      }
    />
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
  handleSetCelebrationSnackBarVisibility: PropTypes.func.isRequired,
  source: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}
