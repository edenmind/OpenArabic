/* eslint-disable react/react-in-jsx-scope */
import { Container, Divider } from '@mui/material'

import Footer from '../components/footer'
import Grid from '@mui/material/Grid'
import React from 'react'
import SaveText from './text-add-preview-save'
import TextListIdSentences from './text-list-id-sentences'
import { useSelector } from 'react-redux'

const selector = (state) => state.text
function TextAddPreview() {
  const { text } = useSelector(selector)

  return text.sentences.length > 1 ? (
    <React.Fragment>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}>
          <h1>{text.title}</h1>
          <h3>{text.author}</h3>
          <h4>{text.source}</h4>
          <Divider width="200" />
          <TextListIdSentences sentences={text.sentences} />
          <SaveText />
        </Grid>
        <Footer />
      </Container>
    </React.Fragment>
  ) : (
    <h3>No text to preview... please add some sentences and try again.</h3>
  )
}

export default TextAddPreview
