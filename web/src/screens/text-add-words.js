/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable putout/newline-function-call-arguments */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable security/detect-non-literal-fs-filename */
import * as api from '../services/api-service.js'
import { Box, Button, Chip, Stack, TextField, Divider, FormControlLabel } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { Fragment, useCallback, useMemo, Suspense } from 'react'
import TextAddWordsGenerate from './text-add-words-generate.js'
import TextAddWordsGetFromDatabase from './text-add-words-get-translations.js'
import * as prompts from '../services/prompts.js'
import { v4 as uuidv4 } from 'uuid'
import Switch from '@mui/material/Switch'

const SnackBar = React.lazy(() => import('../components/snack-bar.js'))
const BasicModal = React.lazy(() => import('../components/basic-modal.js'))

const selectorText = (state) => state.text

function addEmptyLineAfterSentences(str) {
  const sentences = str.split(/(?<!\n)(?<=[!.?]["']?(?=\s|$)) /) // split the string into sentences
  const result = sentences.reduce((acc, sentence) => {
    acc += sentence.trim() + (/[!.?]["']?$/.test(sentence) ? '\n\n' : '') // add the current sentence to the result string and add a new empty line if it ends with a period, exclamation mark, or question mark followed by an optional quote mark
    return acc
  }, '')

  return result.trim() // remove trailing whitespace
}

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
    (indexSentence, indexArabicWord, englishWord) => {
      const sentenceIndex = (currentPage - 1) * PAGE_SIZE + indexSentence

      dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence: sentenceIndex, indexArabicWord, englishWord } })
    },
    [currentPage, dispatch, PAGE_SIZE]
  )

  const handleChangeEnglishSentence = useCallback(
    (sentenceIndex, englishSentence) => {
      const indexSentence = (currentPage - 1) * PAGE_SIZE + sentenceIndex
      dispatch({ type: 'UPDATE_ENGLISH_SENTENCE', value: { indexSentence, englishSentence } })
    },
    [currentPage, dispatch]
  )

  const handleChangeExplanationSentence = useCallback(
    (sentenceIndex, explanation) => {
      const indexSentence = (currentPage - 1) * PAGE_SIZE + sentenceIndex
      dispatch({ type: 'UPDATE_EXPLANATION_SENTENCE', value: { indexSentence, explanation } })
    },
    [currentPage, dispatch]
  )

  //handle change for switch that should set quiz in the text to true or false in the redux store
  const handleChangeQuiz = (indexSentence, indexArabicWord, quiz) => {
    const sentenceIndex = (currentPage - 1) * PAGE_SIZE + indexSentence
    const currentQuiz = quiz === undefined ? false : quiz

    dispatch({
      type: 'UPDATE_SENTENCE_QUIZ',
      value: { indexSentence: sentenceIndex, indexArabicWord, quiz: currentQuiz }
    })
  }

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
          <h2>
            Sentence <Chip label={(currentPage - 1) * PAGE_SIZE + indexSentence} color="secondary" />
          </h2>
          <h1 style={{ direction: 'rtl', fontSize: 45 }}>{sentence.arabic}</h1>
          <h3>Google Translation: </h3>
          <h3>{sentence.googleTranslation}</h3>
          <h3>English Sentence: </h3>
          <TextField
            InputProps={{ style: { fontSize: 18 } }}
            value={sentence.english}
            onChange={(event) => handleChangeEnglishSentence(indexSentence, event.target.value)}
            fullWidth
            multiline
            variant="outlined"
          />
          <h3>Explanation: </h3>
          <TextField
            InputProps={{ style: { fontSize: 20 } }}
            value={sentence.explanation || 'Add...'}
            onChange={(event) =>
              handleChangeExplanationSentence(indexSentence, addEmptyLineAfterSentences(event.target.value))
            }
            fullWidth
            rows={15}
            multiline
            variant="outlined"
          />
          <br />
          <Stack spacing={5} direction="row" style={{ marginBottom: -25 }}>
            <Button
              onClick={() =>
                handleOpen(
                  'Explain Sentence',
                  prompts.getExplainSentence(sentence.english, sentence.arabic, text.texts.arabic, text.texts.english)
                )
              }
              variant="contained"
              color="primary"
              style={{ marginLeft: '10px', width: '250px' }}
            >
              Explain Sentence
            </Button>
            <Button
              onClick={() =>
                handleOpen(
                  'Explain Sentence',
                  prompts.verifyExplanation(sentence.explanation, sentence.arabic, sentence.english)
                )
              }
              variant="contained"
              color="primary"
              style={{ marginLeft: '10px', width: '250px' }}
            >
              Verify Explanation
            </Button>
          </Stack>
          <br />
          <h3>Words: </h3>
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
              <Chip
                label={`${(currentPage - 1) * PAGE_SIZE + indexSentence}:${indexArabicWord}`}
                color="secondary"
                style={{ marginLeft: '130px' }}
              />
              <FormControlLabel
                sx={{ margin: 1 }}
                value="Quiz"
                control={
                  <Switch
                    checked={word.quiz || false}
                    onChange={(event) => handleChangeQuiz(indexSentence, indexArabicWord, event.target.checked)}
                  />
                }
                label="Quiz"
                labelPlacement="left"
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
              <Button
                color="secondary"
                //open in a new tab when clicked
                onClick={() => window.open(`https://www.almaany.com/ar/dict/ar-ar/${word.arabic}/`)}
              >
                almaany.com
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
        <Divider style={{ marginTop: 75, marginBottom: 75, height: 15 }} />
      </Fragment>
    ))
  }, [
    currentPage,
    text,
    promptTitle,
    promptText,
    open,
    openSnackBar,
    postState,
    postMessage,
    handleChangeEnglishSentence,
    handleChangeExplanationSentence,
    handleChangeArabic,
    handleChangeQuiz
  ])

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
