import { Button, Container, FormControl, Stack, TextField } from '@mui/material'

import Footer from '../components/footer.js'
import { Link } from 'react-router-dom'
import Nav from '../components/nav.js'
import React from 'react'
import SnackBar from '../components/snack-bar.js'
import axios from 'axios'

const AuthorsAdd = () => {
  const [author, setAuthor] = React.useState('')
  const [openSnackBar, setOpenSnackBar] = React.useState(false)

  const divStyle = {
    padding: '10px'
  }

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackBar(false)
  }

  const addAuthor = () => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/authors`,
      data: {
        name: author
      }
    })
      .then((response) => {
        if (response.status === 201) {
          setOpenSnackBar(true)
          setAuthor('')
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth="lg">
        <h2>Add Author</h2>

        <FormControl fullWidth>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </FormControl>

        <div style={divStyle}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={addAuthor} disabled={author.length < 5}>
              Add
            </Button>
            <Link to="/authors">
              <Button variant="outlined">Back</Button>
            </Link>
          </Stack>
        </div>
        <Footer />
      </Container>
      <SnackBar
        openSnackBar={openSnackBar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="success"
        message="Added new author!"
      />
    </React.Fragment>
  )
}

export default AuthorsAdd
