import { Button, Container, Box, Stack, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import * as api from '../services/api-service.js'
import Footer from '../components/footer.js'
import { Link } from 'react-router-dom'
import Nav from '../components/nav.js'
import React from 'react'
import SnackBar from '../components/snack-bar.js'

const CategoriesAdd = () => {
  const [name, setName] = React.useState('')
  const [level, setLevel] = React.useState('')
  const [description, setDescription] = React.useState('')

  const [open, setOpen] = React.useState(false)

  const divStyle = {
    padding: '10px'
  }

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const addCategory = () => {
    const data = {
      name,
      level,
      description
    }
    api
      .addCategory(data)
      .then((res) => {
        if (res) {
          setOpen(true)
          setName('')
          setLevel('')
          setDescription('')
        }
      })
      .catch((error) => console.log(error))
  }

  const validCategoryLength = name.length < 5

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth="lg">
        <h2>Add Category</h2>

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
              <MenuItem value={10}>Introduction</MenuItem>
              <MenuItem value={20}>Intermediate</MenuItem>
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
            <Button variant="contained" onClick={addCategory} disabled={validCategoryLength}>
              Add
            </Button>
            <Link to="/categories">
              <Button variant="outlined">Back</Button>
            </Link>
          </Stack>
        </div>
        <Footer />
      </Container>

      <SnackBar
        openSnackBar={open}
        handleCloseSnackbar={handleClose}
        severity="success"
        message="Added new category!"
      />
    </React.Fragment>
  )
}

export default CategoriesAdd
