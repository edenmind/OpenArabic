/* eslint-disable react/react-in-jsx-scope */
import { Container, Divider, Grid } from '@mui/material'

import CircularProgress from '@mui/material/CircularProgress'
import Footer from '../components/footer'
import Nav from '../components/nav'
import React from 'react'
import TextListIdSentences from './text-list-id-sentences'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function TextListId() {
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
      .catch((error) => console.log(error))
  }, [id])

  return isLoading ? (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}>
      <Grid item xs={3}>
        <CircularProgress />
      </Grid>
    </Grid>
  ) : (
    <React.Fragment>
      <Nav />
      <Container maxWidth="lg">
        <center>
          <h1>{text.title}</h1>
          <h3>{text.author}</h3>
          <h4>{text.source}</h4>
          <Divider width="300" />
          <TextListIdSentences sentences={text.sentences} />
        </center>
        <Footer />
      </Container>
    </React.Fragment>
  )
}

export default TextListId
