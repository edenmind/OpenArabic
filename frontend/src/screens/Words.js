import { Divider, MenuItem, Select } from '@mui/material'

import React from 'react'
import { useSelector } from 'react-redux'

const Words = () => {
  const { englishWords } = useSelector((state) => state.englishWords)
  const { arabicWords } = useSelector((state) => state.arabicWords)

  const listOfWords = englishWords.map((sentence, indexSentence) => (
    <div key={indexSentence}>
      Sentence: {indexSentence}
      {sentence.map((word, indexWord) => (
        <div key={indexWord}>
          <div>Word: {word}</div>

          <Select value='10' label='Age'>
            {arabicWords[indexSentence].map((arabicWord, indexArabicWord) => (
              <MenuItem key={indexArabicWord} value={arabicWord}>
                {arabicWord}
              </MenuItem>
            ))}
          </Select>
        </div>
      ))}
      <Divider />
    </div>
  ))

  return (
    <React.Fragment>
      <div>{listOfWords}</div>
    </React.Fragment>
  )
}

export default Words
