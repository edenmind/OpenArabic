/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable security/detect-non-literal-fs-filename */
import * as api from '../services/api-service.js'
import { Box, Button, Chip, Stack, Switch, TextField, Tooltip, FormControlLabel, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import SnackBar from '../components/snack-bar.js'
import React, { Fragment } from 'react'
import TextAddWordsGenerate from './text-add-words-generate.js'
import TextAddWordsGetFromDatabase from './text-add-words-get-translations.js'

const selectorText = (state) => state.text

function TextAddWords() {
  const { text } = useSelector(selectorText)
  const dispatch = useDispatch()
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [postState, setPostState] = React.useState('')
  const [postMessage, setPostMessage] = React.useState('')
  const handleSave = async (arabic, english, sentence) => {
    const result = await api.postWord(arabic, english, sentence)

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
      <Chip label={`Sentence ${indexSentence}`} color="primary" variant="outlined" />
      <Stack spacing={0} style={{ paddingBottom: '100px', width: '700px' }}>
        <p>
          <h3>{sentence.english}</h3>
          <h1>{sentence.arabic}</h1>
        </p>

        {sentence.words.map((word, indexArabicWord) => (
          <Box sx={{ fontSize: 'h4.fontSize' }} key={indexArabicWord}>
            <Chip label={`${indexSentence}:${indexArabicWord}`} color="primary" variant="outlined" /> {word.arabic}
            <TextField
              InputProps={{ style: { fontSize: 15 } }}
              value={word.english}
              onChange={(event) => handleChangeArabic(indexSentence, indexArabicWord, event.target.value)}
              rows={1}
              fullWidth
              variant="outlined"
            />
            {word.arabic.length > 17 && <Chip sx={{ margin: 2 }} color="warning" label="Long Arabic Word" />}
            {word.english.length > 17 && <Chip sx={{ margin: 2 }} color="warning" label="Long English Word" />}
            <Tooltip title="Fetch word from Google Translation API">
              <Button
                onClick={async () => {
                  const arabicWord = await api.getTranslation(word.arabic)
                  handleChangeArabic(indexSentence, indexArabicWord, arabicWord)
                }}
              >
                Fetch
              </Button>
            </Tooltip>
            <Tooltip title="Save word to internal dictionary">
              <Button
                onClick={async () => {
                  const englishWord = await api.getTranslation(word.arabic)
                  handleSave(word.arabic, englishWord, sentence.arabic)
                }}
              >
                Save
              </Button>
            </Tooltip>
            <Tooltip title="Remove the word">
              <Button
                color="secondary"
                onClick={async () => {
                  dispatch({ type: 'REMOVE_WORD_FROM_SENTENCE', value: { indexSentence, indexArabicWord } })
                }}
              >
                Remove
              </Button>
            </Tooltip>
            <Tooltip title="Open in Google Translate">
              <Button
                color="secondary"
                //open in a new tab when clicked
                onClick={() =>
                  window.open(`https://translate.google.com/?sl=ar&tl=en&text=${word.arabic}&op=translate`)
                }
              >
                Open
              </Button>
            </Tooltip>
            <FormControlLabel
              sx={{ margin: 1 }}
              value="Quiz"
              control={
                <Switch
                  checked={word.quiz}
                  onChange={(event) => handleChangeQuiz(indexSentence, indexArabicWord, event.target.checked)}
                />
              }
              label="Quiz"
              labelPlacement="left"
            />
            <Divider style={{ paddingBottom: '20px', opacity: 0 }} />
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
      <TextAddWordsGenerate />
      <TextAddWordsGetFromDatabase />
      <br />
      <br />
      {sentences}
    </Fragment>
  )
}

export default TextAddWords
