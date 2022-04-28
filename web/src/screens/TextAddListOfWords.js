import { Box, Divider, Stack, TextField } from '@mui/material'
import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function TextAddListOfWords(props) {
  const { text } = useSelector((state) => state.text)

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
              onChange={(event) => props.handleChangeArabic(indexSentence, index, event.target.value)}
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

TextAddListOfWords.propTypes = {
  handleChangeArabic: PropTypes.func.isRequired,
}

export default TextAddListOfWords
