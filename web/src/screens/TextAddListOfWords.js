import { Box, Stack, TextField } from '@mui/material'
import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function TextAddListOfWords(props) {
  const { text } = useSelector((state) => state.text)

  return text.arabicWords.map((sentence, indexSentence) => (
    <Fragment key={indexSentence}>
      <Stack spacing={2}>
        <TextField InputProps={{ style: { fontSize: 18 } }} value={text.englishSentence[indexSentence]} label='English' multiline rows={1} fullWidth variant='outlined' />
        <div dir='rtl'>
          <TextField InputProps={{ style: { fontSize: 33 } }} value={text.arabicSentence[indexSentence]} label='Arabic' multiline rows={1} fullWidth variant='outlined' />
        </div>
        {props.wordByWord.length > 1 &&
          sentence.map((arabicWord, indexArabicWord) => (
            <Box sx={{ fontSize: 'h4.fontSize' }} key={indexArabicWord}>
              {arabicWord}
              <TextField
                InputProps={{ style: { fontSize: 15 } }}
                value={props.wordByWord[indexSentence][indexArabicWord].english}
                onChange={(event) => props.handleChangeArabic(indexSentence, indexArabicWord, event.target.value)}
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
}

TextAddListOfWords.propTypes = {
  handleChangeArabic: PropTypes.func.isRequired,
}

export default TextAddListOfWords
