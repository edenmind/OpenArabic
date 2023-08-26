/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable putout/destructuring-as-function-argument */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Surface, Text, useTheme } from 'react-native-paper'
import TakbirCelebrate from '../components/takbir-celebrate.js'
import { useDispatch, useSelector } from 'react-redux'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import PlaySound from '../components/play-sound.js'
import { generateRandomPositions } from '../services/utility-service.js'
import { Progress } from '../components/progress.js'
import { AnswerButton } from '../components/answer-button.js'

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
  const [buttonPositions, setButtonPositions] = useState(generateRandomPositions())
  const [timeoutId, setTimeoutId] = useState()
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
      backgroundColor: theme.colors.elevation.level0,
      minHeight: 320
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
    setButtonPositions(generateRandomPositions())
    handleSetCurrentWord((currentWord) => currentWord + 1)
    handleSetCurrentWordIndex((currentIndex) => currentIndex + 1)
  }, [handleSetCurrentWord, handleSetCurrentWordIndex])

  const handleCorrectAnswer = () => {
    if (currentWord === words.length - 1) {
      handleSetCurrentWordIndex((currentIndex) => currentIndex + 1)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
      handleSetCelebrationSnackBarVisibility(true)

      // Using arrow function to ensure 'timeoutId' is captured correctly
      const newTimeoutId = setTimeout(() => {
        resetStateForNewWords()
        dispatch({
          type: 'SET_PRACTICING_WORDS',
          payload: false
        })
      }, 1500)

      setTimeoutId(newTimeoutId)
      return
    }

    correctAnswer()
  }

  const handleWrongAnswer = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)

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
  }, [currentWord, dispatch, words, wrongAnswerAlreadyAdded])

  // correct answer button
  const button1 = (
    <AnswerButton text={words.length > 1 && words[currentWord].english} onPress={handleCorrectAnswer} correct={true} />
  )

  // wrong answer buttons
  const wrongAnswerButton = (text) => <AnswerButton text={text} onPress={() => handleWrongAnswer} incorrect={true} />

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
          <Progress progress={currentWordIndex / (numberOfWordsToPractice + wrongAnswers)} />
          <Surface style={styles.surface}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: 'uthman',
                  width: '97%',
                  fontSize: 120,
                  textAlign: 'center',
                  color: theme.colors.secondary,
                  paddingBottom: 60
                }}
              >
                {words[currentWord]?.arabic.trim()}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 10, right: 0 }}>
              <PlaySound
                mode="text"
                audioFileNames={[`https://openarabic.ams3.digitaloceanspaces.com/audio/${words[currentWord].filename}`]}
                buttonText={'Play'}
                style={{}}
              />
            </View>
          </Surface>
          <TakbirCelebrate
            visible={celebrationSnackBarVisibility}
            onDismissSnackBar={onDismissSnackBar}
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
