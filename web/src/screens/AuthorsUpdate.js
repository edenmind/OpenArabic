import { Button, Container, FormControl, Stack, TextField } from '@mui/material'
import { Link, useParams } from 'react-router-dom'

import Footer from '../components/Footer'
import Nav from '../components/Nav'
import React from 'react'
import SnackBar from '../components/SnackBar'
import axios from 'axios'

const AuthorsUpdate = () => {
  const [author, setAuthor] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = React.useState('')

  const divStyle = {
    padding: '10px',
  }

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const { id } = useParams()

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/authors/${id}`)
      .then((response) => {
        setAuthor(response.data.name)
      })
      .catch((err) => console.log(err))
  }, [id])

  const updateAuthor = () => {
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/authors/${id}`,
      data: {
        name: author,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setStatus(`Updated author: ${response.data.message}`)
          setOpen(true)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <h2>Update Author</h2>

        <FormControl fullWidth>
          <TextField fullWidth id='outlined-basic' label='Name' variant='outlined' value={author} onChange={(event) => setAuthor(event.target.value)} />
        </FormControl>

        <div style={divStyle}>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={updateAuthor}>
              Update
            </Button>
            <Link to='/authors'>
              <Button variant='outlined'>Back</Button>
            </Link>
          </Stack>
        </div>
        <Footer />
      </Container>

      <SnackBar openSnackBar={open} handleCloseSnackbar={handleClose} severity='success' message={status} />
    </React.Fragment>
  )
}

export default AuthorsUpdate
