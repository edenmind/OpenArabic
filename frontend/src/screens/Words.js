import { Container, Divider, FormControl, MenuItem, Select } from '@mui/material'

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
    <div key={indexSentence}>
      <strong>Sentence: {indexSentence}</strong>
      <br />
      <br />
      {sentence.map((word, indexWord) => (
        <Container key={indexWord}>
          <div>{word}</div>
          <FormControl fullWidth>
            <Select value={theArabicWord[indexWord]} onChange={handleChangeArabic}>
              {arabicWords[indexSentence].map((arabicWord, indexArabicWord) => (
                <MenuItem key={indexArabicWord} value={arabicWord}>
                  {arabicWord}
                </MenuItem>
              ))}
            </Select>
            <br />
          </FormControl>
        </Container>
      ))}
      <br />
    </div>
  ))

  return (
    <React.Fragment>
      <div>{listOfWords}</div>
    </React.Fragment>
  )
}

export default Words
