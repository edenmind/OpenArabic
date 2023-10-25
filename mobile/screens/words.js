/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState, useMemo } from 'react'
import { View, FlatList, Pressable, StyleSheet } from 'react-native'
import { Surface, Text, useTheme, ProgressBar } from 'react-native-paper'

import { CompletedView } from './words-completed.js'
import { ButtonAnswer } from '../components/button-answer.js'
import Spinner from '../components/spinner.js'
import { useVocabularyLogic } from '../hooks/use-vocabulary-logic.js'
import { calculateFontSize } from '../services/ui-services.js'
import { useSharedStyles } from '../styles/common.js'

const styles = StyleSheet.create({
  bottomList: {
    bottom: 25,
    left: 0,
    position: 'absolute',
    right: 0
  }
})

const Words = () => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const [currentWord, setCurrentWord] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const { arabic, buttonPositions, handleCorrectAnswer, handlePressOnWord, localWords } = useVocabularyLogic(
    currentWord,
    setCurrentWord,
    setCurrentWordIndex
  )

  const fontSize = useMemo(() => calculateFontSize(arabic), [arabic])

  const generateAnswerButton = (text, onPress, isCorrect = false) => (
    <ButtonAnswer text={text} onPress={onPress} correct={isCorrect} incorrect={!isCorrect} />
  )

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

  if (currentWordIndex === localWords.length) {
    return <CompletedView localWords={localWords} />
  }

  return (
    <>
      <Surface style={sharedStyle.wordSurface}>
        <ProgressBar
          color={theme.colors.tertiary}
          progress={currentWordIndex / localWords.length}
          style={{ ...sharedStyle.progressBar, width: '100%' }}
        />
        <View style={sharedStyle.wordCenteredView}>
          <Pressable onPress={handlePressOnWord}>
            <Text style={[sharedStyle.wordText, { color: theme.colors.secondary, fontSize }]}>{arabic}</Text>
          </Pressable>
        </View>
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

export default Words
