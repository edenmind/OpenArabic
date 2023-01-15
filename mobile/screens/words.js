/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react'
import { View, StyleSheet, Animated, Image, ScrollView } from 'react-native'
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
          <Text
            style={{
              ...sharedStyle.englishBody
            }}
          >
            &nbsp;[.......]
          </Text>
        )
      } else {
        newText.push(
          <Text key={index} style={{ ...sharedStyle.englishBody, opacity: 1 }}>
            &nbsp;{w}
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
              color: paperDarkTheme.colors.onPrimary,
              fontSize: 40,
              lineHeight: 75
            }}
          >
            &nbsp;{w}&nbsp;
          </Text>
        )
      } else {
        newText.push(
          <Text style={{ ...sharedStyle.arabicBody, fontSize: 40, lineHeight: 75 }} key={index}>
            {' ' + w + ' '}
          </Text>
        )
      }
    })
    return newText
  }

  const getContent = (
    //only show it if there are words
    <ScrollView style={styles.container}>
      <ProgressBar progress={currentWordIndex / (numberOfWordsToPractice - 1)} color={paperDarkTheme.colors.primary} />

      <Surface style={{ ...styles.surface, backgroundColor: color, marginVertical: 10, minHeight: 300 }} elevation={2}>
        <Text style={{ direction: 'rtl', width: '95%', paddingTop: 15 }}>
          {words[currentWord] != undefined &&
            highlightWordArabic(words[currentWord].arabicSentence, words[currentWord].arabic)}
        </Text>
        <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
        <Text style={{ ...sharedStyle.englishBody, width: '95%', direction: 'ltr', textAlign: 'left' }}>
          {words[currentWord] != undefined &&
            highlightWordEnglish(words[currentWord].englishSentence, words[currentWord].english)}
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
    </ScrollView>
  )

  const getSetup = (
    <ScrollView style={sharedStyle.scrollViewLTR}>
      <Text variant="titleMedium">Difficulty Level:</Text>
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <SegmentedButtons
        value={difficultyLevel}
        onValueChange={(value) => {
          setDifficultyLevel(value)
        }}
        buttons={[
          {
            value: 10,
            label: 'Beginner',
            style: { width: '33%' }
          },
          {
            value: 20,
            label: 'Mid-level',
            style: { width: '33%' }
          },
          {
            value: 30,
            label: 'Advanced',
            style: { width: '33%' }
          }
        ]}
      />
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      {
        //return the difficulty level description
        difficultyLevel === 10 ? (
          <Surface elevation={2} style={{ borderRadius: 10 }}>
            <Image
              source={require('../assets/beginner.jpeg')}
              style={{ width: '100%', height: 150, borderRadius: 10 }}
            />
            <View style={{ padding: 10 }}>
              <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
              <Text variant="titleSmall">Goal: </Text>
              <Text style={sharedStyle.englishBody}>Learn the words in the prayer by heart..</Text>
              <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
              <Text variant="titleSmall">Examples: </Text>
              <Text style={sharedStyle.englishBody}>
                Say (قل), Path (صِرَٰطَ), And not (وَلَا), He (هُوَ), The Dawn (ٱلْفَلَقِ), He created (خَلَقَ).
              </Text>
            </View>
          </Surface>
        ) : difficultyLevel === 20 ? (
          <Surface elevation={4} style={{ borderRadius: 10 }}>
            <Image
              source={require('../assets/mid-level.jpeg')}
              style={{ width: '100%', height: 150, borderRadius: 10 }}
            />
            <View style={{ padding: 10 }}>
              <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
              <Text variant="titleSmall">Goal: </Text>
              <Text style={sharedStyle.englishBody}>Read the 40 Hadith of Imām Nawawī.</Text>
              <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
              <Text variant="titleSmall">Examples: </Text>
              <Text style={sharedStyle.englishBody}>
                Man (رَجُلٌ), Hair (الشَّعْرِ), Inform me (أَخْبِرْنِي), Astonished us (فَعَجِبْنَا), About (عَنْ).
              </Text>
            </View>
          </Surface>
        ) : difficultyLevel === 30 ? (
          <Surface elevation={4} style={{ borderRadius: 10 }}>
            <Image
              source={require('../assets/advanced.jpeg')}
              style={{ width: '100%', height: 150, borderRadius: 10 }}
            />
            <View style={{ padding: 10 }}>
              <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
              <Text variant="titleSmall">Goal: </Text>
              <Text style={sharedStyle.englishBody}>Read short texts about Aqīdah and Fiqh.</Text>
              <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
              <Text variant="titleSmall">Examples: </Text>
              <Text style={sharedStyle.englishBody}>
                Man (رَجُلٌ), Hair (الشَّعْرِ), Inform me (أَخْبِرْنِي), Astonished us (فَعَجِبْنَا), About (عَنْ).
              </Text>
            </View>
          </Surface>
        ) : (
          ''
        )
      }
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <Text variant="titleMedium">Number of Words:</Text>
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <SegmentedButtons
        value={numberOfWordsToPractice}
        style={{ width: '100%' }}
        onValueChange={(value) => {
          setNumberOfWordsToPractice(value)
        }}
        buttons={[
          {
            value: 10,
            label: '10',
            style: { width: '33%' }
          },
          {
            value: 20,
            label: '20',
            style: { width: '33%' }
          },
          {
            value: 40,
            label: '40',
            style: { width: '33%' }
          }
        ]}
      />

      <Divider style={{ ...sharedStyle.divider, opacity: 0, paddingBottom: 30 }} />
      <Button
        mode="contained"
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
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
      <Divider style={{ ...sharedStyle.divider, opacity: 0, paddingBottom: 50 }} />
    </ScrollView>
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
