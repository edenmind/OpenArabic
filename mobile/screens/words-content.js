/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable putout/destructuring-as-function-argument */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Surface, Text, ProgressBar, Button, useTheme } from 'react-native-paper'
import SnackButton from '../components/snack-button.js'
import { useDispatch, useSelector } from 'react-redux'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import PlaySound from '../components/play-sound.js'
import { vibrateBetweenTwoColors, generateRandomPositions } from '../services/utility-service.js'
const wordsSelector = (state) => state.words

const WordsContent = ({
  currentWord,
  numberOfWordsToPractice,
  handleSetCurrentWord,
  currentWordIndex,
  handleSetCurrentWordIndex,
  celebrationSnackBarVisibility,
  handleSetCelebrationSnackBarVisibility
}) => {
  const theme = useTheme()
  const { words } = useSelector(wordsSelector)
  const [color, setColor] = useState(theme.colors.elevation.level2)
  const [buttonPositions, setButtonPositions] = useState(generateRandomPositions())
  const [timeoutId, setTimeoutId] = useState()
  const sharedStyle = useSharedStyles(theme)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [wrongAnswerAlreadyAdded, setWrongAnswerAlreadyAdded] = useState([])

  const dispatch = useDispatch()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10
    },
    surface: {
      alignItems: 'center',
      backgroundColor: color,
      borderRadius: 10,

      marginBottom: 10,
      marginVertical: 10,
      minHeight: 320
    },
    text: {
      color: theme.colors.primary,
      fontSize: 23,
      fontWeight: 'bold',
      lineHeight: 55,
      textAlign: 'center'
    }
  })

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  const onDismissSnackBar = useCallback(() => {
    handleSetCelebrationSnackBarVisibility(false)
  }, [handleSetCelebrationSnackBarVisibility])
  const resetStateForNewWords = useCallback(() => {
    handleSetCurrentWord(0)
    handleSetCurrentWordIndex(0)
    handleSetCelebrationSnackBarVisibility(false)
    setButtonPositions(generateRandomPositions())

    dispatch({
      type: 'RESET_WORDS'
    })
  }, [dispatch, handleSetCelebrationSnackBarVisibility, handleSetCurrentWord, handleSetCurrentWordIndex])
  const correctAnswer = useCallback(() => {
    vibrateBetweenTwoColors(setColor, theme, theme.colors.primaryContainer)
    setButtonPositions(generateRandomPositions())
    handleSetCurrentWord((currentWord) => currentWord + 1)
    handleSetCurrentWordIndex((currentIndex) => currentIndex + 1)
  }, [handleSetCurrentWord, handleSetCurrentWordIndex, theme])

  const handleWrongAnswer = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
    vibrateBetweenTwoColors(setColor, theme, theme.colors.errorContainer)

    const currentWordArabic = words[currentWord].arabic

    if (wrongAnswerAlreadyAdded.includes(currentWordArabic)) {
      return
    }

    //add the word to the wrongAnswerAlreadyAdded array so that we don't add it again
    setWrongAnswerAlreadyAdded((prevWrongAnswerAlreadyAdded) => [...prevWrongAnswerAlreadyAdded, currentWordArabic])

    // add the wrong answer so that we can practice it again
    dispatch({
      type: 'ADD_WORD',
      payload: words[currentWord]
    })

    // add one to the wrong answers
    setWrongAnswers((prevWrongAnswers) => prevWrongAnswers + 1)
  }, [currentWord, dispatch, theme, words, wrongAnswerAlreadyAdded])

  // correct answer button
  const button1 = (
    <Button
      style={{ ...sharedStyle.buttonAnswer }}
      onPress={() => {
        if (currentWord === words.length - 1) {
          handleSetCurrentWordIndex((currentIndex) => currentIndex + 1)
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
          handleSetCelebrationSnackBarVisibility(true)

          // reset state for new words when we are done practicing
          setTimeout(() => {
            resetStateForNewWords()
            dispatch({
              type: 'SET_PRACTICING_WORDS',
              payload: false
            })
          }, 1500)
          setTimeoutId(timeoutId)

          return
        }

        correctAnswer()
      }}
    >
      <Text style={styles.text}>{words.length > 1 && words[currentWord].english}</Text>
    </Button>
  )

  const wrongAnswerButton = (text) => (
    <Button mode="elevated" style={sharedStyle.buttonAnswer} onPress={handleWrongAnswer}>
      <Text style={styles.text}>{words.length > 1 && text}</Text>
    </Button>
  )

  const button2 = wrongAnswerButton(words[currentWord]?.alternative1)
  const button3 = wrongAnswerButton(words[currentWord]?.alternative2)
  const buttons = [
    { button: button1, position: buttonPositions[0] },
    { button: button2, position: buttonPositions[1] },
    { button: button3, position: buttonPositions[2] }
  ].sort((a, b) => a.position - b.position)

  const renderItem = ({ item }) => <View>{item.button}</View>

  return (
    <FlatList
      style={styles.container}
      data={buttons}
      renderItem={renderItem}
      keyExtractor={(item) => item.position.toString()}
      ListHeaderComponent={
        <>
          <ProgressBar
            color={theme.colors.tertiary}
            progress={currentWordIndex / (numberOfWordsToPractice + wrongAnswers)}
            style={{ height: 7, borderRadius: 10, backgroundColor: theme.colors.elevation.level2 }}
          />
          <Surface style={styles.surface}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: 'uthman',
                  width: '97%',
                  fontSize: 120,
                  textAlign: 'center',
                  color: theme.colors.secondary,
                  paddingBottom: 50
                }}
              >
                {words[currentWord]?.arabic.trim()}
              </Text>
            </View>

            {/* <Text
              style={{
                ...sharedStyle.arabicBody,
                fontSize: 30,
                textAlign: 'center',
                paddingHorizontal: 10,
                lineHeight: 45
              }}
            >
              {words[currentWord]?.arabicSentence}
            </Text> */}

            {/* <View style={{ position: 'absolute', bottom: 15, left: 15, width: 130 }}>
              <Text variant="labelSmall" style={{ color: theme.colors.outline }}>
                {words[currentWord]?.source}
              </Text>
            </View> */}

            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 5, right: 10 }}>
              <PlaySound
                mode="text"
                audioFileNames={[
                  `https://openarabic.ams3.digitaloceanspaces.com/audio/${words[currentWord].filename}`,
                  `https://openarabic.ams3.digitaloceanspaces.com/audio/${words[currentWord].filename}`
                ]}
                buttonText={'Play'}
                style={{}}
              />
            </View>
          </Surface>
          <SnackButton
            visible={celebrationSnackBarVisibility}
            onDismissSnackBar={onDismissSnackBar}
            duration={3500}
            text="Session Completed Successfully!"
          />
        </>
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
  handleSetCelebrationSnackBarVisibility: PropTypes.func.isRequired
}
