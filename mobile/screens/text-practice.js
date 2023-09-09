import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { View, ScrollView } from 'react-native'
import { Surface, useTheme } from 'react-native-paper'

import TextPracticeWords from './text-practice-words.js'
import { ActionButton } from '../components/action-button.js'
import WordsContextHighLighted from '../components/context-highlighted.js'
import { EnglishArabic } from '../components/english-arabic.js'
import { Progress } from '../components/progress.js'
import Spinner from '../components/spinner.js'
import TakbirCelebrate from '../components/takbir-celebrate.js'
import useTextPracticeLogic from '../hooks/use-practice-logic.js'
import { useSharedStyles } from '../styles/common.js'

const TextPractice = () => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const {
    isLastSentence,
    currentArabicWord,
    currentSentence,
    sentenceIsComplete,
    celebrationSnackBarVisibility,
    currentWordsInSentence,
    textLoading,
    sentencesInText,
    currentWord,
    text,
    onDismissSnackBar,
    handleReset,
    handleContinue,
    handlePress
  } = useTextPracticeLogic()

  const sentenceControlMemoized = useMemo(
    () => <SentenceControl {...{ currentSentence, handleContinue, handleReset, isLastSentence, text }} />,
    [currentSentence, handleContinue, handleReset, isLastSentence, text]
  )

  return textLoading ? (
    <>
      <ScrollView style={sharedStyle.container}>
        <Progress progress={currentSentence / (sentencesInText.length - 1)} />

        {sentenceIsComplete ? (
          sentenceControlMemoized
        ) : (
          <>
            <Surface style={{ backgroundColor: theme.colors.elevation.level0, minHeight: 250 }}>
              <WordsContextHighLighted
                arabicSentence={sentencesInText[currentSentence].arabicWords}
                currentWord={currentWord}
                arabicWord={currentArabicWord}
              />
            </Surface>
            <TextPracticeWords
              testID="textPracticeArabicWords"
              currentWordsInSentence={currentWordsInSentence}
              handlePress={handlePress}
            />
          </>
        )}
      </ScrollView>
      <TakbirCelebrate
        visible={celebrationSnackBarVisibility}
        onDismissSnackBar={onDismissSnackBar}
        text="Session Completed Successfully!"
      />
    </>
  ) : (
    <Spinner />
  )
}

export default TextPractice

const SentenceControl = ({ text, currentSentence, isLastSentence, handleReset, handleContinue }) => (
  <View>
    <EnglishArabic sentence={text.sentences[currentSentence]} paddingTop={50} />
    {isLastSentence ? (
      <ActionButton onPress={handleReset} text="PRACTICE AGAIN" />
    ) : (
      <ActionButton onPress={handleContinue} text="CONTINUE" />
    )}
  </View>
)

SentenceControl.propTypes = {
  currentSentence: PropTypes.number,
  handleContinue: PropTypes.func,
  handleReset: PropTypes.func,
  isLastSentence: PropTypes.bool,
  text: PropTypes.object
}
