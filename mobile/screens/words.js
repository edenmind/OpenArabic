/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState, useMemo } from 'react'
import { View, FlatList, Pressable, StyleSheet, Image } from 'react-native'
import { Surface, Text, useTheme, ProgressBar } from 'react-native-paper'

import icon from '../assets/logo.png'
import { AnswerButton } from '../components/answer-button.js'
import Spinner from '../components/spinner.js'
import { useWordsLogic } from '../hooks/use-words-logic.js'
import { calculateFontSize, pluralize } from '../services/ui-services.js'
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

  const { arabic, buttonPositions, handleCorrectAnswer, handlePressOnWord, localWords } = useWordsLogic(
    currentWord,
    setCurrentWord,
    setCurrentWordIndex
  )

  const fontSize = useMemo(() => calculateFontSize(arabic), [arabic])

  const generateAnswerButton = (text, onPress, isCorrect = false) => (
    <AnswerButton text={text} onPress={onPress} correct={isCorrect} incorrect={!isCorrect} />
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

  const CompletedView = () => (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Image source={icon} style={{ height: 100, width: 100 }} />
      <Text variant="titleLarge" style={{ paddingTop: 10, textAlign: 'center' }}>
        Well Done
      </Text>
      <Text variant="bodyMedium" style={{ textAlign: 'center', width: 250 }}>
        You have finished the {pluralize(localWords.length, 'word')} that you had to review, mashaAllah!
      </Text>
    </View>
  )

  if (currentWordIndex === localWords.length) {
    return <CompletedView />
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
