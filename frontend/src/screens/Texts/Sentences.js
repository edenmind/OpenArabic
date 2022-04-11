import * as React from 'react'
import * as wordProcessing from '../../services/wordProcessing'

import { SET_ARABIC_SENTENCE, SET_ARABIC_TEXT, SET_ARABIC_WORDS, SET_ENGLISH_SENTENCE, SET_ENGLISH_TEXT, SET_ENGLISH_WORDS } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  width: 700,
}))

const Sentences = () => {
  const dispatch = useDispatch()

  const { englishText } = useSelector((state) => state.englishText)
  const { arabicText } = useSelector((state) => state.arabicText)

  function handleChangeEnglish(event) {
    const englishSentencesProcessed = wordProcessing.splitTextToSentences(event.target.value)
    const theEnglishWords = []
    englishSentencesProcessed.forEach((sentence) => {
      const theEnglishWordsSentence = wordProcessing.splitSentencesToWords(sentence)
      theEnglishWords.push(theEnglishWordsSentence)
      console.log(theEnglishWords)
    })

    dispatch({ type: SET_ENGLISH_TEXT, englishText: event.target.value })
    dispatch({ type: SET_ENGLISH_SENTENCE, englishSentence: englishSentencesProcessed })
    dispatch({ type: SET_ENGLISH_WORDS, englishWords: theEnglishWords })
  }

  function handleChangeArabic(event) {
    const arabicSentencesProcessed = wordProcessing.splitTextToSentences(event.target.value)
    const theArabicWords = []
    arabicSentencesProcessed.forEach((sentence) => {
      const theArabicWordsSentence = wordProcessing.splitSentencesToWords(sentence)
      theArabicWords.push(theArabicWordsSentence)
      console.log(theArabicWords)
    })

    dispatch({ type: SET_ARABIC_TEXT, arabicText: event.target.value })
    dispatch({ type: SET_ARABIC_SENTENCE, arabicSentence: arabicSentencesProcessed })
    dispatch({ type: SET_ARABIC_WORDS, arabicWords: theArabicWords })
  }

  return (
    <Stack direction='row' spacing={2}>
      <Item>
        <TextField InputProps={{ style: { fontSize: 20 } }} value={englishText} label='English' multiline rows={31} fullWidth variant='filled' onChange={handleChangeEnglish} />
      </Item>
      <Item>
        <div dir='rtl'>
          <TextField InputProps={{ style: { fontSize: 30 } }} value={arabicText} label='Arabic' multiline rows={21} fullWidth variant='filled' onChange={handleChangeArabic} />
        </div>
      </Item>
    </Stack>
  )
}

export default Sentences
