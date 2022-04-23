import { Container, Divider, Grid } from '@mui/material'

import CircularProgress from '@mui/material/CircularProgress'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import React from 'react'
import SingleTextSentence from './SingleTextSentences'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function SingleText() {
  const { id } = useParams()
  const [text, setText] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/texts/${id}`)
      .then((response) => {
        setText(response.data)
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  return isLoading ? (
    <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center' style={{ minHeight: '100vh' }}>
      <Grid item xs={3}>
        <CircularProgress />
      </Grid>
    </Grid>
  ) : (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <center>
          <h1>{text.title}</h1>
          <h3>{text.author}</h3>
          <h4>{text.source}</h4>
          <Divider width='200' />
          <SingleTextSentence sentences={text.sentences} />
        </center>
        <Footer />
      </Container>
    </React.Fragment>
  )
}

export default SingleText
