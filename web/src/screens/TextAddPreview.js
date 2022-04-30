import { Container, Divider } from '@mui/material'

import Footer from '../components/Footer'
import React from 'react'
import SaveText from './TextAddSave'
import SingleTextSentence from './SingleTextSentences'
import { useSelector } from 'react-redux'

function TextAddPreview() {
  const selector = (state) => state.text
  const { text } = useSelector(selector)

  return (
    <React.Fragment>
      <Container maxWidth='lg'>
        <center>
          <h1>{text.title}</h1>
          <h3>{text.author}</h3>
          <h4>{text.source}</h4>
          <Divider width='200' />
          <SingleTextSentence sentences={text.sentences} />
        </center>
        <SaveText />

        <Footer />
      </Container>
    </React.Fragment>
  )
}

export default TextAddPreview
