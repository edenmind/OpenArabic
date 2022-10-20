import { Button, Container, FormControl, Stack, TextField, Box } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import * as api from '../services/api-service.js'
import Footer from '../components/footer.js'
import Nav from '../components/nav.js'
import React from 'react'
import SnackBar from '../components/snack-bar.js'

const WordsUpdate = () => {
  const [english, setEnglish] = React.useState('')
  const [arabic, setArabic] = React.useState('')
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
      .getWord(id)
      .then((res) => {
        const { english, arabic } = res
        setEnglish(english)
        setArabic(arabic)
      })
      .catch((error) => console.log(error))
  }, [id])

  const updateWord = () => {
    const word = {
      english,
      arabic
    }
    api
      .updateWord(word, id)
      .then((res) => {
        if (res) {
          setStatus('Updated Word!')
          setOpen(true)
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth="lg">
        <h2>Update Word</h2>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '75ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <TextField
              fullWidth
              id="english"
              label="English"
              variant="outlined"
              value={english}
              onChange={(event) => setEnglish(event.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              fullWidth
              id="arabic"
              label="Arabic"
              variant="outlined"
              value={arabic}
              onChange={(event) => setArabic(event.target.value)}
            />
          </FormControl>
        </Box>

        <div style={divStyle}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={updateWord}>
              Update
            </Button>
            <Link to="/Words">
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

export default WordsUpdate
