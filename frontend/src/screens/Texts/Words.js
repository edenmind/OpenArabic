import { Box, Divider, FormControl, MenuItem, Select, Stack } from '@mui/material'

import React from 'react'
import { useSelector } from 'react-redux'

const Words = () => {
  const { englishWords } = useSelector((state) => state.englishWords)
  const { arabicWords } = useSelector((state) => state.arabicWords)
  const [theArabicWord, setTheArabicWord] = React.useState([])

  const handleChangeArabic = (event) => {
    console.log(event.target.value)
  }
  const listOfWords = englishWords.map((sentence, indexSentence) => (
    <Stack spacing={2} key={indexSentence}>
      <Divider>
        <Box sx={{ fontSize: 'h5.fontSize', m: 2 }}>Sentence: {indexSentence}</Box>
      </Divider>
      {sentence.map((word, indexWord) => (
        <Stack spacing={2} key={indexWord}>
          {word}
          <FormControl fullWidth>
            <Select value={theArabicWord[indexWord]} onChange={handleChangeArabic}>
              {arabicWords[indexSentence].map((arabicWord, indexArabicWord) => (
                <MenuItem key={indexArabicWord} value={arabicWord}>
                  {arabicWord}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
        </Stack>
      ))}
    </Stack>
  ))

  return { listOfWords }
}

export default Words
