import * as ACTIONS from '../redux/actions'
import * as React from 'react'
import * as wordProcessing from '../services/wordProcessing'

import { Button, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { Fragment } from 'react'
import MatchingIndicator from '../components/MatchingIndicator'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  width: 1100,
}))

const TextAddSentences = () => {
  const dispatch = useDispatch()

  const { text } = useSelector((state) => state.text)
  const [englishSentenceCount, setEnglishSentenceCount] = React.useState(1)
  const [arabicSentenceCount, setArabicSentenceCount] = React.useState(0)

  function handleChangeEnglish(event) {
    const englishSentencesProcessed = wordProcessing.splitTextToSentences(event.target.value)
    setEnglishSentenceCount(englishSentencesProcessed.length)
    const theEnglishWords = []
    englishSentencesProcessed.forEach((sentence) => {
      const theEnglishWordsSentence = wordProcessing.splitSentencesToWords(sentence)
      theEnglishWords.push(theEnglishWordsSentence)
    })

    dispatch({ type: ACTIONS.SET_ENGLISH_TEXT, english: event.target.value })
    dispatch({ type: ACTIONS.SET_ENGLISH_SENTENCE, englishSentence: englishSentencesProcessed })
    dispatch({ type: ACTIONS.SET_ENGLISH_WORDS, englishWords: theEnglishWords })
  }

  function handleChangeArabic(event) {
    const arabicSentence = wordProcessing.splitTextToSentences(event.target.value)
    const cleanWords = wordProcessing.cleanWordFromInvalidCharacters(event.target.value)
    const arabicSentencesProcessed = wordProcessing.splitTextToSentences(cleanWords)
    setArabicSentenceCount(arabicSentencesProcessed.length)

    const theArabicWords = []
    arabicSentencesProcessed.forEach((sentence) => {
      const theArabicWordsSentence = wordProcessing.splitSentencesToWords(sentence)
      const cleanFromNullAndEmpty = wordProcessing.removeEmptyAndNull(theArabicWordsSentence)
      theArabicWords.push(cleanFromNullAndEmpty)
    })

    dispatch({ type: ACTIONS.SET_ARABIC_TEXT, arabic: event.target.value })
    dispatch({ type: ACTIONS.SET_ARABIC_SENTENCE, arabicSentence: arabicSentence })
    dispatch({ type: ACTIONS.SET_ARABIC_WORDS, arabicWords: theArabicWords })
  }

  const generateSentences = () => {
    console.log('generateSentences')
    const newTheArabicWord = []
    for (const arabicWord of text.arabicWords) {
      const numberOfWords = arabicWord.length
      const newArray = []
      for (let j = 0; j < numberOfWords; j++) {
        newArray.push([''])
      }
      newTheArabicWord.push(newArray)
    }

    const sentences = []

    for (let i = 0; i < text.arabicSentence.length; i++) {
      const sentence = {
        english: text.englishSentence[i],
        arabic: text.arabicSentence[i],
        words: newTheArabicWord[i],
      }
      sentences.push(sentence)
    }

    console.log(sentences)

    dispatch({ type: ACTIONS.SET_SENTENCES, sentences: sentences })
  }

  return (
    <Fragment>
      <Stack direction='row' spacing={2}>
        <MatchingIndicator entity='Sentences' firstCondition={englishSentenceCount} secondCondition={arabicSentenceCount} />
        <Button onClick={() => generateSentences()}>Generate Words</Button>
      </Stack>
      <Stack direction='row' spacing={2}>
        <Item>
          <div dir='rtl'>
            <TextField
              InputProps={{ style: { fontSize: 30, lineHeight: 1.65 } }}
              value={text.texts.arabic}
              label='Arabic'
              multiline
              rows={21}
              fullWidth
              variant='filled'
              onChange={handleChangeArabic}
            />
          </div>
        </Item>
        <Item>
          <TextField
            InputProps={{ style: { fontSize: 20, lineHeight: 2.47 } }}
            value={text.texts.english}
            label='English'
            multiline
            rows={21}
            fullWidth
            variant='filled'
            onChange={handleChangeEnglish}
          />
        </Item>
      </Stack>
    </Fragment>
  )
}

export default TextAddSentences
