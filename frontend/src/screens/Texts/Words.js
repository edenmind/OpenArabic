import { Box, Button, Chip, Snackbar, Stack, TextField } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import {
  SET_ARABIC_SENTENCE,
  SET_ARABIC_TEXT,
  SET_ARABIC_WORDS,
  SET_AUTHOR,
  SET_CATEGORY,
  SET_ENGLISH_SENTENCE,
  SET_ENGLISH_TEXT,
  SET_ENGLISH_WORDS,
  SET_SOURCE,
  SET_TITLE,
  SET_WORD_BY_WORD,
} from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

import MuiAlert from '@mui/material/Alert'
import axios from 'axios'

const Words = () => {
  const { arabicWords } = useSelector((state) => state.arabicWords)
  const { englishSentence } = useSelector((state) => state.englishSentence)
  const { arabicSentence } = useSelector((state) => state.arabicSentence)
  const { title } = useSelector((state) => state.title)
  const { category } = useSelector((state) => state.category)
  const { author } = useSelector((state) => state.author)
  const { source } = useSelector((state) => state.source)
  const [open, setOpen] = React.useState(false)

  const [wordByWord, setWordByWord] = React.useState([])
  const dispatch = useDispatch()

  const handleChangeArabic = (indexSentence, indexArabicWord, value) => {
    const newTheArabicWord = [...wordByWord]
    newTheArabicWord[indexSentence][indexArabicWord] = value
    setWordByWord(newTheArabicWord)
  }

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })

  const handleSave = () => {
    const sentences = []

    for (let i = 0; i < arabicSentence.length; i++) {
      const sentence = {
        english: englishSentence[i],
        arabic: arabicSentence[i],
        words: wordByWord[i],
      }
      sentences.push(sentence)
    }

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/texts`,
      data: {
        title,
        category,
        author,
        source,
        sentences,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setOpen(true)

          dispatch({ type: SET_TITLE, title: '' })
          dispatch({ type: SET_CATEGORY, category: '' })
          dispatch({ type: SET_AUTHOR, author: '' })
          dispatch({ type: SET_SOURCE, source: '' })

          dispatch({ type: SET_ARABIC_TEXT, arabicText: '' })
          dispatch({ type: SET_ENGLISH_TEXT, englishText: '' })
          dispatch({ type: SET_ARABIC_WORDS, arabicWords: [] })
          dispatch({ type: SET_ENGLISH_WORDS, englishWords: [] })
          dispatch({ type: SET_ARABIC_SENTENCE, arabicSentence: [] })
          dispatch({ type: SET_ENGLISH_SENTENCE, englishSentence: [] })
          dispatch({ type: SET_WORD_BY_WORD, wordByWord: [] })
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    const newTheArabicWord = []

    for (const arabicWord of arabicWords) {
      const numberOfWords = arabicWord.length
      const newArray = []
      for (let j = 0; j < numberOfWords; j++) {
        newArray.push([''])
      }
      newTheArabicWord.push(newArray)
    }
    setWordByWord(newTheArabicWord)
  }, [])
  const listOfWords = arabicWords.map((sentence, indexSentence) => (
    <Fragment key={indexSentence}>
      <Stack spacing={2}>
        <TextField InputProps={{ style: { fontSize: 18 } }} value={englishSentence[indexSentence]} label='English' multiline rows={1} fullWidth variant='outlined' />
        <div dir='rtl'>
          <TextField InputProps={{ style: { fontSize: 33 } }} value={arabicSentence[indexSentence]} label='Arabic' multiline rows={1} fullWidth variant='outlined' />
        </div>
        {wordByWord.length > 1 &&
          sentence.map((arabicWord, indexArabicWord) => (
            <Box sx={{ fontSize: 'h4.fontSize' }} key={indexArabicWord}>
              {arabicWord}
              <TextField
                InputProps={{ style: { fontSize: 15 } }}
                value={wordByWord[indexSentence][indexArabicWord]}
                onChange={(event) => handleChangeArabic(indexSentence, indexArabicWord, event.target.value)}
                rows={1}
                fullWidth
                variant='outlined'
              />
            </Box>
          ))}
        <br />
        <br />
        <br />
      </Stack>
    </Fragment>
  ))

  const saveBlock = (
    <Fragment>
      <Stack direction='row' spacing={2}>
        {title.length > 4 ? <Chip label='Title' color='success' /> : <Chip label='Title' color='primary' />}
        {category.length > 4 ? <Chip label='Category' color='success' /> : <Chip label='Category' color='primary' />}
        {source.length > 4 ? <Chip label='Source' color='success' /> : <Chip label='Source' color='primary' />}
        {author.length > 4 ? <Chip label='Author' color='success' /> : <Chip label='Author' color='primary' />}
        <Button onClick={handleSave}>Save</Button>
      </Stack>
      <br />
      <br />
      <br />
      <br />
    </Fragment>
  )

  return (
    <React.Fragment>
      {listOfWords}
      {saveBlock}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Added new text!
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

export default Words
