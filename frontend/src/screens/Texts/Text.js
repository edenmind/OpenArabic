import { Container, Divider } from '@mui/material'
import React, { Fragment } from 'react'

import Nav from '../../components/Nav'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Text() {
  const { id } = useParams()
  const [text, setText] = React.useState([])
  const [numberOfSentences, setNumberOfSentences] = React.useState(0)

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/texts/${id}`)
      .then((response) => {
        console.log(response.data)
        setText(response.data)
        setNumberOfSentences(response.data.arabicSentence.length)
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
        </center>
      </Container>
    </React.Fragment>
  )
}

export default Text
