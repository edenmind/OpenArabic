import { View, ScrollView, Alert } from 'react-native'
import { Text, Surface, Divider, useTheme, Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import React, { useState, useEffect, useCallback } from 'react'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import WordsContextHighLighted from '../components/context-highlighted.js'
import TextPracticeArabicWords from './text-practice-arabic-words.js'
import { getThreeRandomWords, vibrateBetweenTwoColors } from '../services/utility-service.js'
import Spinner from '../components/spinner.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import { formatGrammar } from '../services/ui-services.js'
import PlaySound from '../components/play-sound.js'

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
  const [currentArabicWordsInSentence, setCurrentArabicWordsInSentence] = useState([])
  const [color, setColor] = useState(theme.colors.elevation.level2)
  const [currentEnglishWord, setCurrentEnglishWord] = useState(0)
  const hideModal = () => setVisible(false)
  const [visible, setVisible] = React.useState(false)
  const [explanation, setExplanation] = useState('')
  const [sentenceIsComplete, setSentenceIsComplete] = useState(false)

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

      const arabicWords = wordsInSentence.map((word) => word.arabicWord).sort(() => Math.random() - 0.5)
      const englishWords = wordsInSentence.map((word) => word.englishWord)
      const explanations = wordsInSentence.map((word) => word.explanation)
      const filename = sentence.filename

      return { arabicWords, englishWords, explanations, filename }
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
      const updatedArabicWords = currentArabicWordsInSentence.filter((w) => w.id !== id)

      setCurrentEnglishWord(sentencesInText[currentSentence].englishWords[currentWord])
      setCurrentArabicSentenceFromCorrectAnswers(() => updatedArabicSentence)
      setCurrentArabicWordsInSentence(() => updatedArabicWords)

      if (isLastWordInSentence) {
        setSentenceIsComplete(true)
        vibrateBetweenTwoColors(setColor, theme, theme.colors.primaryContainer)
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

        if (isLastSentence) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Success)
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        }

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
      theme,
      isLastSentence
    ]
  )

  const sentenceControl = (
    <View style={{ marginTop: 10, marginBottom: 33 }}>
      <Button
        mode="contained-tonal"
        icon="eye-outline"
        onPress={() => {
          let combinedExplanations = ''

          for (const [index, word] of sentencesInText[currentSentence].englishWords.entries()) {
            const currentEnglishWord = word.english.charAt(0).toUpperCase() + word.english.slice(1)
            const currentArabicWord = sentencesInText[currentSentence].arabicWords[index].arabic
            const currentExplanation = sentencesInText[currentSentence].explanations[index]

            combinedExplanations += `⟶ ${currentArabicWord}\n↠ ${currentEnglishWord}\n${currentExplanation}\n\n`
          }

          setExplanation(formatGrammar(combinedExplanations, sharedStyle))
          setVisible(true)
        }}
      >
        Explain
      </Button>
      <PlaySound
        audioFileNames={sentencesInText[currentSentence].filename}
        buttonText="Play"
        margin={15}
        mode="contained-tonal"
      />
      {!isLastSentence && (
        <Button
          mode="contained"
          onPress={() => {
            setSentenceIsComplete(false)

            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

            if (currentSentence === sentencesInText.length - 1) {
              handleResetQuiz()
              return
            }

            setCurrentArabicSentenceFromCorrectAnswers('')
            setCurrentSentence((prev) => prev + 1)
            setCurrentWord(0)
          }}
          style={{ fontSize: 33 }}
        >
          Next Sentence
        </Button>
      )}
      <View style={{ alignItems: 'center', marginTop: 15 }}>
        <Text style={{ fontSize: 20 }}>{isLastSentence && <Text>Alhamdulillah, you are doing great!</Text>}</Text>
      </View>
    </View>
  )

  return textLoading ? (
    <ScrollView style={sharedStyle.headerContainer}>
      <Surface
        style={{ ...sharedStyle.surface, backgroundColor: color, marginVertical: 5, minHeight: 280, borderRadius: 10 }}
      >
        <View style={sharedStyle.headerContainer}>
          <Text variant="labelLarge" style={{ color: theme.colors.tertiary }}>
            Sentence: {currentSentence + 1} of {sentencesInText.length}
          </Text>
          <Divider style={sharedStyle.divider} />
          <WordsContextHighLighted
            arabicSentence={`${currentArabicSentenceFromCorrectAnswers} `}
            englishSentence={sentencesInText[currentSentence].englishWords}
            currentWord={currentWord}
            arabicWord=""
            englishWord={currentEnglishWord}
            sentenceIsComplete={sentenceIsComplete}
          />
        </View>
      </Surface>
      {sentenceIsComplete && sentenceControl}

      <ModalScrollView
        visible={visible}
        titleLanguage="english"
        content={<View>{explanation}</View>}
        title={'Explain'}
        hideModal={hideModal}
      />

      {!sentenceIsComplete && (
        <TextPracticeArabicWords
          testID="textPracticeArabicWords"
          currentArabicWordsInSentence={currentArabicWordsInSentence}
          handlePress={handlePress}
        />
      )}
    </ScrollView>
  ) : (
    <Spinner />
  )
}

export default TextPractice
