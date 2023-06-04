/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable putout/destructuring-as-function-argument */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Surface, Text, ProgressBar, Button, useTheme, Chip } from 'react-native-paper'
import SnackButton from '../components/snack-button.js'
import { useDispatch, useSelector } from 'react-redux'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import { vibrateBetweenTwoColors, generateRandomPositions } from '../services/utility-service.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import { formatGrammar } from '../services/ui-services.js'

const wordsSelector = (state) => state.words

const ROOT = 'ROOT'
const CONTEXT = 'CONTEXT'
const PLAY = 'PLAY'

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
  const [color, setColor] = useState(theme.colors.elevation.level3)
  const [buttonPositions, setButtonPositions] = useState(generateRandomPositions())
  const [timeoutId, setTimeoutId] = useState()
  const hideModal = () => setVisible(false)
  const showModal = () => setVisible(true)
  const [visible, setVisible] = React.useState(false)
  const sharedStyle = useSharedStyles(theme)

  const dispatch = useDispatch()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10
    },
    // footer: {
    //   color: theme.colors.secondary,
    //   fontFamily: 'philosopher',
    //   fontSize: 15
    // },
    surface: {
      alignItems: 'center',
      backgroundColor: color,
      borderRadius: 10,
      justifyContent: 'center',
      marginBottom: 10,
      marginVertical: 10,
      minHeight: 300
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
    setButtonPositions(generateRandomPositions())
    handleSetCurrentWord((currentWord) => currentWord + 1)
    handleSetCurrentWordIndex((currentIndex) => currentIndex + 1)
  }, [handleSetCurrentWord, handleSetCurrentWordIndex])

  const handleWrongAnswer = useCallback(() => {
    vibrateBetweenTwoColors(setColor, theme)
  }, [theme])

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

  const details = <View>{formatGrammar(words[currentWord].grammar, sharedStyle) ?? 'No explanation available'}</View>

  const renderItem = ({ item }) => <View>{item.button}</View>

  return (
    <FlatList
      style={styles.container}
      data={buttons}
      renderItem={renderItem}
      keyExtractor={(item) => item.position.toString()}
      ListHeaderComponent={
        <>
          <ProgressBar progress={currentWordIndex / (numberOfWordsToPractice - 1)} style={{ marginHorizontal: 2 }} />
          <Surface style={styles.surface}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', position: 'absolute', top: 15 }}>
              <Chip
                style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
                compact={true}
                selectedColor={theme.colors.onTertiary}
              >
                Attached
              </Chip>
              <Chip
                style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
                compact={true}
                selectedColor={theme.colors.onTertiary}
              >
                Weak
              </Chip>
              <Chip
                style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
                compact={true}
                selectedColor={theme.colors.onTertiary}
              >
                Passive
              </Chip>
              <Chip
                style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
                compact={true}
                selectedColor={theme.colors.onTertiary}
              >
                Attached
              </Chip>
            </View>
            <Text
              style={{
                ...styles.arabicBody,
                width: '97%',
                padding: 10,
                fontSize: 75,
                textAlign: 'center',
                color: theme.colors.primary
              }}
            >
              {words[currentWord].arabic}
            </Text>

            {/* <Text style={{ ...styles.footer, width: '97%', position: 'absolute', bottom: 5, padding: 10 }}>
              {words[currentWord]?.arabicSentence && `${words[currentWord].source}\n${words[currentWord].author}`}
            </Text> */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', position: 'absolute', bottom: 5, margin: 5 }}>
              <Button
                mode="text"
                style={{ margin: 3 }}
                onPress={() => showModal()}
                textColor={theme.colors.secondary}
                icon="play"
              >
                {PLAY}
              </Button>
              <Button
                mode="text"
                style={{ margin: 3 }}
                onPress={() => showModal()}
                textColor={theme.colors.secondary}
                icon="text"
              >
                {CONTEXT}
              </Button>
              <Button
                mode="text"
                style={{ margin: 3 }}
                onPress={() => showModal()}
                textColor={theme.colors.secondary}
                icon="source-branch"
              >
                {ROOT}
              </Button>
            </View>
          </Surface>

          <SnackButton
            visible={celebrationSnackBarVisibility}
            onDismissSnackBar={onDismissSnackBar}
            duration={2500}
            text="Congratulations! You've successfully completed the session!"
          />
          <ModalScrollView
            visible={visible}
            content={details}
            title={words[currentWord].arabic}
            hideModal={hideModal}
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
