import * as React from 'react'
import * as wordProcessing from '../services/word-processing.js'
import * as apiService from '../services/api-service.js'
import { Chip, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import LoadingButton from '@mui/lab/LoadingButton'
import { Fragment } from 'react'
import MatchingIndicator from '../components/matching-indicator.js'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  width: 1100
}))

const selector = (state) => state.text

const TextAddSentences = () => {
  const dispatch = useDispatch()

  const { text } = useSelector(selector)
  const [englishSentenceCount, setEnglishSentenceCount] = React.useState(0)
  const [arabicSentenceCount, setArabicSentenceCount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)

  const handleClick = () => {
    setLoading(true)
    apiService
      .getVowels(text.texts.arabic)
      .then((data) => {
        dispatch({ type: 'SET_ARABIC_TEXT', arabic: data })
        setLoading(false)
      })
      .catch((error) => console.log(error))
  }

  function handleChangeEnglish(event) {
    const englishSentence = wordProcessing.splitTextToSentences(event.target.value)
    setEnglishSentenceCount(englishSentence.length)

    const englishWords = []

    for (const sentence of englishSentence) {
      const theEnglishWordsSentence = wordProcessing.splitSentencesToWords(sentence)
      englishWords.push(theEnglishWordsSentence)
    }

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

    for (const sentence of arabicSentencesProcessed) {
      const cleanSentence = wordProcessing.cleanWordFromInvalidCharacters(sentence)
      const theArabicWordsSentence = wordProcessing.splitSentencesToWords(cleanSentence)
      const cleanFromNullAndEmpty = wordProcessing.removeEmptyAndNull(theArabicWordsSentence)

      arabicWords.push(cleanFromNullAndEmpty)
    }

    dispatch({ type: 'SET_ARABIC_TEXT', arabic: event.target.value })
    dispatch({ type: 'SET_ARABIC_SENTENCE', arabicSentence })
    dispatch({ type: 'SET_ARABIC_WORDS', arabicWords })
  }

  const englishSentencesCountMessage = `English: ${englishSentenceCount}`
  const arabicSentencesCountMessage = `Arabic: ${arabicSentenceCount}`

  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <MatchingIndicator
          entity="Sentences"
          firstCondition={englishSentenceCount}
          secondCondition={arabicSentenceCount}
        />
        <Chip label={englishSentencesCountMessage} />
        <Chip label={arabicSentencesCountMessage} />
        <LoadingButton
          size="small"
          onClick={handleClick}
          loading={loading}
          loadingIndicator="Loading..."
          variant="outlined"
        >
          Fetch vocals
        </LoadingButton>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Item>
          <div dir="rtl">
            <TextField
              InputProps={{ style: { fontSize: 30, lineHeight: 1.65 } }}
              value={text.texts.arabic}
              label="Arabic"
              multiline
              rows={21}
              fullWidth
              variant="filled"
              onChange={handleChangeArabic}
            />
          </div>
        </Item>
        <Item>
          <TextField
            InputProps={{ style: { fontSize: 20, lineHeight: 2.47 } }}
            value={text.texts.english}
            label="English"
            multiline
            rows={21}
            fullWidth
            variant="filled"
            onChange={handleChangeEnglish}
          />
        </Item>
      </Stack>
    </Fragment>
  )
}

export default TextAddSentences
