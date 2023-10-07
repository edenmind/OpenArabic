import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { useTheme, Divider, ProgressBar } from 'react-native-paper'

import { ActionButton } from '../components/action-button.js'
import { AnimatedButton } from '../components/animated-button.js'
import WordsContextHighLighted from '../components/context-highlighted.js'
import { EnglishArabic } from '../components/english-arabic.js'
import Spinner from '../components/spinner.js'
import useTextPracticeLogic from '../hooks/use-practice-logic.js'
import { useSharedStyles } from '../styles/common.js'

const TextPractice = () => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [showWordsPractice, setShowWordsPractice] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)
  const [isComponentVisible, setIsComponentVisible] = useState(false)

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
  } = useTextPracticeLogic(isComponentVisible)

  useEffect(() => {
    if (sentenceIsComplete) {
      setShowWordsPractice(false)
    }
  }, [sentenceIsComplete])

  useEffect(() => {
    if (showWordsPractice) {
      setIsComponentVisible(true)
    } else {
      setIsComponentVisible(false)
    }
  }, [showWordsPractice])

  const handleStartPractice = () => {
    setShowWordsPractice(true)
  }

  const handlePracticeComplete = () => {
    setShowWordsPractice(false)
    handleContinue()
  }

  const onWordPressed = (wordId, wordArabic) => {
    handlePress(wordId, wordArabic)
    if (sentenceIsComplete) handlePracticeComplete()
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
    <View style={sharedStyle.bottomView}>
      {currentWordsInSentence.map((word, index) => (
        <AnimatedButton key={`${word.english}-${index}`} word={word} handlePress={onWordPressed} />
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

        {showWordsPractice && renderHighlightedWords()}
      </ScrollView>

      {showWordsPractice ? (
        renderTextPracticeWords()
      ) : (
        <PrepareForPractice
          {...{
            currentSentence,
            handleContinue: handleStartPractice,
            handleReset,
            isLastSentence,
            isPlaying,
            setIsComponentVisible,
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

const PrepareForPractice = ({
  text,
  currentSentence,
  isLastSentence,
  isPlaying,
  handleReset,
  handleContinue,
  setIsComponentVisible,
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
        autoStart={true}
        isPlaying={isPlaying}
        showPlay={false}
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
              setIsComponentVisible(true)
              setSentenceIsComplete(false)
              setShowRepeat(false)
              handleContinue()
            }}
            text="CONTINUE"
          />
        )
      )}
    </View>
  </>
)

PrepareForPractice.propTypes = {
  currentSentence: PropTypes.number.isRequired,
  handleContinue: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  isLastSentence: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsComponentVisible: PropTypes.func.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  setSentenceIsComplete: PropTypes.func.isRequired,
  setShowRepeat: PropTypes.func.isRequired,
  showRepeat: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired
}

export default TextPractice
