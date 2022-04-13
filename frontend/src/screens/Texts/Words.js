import { Box, Stack, TextField } from '@mui/material'
import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'

const Words = () => {
  const { englishWords } = useSelector((state) => state.englishWords)
  const { arabicWords } = useSelector((state) => state.arabicWords)
  const { englishSentence } = useSelector((state) => state.englishSentence)
  const { arabicSentence } = useSelector((state) => state.arabicSentence)

  const [theArabicWord, setTheArabicWord] = React.useState()

  const handleChangeArabic = (indexSentence, indexArabicWord, value) => {
    const newTheArabicWord = [...theArabicWord]
    newTheArabicWord[indexSentence + 1][indexArabicWord] = value
    setTheArabicWord(newTheArabicWord)
    console.log(theArabicWord)
  }

  useEffect(() => {
    const newTheArabicWord = [[]]

    for (const arabicWord of arabicWords) {
      const numberOfWords = arabicWord.length
      const newArray = []
      for (let j = 0; j < numberOfWords; j++) {
        newArray.push('')
      }
      newTheArabicWord.push(newArray)
    }
    setTheArabicWord(newTheArabicWord)
  }, [])
  const listOfWords = arabicWords.map((sentence, indexSentence) => (
    <Stack spacing={2} key={`${indexSentence}d`}>
      <TextField InputProps={{ style: { fontSize: 18 } }} value={englishSentence[indexSentence]} label='English' multiline rows={2} fullWidth variant='filled' />
      <TextField InputProps={{ style: { fontSize: 25 } }} value={arabicSentence[indexSentence]} label='Arabic' multiline rows={1} fullWidth variant='filled' />

      {sentence.map((arabicWord, indexArabicWord) => (
        <Box sx={{ fontSize: 'h4.fontSize' }} key={`${indexArabicWord}a`}>
          {arabicWord}
          <TextField
            InputProps={{ style: { fontSize: 17 } }}
            value={theArabicWord[indexSentence][indexArabicWord]}
            onChange={(event) => handleChangeArabic(indexSentence, indexArabicWord, event.target.value)}
            multiline
            rows={1}
            fullWidth
            variant='filled'
          />
        </Box>
      ))}
      <br />
      <br />
      <br />
    </Stack>
  ))

  return <React.Fragment>{listOfWords}</React.Fragment>
}

export default Words
