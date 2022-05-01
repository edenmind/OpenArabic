import { Chip, Container, Divider } from '@mui/material'
import React, { Fragment } from 'react'

import Footer from '../components/footer.js'
import Grid from '@mui/material/Grid'
import TextListIdSentences from './text-list-id-sentences.js'
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
          style={{ minHeight: '100vh' }}
        >
          <h1>{text.title}</h1>
          <h3>{text.author}</h3>
          <h4>{text.source}</h4>
          <Divider width="200" />
          <TextListIdSentences sentences={text.sentences} />
        </Grid>
        <Footer />
      </Container>
    </React.Fragment>
  ) : (
    <Fragment>
      <Chip color="warning" label="No Preview Available" />
      <h3>Please add some information in the other tabs and try again.</h3>
    </Fragment>
  )
}

export default TextAddPreview
