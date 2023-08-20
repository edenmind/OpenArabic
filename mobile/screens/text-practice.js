import { View, ScrollView, Alert } from 'react-native'
import { Text, Surface, useTheme, Button, ProgressBar } from 'react-native-paper'
import { useSelector } from 'react-redux'
import React, { useState, useEffect, useCallback } from 'react'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import WordsContextHighLighted from '../components/context-highlighted.js'
import TextPracticeWords from './text-practice-words.js'
import { getThreeRandomWords, vibrateBetweenTwoColors } from '../services/utility-service.js'
import Spinner from '../components/spinner.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import PlaySound from '../components/play-sound.js'
import WordPairsList from '../components/word-pairs-list.js'

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

  // update the state for currentArabicWordsInSentence with the arabic words in the current sentence (sentencesInText[currentSentence].arabicWords) when the component loads
  useEffect(() => {
    if (!textLoading || !sentencesInText[currentSentence]) {
      return
    }

    const englishWords = sentencesInText[currentSentence].englishWords
    const arabicWordId = sentencesInText[currentSentence].arabicWords[currentWord].id

    setCurrentEnglishWordsInSentence(getThreeRandomWords(englishWords, arabicWordId, sentencesInText))
    setCurrentArabicWord(sentencesInText[currentSentence].arabicWords[currentWord])
  }, [currentSentence, currentWord, sentencesInText, textLoading])

  const handleResetQuiz = useCallback(() => {
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
            setCurrentSentence(0)
          }
        }
      ],
      { cancelable: false }
    )
  }, [])

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

  const handlePress = React.useCallback(
    async (id, word) => {
      if (id !== currentWord) {
        // wrong answer
        vibrateBetweenTwoColors(setColor, theme, theme.colors.errorContainer)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)

        return
      }

      const updatedArabicSentence = `${currentArabicSentenceFromCorrectAnswers} ${word}`
      const updatedEnglishWords = currentEnglishWordsInSentence.filter((w) => w.id !== id)

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

      setCurrentArabicWord(sentencesInText[currentSentence].arabicWords[currentWord])
      setCurrentArabicSentenceFromCorrectAnswers(() => updatedArabicSentence)
      setCurrentEnglishWordsInSentence(() => updatedEnglishWords)

      if (isLastWordInSentence) {
        setSentenceIsComplete(true)
        vibrateBetweenTwoColors(setColor, theme, theme.colors.primaryContainer)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)

        if (isLastSentence) {
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
      sentencesInText,
      currentSentence,
      isLastWordInSentence,
      theme,
      isLastSentence
    ]
  )

  const sentenceControl = (
    <View>
      <Button
        style={{ ...sharedStyle.buttonAnswer }}
        onPress={() => {
          setExplanation(<WordPairsList words={text.sentences[currentSentence].words} />)
          setVisible(true)
        }}
      >
        <Text style={{ ...sharedStyle.answerText, fontSize: 20 }}>Explain</Text>
      </Button>
      <PlaySound audioFileNames={sentencesInText[currentSentence].filename} buttonText="Play" answerButton={true} />
      {!isLastSentence && (
        <Button
          style={{ marginTop: 5 }}
          mode="contained"
          onPress={() => {
            setSentenceIsComplete(false)

            if (currentSentence === sentencesInText.length - 1) {
              handleResetQuiz()
              return
            }

            setCurrentArabicSentenceFromCorrectAnswers('')
            setCurrentSentence((prev) => prev + 1)
            setCurrentWord(0)
          }}
        >
          <Text
            style={{
              ...sharedStyle.answerText,
              color: theme.colors.onPrimary,
              fontSize: 18,
              fontWeight: '800',
              letterSpacing: 3
            }}
          >
            CONTINUE
          </Text>
        </Button>
      )}
      <View style={{ alignItems: 'center', marginTop: 15 }}>
        <Text style={{ fontSize: 20 }}>{isLastSentence && <Text>Alhamdulillah, you are doing great!</Text>}</Text>
      </View>
    </View>
  )

  return textLoading ? (
    <ScrollView style={sharedStyle.headerContainer}>
      <ProgressBar
        progress={currentSentence / sentencesInText.length}
        color={theme.colors.tertiary}
        style={{
          height: 7,
          borderRadius: 10,
          marginVertical: 5,
          backgroundColor: theme.colors.elevation.level2
        }}
      />
      <Surface
        style={{ ...sharedStyle.surface, backgroundColor: color, marginVertical: 5, minHeight: 280, borderRadius: 10 }}
      >
        <View style={sharedStyle.headerContainer}>
          <WordsContextHighLighted
            arabicSentence={sentencesInText[currentSentence].arabicWords}
            currentWord={currentWord}
            arabicWord={currentArabicWord}
            sentenceIsComplete={sentenceIsComplete}
          />
        </View>
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
  ) : (
    <Spinner />
  )
}

export default TextPractice
