import { Container, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import Footer from '../components/Footer'
import React from 'react'
import SaveText from './TextAddSave'
import SingleTextSentence from './SingleTextSentences'
import SnackBar from '../components/SnackBar'
import axios from 'axios'

function TextAddPreview() {
  const selector = (state) => state.text
  const { text } = useSelector(selector)

  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const dispatch = useDispatch()

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const handleSave = () => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/texts`,
      data: {
        text,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setOpenSnackbar(true)

          dispatch({ type: 'SET_TEXT', text: null })
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
