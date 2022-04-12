import { Box, Button, Container, Divider, FormControl, MenuItem, Select, Stack, TextField } from '@mui/material'

import React from 'react'
import { useSelector } from 'react-redux'

const Words = () => {
  const { englishWords } = useSelector((state) => state.englishWords)
  const { arabicWords } = useSelector((state) => state.arabicWords)
  const [theArabicWord, setTheArabicWord] = React.useState([])

  const handleClickArabic = (word, index) => {
    console.log(word, index)
  }
  const listOfWords = arabicWords.map((sentence, indexSentence) => (
    <Stack spacing={2} key={indexSentence}>
      <TextField InputProps={{ style: { fontSize: 25 } }} value={sentence} label='Arabic' multiline rows={1} fullWidth variant='filled' />
      {sentence.map((arabicWord, indexArabicWord) => (
        <>
          <Box sx={{ fontSize: 'h4.fontSize' }}>{arabicWord}</Box>

          <Stack spacing={2} direction='row' key={indexArabicWord}>
            {englishWords[indexSentence].map((englishWord, indexEnglishWord) => (
              <Button key={indexEnglishWord} onClick={() => handleClickArabic(englishWord, indexEnglishWord)}>
                {englishWord}
              </Button>
            ))}
          </Stack>
        </>
      ))}
      <br />
      <br />
      <br />
    </Stack>
  ))

  return <React.Fragment>{listOfWords}</React.Fragment>
}

export default Words
