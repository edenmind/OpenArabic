import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { View, FlatList, Pressable, StyleSheet } from 'react-native'
import { Surface, Text, useTheme, ProgressBar } from 'react-native-paper'

import { AnswerButton } from '../components/answer-button.js'
import Spinner from '../components/spinner.js'
import { useWordsLogic } from '../hooks/use-words-logic.js'
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

const WordsContent = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const {
    answeredWrongWords,
    arabic,
    buttonPositions,
    handleCorrectAnswer,
    handleWrongAnswer,
    handlePressOnWord,
    words
  } = useWordsLogic(props.currentWord, props.handleSetCurrentWord, props.handleSetCurrentWordIndex)

  const fontSize = useMemo(() => calculateFontSize(arabic), [arabic])

  const renderItem = ({ item }) => <>{item.button}</>

  const generateAnswerButton = (text, onPress, isCorrect = false) => (
    <AnswerButton text={text} onPress={onPress} correct={isCorrect} incorrect={!isCorrect} />
  )

  const buttons = useMemo(() => {
    const mainButton = generateAnswerButton(words[props.currentWord]?.english, handleCorrectAnswer, true)
    const altButton1 = generateAnswerButton(words[props.currentWord]?.alternative1, handleWrongAnswer)
    const altButton2 = generateAnswerButton(words[props.currentWord]?.alternative2, handleWrongAnswer)

    return [
      { button: mainButton, position: buttonPositions[0] },
      { button: altButton1, position: buttonPositions[1] },
      { button: altButton2, position: buttonPositions[2] }
    ].sort((a, b) => a.position - b.position)
  }, [words, props.currentWord, handleCorrectAnswer, handleWrongAnswer, buttonPositions])

  return (
    <>
      <Surface style={sharedStyle.wordSurface}>
        <ProgressBar
          color={theme.colors.tertiary}
          progress={props.currentWordIndex / (props.numberOfWordsToPractice + answeredWrongWords.length)}
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

export default WordsContent

WordsContent.propTypes = {
  currentWord: PropTypes.number.isRequired,
  currentWordIndex: PropTypes.number.isRequired,
  handleSetCurrentWord: PropTypes.func.isRequired,
  handleSetCurrentWordIndex: PropTypes.func.isRequired,
  numberOfWordsToPractice: PropTypes.number.isRequired
}
