import { Box, Stack, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import TextAddWordsGenerate from './text-add-words-generate.js'
import Chip from '@mui/material/Chip'
import { Fragment } from 'react'

const selectorText = (state) => state.text

function TextAddWords() {
  const { text } = useSelector(selectorText)
  const dispatch = useDispatch()

  const handleChangeArabic = (indexSentence, indexArabicWord, englishWords) => {
    dispatch({ type: 'UPDATE_SENTENCE', value: { indexSentence, indexArabicWord, englishWords } })
  }

  const sentences = text.sentences.map((sentence, indexSentence) => (
    <Fragment key={indexSentence}>
      <Stack spacing={0} style={{ paddingBottom: '70px', width: '700px' }}>
        <h3>
          {sentence.english}: {sentence.arabic}
        </h3>

        {sentence.words.map((word, indexArabicWord) => (
          <Box sx={{ fontSize: 'h4.fontSize' }} key={indexArabicWord}>
            <p>
              {word.arabic}
              <TextField
                InputProps={{ style: { fontSize: 15 } }}
                value={word.english}
                onChange={(event) => handleChangeArabic(indexSentence, indexArabicWord, event.target.value)}
                rows={1}
                fullWidth
                variant="outlined"
              />
            </p>
          </Box>
        ))}
      </Stack>
    </Fragment>
  ))

  return (
    <Fragment>
      {text.arabicSentence.length > 1 ? <TextAddWordsGenerate /> : <Chip color="warning" label="No Sentences Added" />}
      <br />
      <br />
      {sentences}
    </Fragment>
  )
}

export default TextAddWords
