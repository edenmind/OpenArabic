import { Box, Checkbox, FormControlLabel, FormGroup, Stack, TextField } from '@mui/material'
import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'

const Words = () => {
  const { englishWords } = useSelector((state) => state.englishWords)
  const { arabicWords } = useSelector((state) => state.arabicWords)
  const [theArabicWord, setTheArabicWord] = React.useState()

  const handleChangeArabic = (englishWord, indexSentence, indexArabicWord) => {
    const newTheArabicWord = [...theArabicWord]
    newTheArabicWord[indexSentence + 1][indexArabicWord].push(englishWord)
    setTheArabicWord(newTheArabicWord)
    console.log(englishWord, theArabicWord)
  }

  useEffect(() => {
    const newTheArabicWord = [[]]

    const numberOfSentences = arabicWords.length

    for (let i = 0; i < numberOfSentences; i++) {
      const numberOfWords = arabicWords[i].length
      const newArray = []
      for (let j = 0; j < numberOfWords; j++) {
        newArray.push([])
      }
      newTheArabicWord.push(newArray)
    }
    console.log(theArabicWord)
    setTheArabicWord(newTheArabicWord)
  }, [])
  const listOfWords = arabicWords.map((sentence, indexSentence) => (
    <Stack spacing={2} key={`${indexSentence}d`}>
      <TextField InputProps={{ style: { fontSize: 25 } }} value={sentence} label='Arabic' multiline rows={1} fullWidth variant='filled' />
      {sentence.map((arabicWord, indexArabicWord) => (
        <>
          <Box sx={{ fontSize: 'h4.fontSize' }} key={`${indexArabicWord}a`}>
            {arabicWord}
          </Box>

          <Stack spacing={2} direction='row' key={`${indexArabicWord}b`}>
            {englishWords[indexSentence].map((englishWord, indexEnglishWord) => (
              <FormGroup key={`${indexEnglishWord}c`}>
                <FormControlLabel control={<Checkbox onClick={() => handleChangeArabic(englishWord, indexSentence, indexArabicWord)} />} label={englishWord} />
              </FormGroup>
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
