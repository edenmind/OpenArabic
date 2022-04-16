import * as lookup from '../../services/lookup'

import { Container, Divider, Grid } from '@mui/material'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box } from '@mui/system'
import CircularProgress from '@mui/material/CircularProgress'
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import { SET_AUTHOR_PERSISTED } from '../../redux/actions'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Text() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [text, setText] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const { authorPersisted } = useSelector((state) => state.authorPersisted)
  const setAuthorPersisted = (value) => dispatch({ type: SET_AUTHOR_PERSISTED, authorPersisted: value })

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/authors`)
      .then((response) => {
        setAuthorPersisted(response.data)
      })
      .catch((err) => console.log(err))
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
          <h3>{lookup.authorLookup(text.author, authorPersisted)}</h3>
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
