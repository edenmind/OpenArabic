import * as wordProcessing from '../services/wordProcessing'

import { Alert, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Snackbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Paper from '@mui/material/Paper'
import React from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
  const [texts, setTexts] = React.useState([])
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  const { id } = useParams()
  const { user, isAuthenticated } = useAuth0()

  React.useEffect(() => {
    const url = id ? `${process.env.REACT_APP_API_URL}/texts/categories/${id}` : `${process.env.REACT_APP_API_URL}/texts`

    axios
      .get(url)
      .then((response) => {
        setTexts(response.data)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
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

  const textCards = texts.slice(0, 6).map((text, index) => (
    <Grid item md={4} xs={12} key={index}>
      <Item>
        <Card>
          <CardMedia component='img' height='194' image={`/${index}.png`} />
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
              {text.category}
            </Typography>
            <Typography variant='h5' component='div'>
              {text.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {text.author}
            </Typography>
            <div dir='rtl'>
              <Typography variant='h5'>{wordProcessing.truncateString(text.sentences)}</Typography>
            </div>
          </CardContent>
          <CardActions>
            <Link to={`/texts/${text._id}`}>
              <Button size='small'>Read More</Button>
            </Link>
            {isAuthenticated && user.email === 'jonas@lightgate-imagery.com' && (
              <Button size='small' onClick={() => handleClick(text._id)}>
                Delete
              </Button>
            )}
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
        <Footer />
      </Container>
      {snackbar}
    </React.Fragment>
  )
}

export default Home
