import { Switch, Chip, Box, Stack, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import TextAddWordsGenerate from './text-add-words-generate.js'
import { Fragment } from 'react'

const selectorText = (state) => state.text

function TextAddWords() {
  const { text } = useSelector(selectorText)
  const dispatch = useDispatch()

  const handleChangeArabic = (indexSentence, indexArabicWord, englishWords) => {
    dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence, indexArabicWord, englishWords } })
  }

  const handleChangeQuiz = (indexSentence, indexArabicWord, quiz) => {
    dispatch({ type: 'UPDATE_SENTENCE_QUIZ', value: { indexSentence, indexArabicWord, quiz } })
  }

  const sentences = text.sentences.map((sentence, indexSentence) => (
    <Fragment key={indexSentence}>
      <Stack spacing={0} style={{ paddingBottom: '70px', width: '700px' }}>
        <h3>
          {sentence.english} {sentence.arabic}
        </h3>

        {sentence.words.map((word, indexArabicWord) => (
          <Box sx={{ fontSize: 'h4.fontSize' }} key={indexArabicWord}>
            <p>
              {word.arabic}
              <Switch
                checked={word.quiz}
                onChange={(event) => handleChangeQuiz(indexSentence, indexArabicWord, event.target.checked)}
              />
              {word.arabic.length > 10 && <Chip color="warning" label="Long Arabic Word" />}
              {word.english.length > 10 && <Chip color="warning" label="Long English Word" />}
              <TextField
                InputProps={{ style: { fontSize: 15 } }}
                value={word.english}
                onChange={(event) => handleChangeArabic(indexSentence, indexArabicWord, event.target.value)}
                rows={1}
                fullWidth
                variant="outlined"
              />
            </p>
          </Box>
        ))}
      </Stack>
    </Fragment>
  ))

  return (
    <Fragment>
      {<TextAddWordsGenerate />}
      <br />
      <br />
      {sentences}
    </Fragment>
  )
}

export default TextAddWords
