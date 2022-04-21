import * as apiService from '../services/apiService'

import { Alert, Container, Grid, Snackbar } from '@mui/material'

import Box from '@mui/material/Box'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Progress from '../components/Progress'
import React from 'react'
import TextCards from '../components/TextCards'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Home = () => {
  const [texts, setTexts] = React.useState([''])
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  const { id } = useParams()

  React.useEffect(() => {
    apiService
      .getTexts(id)
      .then((data) => {
        setTexts(data)
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }, [id])

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

  const handleDeleteClick = (textId) => {
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

  const heading = 'Welcome 👋🏻👋🏽👋🏿'
  const subHeading = 'Lets start learning classical arabic - <em>al-fuṣḥá</em>, <em>inshāʾAllāh</em> 🚀'

  return isLoading ? (
    <Progress />
  ) : (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <TextCards handleDeleteClick={handleDeleteClick} texts={texts} heading={heading} subHeading={subHeading} />
        <Footer />
      </Container>
      {snackbar}
    </React.Fragment>
  )
}

export default Home
