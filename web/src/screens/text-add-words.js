import * as api from '../services/api-service.js'

import { Box, Button, Chip, Stack, Switch, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import SnackBar from '../components/snack-bar.js'
import React, { Fragment } from 'react'
import TextAddWordsGenerate from './text-add-words-generate.js'

const selectorText = (state) => state.text

function TextAddWords() {
  const { text } = useSelector(selectorText)
  const dispatch = useDispatch()
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [postState, setPostState] = React.useState('')
  const [postMessage, setPostMessage] = React.useState('')
  const handleSave = async (arabic, english) => {
    console.log('arabic and english:', arabic, english)
    const result = await api.postTranslation(arabic, english)

    setOpenSnackbar(true)
    setPostMessage(result.message)
    setPostState(result.state)
  }

  const handleChangeArabic = (indexSentence, indexArabicWord, englishWords) => {
    dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence, indexArabicWord, englishWords } })
  }

  const handleChangeQuiz = (indexSentence, indexArabicWord, quiz) => {
    dispatch({ type: 'UPDATE_SENTENCE_QUIZ', value: { indexSentence, indexArabicWord, quiz } })
  }

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
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
              <Button
                onClick={async () => {
                  const arabicWord = await api.getTranslation(word.arabic)
                  handleChangeArabic(indexSentence, indexArabicWord, arabicWord)
                }}
              >
                Fetch
              </Button>
              <Button
                onClick={async () => {
                  const englishWord = await api.getTranslation(word.arabic)
                  handleSave(word.arabic, englishWord)
                }}
              >
                Save
              </Button>
              <Switch
                checked={word.quiz}
                onChange={(event) => handleChangeQuiz(indexSentence, indexArabicWord, event.target.checked)}
              />
            </p>
          </Box>
        ))}
      </Stack>
      <SnackBar
        openSnackBar={openSnackBar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity={postState}
        message={postMessage}
      />
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
