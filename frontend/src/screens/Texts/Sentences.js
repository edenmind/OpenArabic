import * as React from 'react'
import * as wordProcessing from '../../services/wordProcessing'

import { Chip, TextField } from '@mui/material'
import { SET_ARABIC_SENTENCE, SET_ARABIC_TEXT, SET_ARABIC_WORDS, SET_ENGLISH_SENTENCE, SET_ENGLISH_TEXT, SET_ENGLISH_WORDS } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

import Footer from '../../components/Footer'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  width: 1100,
}))

const Sentences = () => {
  const dispatch = useDispatch()

  const { englishText } = useSelector((state) => state.englishText)
  const { arabicText } = useSelector((state) => state.arabicText)

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

    dispatch({ type: SET_ENGLISH_TEXT, englishText: event.target.value })
    dispatch({ type: SET_ENGLISH_SENTENCE, englishSentence: englishSentencesProcessed })
    dispatch({ type: SET_ENGLISH_WORDS, englishWords: theEnglishWords })
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

    dispatch({ type: SET_ARABIC_TEXT, arabicText: event.target.value })
    dispatch({ type: SET_ARABIC_SENTENCE, arabicSentence: arabicSentence })
    dispatch({ type: SET_ARABIC_WORDS, arabicWords: theArabicWords })
  }

  const sentencesMatchingIndicator =
    englishSentenceCount === arabicSentenceCount ? <Chip label='Number of sentences matching' color='success' /> : <Chip label='Number of sentences are not matching' color='primary' />

  return (
    <>
      {sentencesMatchingIndicator}
      <Stack direction='row' spacing={2}>
        <Item>
          <div dir='rtl'>
            <TextField InputProps={{ style: { fontSize: 30 } }} value={arabicText} label='Arabic' multiline rows={21} fullWidth variant='filled' onChange={handleChangeArabic} />
          </div>
        </Item>
        <Item>
          <TextField InputProps={{ style: { fontSize: 20, lineHeight: 2.1 } }} value={englishText} label='English' multiline rows={31} fullWidth variant='filled' onChange={handleChangeEnglish} />
        </Item>
      </Stack>
   
    </>
  )
}

export default Sentences
