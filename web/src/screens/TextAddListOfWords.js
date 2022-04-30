import { Box, Stack, TextField } from '@mui/material'
import React, { Fragment } from 'react'

import { useSelector } from 'react-redux'

function TextAddListOfWords() {
  const { text } = useSelector((state) => state.text)

  const [wordByWord, setWordByWord] = React.useState([])

  const handleChangeArabic = (indexSentence, indexArabicWord, value) => {
    const newTheArabicWord = [...wordByWord]

    const translation = {
      arabic: text.arabicWords[indexSentence][indexArabicWord],
      english: value,
    }

    newTheArabicWord[indexSentence][indexArabicWord] = translation
    setWordByWord(newTheArabicWord)
  }

  return text.sentences.map((sentence, indexSentence) => (
    <Fragment key={indexSentence}>
      <Stack spacing={2}>
        <h3>
          {sentence.english}: {sentence.arabic}
        </h3>

        {sentence.words.map((word, index) => (
          <Box sx={{ fontSize: 'h4.fontSize' }} key={index}>
            {word.arabic}
            <TextField
              InputProps={{ style: { fontSize: 15 } }}
              value={word.english}
              onChange={(event) => handleChangeArabic(indexSentence, index, event.target.value)}
              rows={1}
              fullWidth
              variant='outlined'
            />
          </Box>
        ))}
        <br />
        <br />
        <br />

        <br />
      </Stack>
    </Fragment>
  ))
}

export default TextAddListOfWords
