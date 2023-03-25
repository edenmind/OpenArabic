import { Button, Container, Box, Stack, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/footer.js'
import Nav from '../components/nav.js'
import React from 'react'
import SnackBar from '../components/snack-bar.js'
import * as api from '../services/api-service.js'

const CategoriesUpdate = () => {
  const [name, setName] = React.useState('')
  const [level, setLevel] = React.useState('')
  const [description, setDescription] = React.useState('')
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
      .getCategory(id)
      .then((res) => {
        console.log('res:', res)

        const { name, level, description } = res

        setName(name)
        setLevel(level)
        setDescription(description)
      })
      .catch((error) => console.log(error))
  }, [id])

  const updateCategory = () => {
    const data = {
      name,
      level,
      description
    }
    api
      .updateCategory(data, id)
      .then((res) => {
        if (res) {
          setStatus('Updated category!')
          setOpen(true)
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth="lg">
        <h2>Update Category</h2>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '75ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <FormControl fullWidth sx={{ m: 1, width: '75ch' }}>
            <InputLabel id="demo-simple-select-label">Level</InputLabel>
            <Select
              labelId="Level"
              id="level"
              value={level}
              label="Level"
              onChange={(event) => setLevel(event.target.value)}
            >
              <MenuItem value={0}>Uncategorized</MenuItem>
              <MenuItem value={10}>Introduction</MenuItem>
              <MenuItem value={20}>Mid-Level</MenuItem>
              <MenuItem value={30}>Advanced</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="description"
            label="Description"
            multiline
            rows={5}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Box>

        <div style={divStyle}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={updateCategory}>
              Update
            </Button>
            <Link to="/categories">
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

export default CategoriesUpdate
