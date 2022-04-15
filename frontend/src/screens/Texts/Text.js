import { Container, Divider } from '@mui/material'
import React, { Fragment } from 'react'

import { Box } from '@mui/system'
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Text() {
  const { id } = useParams()
  const [text, setText] = React.useState([])
  const [sentencesCombined, setSentencesCombined] = React.useState([])

  const combineSentences = () => {
    const sentencesCombinedLocal = []
    if (text.arabicSentence !== undefined) {
      for (let i = 0; i < text.arabicSentence.length; i++) {
        const sentence = {
          english: text.englishSentence[i],
          arabic: text.arabicSentence[i],
        }
        sentencesCombinedLocal.push(sentence)
      }
    }
    setSentencesCombined(sentencesCombinedLocal)
  }
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/texts/${id}`)
      .then((response) => {
        setText(response.data)
      })
      .then(combineSentences)
      .catch((err) => console.log(err))
  })

  const sentences = sentencesCombined.map((sentence, index) => (
    <Fragment key={index}>
      <Box sx={{ fontSize: 'h4.fontSize', m: 2 }}>{sentence.arabic}</Box>
      <Box sx={{ m: 2 }}>{sentence.english}</Box>
    </Fragment>
  ))

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <center>
          <h1>{text.title}</h1>
          <h3>{text.author}</h3>
          <h4>{text.source}</h4>
          <Divider width='200' />
          {sentences}
        </center>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default Text
