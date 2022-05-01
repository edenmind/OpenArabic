/* eslint-disable react/react-in-jsx-scope */
import { Box, Stack, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { Fragment } from 'react'

const selector = (state) => state.text
function TextAddWords() {
  const text = useSelector(selector)
  const dispatch = useDispatch()

  const handleChangeArabic = (indexSentence, indexArabicWord, englishWords) => {
    dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence, indexArabicWord, englishWords } })
  }

  return text.sentences.length > 1 ? (
    text.sentences.map((sentence, indexSentence) => (
      <Fragment key={indexSentence}>
        <Stack spacing={0} style={{ paddingBottom: '70px', width: '700px' }}>
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
                variant="outlined"
              />
            </Box>
          ))}
        </Stack>
      </Fragment>
    ))
  ) : (
    <h3>No words added... please add some sentences and try again.</h3>
  )
}

export default TextAddWords
