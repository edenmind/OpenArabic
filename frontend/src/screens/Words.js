import { Button, Divider, MenuItem, Select } from '@mui/material'

import React from 'react'

const Words = (props) => {
  const listOfWords = props.english.map((sentence, indexSentence) => (
    <div key={indexSentence}>
      Sentence: {indexSentence}
      {sentence.map((word, indexWord) => (
        <div key={indexWord}>
          <div>Word: {word}</div>

          <Select value='10' label='Age'>
            {props.arabic[1].map((arabicWord, indexArabicWord) => (
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
      <Select value='10' label='Age'>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>

      <Button onClick={() => props.setEnglishWordsFunc('abc')}>Add English Words</Button>
      <Button onClick={() => props.setArabicWordsFunc('abc')}>Add Arabic Words</Button>
    </React.Fragment>
  )
}

export default Words
