/* eslint-disable putout/newline-function-call-arguments */
/* eslint-disable react-redux/useSelector-prefer-selectors */
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

const selector = (state) => state.text
const textLoadSelector = (state) => state.textLoading

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
    //produce a random list of three words from sentencesInText[currentSentence].arabicWords which contains one arabic word that matches the current english word
    textLoading && getThreeRandomWords()

    //setCurrentArabicWordsInSentence(sentencesInText[currentSentence].arabicWords)
    setCurrentEnglishWord(sentencesInText[currentSentence].englishWords[currentWord])
  }, [currentSentence, sentencesInText, textLoading, currentWord, currentArabicWordsInSentence.length])

  const onDismissSnackBar = () => setCelebrationSnackBarVisibility(false)

  const vibrateBetweenTwoColors = () => {
    setColor(paperDarkTheme.colors.errorContainer)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)

    setTimeout(() => {
      setColor(paperDarkTheme.colors.elevation.level3)
    }, 150)
  }

  // loop through all sentences in the text
  const sentencesInText = text.sentences.map((sentence, sentenceIndex) => {
    // loop through all words in the sentence
    const wordsInSentence = sentence.words.map((word, wordIndex) => {
      // create an object that contains the arabic word and the id
      const arabicWord = {
        arabic: word.arabic,
        id: wordIndex
      }

      // create an object that contains the english word and the id
      const englishWord = {
        english: word.english,
        id: wordIndex
      }

      // return an object that contains the arabic word and the english word
      return {
        arabicWord,
        englishWord
      }
    })

    // create an array of all the arabic words in the sentence and randomize the order
    const arabicWords = wordsInSentence.map((word) => word.arabicWord).sort(() => Math.random() - 0.5) // do not make it to easy :)

    // create an array of all the english words in the sentence
    const englishWords = wordsInSentence.map((word) => word.englishWord)

    // return an object that contains the arabic words and the english words
    return {
      arabicWords,
      englishWords
    }
  })

  //create a handler that when pressed check if the id of the arabic word matches the id for currentWord
  //if it does, increase currentWord by 1
  //if it doesn't, do nothing
  //if currentWord is equal to the length of the englishWordsInSentence array, increase currentSentence by 1 and set currentWord to 0
  //if currentSentence is equal to the length of the wordsInSentences array, set currentSentence to 0
  const handlePress = (id, word) => {
    if (id !== currentWord) {
      // wrong answer
      vibrateBetweenTwoColors()
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)

      return
    }

    const updatedArabicSentence = currentArabicSentenceFromCorrectAnswers + ' ' + word
    const updatedArabicWords = currentArabicWordsInSentence.filter((w) => w.id !== id)
    const isLastWordInSentence = currentWord === sentencesInText[currentSentence].englishWords.length - 1
    const isLastSentence = currentSentence === sentencesInText.length - 1

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
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
        setCurrentSentence((prev) => prev + 1)
      }

      setCurrentWord(0)
    } else {
      setCurrentWord((prev) => prev + 1)
    }

    getThreeRandomWords()
  }

  const getThreeRandomWords = () => {
    const randomWords = new Set()

    //find the matching arabic word based on the currentWord and add it to the randomWords array
    const matchingArabicWord = sentencesInText[currentSentence].arabicWords.find(
      (arabicWord) => arabicWord.id === sentencesInText[currentSentence].englishWords[currentWord].id
    )

    randomWords.add(matchingArabicWord)

    while (randomWords.size < 3) {
      //pick a random sentence
      const randomSentence = Math.floor(Math.random() * sentencesInText.length)

      //get the random words from that sentence
      const randomWordFromSentence = sentencesInText[randomSentence].arabicWords.sort(() => Math.random() - 0.5)[0]

      //add the random words to the randomWords set if it doesn't already exist
      if (randomWordFromSentence !== matchingArabicWord && !randomWords.has(randomWordFromSentence)) {
        randomWords.add(randomWordFromSentence)
      }
    }

    //convert the set to an array and randomize the order of the words in the array
    const randomWordsRandomized = [...randomWords].sort(() => Math.random() - 0.5)
    //set the state for currentArabicWordsInSentence
    setCurrentArabicWordsInSentence(randomWordsRandomized)
  }

  return textLoading ? (
    <ScrollView style={sharedStyle.headerContainer}>
      <Surface style={{ ...sharedStyle.surface, minHeight: 200, backgroundColor: color }} elevation={2}>
        <View style={sharedStyle.headerContainer}>
          <Text variant="labelLarge">
            Sentence: {currentSentence + 1} of {sentencesInText.length}
          </Text>
          <Divider style={sharedStyle.divider} />
          <WordsContextHighLighted
            arabicSentence={currentArabicSentenceFromCorrectAnswers + ' '}
            englishSentence={sentencesInText[currentSentence].englishWords}
            currentWord={currentWord}
            arabicWord=""
            englishWord={currentEnglishWord}
          />
        </View>
      </Surface>
      <SnackButton
        visible={celebrationSnackBarVisibility}
        onDismissSnackBar={onDismissSnackBar}
        duration={2000}
        text="Congratulations! You have completed the quiz! 🎉"
      />
      <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
      <TextPracticeArabicWords
        testID="textPracticeArabicWords"
        currentArabicWordsInSentence={currentArabicWordsInSentence}
        handlePress={handlePress}
      />
    </ScrollView>
  ) : undefined
}

export default TextPractice
