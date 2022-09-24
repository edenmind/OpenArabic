import { Button, Container, FormControl, Stack, TextField } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/footer.js'
import Nav from '../components/nav.js'
import React from 'react'
import SnackBar from '../components/snack-bar.js'
import axios from 'axios'

const CategoriesUpdate = () => {
  const [category, setCategory] = React.useState('')
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
    axios
      .get(`${process.env.REACT_APP_API_URL}/categories/${id}`)
      .then((response) => {
        setCategory(response.data.name)
      })
      .catch((error) => console.log(error))
  }, [id])

  const updateCategory = () => {
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/categories/${id}`,
      data: {
        name: category
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setStatus('Updated category: ' + response.data.message)
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

        <FormControl fullWidth>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </FormControl>

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
