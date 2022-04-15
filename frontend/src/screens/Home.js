import { Alert, Button, Card, CardActions, CardContent, Container, Grid, Snackbar, Typography } from '@mui/material'

import Box from '@mui/material/Box'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Paper from '@mui/material/Paper'
import React from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles'

const Home = () => {
  const [texts, setTexts] = React.useState([])
  const [openSnackBar, setOpenSnackbar] = React.useState(false)

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/texts`)
      .then((response) => {
        console.log(response.data)
        setTexts(response.data)
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

  const handleClick = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/texts/${id}`)
      .then((response) => {
        if (response.status === 200) {
          if (response.status === 200) {
            setOpenSnackbar(true)
          }
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
              {text.category}
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

  return (
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
