/* eslint-disable putout/destructuring-as-function-argument */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState, useCallback, memo, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Surface, Text, ProgressBar, Button } from 'react-native-paper'
import { paperDarkTheme } from '../constants/paper-theme.js'
import SnackButton from '../components/snack-button.js'
import { useDispatch, useSelector } from 'react-redux'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import HighlightedWordInText from '../components/highlighted-word-in-text.js'
import { vibrateBetweenTwoColors, generateRandomPositions } from '../services/utility-service.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import * as util from '../services/utility-service.js'

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
    borderRadius: 10,
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

const ENGLISH = 'English'

const WordsContent = ({
  currentWord,
  numberOfWordsToPractice,
  handleSetCurrentWord,
  currentWordIndex,
  handleSetCurrentWordIndex,
  celebrationSnackBarVisibility,
  handleSetCelebrationSnackBarVisibility
}) => {
  const sharedStyle = useSharedStyles()
  const { words } = useSelector(wordsSelector)
  const [color, setColor] = useState(paperDarkTheme.colors.elevation.level3)
  const [buttonPositions, setButtonPositions] = useState(generateRandomPositions())
  const [timeoutId, setTimeoutId] = useState()
  const hideModal = () => setVisible(false)
  const showModal = () => setVisible(true)
  const [visible, setVisible] = React.useState(false)

  const dispatch = useDispatch()

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

  const handleWrongAnswer = useCallback(() => {
    vibrateBetweenTwoColors(setColor)
  }, [setColor])

  // correct answer button
  const button1 = (
    <Button
      mode="elevated"
      style={sharedStyle.buttonAnswer}
      onPress={() => {
        if (currentWord === words.length - 1) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
          handleSetCelebrationSnackBarVisibility(true)

          // reset state for new words when we are done practicing
          setTimeout(() => {
            resetStateForNewWords()
            dispatch({
              type: 'SET_PRACTICING_WORDS',
              payload: false
            })
          }, 2500)
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
            progress={currentWordIndex / (numberOfWordsToPractice - 1)}
            color={paperDarkTheme.colors.primary}
          />
          <Surface style={{ ...styles.surface, backgroundColor: color, marginVertical: 10, minHeight: 300 }}>
            <Text style={{ ...styles.arabicBody, width: '95%', padding: 10 }}>
              {words[currentWord]?.arabicSentence && (
                <HighlightedWordInText text={words[currentWord].arabicSentence} word={words[currentWord].arabic} />
              )}
            </Text>

            <Text
              style={{ ...styles.footer, width: '95%', opacity: 0.5, position: 'absolute', bottom: 20, padding: 10 }}
            >
              {words[currentWord]?.arabicSentence && `${words[currentWord].source}\n${words[currentWord].author}`}
            </Text>

            <Button
              mode="outlined"
              style={{ position: 'absolute', bottom: 20, right: 10, opacity: 0.5, margin: 10 }}
              onPress={() => showModal()}
            >
              {ENGLISH}
            </Button>
          </Surface>

          <SnackButton
            visible={celebrationSnackBarVisibility}
            onDismissSnackBar={onDismissSnackBar}
            duration={2500}
            text="Congratulations! You've successfully completed the session!"
          />
          <ModalScrollView
            visible={visible}
            content=<Text style={{ ...useSharedStyles().englishBody, margin: 20 }} variant="bodyLarge">
              {words[currentWord].englishSentence &&
                words[currentWord].englishSentence +
                  '\n\n' +
                  util.transliterateArabicToEnglish(words[currentWord].arabicSentence)}
            </Text>
            title="English"
            hideModal={hideModal}
          />
        </>
      }
    />
  )
}

export default memo(WordsContent)

WordsContent.propTypes = {
  currentWord: PropTypes.number.isRequired,
  numberOfWordsToPractice: PropTypes.number.isRequired,
  handleSetCurrentWord: PropTypes.func.isRequired,
  currentWordIndex: PropTypes.number.isRequired,
  handleSetCurrentWordIndex: PropTypes.func.isRequired,
  celebrationSnackBarVisibility: PropTypes.bool.isRequired,
  handleSetCelebrationSnackBarVisibility: PropTypes.func.isRequired
}
