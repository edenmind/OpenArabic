/* eslint-disable putout/newline-function-call-arguments */
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
  const handleSave = async (arabic, english, arabicSentence, englishSentence, categoryLevel, quiz) => {
    const result = await api.postWord(arabic, english, arabicSentence, englishSentence, categoryLevel, quiz)

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
      <Stack spacing={0} style={{ paddingBottom: '10px', width: '900px' }}>
        <h1 style={{ direction: 'rtl', fontSize: 45 }}>{sentence.arabic}</h1>
        <h3>{sentence.googleTranslation}</h3>
        <TextField
          InputProps={{ style: { fontSize: 18 } }}
          value={sentence.english}
          onChange={(event) => handleChangeEnglishSentence(indexSentence, event.target.value)}
          fullWidth
          multiline
          variant="outlined"
        />
        <br />

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

            <Chip
              label={`${indexSentence}:${indexArabicWord}`}
              color="primary"
              variant="outlined"
              style={{ marginLeft: '130px' }}
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
                //get all categories by using the api getCategories
                const categories = await api.getCategories()

                //get the category level property of the category with the name text.category
                const categoryLevel = categories.find((category) => category.name === text.category).level

                //check that word.english exists in the sentence.english for both lower and upper case
                const quiz = sentence.english.toLowerCase().includes(word.english.toLowerCase())

                // if the word is not found the open the snack bar with the message
                if (quiz || !word.quiz) {
                  handleSave(word.arabic, word.english, sentence.arabic, sentence.english, categoryLevel, word.quiz)
                } else {
                  setOpenSnackbar(true)
                  setPostMessage('Word not found in sentence')
                  setPostState('error')
                }
              }}
            >
              Save
            </Button>
            <Button
              color="secondary"
              onClick={async () => {
                dispatch({ type: 'REMOVE_WORD_FROM_SENTENCE', value: { indexSentence, indexArabicWord } })
              }}
            >
              Remove
            </Button>

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

      <br />
      <br />
      {sentences}
    </Fragment>
  )
}

export default TextAddWords
