import { Button, Container, FormControl, Snackbar, Stack, TextField } from '@mui/material'

import MuiAlert from '@mui/material/Alert'
import Nav from './Nav'
import React from 'react'
import axios from 'axios'

export const AuthorAdd = () => {
  const [author, setAuthor] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const divStyle = {
    padding: '10px',
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const addAuthor = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/authors',
      data: {
        name: author,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setOpen(true)
          setAuthor('')
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <h2>Add Author</h2>

        <FormControl fullWidth>
          <TextField fullWidth id='outlined-basic' label='Name' variant='outlined' value={author} onChange={(event) => setAuthor(event.target.value)} />
        </FormControl>

        <div style={divStyle}>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={addAuthor}>
              Add
            </Button>
            <Button variant='outlined' href='/authors'>
              Back
            </Button>
          </Stack>
        </div>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Added new author!
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}
