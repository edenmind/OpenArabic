import { Container, Divider, Grid } from '@mui/material'
import React, { Fragment } from 'react'

import { Box } from '@mui/system'
import CircularProgress from '@mui/material/CircularProgress'
import Nav from '../../components/Nav'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Text() {
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
          {text.sentences.map((sentence, index) => (
            <Fragment key={index}>
              <Box sx={{ fontSize: 'h4.fontSize', m: 2 }}>{sentence.arabic}</Box>
              <Box sx={{ m: 2 }}>{sentence.english}</Box>
            </Fragment>
          ))}
        </center>
      </Container>
    </React.Fragment>
  )
}

export default Text
