import { Button, Container, FormControl, Stack, TextField } from '@mui/material'

import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import React from 'react'
import SnackBar from '../components/SnackBar'
import axios from 'axios'

const CategoryAdd = () => {
  const [category, setCategory] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const divStyle = {
    padding: '10px',
  }

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const addCategory = () => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/categories`,
      data: {
        name: category,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setOpen(true)
          setCategory('')
        }
      })
      .catch((err) => console.log(err))
  }

  const validCategoryLength = 5 > category.length

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <h2>Add Category</h2>

        <FormControl fullWidth>
          <TextField fullWidth id='outlined-basic' label='Name' variant='outlined' value={category} onChange={(event) => setCategory(event.target.value)} />
        </FormControl>

        <div style={divStyle}>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={addCategory} disabled={validCategoryLength}>
              Add
            </Button>
            <Link to='/categories'>
              <Button variant='outlined'>Back</Button>
            </Link>
          </Stack>
        </div>
        <Footer />
      </Container>

      <SnackBar openSnackBar={open} handleCloseSnackbar={handleClose} severity='success' message='Added new category!' />
    </React.Fragment>
  )
}

export default CategoryAdd
