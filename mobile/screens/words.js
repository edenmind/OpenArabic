/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { Button, Divider, Surface, Text, ProgressBar, SegmentedButtons } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import { paperDarkTheme } from '../constants/paper-theme.js'
import { getWords } from '../services/api-service.js'
import { useDispatch, useSelector } from 'react-redux'
import SnackButton from '../components/snack-button.js'

const wordsSelector = (state) => state.words
const practicingWordsSelector = (state) => state.practicingWords

const Words = () => {
  const sharedStyle = useSharedStyles()
  const dispatch = useDispatch()
  const { words } = useSelector(wordsSelector)
  const [currentWord, setCurrentWord] = useState(0)
  const [color, setColor] = useState(paperDarkTheme.colors.elevation.level3)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [difficultyLevel, setDifficultyLevel] = useState(10)
  const [numberOfWordsToPractice, setNumberOfWordsToPractice] = useState(10)
  const [celebrationSnackBarVisibility, setCelebrationSnackBarVisibility] = React.useState(false)
  const [button1position, setButton1position] = useState(1)
  const [button2position, setButton2position] = useState(2)
  const [button3position, setButton3position] = useState(3)
  const { practicingWords } = useSelector(practicingWordsSelector)
  const [fadeAnim] = useState(new Animated.Value(0)) // Initial value for opacity: 0

  React.useEffect(() => {
    startAnimation(fadeAnim)
  }, [fadeAnim])

  const style = StyleSheet.create({
    element: {
      paddingBottom: 10,
      paddingTop: 25
    },
    segmentedButtons: {
      width: '25%'
    },
    surface: {
      padding: 15
    }
  })

  const onDismissSnackBar = () => setCelebrationSnackBarVisibility(false)

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

    setCurrentWordIndex(currentWordIndex + 1)
  }

  const resetStateForNewWords = () => {
    setCurrentWord(0)
    setCurrentWordIndex(0)
    setCelebrationSnackBarVisibility(false)
    dispatch({
      type: 'RESET_WORDS'
    })
  }

  const button1 = (
    <Button
      mode="elevated"
      style={sharedStyle.buttonAnswer}
      onPress={() => {
        if (currentWord === words.length - 1) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
          setCelebrationSnackBarVisibility(true)

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
      <Text style={styles.text}>{words.length > 1 && words[currentWord].english}</Text>
    </Button>
  )

  const button2 = (
    <Button
      mode="elevated"
      style={sharedStyle.buttonAnswer}
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
      style={sharedStyle.buttonAnswer}
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

  function highlightWordEnglish(text, word) {
    let splitText = text.split(' ')
    let newText = []
    splitText.forEach((w, index) => {
      if (w === word) {
        newText.push(
          <Animated.View // Special animatable View
            key={index}
            style={{
              opacity: fadeAnim // Bind opacity to animated value
            }}
          >
            <Text style={{ fontSize: 45 }}> ..... </Text>
          </Animated.View>
        )
      } else {
        newText.push(
          <Text style={sharedStyle.englishBody} key={index}>
            {w}{' '}
          </Text>
        )
      }
    })
    return newText
  }

  function highlightWordArabic(text, word) {
    let splitText = text.split(' ')
    let newText = []
    splitText.forEach((w, index) => {
      if (w === word) {
        newText.push(
          <Text
            key={index}
            style={{
              ...sharedStyle.arabicBody,
              backgroundColor: paperDarkTheme.colors.primary,
              color: paperDarkTheme.colors.onPrimary
            }}
          >
            &nbsp;{w}&nbsp;
          </Text>
        )
      } else {
        newText.push(
          <Text style={sharedStyle.arabicBody} key={index}>
            {' '}
            {w}{' '}
          </Text>
        )
      }
    })
    return newText
  }

  const getContent = (
    //only show it if there are words
    <View style={styles.container}>
      <ProgressBar progress={currentWordIndex / (numberOfWordsToPractice - 1)} color={paperDarkTheme.colors.primary} />

      <Surface style={{ ...styles.surface, backgroundColor: color, marginVertical: 10, minHeight: 300 }} elevation={2}>
        <Text style={{ ...sharedStyle.arabicBody, width: '90%', textAlign: 'center', fontSize: 40, paddingTop: 20 }}>
          {words[currentWord] != undefined &&
            highlightWordArabic(words[currentWord].arabicSentence, words[currentWord].arabic)}
        </Text>
        <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
        <Text style={{ ...sharedStyle.englishBody, width: '90%', textAlign: 'center' }}>
          {words[currentWord] != undefined && highlightWordEnglish(words[currentWord].englishSentence, 'each')}
        </Text>
      </Surface>

      <SnackButton
        visible={celebrationSnackBarVisibility}
        onDismissSnackBar={onDismissSnackBar}
        duration={2500}
        text="Congratulations! You have completed the practice!"
      />

      {buttons.map((button, index) => (
        <View key={index}>{button}</View>
      ))}
    </View>
  )

  const getSetup = (
    <View style={sharedStyle.headerContainer}>
      <Text variant="labelLarge">Number of Words</Text>
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <SegmentedButtons
        value={numberOfWordsToPractice}
        style={style.segmentedButtons}
        density="compact"
        onValueChange={(value) => {
          setNumberOfWordsToPractice(value)
        }}
        buttons={[
          {
            value: 10,
            label: '10'
          },
          {
            value: 20,
            label: '20'
          },
          {
            value: 40,
            label: '40'
          },
          {
            value: 80,
            label: '80'
          }
        ]}
      />

      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />

      <Text variant="labelLarge">Difficulty Level</Text>
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <SegmentedButtons
        value={difficultyLevel}
        style={style.segmentedButtons}
        density="compact"
        onValueChange={(value) => {
          setDifficultyLevel(value)
        }}
        buttons={[
          {
            value: 10,
            label: 'Easy'
          },
          {
            value: 20,
            label: 'Medium'
          },
          {
            value: 30,
            label: 'Hard'
          }
        ]}
      />
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />

      <Text variant="labelSmall" style={{ marginBottom: 30 }}>
        {
          //return the difficulty level description
          difficultyLevel === 10
            ? 'Common Arabic Words for Beginners, often found in the Quran and the Prayer, that are easy to learn.'
            : difficultyLevel === 20
            ? 'Words found in The Quran and Hadith, excluding the most common words.'
            : difficultyLevel === 30
            ? 'Terminology used in Fiqh and Aqeedah for more advanced students.'
            : ''
        }
      </Text>

      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />

      <Button
        mode="contained"
        onPress={() => {
          resetStateForNewWords()
          dispatch(getWords(difficultyLevel, numberOfWordsToPractice))
          dispatch({
            type: 'SET_PRACTICING_WORDS',
            payload: true
          })
        }}
      >
        START PRACTICE
      </Button>
    </View>
  )

  return practicingWords ? getContent : getSetup
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
    minHeight: 100
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
function startAnimation(fadeAnim) {
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
