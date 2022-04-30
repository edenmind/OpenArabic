import { Box, Stack, TextField } from '@mui/material'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function TextAddWords() {
  const { text } = useSelector((state) => state.text)
  const dispatch = useDispatch()

  const handleChangeArabic = (indexSentence, indexArabicWord, englishWords) => {
    dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence, indexArabicWord, englishWords } })
  }

  return text.sentences.map((sentence, indexSentence) => (
    <Fragment key={indexSentence}>
      <Stack spacing={0} style={{ paddingBottom: '70px' }}>
        <h3>
          {sentence.english}: {sentence.arabic}
        </h3>

        {sentence.words.map((word, indexArabicWord) => (
          <Box sx={{ fontSize: 'h4.fontSize' }} key={indexArabicWord}>
            {word.arabic}
            <TextField
              InputProps={{ style: { fontSize: 15 } }}
              value={word.english}
              onChange={(event) => handleChangeArabic(indexSentence, indexArabicWord, event.target.value)}
              rows={1}
              fullWidth
              variant='outlined'
            />
          </Box>
        ))}
      </Stack>
    </Fragment>
  ))
}

export default TextAddWords
