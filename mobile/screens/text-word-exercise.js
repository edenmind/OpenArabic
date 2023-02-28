/* eslint-disable putout/newline-function-call-arguments */
/* eslint-disable react-redux/useSelector-prefer-selectors */
import { View, StyleSheet, ScrollView, Platform } from 'react-native'
import { Text, Button, Surface, Divider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import { paperDarkTheme } from '../constants/paper-theme.js'
import WordsContextHighLighted from './words-context-highlighted.js'
import SnackButton from '../components/snack-button.js'

const selector = (state) => state.text
const textLoadSelector = (state) => state.textLoading
const OrderingWordsInASentence = () => {
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

  const styles = StyleSheet.create({
    rowWrapper: {
      paddingBottom: 25
    }
  })

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
    }, 100)
  }

  // loop through all sentences in the text
  const sentencesInText = text.sentences.map((sentence, sentenceIndex) => {
    // loop through all words in the sentence
    const wordsInSentence = sentence.words.map((word, wordIndex) => {
      // create an index for each word in the sentence
      const id = wordIndex

      // create an object that contains the arabic word and the id
      const arabicWord = {
        arabic: word.arabic,
        id
      }

      // create an object that contains the english word and the id
      const englishWord = {
        english: word.english,
        id
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
    if (id === currentWord) {
      // set the state for currentEnglishWord
      setCurrentEnglishWord(sentencesInText[currentSentence].englishWords[currentWord])

      //push the arabic word to the currentArabicSentenceFromCorrectAnswers array and set the state
      let currentArabicSentenceFromCorrectAnswersCopy = [...currentArabicSentenceFromCorrectAnswers]

      currentArabicSentenceFromCorrectAnswersCopy = currentArabicSentenceFromCorrectAnswersCopy + ' ' + word
      setCurrentArabicSentenceFromCorrectAnswers(currentArabicSentenceFromCorrectAnswers + ' ' + word)

      //remove the arabic word from the currentArabicWordsInSentence array and set the state
      const currentArabicWordsInSentenceCopy = [...currentArabicWordsInSentence]

      const index = currentArabicWordsInSentenceCopy.findIndex((word) => word.id === id)

      currentArabicWordsInSentenceCopy.splice(index, 1)

      setCurrentArabicWordsInSentence(currentArabicWordsInSentenceCopy)

      if (currentWord === sentencesInText[currentSentence].englishWords.length - 1) {
        setCurrentArabicSentenceFromCorrectAnswers([])

        if (currentSentence === sentencesInText.length - 1) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
          setCurrentSentence(0)
          setCelebrationSnackBarVisibility(true)
        } else {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
          setCurrentSentence(currentSentence + 1)
        }

        setCurrentWord(0)
      } else {
        //increase currentWord by 1 and then set the state
        setCurrentWord(currentWord + 1)
      }

      getThreeRandomWords()
    } else {
      // wrong answer
      vibrateBetweenTwoColors()
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
    }
  }

  // create a component for each word in the arabicWords array in the sentencesInText array for the currentSentence and wrap them with a button
  const arabicWordsInSentenceComponents = (
    <View style={styles.rowWrapper}>
      {currentArabicWordsInSentence.map((word, index) => (
        <Button
          key={index}
          onPress={() => {
            //find the matching english word and and log it to the console
            const matchingEnglishWord = sentencesInText[currentSentence].englishWords.find(
              (englishWord) => englishWord.id === word.id
            )
            handlePress(word.id, word.arabic)
          }}
          mode="elevated"
          style={{ ...sharedStyle.button, height: Platform.OS === 'android' ? 90 : 90 }}
        >
          <Text
            style={{
              ...sharedStyle.arabicBody,
              fontSize: 30,
              fontWeight: 'medium',
              fontFamily: 'noto',
              lineHeight: Platform.OS === 'android' ? 90 : 60,
              color: paperDarkTheme.colors.primary
            }}
          >
            {word.arabic}
          </Text>
        </Button>
      ))}
    </View>
  )
  const getThreeRandomWords = () => {
    const randomWords = []

    //find the matching arabic word based on the currentWord and add it to the randomWords array
    const matchingArabicWord = sentencesInText[currentSentence].arabicWords.find(
      (arabicWord) => arabicWord.id === sentencesInText[currentSentence].englishWords[currentWord].id
    )

    randomWords.push(matchingArabicWord)

    while (randomWords.length < 3) {
      //pick a random sentence
      const randomSentence = Math.floor(Math.random() * sentencesInText.length)

      //get the random words from that sentence
      const randomWordFromSentence = sentencesInText[randomSentence].arabicWords.sort(() => Math.random() - 0.5)

      //add the random words to the randomWords array if it doesn't already exist
      if (!randomWords.includes(randomWordFromSentence[0])) randomWords.push(randomWordFromSentence[0])

      console.log(randomWordFromSentence)
    }

    //randomize the order of the words in the randomWords array
    const randomWordsRandomized = randomWords.sort(() => Math.random() - 0.5)
    //set the state for currentArabicWordsInSentence
    setCurrentArabicWordsInSentence(randomWordsRandomized)
  }

  return (
    textLoading && (
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
              arabicWord={''}
              englishWord={currentEnglishWord}
            ></WordsContextHighLighted>
          </View>
        </Surface>
        <SnackButton
          visible={celebrationSnackBarVisibility}
          onDismissSnackBar={onDismissSnackBar}
          duration={2000}
          text="Congratulations! You have completed the quiz! 🎉"
        />
        <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />

        {arabicWordsInSentenceComponents}
      </ScrollView>
    )
  )
}

export default OrderingWordsInASentence
