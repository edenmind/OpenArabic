/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable security/detect-non-literal-fs-filename */
import * as api from '../services/api-service.js'
import { Box, Button, Chip, Stack, Switch, TextField, Tooltip, FormControlLabel, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import SnackBar from '../components/snack-bar.js'
import React, { Fragment } from 'react'
import TextAddWordsGenerate from './text-add-words-generate.js'
import TextAddWordsGetFromDatabase from './text-add-words-get-translations.js'
import SearchIcon from '@mui/icons-material/Search'

const selectorText = (state) => state.text

function TextAddWords() {
  const { text } = useSelector(selectorText)
  const dispatch = useDispatch()
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [postState, setPostState] = React.useState('')
  const [postMessage, setPostMessage] = React.useState('')
  const handleSave = async (arabic, english) => {
    const result = await api.postWord(arabic, english)

    setOpenSnackbar(true)
    setPostMessage(result.message)
    setPostState(result.state)
  }

  const handleChangeArabic = (indexSentence, indexArabicWord, englishWord) => {
    dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence, indexArabicWord, englishWord } })
  }

  const handleChangeEnglishSentence = (indexSentence, englishSentence) => {
    dispatch({ type: 'UPDATE_ENGLISH_SENTENCE', value: { indexSentence, englishSentence } })
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
      <Stack spacing={0} style={{ paddingBottom: '10px', width: '700px' }}>
        <p>
          <h1 style={{ direction: 'rtl' }}>{sentence.arabic}</h1>
          <h3>{sentence.googleTranslation}</h3>
          <TextField
            InputProps={{ style: { fontSize: 18 } }}
            value={sentence.english}
            onChange={(event) => handleChangeEnglishSentence(indexSentence, event.target.value)}
            fullWidth
            multiline
            variant="outlined"
          />
        </p>

        {sentence.words.map((word, indexArabicWord) => (
          <Box sx={{ fontSize: 'h4.fontSize', fontWeight: 'bold' }} key={indexArabicWord}>
            <Stack spacing={5} direction="row">
              <Box sx={{ minWidth: '90px' }}>{word.arabic}</Box>

              <TextField
                InputProps={{ style: { fontSize: 15 } }}
                value={word.english}
                onChange={(event) => handleChangeArabic(indexSentence, indexArabicWord, event.target.value)}
                rows={1}
                fullWidth
              />
            </Stack>
            {word.arabic.length > 17 && <Chip sx={{ margin: 2 }} color="warning" label="Long Arabic Word" />}
            {word.english.length > 17 && <Chip sx={{ margin: 2 }} color="warning" label="Long English Word" />}
            <Chip
              label={`${indexSentence}:${indexArabicWord}`}
              color="primary"
              variant="outlined"
              style={{ marginLeft: '130px' }}
            />
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
                  handleSave(word.arabic, word.english)
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
                <SearchIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Open on Quran.com">
              <Button
                color="secondary"
                //open in a new tab when clicked
                onClick={() => window.open(`https://quran.com/search?q=${word.arabic}`)}
              >
                <SearchIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Open on Sunnah.com">
              <Button
                color="secondary"
                //open in a new tab when clicked
                onClick={() => window.open(`https://sunnah.com/search?q=${word.arabic}`)}
              >
                <SearchIcon />
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
            <Divider style={{ paddingBottom: '5px', opacity: 0 }} />
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
      ﷺ
      <br />
      <br />
      {sentences}
    </Fragment>
  )
}

export default TextAddWords
