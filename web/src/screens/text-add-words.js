/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable putout/newline-function-call-arguments */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable security/detect-non-literal-fs-filename */
import * as api from '../services/api-service.js'
import { Box, Button, Chip, Stack, TextField, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { Fragment, useCallback, useMemo } from 'react'
import TextAddWordsGenerate from './text-add-words-generate.js'
import * as prompts from '../services/prompts.js'
import { getChatCompletionMessage } from '../services/ai-service.js'

const selectorText = (state) => state.text

function TextAddWords() {
  const PAGE_SIZE = 5

  const { text } = useSelector(selectorText)
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = React.useState(1)
  const [suggestions, setSuggestions] = React.useState(Array(text.sentences.length).fill(''))

  const handleChangeExplanation = useCallback(
    (indexSentence, indexArabicWord, explanation) => {
      const sentenceIndex = (currentPage - 1) * PAGE_SIZE + indexSentence
      dispatch({ type: 'UPDATE_EXPLANATION', value: { indexSentence: sentenceIndex, indexArabicWord, explanation } })
    },
    [currentPage, dispatch, PAGE_SIZE]
  )

  const handleChangeExplanationSentence = useCallback(
    (indexSentence, explanations) => {
      const sentenceIndex = (currentPage - 1) * PAGE_SIZE + indexSentence
      dispatch({ type: 'UPDATE_EXPLANATION_SENTENCE', value: { indexSentence: sentenceIndex, explanations } })
    },
    [currentPage, dispatch, PAGE_SIZE]
  )

  const handleChangeArabic = useCallback(
    (indexSentence, indexArabicWord, englishWord) => {
      const sentenceIndex = (currentPage - 1) * PAGE_SIZE + indexSentence
      dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence: sentenceIndex, indexArabicWord, englishWord } })
    },
    [currentPage, dispatch, PAGE_SIZE]
  )

  const handleChangeArabicFullSentence = useCallback(
    (indexSentence, englishWords) => {
      const sentenceIndex = (currentPage - 1) * PAGE_SIZE + indexSentence
      dispatch({ type: 'UPDATE_FULL_SENTENCE', value: { indexSentence: sentenceIndex, englishWords } })
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

  const sentences = useMemo(() => {
    const startIdx = (currentPage - 1) * PAGE_SIZE
    const endIdx = startIdx + PAGE_SIZE
    const sentencesToShow = text.sentences.slice(startIdx, endIdx)

    return sentencesToShow.map((sentence, indexSentence) => (
      <Fragment key={indexSentence + currentPage}>
        <Stack spacing={0} style={{ paddingBottom: '30px', width: '900px' }}>
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
              <Stack spacing={5} direction="row" style={{ marginBottom: 0 }}>
                <Box sx={{ minWidth: '90px' }}>
                  <h6 style={{ direction: 'rtl', fontSize: 15, marginTop: 5 }}>Explanation</h6>
                </Box>

                <TextField
                  InputProps={{ style: { fontSize: 15 } }}
                  value={word.explanation || ''}
                  onChange={(event) => handleChangeExplanation(indexSentence, indexArabicWord, event.target.value)}
                  fullWidth
                  multiline
                  rows={5}
                />
              </Stack>
              <Chip
                label={`${(currentPage - 1) * PAGE_SIZE + indexSentence}:${indexArabicWord}`}
                color="secondary"
                style={{ marginLeft: '130px' }}
              />
              <Button
                onClick={async () => {
                  const arabicWord = await api.getTranslation(word.arabic)
                  handleChangeArabic(indexSentence, indexArabicWord, arabicWord)
                }}
              >
                Fetch from Google
              </Button>

              <Button
                onClick={async () => {
                  handleChangeArabic(indexSentence, indexArabicWord, `the ${word.english}`)
                }}
              >
                Add the
              </Button>
              <Button
                onClick={async () => {
                  handleChangeArabic(indexSentence, indexArabicWord, `[the] ${word.english}`)
                }}
              >
                Add [the]
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
          onClick={async () => {
            const jsonString = await getChatCompletionMessage(prompts.getArabicAndEnglishSentence(sentence, text))
            const result = JSON.parse(jsonString)

            handleChangeArabicFullSentence(indexSentence, result)
          }}
          variant="contained"
          color="primary"
          style={{ marginLeft: '130px' }}
        >
          Translate
        </Button>
        <Button
          onClick={async () => {
            const wordsPairs = sentence.words.map((word) => `${word.arabic} ${word.english}`).join('\n')

            const jsonString = await getChatCompletionMessage(prompts.getExplanation(wordsPairs, text))
            const result = JSON.parse(jsonString)

            handleChangeExplanationSentence(indexSentence, result)
          }}
          variant="contained"
          color="primary"
          style={{ marginLeft: '10px' }}
        >
          Explain
        </Button>
        <Button
          onClick={async () => {
            const words = sentence.words.map((word) => {
              return {
                arabic: word.arabic,
                english: word.english
              }
            })

            const wordsIntoString = words.map((word) => `${word.arabic} ${word.english}`).join(' ')

            const result = await getChatCompletionMessage(prompts.verifyTranslation(sentence.arabic, wordsIntoString))

            const newSuggestions = Array.from(suggestions)
            newSuggestions[(currentPage - 1) * PAGE_SIZE + indexSentence] = result
            setSuggestions(newSuggestions)
          }}
          variant="contained"
          color="primary"
          style={{ marginLeft: '10px' }}
        >
          Verify
        </Button>

        <Box>
          <p
            dangerouslySetInnerHTML={{
              __html: suggestions[(currentPage - 1) * PAGE_SIZE + indexSentence]?.replace(/\n/g, '<br>')
            }}
          />
        </Box>

        <Divider style={{ marginTop: 75, marginBottom: 75, height: 15 }} />
      </Fragment>
    ))
  }, [
    currentPage,
    text,
    suggestions,
    handleChangeEnglishSentence,
    handleChangeArabic,
    handleChangeExplanation,
    handleChangeArabicFullSentence,
    handleChangeExplanationSentence
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

      <br />
      <br />
      {sentences}
      <Box sx={{ marginTop: '10px' }}>{pageButtons}</Box>
    </>
  )
}

export default React.memo(TextAddWords)
