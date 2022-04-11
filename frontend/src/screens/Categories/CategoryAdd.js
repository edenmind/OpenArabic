import { Button, Container, FormControl, Snackbar, Stack, TextField } from '@mui/material'

import MuiAlert from '@mui/material/Alert'
import Nav from '../Nav'
import React from 'react'
import axios from 'axios'

export const CategoryAdd = () => {
  const [category, setCategory] = React.useState('')
  const [open, setOpen] = React.useState(false)

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
            <Button variant='contained' onClick={addCategory} disabled={5 > category.length}>
              Add
            </Button>
            <Button variant='outlined' href='/categories'>
              Back
            </Button>
          </Stack>
        </div>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Added new category!
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}
