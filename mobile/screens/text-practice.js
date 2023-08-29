import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { View, ScrollView } from 'react-native'
import { Surface, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import * as Haptics from 'expo-haptics'

import { useSharedStyles } from '../styles/common.js'
import WordsContextHighLighted from '../components/context-highlighted.js'
import TextPracticeWords from './text-practice-words.js'
import Spinner from '../components/spinner.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import PlaySound from '../components/play-sound.js'
import WordPairsList from '../components/word-pairs-list.js'
import { Progress } from '../components/progress.js'
import { AnswerButton } from '../components/answer-button.js'
import { ActionButton } from '../components/action-button.js'
import TakbirCelebrate from '../components/takbir-celebrate.js'
import { getThreeRandomWords } from '../services/utility-service.js'

const selector = (state) => state.text
const textLoadSelector = (state) => state.textLoading
const TextPractice = () => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const { text } = useSelector(selector)
  const { textLoading } = useSelector(textLoadSelector)
  const [currentSentence, setCurrentSentence] = useState(0)
  const [currentWord, setCurrentWord] = useState(0)
  const [currentArabicSentenceFromCorrectAnswers, setCurrentArabicSentenceFromCorrectAnswers] = useState('')
  const [currentEnglishWordsInSentence, setCurrentEnglishWordsInSentence] = useState([])
  const [color, setColor] = useState(theme.colors.elevation.level0)
  const [currentArabicWord, setCurrentArabicWord] = useState(0)
  const hideModal = () => setVisible(false)
  const [visible, setVisible] = React.useState(false)
  const [explanation, setExplanation] = useState('')
  const [sentenceIsComplete, setSentenceIsComplete] = useState(false)
  const [celebrationSnackBarVisibility, setCelebrationSnackBarVisibility] = useState(false)

  // update the state for currentArabicWordsInSentence with the arabic words in the current sentence (sentencesInText[currentSentence].arabicWords) when the component loads
  useEffect(() => {
    if (
      !(textLoading && sentencesInText[currentSentence] && sentencesInText[currentSentence].arabicWords[currentWord])
    ) {
      return
    }

    const englishWords = sentencesInText[currentSentence].englishWords
    const arabicWordId = sentencesInText[currentSentence].arabicWords[currentWord].id

    setCurrentEnglishWordsInSentence(getThreeRandomWords(englishWords, arabicWordId, sentencesInText))
    setCurrentArabicWord(sentencesInText[currentSentence].arabicWords[currentWord])
  }, [currentSentence, currentWord, sentencesInText, textLoading])

  // loop through all sentences in the text
  const sentencesInText = React.useMemo(() => {
    return text.sentences.map((sentence) => {
      const wordsInSentence = sentence.words.map((word, wordIndex) => {
        return {
          arabicWord: { arabic: word.arabic, id: wordIndex },
          englishWord: { english: word.english, id: wordIndex },
          explanation: word.explanation
        }
      })

      const arabicWords = wordsInSentence.map((word) => word.arabicWord)
      const englishWordsUnsorted = wordsInSentence.map((word) => word.englishWord)
      const englishWords = wordsInSentence.map((word) => word.englishWord).sort(() => Math.random() - 0.5)
      const explanations = wordsInSentence.map((word) => word.explanation)
      const filename = sentence.filename

      return { arabicWords, englishWords, englishWordsUnsorted, explanations, filename }
    })
  }, [text])

  const isLastWordInSentence = currentWord === sentencesInText[currentSentence].englishWords.length - 1
  const isLastSentence = currentSentence === sentencesInText.length - 1

  const handleReset = () => {
    setCurrentSentence(0)
    setCurrentWord(0)
    setSentenceIsComplete(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleContinue = () => {
    setSentenceIsComplete(false)

    if (currentSentence === sentencesInText.length) {
      setCelebrationSnackBarVisibility(true)

      return
    }

    setCurrentArabicSentenceFromCorrectAnswers('')
    setCurrentSentence((prev) => prev + 1)
    setCurrentWord(0)
  }

  const onDismissSnackBar = useCallback(() => {
    setCelebrationSnackBarVisibility(false)
  }, [setCelebrationSnackBarVisibility])

  const handlePress = useCallback(
    async (id, word) => {
      if (id !== currentWord) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
        return
      }

      const updatedArabicSentence = `${currentArabicSentenceFromCorrectAnswers} ${word}`
      const updatedEnglishWords = currentEnglishWordsInSentence.filter((w) => w.id !== id)

      setCurrentArabicSentenceFromCorrectAnswers(updatedArabicSentence)
      setCurrentEnglishWordsInSentence(updatedEnglishWords)

      if (isLastWordInSentence) {
        setSentenceIsComplete(true)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)

        if (isLastSentence) {
          setCelebrationSnackBarVisibility(true)
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        }

        return
      }

      setCurrentWord((prev) => prev + 1)
    },
    [
      currentWord,
      currentArabicSentenceFromCorrectAnswers,
      currentEnglishWordsInSentence,
      isLastWordInSentence,
      isLastSentence
    ]
  )

  const sentenceControl = useMemo(
    () => (
      <View>
        <AnswerButton
          onPress={() => {
            setExplanation(<WordPairsList words={text.sentences[currentSentence].words} />)
            setVisible(true)
          }}
          text="Explain"
        />
        <PlaySound audioFileNames={sentencesInText[currentSentence].filename} buttonText="Play" />
        {isLastSentence ? (
          <ActionButton onPress={handleReset} text="PRACTICE AGAIN" />
        ) : (
          <ActionButton onPress={handleContinue} text="CONTINUE" />
        )}
      </View>
    ),
    [sentencesInText, currentSentence, isLastSentence, handleContinue, text.sentences]
  )

  return textLoading ? (
    <>
      <ScrollView style={sharedStyle.container}>
        <TakbirCelebrate
          visible={celebrationSnackBarVisibility}
          onDismissSnackBar={onDismissSnackBar}
          text="Session Completed Successfully!"
        />
        <Progress progress={currentSentence / (sentencesInText.length - 1)} />
        <Surface style={{ backgroundColor: color, minHeight: 250 }}>
          <WordsContextHighLighted
            arabicSentence={sentencesInText[currentSentence].arabicWords}
            currentWord={currentWord}
            arabicWord={currentArabicWord}
            sentenceIsComplete={sentenceIsComplete}
          />
        </Surface>
        {sentenceIsComplete && sentenceControl}
        <ModalScrollView
          visible={visible}
          titleLanguage="english"
          content={explanation}
          title={'Explain'}
          hideModal={hideModal}
        />
        {!sentenceIsComplete && (
          <TextPracticeWords
            testID="textPracticeArabicWords"
            currentWordsInSentence={currentEnglishWordsInSentence}
            handlePress={handlePress}
          />
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
