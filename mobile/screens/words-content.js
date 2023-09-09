import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { View, FlatList, Pressable } from 'react-native'
import { Surface, Text, useTheme } from 'react-native-paper'

import { AnswerButton } from '../components/answer-button.js'
import { Progress } from '../components/progress.js'
import Spinner from '../components/spinner.js'
import TakbirCelebrate from '../components/takbir-celebrate.js'
import { useWordsLogic } from '../hooks/use-words-logic.js'
import { calculateFontSize } from '../services/ui-services.js'
import { useSharedStyles } from '../styles/common.js'

const WordsContent = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const {
    answeredWrongWords,
    arabic,
    buttonPositions,
    handleCorrectAnswer,
    handleWrongAnswer,
    onDismissSnackBar,
    handlePressOnWord,
    words
  } = useWordsLogic(
    props.currentWord,
    props.handleSetCurrentWord,
    props.handleSetCurrentWordIndex,
    props.handleSetCelebrationSnackBarVisibility
  )

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

  const listHeader = (
    <>
      <Progress progress={props.currentWordIndex / (props.numberOfWordsToPractice + answeredWrongWords.length)} />
      <Surface style={sharedStyle.wordSurface}>
        <View style={sharedStyle.wordCenteredView}>
          <Pressable onPress={handlePressOnWord}>
            <Text style={[sharedStyle.wordText, { color: theme.colors.secondary, fontSize }]}>{arabic}</Text>
          </Pressable>
        </View>
      </Surface>
      <TakbirCelebrate
        visible={props.celebrationSnackBarVisibility}
        onDismissSnackBar={onDismissSnackBar}
        text="Session Completed Successfully!"
      />
    </>
  )

  return (
    <FlatList
      style={sharedStyle.wordContainer}
      data={buttons}
      renderItem={renderItem}
      ListEmptyComponent={<Spinner />}
      keyExtractor={(item) => item.position.toString()}
      ListHeaderComponent={listHeader}
    />
  )
}

export default WordsContent

WordsContent.propTypes = {
  celebrationSnackBarVisibility: PropTypes.bool.isRequired,
  currentWord: PropTypes.number.isRequired,
  currentWordIndex: PropTypes.number.isRequired,
  handleSetCelebrationSnackBarVisibility: PropTypes.func.isRequired,
  handleSetCurrentWord: PropTypes.func.isRequired,
  handleSetCurrentWordIndex: PropTypes.func.isRequired,
  numberOfWordsToPractice: PropTypes.number.isRequired
}
