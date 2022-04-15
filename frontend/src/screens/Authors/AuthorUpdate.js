import { Button, Container, FormControl, Snackbar, Stack, TextField } from '@mui/material'

import Footer from '../../components/Footer'
import MuiAlert from '@mui/material/Alert'
import Nav from '../../components/Nav'
import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export const AuthorUpdate = () => {
  const [author, setAuthor] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = React.useState('')

  const divStyle = {
    padding: '10px',
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })

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
          setStatus(response.data.message)
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
            <Button variant='outlined' href='/authors'>
              Back
            </Button>
          </Stack>
        </div>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Updated author: {status}
        </Alert>
      </Snackbar>
      <Footer />
    </React.Fragment>
  )
}
