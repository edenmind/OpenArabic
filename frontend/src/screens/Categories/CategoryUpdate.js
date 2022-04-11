import { Button, Container, FormControl, Snackbar, Stack, TextField } from '@mui/material'

import MuiAlert from '@mui/material/Alert'
import Nav from '../../components/Nav'
import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export const CategoryUpdate = () => {
  const [category, setCategory] = React.useState('')
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
      .get(`${process.env.REACT_APP_API_URL}/categories/${id}`)
      .then((response) => {
        setCategory(response.data.name)
      })
      .catch((err) => console.log(err))
  }, [id])

  const updateCategory = () => {
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/categories/${id}`,
      data: {
        name: category,
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
        <h2>Update Category</h2>

        <FormControl fullWidth>
          <TextField fullWidth id='outlined-basic' label='Name' variant='outlined' value={category} onChange={(event) => setCategory(event.target.value)} />
        </FormControl>

        <div style={divStyle}>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' onClick={updateCategory}>
              Update
            </Button>
            <Button variant='outlined' href='/categories'>
              Back
            </Button>
          </Stack>
        </div>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Updated category: {status}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}
