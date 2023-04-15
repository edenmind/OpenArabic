import { View, ScrollView, Alert } from 'react-native'
import { Text, Surface, Divider } from 'react-native-paper'
import { useSelector } from 'react-redux'
import React, { useState, useEffect, useCallback } from 'react'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import { paperDarkTheme } from '../constants/paper-theme.js'
import WordsContextHighLighted from '../components/context-highlighted.js'
import TextPracticeArabicWords from './text-practice-arabic-words.js'
import { getThreeRandomWords, vibrateBetweenTwoColors } from '../services/utility-service.js'
import Spinner from '../components/spinner.js'
import ModalScrollView from '../components/modal-scroll-view.js'

const selector = (state) => state.text
const textLoadSelector = (state) => state.textLoading
const TextPractice = () => {
  const { text } = useSelector(selector)
  const { textLoading } = useSelector(textLoadSelector)
  const [currentSentence, setCurrentSentence] = useState(0)
  const [currentWord, setCurrentWord] = useState(0)
  const [currentArabicSentenceFromCorrectAnswers, setCurrentArabicSentenceFromCorrectAnswers] = useState('')
  const [currentArabicWordsInSentence, setCurrentArabicWordsInSentence] = useState([])
  const [color, setColor] = useState(paperDarkTheme.colors.elevation.level1)
  const [currentEnglishWord, setCurrentEnglishWord] = useState(0)
  const [explanation, setExplanation] = useState('')
  const sharedStyle = useSharedStyles()

  const hideModal = () => {
    setVisible(false)
    handleResetQuiz()
  }
  const showModal = () => setVisible(true)
  const [visible, setVisible] = React.useState(false)

  // update the state for currentArabicWordsInSentence with the arabic words in the current sentence (sentencesInText[currentSentence].arabicWords) when the component loads
  useEffect(() => {
    if (!textLoading || !sentencesInText[currentSentence]) {
      return
    }

    const arabicWords = sentencesInText[currentSentence].arabicWords
    const englishWordId = sentencesInText[currentSentence].englishWords[currentWord].id

    setCurrentArabicWordsInSentence(getThreeRandomWords(arabicWords, englishWordId, sentencesInText))
    setCurrentEnglishWord(sentencesInText[currentSentence].englishWords[currentWord])
  }, [currentSentence, currentWord, sentencesInText, textLoading])

  const handleResetQuiz = useCallback(() => {
    if (currentSentence === sentencesInText.length - 1) {
      Alert.alert(
        'Practice Complete!',
        'Do you want to try again?',
        [
          {
            text: 'No',
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => {
              setVisible(false)
              setCurrentSentence(0)
            }
          }
        ],
        { cancelable: false }
      )
    }
  }, [currentSentence])
  const formatGrammar = useCallback(
    (gram) => {
      if (!gram) {
        return 'No explanation available'
      }

      const lines = gram.split('\n')

      return (
        <>
          {lines.map((line, index) => {
            if (line.startsWith('→')) {
              return (
                <Text key={index} style={{ ...sharedStyle.arabicBody, fontWeight: 'bold' }}>
                  {`${line.slice(2)}\n`}
                </Text>
              )
            }

            return (
              <Text
                key={index}
                style={{ ...sharedStyle.englishBody, opacity: 0.9, fontSize: 19, lineHeight: 29 }}
              >{`${line}\n`}</Text>
            )
          })}
        </>
      )
    },
    [sharedStyle.arabicBody, sharedStyle.englishBody]
  )
  // loop through all sentences in the text
  const sentencesInText = React.useMemo(() => {
    return text.sentences.map((sentence) => {
      const wordsInSentence = sentence.words.map((word, wordIndex) => {
        return {
          arabicWord: { arabic: word.arabic, id: wordIndex },
          englishWord: { english: word.english, id: wordIndex }
        }
      })

      const arabicWords = wordsInSentence.map((word) => word.arabicWord).sort(() => Math.random() - 0.5)
      const englishWords = wordsInSentence.map((word) => word.englishWord)

      const explanation = sentence.explanation

      return { arabicWords, englishWords, explanation }
    })
  }, [text])

  const isLastWordInSentence = currentWord === sentencesInText[currentSentence].englishWords.length - 1
  const isLastSentence = currentSentence === sentencesInText.length - 1

  const handlePress = React.useCallback(
    async (id, word) => {
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
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
        setExplanation(formatGrammar(sentencesInText[currentSentence].explanation))
        showModal()

        if (isLastSentence) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
        } else {
          setCurrentSentence((prev) => prev + 1)
        }

        setCurrentArabicSentenceFromCorrectAnswers('')
        setCurrentWord(0)

        return
      }

      setCurrentWord((prev) => prev + 1)
    },
    [
      currentWord,
      currentArabicSentenceFromCorrectAnswers,
      currentArabicWordsInSentence,
      sentencesInText,
      currentSentence,
      isLastWordInSentence,
      formatGrammar,
      isLastSentence
    ]
  )
  return textLoading ? (
    <ScrollView style={sharedStyle.headerContainer}>
      <Surface
        style={{ ...sharedStyle.surface, backgroundColor: color, marginVertical: 10, minHeight: 230, borderRadius: 10 }}
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

      <ModalScrollView
        visible={visible}
        content=<View style={{ margin: 10, padding: 15 }}>
          <Text variant="bodyLarge">{explanation ?? 'No explanation available'}</Text>
        </View>
        title={'Great job! 🎉'}
        hideModal={hideModal}
        close="NEXT SENTENCE"
      />
    </ScrollView>
  ) : (
    <Spinner />
  )
}

export default TextPractice
