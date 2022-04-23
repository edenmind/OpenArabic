import { Container, Divider } from '@mui/material'
import React, { Fragment } from 'react'

import { Box } from '@mui/system'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Progress from '../components/Progress'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function TextAddMeta() {
  const { id } = useParams()
  const [text, setText] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/texts/${id}`)
      .then((response) => {
        setText(response.data)
        setTimeout(() => {
          setIsLoading(false)
        }, 700)
      })
      .catch((err) => console.log(err))
  }, [])

  return isLoading ? (
    <Progress />
  ) : (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <center>
          <h1>{text.title}</h1>
          <h3>{text.author}</h3>
          <h4>{text.source}</h4>
          <Divider width='200' />
          {text.sentences.map((sentence, index) => (
            <Fragment key={index}>
              <Box sx={{ fontSize: 'h4.fontSize', m: 2 }}>{sentence.arabic}</Box>
              <Box sx={{ m: 2 }}>{sentence.english}</Box>
            </Fragment>
          ))}
        </center>
        <Footer />
      </Container>
    </React.Fragment>
  )
}
