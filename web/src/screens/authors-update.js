import { Button, Container, FormControl, Stack, TextField } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import * as api from '../services/api-service.js'
import Footer from '../components/footer.js'
import Nav from '../components/nav.js'
import React from 'react'
import SnackBar from '../components/snack-bar.js'

const AuthorsUpdate = () => {
  const [author, setAuthor] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = React.useState('')

  const divStyle = {
    padding: '10px'
  }

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const { id } = useParams()

  React.useEffect(() => {
    api
      .getAuthor(id)
      .then((res) => setAuthor(res))
      .catch((error) => console.log(error))
  }, [id])

  const updateAuthor = () => {
    api
      .updateAuthor(author, id)
      .then((res) => {
        if (res) {
          setStatus('Updated author!')
          setOpen(true)
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth="lg">
        <h2>Update Author</h2>

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
            <Button variant="contained" onClick={updateAuthor}>
              Update
            </Button>
            <Link to="/authors">
              <Button variant="outlined">Back</Button>
            </Link>
          </Stack>
        </div>
        <Footer />
      </Container>

      <SnackBar openSnackBar={open} handleCloseSnackbar={handleClose} severity="success" message={status} />
    </React.Fragment>
  )
}

export default AuthorsUpdate
