import * as Haptics from 'expo-haptics'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { View, ScrollView } from 'react-native'
import { Surface, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import TextPracticeWords from './text-practice-words.js'
import { ActionButton } from '../components/action-button.js'
import WordsContextHighLighted from '../components/context-highlighted.js'
import { EnglishArabic } from '../components/english-arabic.js'
import { Progress } from '../components/progress.js'
import Spinner from '../components/spinner.js'
import TakbirCelebrate from '../components/takbir-celebrate.js'
import { useAudioPlayer } from '../hooks/use-audio-player.js'
import { getThreeRandomWords } from '../services/utility-service.js'
import { useSharedStyles } from '../styles/common.js'

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

  const [currentArabicWord, setCurrentArabicWord] = useState(0)
  const [sentenceIsComplete, setSentenceIsComplete] = useState(false)
  const [celebrationSnackBarVisibility, setCelebrationSnackBarVisibility] = useState(false)
  const { playSound } = useAudioPlayer()

  // update the state for currentArabicWordsInSentence with the arabic words in the current sentence (sentencesInText[currentSentence].arabicWords) when the component loads
  useEffect(() => {
    if (
      !(textLoading && sentencesInText[currentSentence] && sentencesInText[currentSentence].arabicWords[currentWord])
    ) {
      return
    }

    const englishWords = sentencesInText[currentSentence].englishWords
    const arabicWordId = sentencesInText[currentSentence].arabicWords[currentWord].id

    const randomWords = getThreeRandomWords(englishWords, arabicWordId, sentencesInText)

    const enhancedEnglishWords = randomWords.map((word) => ({
      ...word,
      correct: word.id === currentWord
    }))

    setCurrentEnglishWordsInSentence(enhancedEnglishWords)
    setCurrentArabicWord(sentencesInText[currentSentence].arabicWords[currentWord])
  }, [currentSentence, currentWord, sentencesInText, textLoading])

  useEffect(() => {
    if (sentencesInText[currentSentence] && sentencesInText[currentSentence].wordFilename[currentWord]) {
      const audioURL = `https://openarabic.ams3.digitaloceanspaces.com/audio/${sentencesInText[currentSentence].wordFilename[currentWord]}`
      playSound(audioURL)
    }
  }, [currentWord, sentencesInText, playSound, currentSentence])

  // loop through all sentences in the text
  const sentencesInText = React.useMemo(() => {
    return text.sentences.map((sentence) => {
      const wordsInSentence = sentence.words.map((word, wordIndex) => {
        return {
          arabicWord: { arabic: word.arabic, id: wordIndex },
          englishWord: { english: word.english, id: wordIndex },
          explanation: word.explanation,
          filename: word.filename
        }
      })

      const arabicWords = wordsInSentence.map((word) => word.arabicWord)
      const englishWordsUnsorted = wordsInSentence.map((word) => word.englishWord)
      const englishWords = wordsInSentence.map((word) => word.englishWord).sort(() => Math.random() - 0.5)
      const explanations = wordsInSentence.map((word) => word.explanation)
      const wordFilename = wordsInSentence.map((word) => word.filename)
      const filename = sentence.filename

      return { arabicWords, englishWords, englishWordsUnsorted, explanations, filename, wordFilename }
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
        <EnglishArabic sentence={text.sentences[currentSentence]} paddingTop={50} />
        {isLastSentence ? (
          <ActionButton onPress={handleReset} text="PRACTICE AGAIN" />
        ) : (
          <ActionButton onPress={handleContinue} text="CONTINUE" />
        )}
      </View>
    ),
    [text, currentSentence, isLastSentence, handleContinue]
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
        {!sentenceIsComplete && (
          <Surface style={{ backgroundColor: theme.colors.elevation.level0, minHeight: 250 }}>
            <WordsContextHighLighted
              arabicSentence={sentencesInText[currentSentence].arabicWords}
              currentWord={currentWord}
              arabicWord={currentArabicWord}
              sentenceIsComplete={sentenceIsComplete}
            />
          </Surface>
        )}
        {sentenceIsComplete && sentenceControl}

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
