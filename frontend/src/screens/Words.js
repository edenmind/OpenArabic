import { Button } from '@mui/material'
import React from 'react'

const Words = (props) => {
  const listOfEnglishWords = props.english.map((sentence, indexSentence) => (
    <div key={indexSentence}>
      Sentence: {indexSentence}
      {sentence.map((word, indexWord) => (
        <div key={indexWord}>Word: {word}</div>
      ))}
    </div>
  ))

  return (
    <React.Fragment>
      <div>{listOfEnglishWords}</div>
      <div>{props.arabic}</div>

      <Button onClick={() => props.setEnglishWordsFunc('abc')}>Add English Words</Button>
      <Button onClick={() => props.setArabicWordsFunc('abc')}>Add Arabic Words</Button>
    </React.Fragment>
  )
}

export default Words
