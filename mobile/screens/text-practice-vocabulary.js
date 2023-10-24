/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import PropTypes from 'prop-types'
import React, { useState, useMemo, useEffect } from 'react'
import { FlatList, Pressable, StyleSheet } from 'react-native'
import { Surface, Text, useTheme } from 'react-native-paper'

import { ButtonAnswer } from '../components/button-answer.js'
import Spinner from '../components/spinner.js'
import { useWordsLogic } from '../hooks/use-words-logic.js'
import { calculateFontSize } from '../services/ui-services.js'
import { useSharedStyles } from '../styles/common.js'

const styles = StyleSheet.create({
  bottomList: {
    bottom: 40,
    left: 0,
    position: 'absolute',
    right: 0
  }
})

export const PracticeVocabulary = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const [currentWord, setCurrentWord] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const { arabic, buttonPositions, handleCorrectAnswer, handlePressOnWord, localWords } = useWordsLogic(
    currentWord,
    setCurrentWord,
    setCurrentWordIndex
  )

  const fontSize = useMemo(() => calculateFontSize(arabic), [arabic])

  const generateAnswerButton = (text, onPress, isCorrect = false) => (
    <ButtonAnswer text={text} onPress={onPress} correct={isCorrect} incorrect={!isCorrect} />
  )

  useEffect(() => {
    if (currentWordIndex === localWords.length) {
      props.handleContinue()
    }
  }, [currentWordIndex])

  const buttons = useMemo(() => {
    const mainButton = generateAnswerButton(localWords[currentWord]?.english, handleCorrectAnswer, true)
    const altButton1 = generateAnswerButton(localWords[currentWord]?.alternative1)
    const altButton2 = generateAnswerButton(localWords[currentWord]?.alternative2)

    return [
      { button: mainButton, position: buttonPositions[0] },
      { button: altButton1, position: buttonPositions[1] },
      { button: altButton2, position: buttonPositions[2] }
    ].sort((a, b) => a.position - b.position)
  }, [localWords, currentWord, handleCorrectAnswer, buttonPositions])

  const renderItem = ({ item }) => <>{item.button}</>

  return (
    <>
      <Surface style={sharedStyle.wordSurface}>
        <Pressable onPress={handlePressOnWord}>
          <Text style={[sharedStyle.wordText, { color: theme.colors.secondary, fontSize }]}>{arabic}</Text>
        </Pressable>
      </Surface>
      <FlatList
        style={[sharedStyle.wordContainer, styles.bottomList]}
        data={buttons}
        renderItem={renderItem}
        ListEmptyComponent={<Spinner />}
        keyExtractor={(item) => item.position.toString()}
      />
    </>
  )
}

PracticeVocabulary.propTypes = {
  handleContinue: PropTypes.func.isRequired
}
