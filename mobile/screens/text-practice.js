import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Surface, useTheme, Divider, ProgressBar } from 'react-native-paper'

import { ActionButton } from '../components/action-button.js'
import { AnimatedButton } from '../components/animated-button.js'
import WordsContextHighLighted from '../components/context-highlighted.js'
import { EnglishArabic } from '../components/english-arabic.js'
import Spinner from '../components/spinner.js'
import useTextPracticeLogic from '../hooks/use-practice-logic.js'
import { useSharedStyles } from '../styles/common.js'

const styles = StyleSheet.create({
  bottomView: {
    bottom: 50,
    position: 'absolute',
    width: '100%'
  }
})

const TextPractice = () => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const {
    isLastSentence,
    currentArabicWord,
    currentSentence,
    sentenceIsComplete,
    currentWordsInSentence,
    textLoading,
    sentencesInText,
    currentWord,
    text,
    handleReset,
    handleContinue,
    handlePress
  } = useTextPracticeLogic()

  const sentenceControlMemoized = useMemo(
    () => <SentenceControl {...{ currentSentence, handleContinue, handleReset, isLastSentence, text }} />,
    [currentSentence, handleContinue, handleReset, isLastSentence, text]
  )

  const renderHighlightedWords = () => (
    <>
      <WordsContextHighLighted
        arabicSentence={sentencesInText[currentSentence].arabicWords}
        currentWord={currentWord}
        arabicWord={currentArabicWord}
      />
      <Divider style={sharedStyle.dividerHidden} />
    </>
  )

  const renderTextPracticeWords = () => (
    <View style={styles.bottomView}>
      {currentWordsInSentence.map((word, index) => (
        <AnimatedButton key={`${word.english}-${index}`} word={word} handlePress={handlePress} />
      ))}
    </View>
  )

  return textLoading ? (
    <>
      <ScrollView>
        <ProgressBar
          color={theme.colors.tertiary}
          progress={currentSentence / (sentencesInText.length - 1)}
          style={sharedStyle.progressBar}
        />
        <Surface
          style={{
            backgroundColor: theme.colors.elevation.level0,
            flex: 1,
            justifyContent: 'center',
            minHeight: 400,
            paddingTop: 25
          }}
        >
          {!sentenceIsComplete && renderHighlightedWords()}
        </Surface>
      </ScrollView>

      {sentenceIsComplete ? sentenceControlMemoized : renderTextPracticeWords()}
    </>
  ) : (
    <Spinner />
  )
}

export default TextPractice

const SentenceControl = ({ text, currentSentence, isLastSentence, handleReset, handleContinue }) => (
  <View style={{ bottom: 50, position: 'absolute', width: '100%' }}>
    <EnglishArabic sentence={text.sentences[currentSentence]} paddingBottom={0} showAll={true} />
    {isLastSentence ? (
      <ActionButton onPress={handleReset} text="PRACTICE AGAIN" />
    ) : (
      <ActionButton onPress={handleContinue} text="CONTINUE" />
    )}
  </View>
)

SentenceControl.propTypes = {
  currentSentence: PropTypes.number.isRequired,
  handleContinue: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  isLastSentence: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired
}
