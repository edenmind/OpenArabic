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
    const englishSentence = wordProcessing.splitTextToSentences(event.target.value)
    setEnglishSentenceCount(englishSentence.length)
    const englishWords = []
    englishSentence.forEach((sentence) => {
      const theEnglishWordsSentence = wordProcessing.splitSentencesToWords(sentence)
      englishWords.push(theEnglishWordsSentence)
    })

    dispatch({ type: 'SET_ENGLISH_TEXT', english: event.target.value })
    dispatch({ type: 'SET_ENGLISH_SENTENCE', englishSentence })
    dispatch({ type: 'SET_ENGLISH_WORDS', englishWords })
  }

  function handleChangeArabic(event) {
    const arabicSentence = wordProcessing.splitTextToSentences(event.target.value)
    const cleanWords = wordProcessing.cleanWordFromInvalidCharacters(event.target.value)
    const arabicSentencesProcessed = wordProcessing.splitTextToSentences(cleanWords)
    setArabicSentenceCount(arabicSentencesProcessed.length)

    const arabicWords = []
    arabicSentencesProcessed.forEach((sentence) => {
      const theArabicWordsSentence = wordProcessing.splitSentencesToWords(sentence)
      const cleanFromNullAndEmpty = wordProcessing.removeEmptyAndNull(theArabicWordsSentence)
      arabicWords.push(cleanFromNullAndEmpty)
    })

    dispatch({ type: 'SET_ARABIC_TEXT', arabic: event.target.value })
    dispatch({ type: 'SET_ARABIC_SENTENCE', arabicSentence })
    dispatch({ type: 'SET_ARABIC_WORDS', arabicWords })
  }

  const generateSentences = () => {
    const sentences = []

    for (let i = 0; i < text.arabicSentence.length; i++) {
      const theArabicWordsSentence = wordProcessing.splitSentencesToWords(text.arabicSentence[i])
      const cleanFromNullAndEmpty = wordProcessing.removeEmptyAndNull(theArabicWordsSentence)

      const words = []

      for (const element of cleanFromNullAndEmpty) {
        const word = {
          arabic: element,
          english: '',
        }
        words.push(word)
      }

      const sentence = {
        english: text.englishSentence[i],
        arabic: text.arabicSentence[i],
        words,
      }
      sentences.push(sentence)
    }

    dispatch({ type: 'SET_SENTENCES', sentences })
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
