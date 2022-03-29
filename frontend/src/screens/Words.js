import { Button } from '@mui/material'
import React from 'react'

const Words = (props) => {
  return (
    <React.Fragment>
      <div>{props.english}</div>
      <div>{props.arabic}</div>

      <Button onClick={() => props.setEnglishWordsFunc('abc')}>Add English Words</Button>
      <Button onClick={() => props.setArabicWordsFunc('abc')}>Add Arabic Words</Button>
    </React.Fragment>
  )
}

export default Words
