import { Container, Divider } from '@mui/material'

import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Text() {
  const { id } = useParams()
  const [text, setText] = React.useState([])
  const [combined, setCombined] = React.useState([])

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/texts/${id}`)
      .then((response) => {
        setText(response.data)
        const combinedNums = [].concat(response.data.englishSentence, response.data.arabicSentence, response.data.wordByWord)
        setCombined(combinedNums)
      })
      .catch((err) => console.log(err))
  }, [id])

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <center>
          <h1>{text.title}</h1>
          <h3>{text.author}</h3>
          <h4>{text.source}</h4>
          <Divider width='200' />
          {combined.map((item, index) => item)}
        </center>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default Text
