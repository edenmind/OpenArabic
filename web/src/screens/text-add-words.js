/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable putout/newline-function-call-arguments */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable security/detect-non-literal-fs-filename */
import * as api from '../services/api-service.js'
import { Box, Button, Chip, Stack, TextField, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { Fragment, useCallback, useMemo, Suspense } from 'react'
import TextAddWordsGenerate from './text-add-words-generate.js'
import TextAddWordsGetFromDatabase from './text-add-words-get-translations.js'
import * as prompts from '../services/prompts.js'
import { v4 as uuidv4 } from 'uuid'

const SnackBar = React.lazy(() => import('../components/snack-bar.js'))
const BasicModal = React.lazy(() => import('../components/basic-modal.js'))

const selectorText = (state) => state.text

function TextAddWords() {
  const PAGE_SIZE = 5

  const [currentPage, setCurrentPage] = React.useState(1)
  const { text } = useSelector(selectorText)
  const dispatch = useDispatch()
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [postState, setPostState] = React.useState('')
  const [postMessage, setPostMessage] = React.useState('')
  const [promptTitle, setPromptTitle] = React.useState('')
  const [promptText, setPromptText] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const handleOpen = (promptTitle, promptText) => {
    setOpen(true)
    setPromptText(promptText)
    setPromptTitle(promptTitle)
  }
  const handleClose = () => setOpen(false)

  const handleSave = async (word) => {
    const result = await api.postWord(word)

    setTimeout(() => {
      setOpenSnackbar(true)
      setPostMessage(result.message)
      setPostState(result.state)
    }, 0)
  }

  const handleChangeArabic = useCallback(
    (sentenceIndex, wordIndex, englishWord) => {
      const indexSentence = (currentPage - 1) * PAGE_SIZE + sentenceIndex

      dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence, indexArabicWord: wordIndex, englishWord } })
    },
    [currentPage, dispatch, PAGE_SIZE]
  )

  const handleChangeEnglishSentence = useCallback(
    (indexSentence, englishSentence) => {
      dispatch({ type: 'UPDATE_ENGLISH_SENTENCE', value: { indexSentence, englishSentence } })
    },
    [dispatch]
  )

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const sentences = useMemo(() => {
    const startIdx = (currentPage - 1) * PAGE_SIZE
    const endIdx = startIdx + PAGE_SIZE
    const sentencesToShow = text.sentences.slice(startIdx, endIdx)

    return sentencesToShow.map((sentence, indexSentence) => (
      <Fragment key={indexSentence + currentPage}>
        <Stack spacing={0} style={{ paddingBottom: '10px', width: '900px' }}>
          <h1 style={{ direction: 'rtl', fontSize: 45 }}>{sentence.arabic}</h1>
          <h3>Google Translation: {sentence.googleTranslation}</h3>
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
            <Box sx={{ fontSize: 'h4.fontSize', fontWeight: 'bold' }} key={indexArabicWord + currentPage}>
              <br />
              <Stack spacing={5} direction="row" style={{ marginBottom: -25 }}>
                <Box sx={{ minWidth: '90px' }}>
                  <h3 style={{ direction: 'rtl', fontSize: 33, marginTop: 5 }}>{word.arabic}</h3>
                </Box>

                <TextField
                  InputProps={{ style: { fontSize: 15 } }}
                  value={word.english}
                  onChange={(event) => handleChangeArabic(indexSentence, indexArabicWord, event.target.value)}
                  rows={1}
                  fullWidth
                />
              </Stack>

              <Chip label={`${indexSentence}:${indexArabicWord}`} color="secondary" style={{ marginLeft: '130px' }} />

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

                  const translation = {
                    //set textId to a new generated guid
                    textId: uuidv4(),
                    sentenceId: indexSentence,
                    wordId: indexArabicWord,
                    author: text.author,
                    source: text.source,
                    arabic: word.arabic,
                    english: word.english,
                    arabicSentence: sentence.arabic,
                    englishSentence: sentence.english,
                    categoryLevel
                  }

                  //call the handleSave function
                  handleSave(translation)
                }}
              >
                Save
              </Button>

              <Button
                color="secondary"
                //open in a new tab when clicked
                onClick={() => window.open(`https://quran.com/search?q=${word.arabic}`)}
              >
                quran.com
              </Button>

              <Button
                color="secondary"
                //open in a new tab when clicked
                onClick={() => window.open(`https://sunnah.com/search?q=${word.arabic}`)}
              >
                sunnah.com
              </Button>

              <Divider style={{ paddingBottom: '5px', opacity: 0 }} />
            </Box>
          ))}
        </Stack>
        <Button
          onClick={() => handleOpen('Verifying Sentence', prompts.getArabicAndEnglishText(sentence))}
          variant="contained"
          color="primary"
          style={{ marginLeft: '130px' }}
        >
          Verify Original
        </Button>
        <Button
          onClick={() => handleOpen('Word-by-Word Translation', prompts.getArabicAndEnglishSentence(sentence, text))}
          variant="contained"
          color="primary"
          style={{ marginLeft: '10px' }}
        >
          Translate
        </Button>
        <Button
          onClick={() => handleOpen('Translation Verify', prompts.getSentenceVerification(sentence, text))}
          variant="contained"
          color="primary"
          style={{ marginLeft: '10px' }}
        >
          Verify Translation
        </Button>
        <Divider style={{ paddingBottom: '75px', opacity: 0 }} />
        <Suspense fallback={<div>Loading...</div>}>
          <BasicModal
            key={`${promptTitle}${promptText}`}
            open={open}
            handleClose={handleClose}
            title={promptTitle}
            text={promptText}
          />
          <SnackBar
            openSnackBar={openSnackBar}
            handleCloseSnackbar={handleCloseSnackbar}
            severity={postState}
            message={postMessage}
          />
        </Suspense>
      </Fragment>
    ))
  }, [text, handleChangeArabic, handleChangeEnglishSentence, handleSave, currentPage])

  const numPages = Math.ceil(text.sentences.length / PAGE_SIZE)
  const pageButtons = []

  for (let i = 1; i <= numPages; i++) {
    pageButtons.push(
      <Button
        key={i}
        onClick={() => setCurrentPage(i)}
        variant={currentPage === i ? 'contained' : 'outlined'}
        color="primary"
        style={{ marginLeft: '10px' }}
      >
        {i}
      </Button>
    )
  }

  return (
    <>
      <TextAddWordsGenerate />
      <TextAddWordsGetFromDatabase />

      <br />
      <br />
      {sentences}
      <Box sx={{ marginTop: '10px' }}>{pageButtons}</Box>
    </>
  )
}

export default React.memo(TextAddWords)
