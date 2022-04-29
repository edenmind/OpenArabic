import { Container, Divider } from '@mui/material'

import Footer from '../components/Footer'
import React from 'react'
import SaveText from './TextAddSave'
import SingleTextSentence from './SingleTextSentences'
import SnackBar from '../components/SnackBar'
import axios from 'axios'
import { useSelector } from 'react-redux'

function TextAddPreview() {
  const selector = (state) => state.text
  const { text } = useSelector(selector)

  const [openSnackBar, setOpenSnackbar] = React.useState(false)

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const handleSave = () => {
    const { title, author, category, sentences, source, texts } = text
    const { arabic, english } = texts
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/texts`,
      data: {
        title,
        category,
        texts: {
          arabic,
          english,
        },
        author,
        source,
        sentences,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setOpenSnackbar(true)
        }
      })
      .catch((err) => console.log(err))
  }

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
        <SaveText handleSave={handleSave} />
        <SnackBar openSnackBar={openSnackBar} handleCloseSnackbar={handleCloseSnackbar} severity='success' message='Added new text' />
        <Footer />
      </Container>
    </React.Fragment>
  )
}

export default TextAddPreview
