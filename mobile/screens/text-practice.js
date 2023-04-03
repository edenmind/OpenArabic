import { View, ScrollView } from 'react-native'
import { Text, Surface, Divider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import { paperDarkTheme } from '../constants/paper-theme.js'
import WordsContextHighLighted from '../components/context-highlighted.js'
import SnackButton from '../components/snack-button.js'
import TextPracticeArabicWords from './text-practice-arabic-words.js'
import { getThreeRandomWords, vibrateBetweenTwoColors } from '../services/utility-service.js'
import Spinner from '../components/spinner.js'

const selector = (state) => state.text
const textLoadSelector = (state) => state.textLoading ?? true

const TextPractice = () => {
  const { text } = useSelector(selector)
  const { textLoading } = useSelector(textLoadSelector)
  const [currentSentence, setCurrentSentence] = useState(0)
  const [currentWord, setCurrentWord] = useState(0)
  const [currentArabicSentenceFromCorrectAnswers, setCurrentArabicSentenceFromCorrectAnswers] = useState('')
  const [currentArabicWordsInSentence, setCurrentArabicWordsInSentence] = useState([])
  const [color, setColor] = useState(paperDarkTheme.colors.elevation.level3)
  const [currentEnglishWord, setCurrentEnglishWord] = useState(0)
  const sharedStyle = useSharedStyles()
  const [celebrationSnackBarVisibility, setCelebrationSnackBarVisibility] = React.useState(false)

  // update the state for currentArabicWordsInSentence with the arabic words in the current sentence (sentencesInText[currentSentence].arabicWords) when the component loads
  useEffect(() => {
    if (!(textLoading && sentencesInText[currentSentence])) {
      return
    }

    const arabicWords = sentencesInText[currentSentence].arabicWords
    const englishWordId = sentencesInText[currentSentence].englishWords[currentWord].id

    setCurrentArabicWordsInSentence(getThreeRandomWords(arabicWords, englishWordId, sentencesInText))
    setCurrentEnglishWord(sentencesInText[currentSentence].englishWords[currentWord])
  }, [currentSentence, currentWord, sentencesInText, textLoading])
  const onDismissSnackBar = () => setCelebrationSnackBarVisibility(false)

  // loop through all sentences in the text
  const sentencesInText = React.useMemo(() => {
    return text.sentences.map((sentence) => {
      const wordsInSentence = sentence.words.map((word, wordIndex) => {
        const arabicWord = {
          arabic: word.arabic,
          id: wordIndex
        }
        const englishWord = {
          english: word.english,
          id: wordIndex
        }

        return {
          arabicWord,
          englishWord
        }
      })
      const arabicWords = wordsInSentence.map((word) => word.arabicWord).sort(() => Math.random() - 0.5)
      const englishWords = wordsInSentence.map((word) => word.englishWord)

      return {
        arabicWords,
        englishWords
      }
    })
  }, [text])
  //create a handler that when pressed check if the id of the arabic word matches the id for currentWord
  //if it does, increase currentWord by 1
  //if it doesn't, do nothing
  //if currentWord is equal to the length of the englishWordsInSentence array, increase currentSentence by 1 and set currentWord to 0
  //if currentSentence is equal to the length of the wordsInSentences array, set currentSentence to 0
  const isLastWordInSentence = currentWord === sentencesInText[currentSentence].englishWords.length - 1
  const isLastSentence = currentSentence === sentencesInText.length - 1

  const handlePress = React.useCallback(
    (id, word) => {
      if (id !== currentWord) {
        // wrong answer
        // call vibrateBetweenTwoColors and pass setColor as an argument
        vibrateBetweenTwoColors(setColor)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)

        return
      }

      const updatedArabicSentence = `${currentArabicSentenceFromCorrectAnswers} ${word}`
      const updatedArabicWords = currentArabicWordsInSentence.filter((w) => w.id !== id)

      setCurrentEnglishWord(sentencesInText[currentSentence].englishWords[currentWord])
      setCurrentArabicSentenceFromCorrectAnswers(() => updatedArabicSentence)
      setCurrentArabicWordsInSentence(() => updatedArabicWords)

      if (isLastWordInSentence) {
        setCurrentArabicSentenceFromCorrectAnswers('')

        if (isLastSentence) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
          setCurrentSentence(0)
          setCelebrationSnackBarVisibility(true)
        } else {
          setCurrentSentence((prev) => prev + 1)
        }

        setCurrentWord(0)
      } else {
        setCurrentWord((prev) => prev + 1)
      }
    },
    [
      currentWord,
      currentArabicSentenceFromCorrectAnswers,
      currentArabicWordsInSentence,
      sentencesInText,
      currentSentence,
      isLastWordInSentence,
      isLastSentence,
      setColor,
      setCurrentEnglishWord,
      setCurrentArabicSentenceFromCorrectAnswers,
      setCurrentArabicWordsInSentence,
      setCurrentSentence,
      setCurrentWord,
      setCelebrationSnackBarVisibility
    ]
  )
  return textLoading ? (
    <ScrollView style={sharedStyle.headerContainer}>
      <Surface
        style={{ ...sharedStyle.surface, minHeight: 225, backgroundColor: color, borderRadius: 10 }}
        elevation={2}
      >
        <View style={sharedStyle.headerContainer}>
          <Text variant="labelLarge">
            Sentence: {currentSentence + 1} of {sentencesInText.length}
          </Text>
          <Divider style={sharedStyle.divider} />
          <WordsContextHighLighted
            arabicSentence={`${currentArabicSentenceFromCorrectAnswers} `}
            englishSentence={sentencesInText[currentSentence].englishWords}
            currentWord={currentWord}
            arabicWord=""
            englishWord={currentEnglishWord}
          />
        </View>
      </Surface>

      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <TextPracticeArabicWords
        testID="textPracticeArabicWords"
        currentArabicWordsInSentence={currentArabicWordsInSentence}
        handlePress={handlePress}
      />
      <SnackButton
        visible={celebrationSnackBarVisibility}
        onDismissSnackBar={onDismissSnackBar}
        duration={2000}
        text="Congratulations! You have completed the quiz! 🎉"
      />
    </ScrollView>
  ) : (
    <Spinner />
  )
}

export default TextPractice
