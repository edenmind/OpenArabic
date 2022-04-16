import * as lookup from '../services/lookup'

import { Alert, Button, Card, CardActions, CardContent, Container, Grid, Snackbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Paper from '@mui/material/Paper'
import React from 'react'
import { SET_CATEGORY_PERSISTED } from '../redux/actions'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import { useParams } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch()
  const [texts, setTexts] = React.useState([])
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const setCategoryPersisted = (value) => dispatch({ type: SET_CATEGORY_PERSISTED, categoryPersisted: value })
  const { id } = useParams()
  const { categoryPersisted } = useSelector((state) => state.categoryPersisted)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const url = id ? `${process.env.REACT_APP_API_URL}/texts/categories/${id}` : `${process.env.REACT_APP_API_URL}/texts`

    axios
      .get(url)
      .then((response) => {
        setTexts(response.data)
      })
      .catch((err) => console.log(err))

    axios
      .get(`${process.env.REACT_APP_API_URL}/categories`)
      .then((response) => {
        setCategoryPersisted(response.data)
        console.log(response.data)
        setTimeout(() => {
          setIsLoading(false)
        }, 700)
      })
      .catch((err) => console.log(err))
  }, [])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }))

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const snackbar = (
    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
        Text deleted!
      </Alert>
    </Snackbar>
  )

  const handleClick = (textId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/texts/${textId}`)
      .then((response) => {
        if (response.status === 200) {
          setOpenSnackbar(true)
        }
      })
      .catch((err) => console.log(err))

    const newTexts = texts.filter((item) => item._id !== id)
    setTexts(newTexts)
  }

  const textCards = texts.map((text, index) => (
    <Grid item md={4} key={index}>
      <Item>
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
              {text.title}
            </Typography>
            <Typography variant='h5' component='div'>
              {text.author}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {lookup.categoryLookup(text.category, categoryPersisted)}
            </Typography>
            <Typography variant='body2'>
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' href={`/texts/${text._id}`}>
              Read More
            </Button>
            <Button size='small' onClick={() => handleClick(text._id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </Item>
    </Grid>
  ))

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
        <h2>Welcome 👋🏻👋🏽👋🏿</h2>
        <h4>
          Let's start learning classical arabic - <em>al-fuṣḥá</em>, <em>inshāʾAllāh</em> 🚀
        </h4>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {textCards}
          </Grid>
        </Box>
      </Container>
      {snackbar}
      <Footer />
    </React.Fragment>
  )
}

export default Home
