/* eslint-disable unicorn/prefer-spread */
/* eslint-disable unicorn/no-array-reduce */
import { Chip, Container, Divider, TextField } from '@mui/material'
import React, { Fragment } from 'react'
import Footer from '../components/footer.js'
import Grid from '@mui/material/Grid'
import TextListIdSentences from './text-list-id-sentences.js'
import { useSelector } from 'react-redux'

const selector = (state) => state.text

function TextAddPreview() {
  const { text } = useSelector(selector)
  const [englishWordsAggregated, setEnglishWordsAggregated] = React.useState('')

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
          <img src={text.image} alt={text.title} width={700} />
          <Divider width="200" />
          <TextListIdSentences sentences={text.sentences} />

          <h3>Grammar Check</h3>
          <TextField value={englishWordsAggregated} multiline rows={10} fullWidth />
          <br />
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
