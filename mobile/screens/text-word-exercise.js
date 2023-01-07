/* eslint-disable react-redux/useSelector-prefer-selectors */
import { View, StyleSheet } from 'react-native'
import { Text, Button, Surface, Divider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import { paperDarkTheme } from '../constants/paper-theme.js'
import WordsContextHighLighted from './words-context-highlighted.js'

const selector = (state) => state.text
const textLoadSelector = (state) => state.textLoading
const OrderingWordsInASentence = () => {
  const { text } = useSelector(selector)
  const { textLoading } = useSelector(textLoadSelector)
  const [currentSentence, setCurrentSentence] = useState(0)
  const [currentWord, setCurrentWord] = useState(0)
  const [currentArabicSentenceFromCorrectAnswers, setCurrentArabicSentenceFromCorrectAnswers] = useState([])
  const [currentArabicWordsInSentence, setCurrentArabicWordsInSentence] = useState([])
  const [color, setColor] = useState(paperDarkTheme.colors.elevation.level3)
  const [currentEnglishWord, setCurrentEnglishWord] = useState('')
  const sharedStyle = useSharedStyles()

  const styles = StyleSheet.create({
    rowWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    }
  })

  // update the state for currentArabicWordsInSentence with the arabic words in the current sentence (sentencesInText[currentSentence].arabicWords) when the component loads
  useEffect(() => {
    console.log('loading')
    textLoading &&
      currentArabicWordsInSentence.length === 0 &&
      setCurrentArabicWordsInSentence(sentencesInText[currentSentence].arabicWords)
    setCurrentEnglishWord(sentencesInText[currentSentence].englishWords[currentWord].english)
  }, [currentSentence, sentencesInText, textLoading, currentWord, currentArabicWordsInSentence.length])

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
      // correct answer
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

      // set the state for currentEnglishWord
      setCurrentEnglishWord(sentencesInText[currentSentence].englishWords[currentWord].english)

      //push the arabic word to the currentArabicSentenceFromCorrectAnswers array and set the state
      const currentArabicSentenceFromCorrectAnswersCopy = [...currentArabicSentenceFromCorrectAnswers]

      currentArabicSentenceFromCorrectAnswersCopy.push(word + ' ')
      setCurrentArabicSentenceFromCorrectAnswers(currentArabicSentenceFromCorrectAnswersCopy)

      //remove the arabic word from the currentArabicWordsInSentence array and set the state
      const currentArabicWordsInSentenceCopy = [...currentArabicWordsInSentence]

      const index = currentArabicWordsInSentenceCopy.findIndex((word) => word.id === id)

      currentArabicWordsInSentenceCopy.splice(index, 1)
      setCurrentArabicWordsInSentence(currentArabicWordsInSentenceCopy)

      if (currentWord === sentencesInText[currentSentence].englishWords.length - 1) {
        setCurrentArabicSentenceFromCorrectAnswers([])

        if (currentSentence === sentencesInText.length - 1) {
          setCurrentSentence(0)
        } else {
          setCurrentSentence(currentSentence + 1)
        }

        setCurrentWord(0)
      } else {
        //increase currentWord by 1 and set the state
        setCurrentWord(currentWord + 1)
      }
    } else {
      // wrong answer
      vibrateBetweenTwoColors()
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
    }
  }

  // create a component for each word in the arabicWords array in the sentencesInText array for the currentSentence and wrap them with a button
  const arabicWordsInSentenceComponents = (
    <View style={styles.rowWrapper}>
      {currentArabicWordsInSentence.map((word) => (
        <Button
          key={word.id}
          onPress={() => handlePress(word.id, word.arabic)}
          mode="contained-tonal"
          style={{ margin: 3 }}
        >
          <Text style={{ fontSize: 23, lineHeight: 25 }}>{word.arabic}</Text>
        </Button>
      ))}
    </View>
  )

  // create a string of all the english words in the englishWords array in the sentencesInText array for the currentSentence
  const englishWordsInSentence = sentencesInText[currentSentence].englishWords.map((word) => word.english).join(' ')

  return (
    textLoading && (
      <View style={sharedStyle.headerContainer}>
        <Surface style={{ ...sharedStyle.surface, minHeight: 250 }} elevation={2}>
          <View style={sharedStyle.headerContainer}>
            <WordsContextHighLighted
              arabicSentence={currentArabicSentenceFromCorrectAnswers + '...'}
              englishSentence={englishWordsInSentence}
              currentWord={currentWord}
              arabicWord={''}
              englishWord={currentEnglishWord}
            ></WordsContextHighLighted>
          </View>
        </Surface>
        <Divider style={sharedStyle.divider} />
        <Surface style={{ ...sharedStyle.surface, backgroundColor: color, minHeight: 200 }} elevation={2}>
          <View style={sharedStyle.headerContainer}>
            <Text variant="labelLarge">Select the Arabic Word:</Text>
            <Divider style={sharedStyle.divider} />
            {arabicWordsInSentenceComponents}
          </View>
        </Surface>
      </View>
    )
  )
}

export default OrderingWordsInASentence
