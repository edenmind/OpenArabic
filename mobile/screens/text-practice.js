import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { useTheme, Divider, ProgressBar } from 'react-native-paper'

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
    setSentenceIsComplete,
    currentWordsInSentence,
    textLoading,
    sentencesInText,
    currentWord,
    text,
    handleReset,
    handleContinue,
    handlePress
  } = useTextPracticeLogic()

  const [showWordsPractice, setShowWordsPractice] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)

  useEffect(() => {
    if (sentenceIsComplete) {
      setShowWordsPractice(false)
    }
  }, [sentenceIsComplete])

  const handleStartPractice = () => {
    setShowWordsPractice(true)
  }

  const handlePracticeComplete = () => {
    handleContinue()
    setShowWordsPractice(false)
  }

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
        <AnimatedButton key={`${word.english}-${index}`} word={word} handlePress={onWordPressed} />
      ))}
    </View>
  )

  const onWordPressed = (wordId, wordArabic) => {
    handlePress(wordId, wordArabic)
    if (sentenceIsComplete) handlePracticeComplete()
  }

  return textLoading ? (
    <>
      <ScrollView>
        <ProgressBar
          color={theme.colors.tertiary}
          progress={currentSentence / (sentencesInText.length - 1)}
          style={sharedStyle.progressBar}
        />

        {showWordsPractice && renderHighlightedWords()}
      </ScrollView>

      {showWordsPractice ? (
        renderTextPracticeWords()
      ) : (
        <SentenceControl
          {...{
            currentSentence,
            handleContinue: handleStartPractice,
            handleReset,
            isLastSentence,
            isPlaying,
            setIsPlaying,
            setSentenceIsComplete,
            setShowRepeat,
            showRepeat,
            text
          }}
        />
      )}
    </>
  ) : (
    <Spinner />
  )
}

const SentenceControl = ({
  text,
  currentSentence,
  isLastSentence,
  isPlaying,
  handleReset,
  handleContinue,
  setIsPlaying,
  setSentenceIsComplete,
  showRepeat,
  setShowRepeat
}) => (
  <>
    <View style={{ position: 'absolute', top: 150, width: '100%' }}>
      <EnglishArabic
        sentence={text.sentences[currentSentence]}
        paddingBottom={0}
        showAll={true}
        isPlaying={isPlaying}
        showRepeat={showRepeat}
        setIsPlaying={setIsPlaying}
        setShowRepeat={setShowRepeat}
      />
    </View>
    <View style={{ bottom: 50, position: 'absolute', width: '100%' }}>
      {isLastSentence ? (
        <ActionButton onPress={handleReset} text="PRACTICE AGAIN" />
      ) : (
        showRepeat && (
          <ActionButton
            onPress={() => {
              handleContinue()
              setSentenceIsComplete(false)
              setShowRepeat(false)
            }}
            text="CONTINUE"
          />
        )
      )}
    </View>
  </>
)

SentenceControl.propTypes = {
  currentSentence: PropTypes.number.isRequired,
  handleContinue: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  isLastSentence: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  setSentenceIsComplete: PropTypes.func.isRequired,
  setShowRepeat: PropTypes.func.isRequired,
  showRepeat: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired
}

export default TextPractice
